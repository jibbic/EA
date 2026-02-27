import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Shield,
  Database,
  Network,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Layers
} from 'lucide-react';

const Dashboard = () => {
  const { metamodel, entities, relationships, getComplianceStatus } = useData();

  const complianceStatus = getComplianceStatus();
  const overallCompliance = Object.values(complianceStatus).length > 0
    ? Math.round(
        Object.values(complianceStatus).reduce((sum, item) => sum + item.percentage, 0) /
          Object.values(complianceStatus).length
      )
    : 0;

  const totalEntities = Object.values(entities).reduce(
    (sum, items) => sum + items.length,
    0
  );

  const criticalSystems = entities.ApplicationSystem?.filter(
    s => s.criticality === 'critical'
  ).length || 0;

  const securityControls = entities.SecurityControl?.length || 0;

  const stats = [
    {
      name: 'Totala Entiteter',
      value: totalEntities,
      icon: Database,
      color: 'bg-blue-500',
      link: '/entities'
    },
    {
      name: 'Kritiska System',
      value: criticalSystems,
      icon: AlertCircle,
      color: 'bg-red-500',
      link: '/entities'
    },
    {
      name: 'Säkerhetskontroller',
      value: securityControls,
      icon: Shield,
      color: 'bg-green-500',
      link: '/entities'
    },
    {
      name: 'Relationer',
      value: relationships.length,
      icon: Network,
      color: 'bg-purple-500',
      link: '/visualizer'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">
          Välkommen till NIS 2 EA Framework
        </h2>
        <p className="text-primary-100 text-lg">
          Visualisera och hantera din enterprise-arkitektur för NIS 2-compliance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              to={stat.link}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Compliance Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-primary-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">
                NIS 2 Compliance-status
              </h3>
            </div>
            <Link
              to="/compliance"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Se detaljer →
            </Link>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Övergripande compliance</span>
              <span className="text-2xl font-bold text-gray-900">{overallCompliance}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallCompliance}%` }}
              />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(complianceStatus).slice(0, 6).map(([article, status]) => (
              <div key={article} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-500">{article}</p>
                    <p className="text-sm text-gray-900 mt-1">{status.title}</p>
                  </div>
                  {status.percentage === 100 ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                  )}
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-gray-600">
                      {status.covered} av {status.total} entitetstyper
                    </span>
                    <span className="font-medium text-gray-900">{status.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        status.percentage === 100 ? 'bg-green-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${status.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Layers */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Layers className="h-6 w-6 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Arkitekturskikt
            </h3>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metamodel.layers.map((layer) => {
              const layerEntities = layer.entityTypes.reduce(
                (sum, type) => sum + (entities[type]?.length || 0),
                0
              );
              
              return (
                <Link
                  key={layer.name}
                  to={`/perspectives/${layer.name.toLowerCase()}`}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: layer.color + '40' }}
                    >
                      <div
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: layer.color }}
                      />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {layerEntities}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{layer.name}</h4>
                  <p className="text-sm text-gray-600">
                    {layer.entityTypes.length} entitetstyper
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Snabbåtgärder
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/visualizer"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <Network className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Visualisera arkitektur</div>
              <div className="text-sm text-gray-600">Se relationer och beroenden</div>
            </div>
          </Link>
          <Link
            to="/entities"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <Database className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Hantera entiteter</div>
              <div className="text-sm text-gray-600">Lägg till och redigera</div>
            </div>
          </Link>
          <Link
            to="/compliance"
            className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-primary-600 mr-3" />
            <div>
              <div className="font-medium text-gray-900">Analysera compliance</div>
              <div className="text-sm text-gray-600">Identifiera gap</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
