import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, DollarSign, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const ApplicationPortfolio = () => {
  const { entities, metamodel } = useData();
  const [selectedQuadrant, setSelectedQuadrant] = useState('all');

  const applications = useMemo(() => {
    const apps = entities.ApplicationComponent || [];
    return apps.map(app => ({
      ...app,
      businessValue: app.business_value || app.businessValue || 5,
      technicalHealth: app.technical_health || app.technicalHealth || 5,
    }));
  }, [entities]);

  const quadrants = {
    invest: {
      name: 'Invest',
      color: '#10B981',
      bgColor: '#D1FAE5',
      description: 'Hög affärsnytta, god teknisk hälsa',
      recommendation: 'Investera och vidareutveckla',
      icon: TrendingUp
    },
    migrate: {
      name: 'Migrate',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      description: 'Hög affärsnytta, låg teknisk hälsa',
      recommendation: 'Modernisera eller ersätt teknisk skuld',
      icon: AlertTriangle
    },
    tolerate: {
      name: 'Tolerate',
      color: '#6B7280',
      bgColor: '#F3F4F6',
      description: 'Låg affärsnytta, god teknisk hälsa',
      recommendation: 'Behåll men minimera investeringar',
      icon: CheckCircle
    },
    eliminate: {
      name: 'Eliminate',
      color: '#EF4444',
      bgColor: '#FEE2E2',
      description: 'Låg affärsnytta, låg teknisk hälsa',
      recommendation: 'Överväg avveckling eller konsolidering',
      icon: AlertTriangle
    }
  };

  const getQuadrant = (businessValue, technicalHealth) => {
    if (businessValue >= 5 && technicalHealth >= 5) return 'invest';
    if (businessValue >= 5 && technicalHealth < 5) return 'migrate';
    if (businessValue < 5 && technicalHealth >= 5) return 'tolerate';
    return 'eliminate';
  };

  const categorizedApps = useMemo(() => {
    const result = {
      invest: [],
      migrate: [],
      tolerate: [],
      eliminate: []
    };

    applications.forEach(app => {
      const quadrant = getQuadrant(app.businessValue, app.technicalHealth);
      result[quadrant].push(app);
    });

    return result;
  }, [applications]);

  const chartData = applications.map(app => ({
    x: app.technicalHealth,
    y: app.businessValue,
    name: app.name,
    id: app.id,
    quadrant: getQuadrant(app.businessValue, app.technicalHealth),
    criticality: app.criticality,
    cost: app.cost_per_year || app.costPerYear || 0
  }));

  const filteredChartData = selectedQuadrant === 'all' 
    ? chartData 
    : chartData.filter(d => d.quadrant === selectedQuadrant);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900 mb-2">{data.name}</p>
          <div className="space-y-1 text-sm">
            <p className="text-gray-600">
              Affärsnytta: <span className="font-medium text-gray-900">{data.y}/10</span>
            </p>
            <p className="text-gray-600">
              Teknisk hälsa: <span className="font-medium text-gray-900">{data.x}/10</span>
            </p>
            {data.criticality && (
              <p className="text-gray-600">
                Kritikalitet: <span className="font-medium text-gray-900">{data.criticality}</span>
              </p>
            )}
            {data.cost > 0 && (
              <p className="text-gray-600">
                Kostnad: <span className="font-medium text-gray-900">{data.cost.toLocaleString('sv-SE')} SEK/år</span>
              </p>
            )}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <span
              className="inline-block px-2 py-1 text-xs font-medium rounded"
              style={{
                backgroundColor: quadrants[data.quadrant].bgColor,
                color: quadrants[data.quadrant].color
              }}
            >
              {quadrants[data.quadrant].name}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const stats = {
    total: applications.length,
    invest: categorizedApps.invest.length,
    migrate: categorizedApps.migrate.length,
    tolerate: categorizedApps.tolerate.length,
    eliminate: categorizedApps.eliminate.length,
    avgBusinessValue: applications.length > 0 
      ? (applications.reduce((sum, app) => sum + app.businessValue, 0) / applications.length).toFixed(1)
      : 0,
    avgTechnicalHealth: applications.length > 0
      ? (applications.reduce((sum, app) => sum + app.technicalHealth, 0) / applications.length).toFixed(1)
      : 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Application Portfolio Matrix</h1>
        <p className="mt-2 text-gray-600">
          Visualisera applikationer baserat på affärsnytta och teknisk hälsa för att prioritera investeringar
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Totalt</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Invest</p>
          <p className="text-2xl font-bold mt-1" style={{ color: quadrants.invest.color }}>
            {stats.invest}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Migrate</p>
          <p className="text-2xl font-bold mt-1" style={{ color: quadrants.migrate.color }}>
            {stats.migrate}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Tolerate</p>
          <p className="text-2xl font-bold mt-1" style={{ color: quadrants.tolerate.color }}>
            {stats.tolerate}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Eliminate</p>
          <p className="text-2xl font-bold mt-1" style={{ color: quadrants.eliminate.color }}>
            {stats.eliminate}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Ø Värde/Hälsa</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {stats.avgBusinessValue}/{stats.avgTechnicalHealth}
          </p>
        </div>
      </div>

      {/* Quadrant Filter */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedQuadrant('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedQuadrant === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Alla ({stats.total})
          </button>
          {Object.entries(quadrants).map(([key, quadrant]) => {
            const Icon = quadrant.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedQuadrant(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedQuadrant === key
                    ? 'text-white'
                    : 'text-gray-700 hover:opacity-80'
                }`}
                style={{
                  backgroundColor: selectedQuadrant === key ? quadrant.color : quadrant.bgColor
                }}
              >
                <Icon className="w-4 h-4" />
                {quadrant.name} ({categorizedApps[key].length})
              </button>
            );
          })}
        </div>
      </div>

      {/* Matrix Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Portfolio Matrix</h2>
          <p className="text-sm text-gray-600 mt-1">
            Varje punkt representerar en applikation. Hovrare för detaljer.
          </p>
        </div>

        <div className="relative">
          <ResponsiveContainer width="100%" height={600}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="x"
                name="Teknisk hälsa"
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
                label={{ value: 'Teknisk Hälsa →', position: 'bottom', offset: 40 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Affärsnytta"
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
                label={{ value: 'Affärsnytta →', angle: -90, position: 'left', offset: 40 }}
              />
              
              {/* Quadrant dividers */}
              <ReferenceLine x={5} stroke="#999" strokeDasharray="5 5" />
              <ReferenceLine y={5} stroke="#999" strokeDasharray="5 5" />

              {/* Quadrant labels */}
              <text x="15%" y="15%" textAnchor="middle" fill={quadrants.eliminate.color} fontSize="14" fontWeight="bold">
                ELIMINATE
              </text>
              <text x="85%" y="15%" textAnchor="middle" fill={quadrants.migrate.color} fontSize="14" fontWeight="bold">
                MIGRATE
              </text>
              <text x="15%" y="90%" textAnchor="middle" fill={quadrants.tolerate.color} fontSize="14" fontWeight="bold">
                TOLERATE
              </text>
              <text x="85%" y="90%" textAnchor="middle" fill={quadrants.invest.color} fontSize="14" fontWeight="bold">
                INVEST
              </text>

              <Tooltip content={<CustomTooltip />} />
              
              <Scatter name="Applications" data={filteredChartData}>
                {filteredChartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={quadrants[entry.quadrant].color}
                    fillOpacity={0.8}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quadrant Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(quadrants).map(([key, quadrant]) => {
          const Icon = quadrant.icon;
          const apps = categorizedApps[key];
          
          return (
            <div key={key} className="bg-white rounded-lg shadow">
              <div 
                className="p-6 border-b border-gray-200"
                style={{ backgroundColor: quadrant.bgColor }}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6" style={{ color: quadrant.color }} />
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: quadrant.color }}>
                      {quadrant.name} ({apps.length})
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">{quadrant.description}</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white rounded-lg">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">{quadrant.recommendation}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {apps.length > 0 ? (
                  <div className="space-y-3">
                    {apps.map(app => (
                      <div key={app.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{app.name}</h4>
                            {app.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{app.description}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>Värde: {app.businessValue}/10</span>
                              <span>Hälsa: {app.technicalHealth}/10</span>
                              {app.criticality && <span className="capitalize">{app.criticality}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">Inga applikationer i denna kvadrant</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Hur använder jag matrisen?</h4>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>
                <strong>Affärsnytta:</strong> Hur viktigt är detta system för verksamheten? 
                (1 = låg nytta, 10 = kritisk för verksamheten)
              </p>
              <p>
                <strong>Teknisk hälsa:</strong> Hur bra är systemets tekniska tillstånd? 
                (1 = legacy/teknisk skuld, 10 = modern/väl underhållen)
              </p>
              <p className="mt-3">
                <strong>Tips:</strong> Redigera entiteter och lägg till attributen 'business_value' och 'technical_health' (1-10) 
                för att placera dem korrekt i matrisen. Standardvärde är 5/10.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPortfolio;
