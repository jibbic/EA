import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import {
  BarChart3,
  Database,
  Network,
  AlertCircle,
  Shield,
  Layers,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Activity
} from 'lucide-react';

const Dashboard = () => {
  const { metamodel, entities, relationships } = useData();

  const totalEntities = Object.values(entities).reduce(
    (sum, items) => sum + items.length,
    0
  );

  // Helper function to get entity types for a layer
  const getEntityTypesForLayer = (layerId) => {
    if (!metamodel.entityTypes) return [];
    return metamodel.entityTypes
      .filter(et => et.layer === layerId)
      .map(et => et.id);
  };

  const criticalSystems = entities.ApplicationComponent?.filter(
    s => s.criticality === 'critical'
  ).length || 0;

  const securityControls = entities.Principle?.length || 0;

  // Calculate EOL warnings
  const eolWarnings = useMemo(() => {
    const now = new Date();
    const technologies = [
      ...(entities.SystemSoftware || []),
      ...(entities.Node || []),
      ...(entities.Equipment || [])
    ];

    const warnings = [];
    technologies.forEach(tech => {
      const eolDate = tech.eol_date || tech.eolDate || tech.retirementDate;
      if (eolDate) {
        const eol = new Date(eolDate);
        const daysUntilEOL = Math.ceil((eol - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilEOL < 90 && daysUntilEOL >= 0) {
          warnings.push({
            entity: tech,
            daysUntilEOL,
            severity: daysUntilEOL < 30 ? 'critical' : 'warning'
          });
        } else if (daysUntilEOL < 0) {
          warnings.push({
            entity: tech,
            daysUntilEOL,
            severity: 'expired'
          });
        }
      }
    });

    return warnings.sort((a, b) => a.daysUntilEOL - b.daysUntilEOL);
  }, [entities]);

  // Calculate portfolio recommendations
  const portfolioAlerts = useMemo(() => {
    const applications = entities.ApplicationComponent || [];
    const alerts = [];

    applications.forEach(app => {
      const businessValue = app.business_value || app.businessValue || 5;
      const technicalHealth = app.technical_health || app.technicalHealth || 5;

      if (businessValue >= 7 && technicalHealth <= 3) {
        alerts.push({
          entity: app,
          type: 'migrate',
          message: 'Hög affärsnytta, låg teknisk hälsa - överväg modernisering'
        });
      } else if (businessValue <= 3 && technicalHealth <= 3) {
        alerts.push({
          entity: app,
          type: 'eliminate',
          message: 'Låg affärsnytta och dålig teknisk hälsa - överväg avveckling'
        });
      }
    });

    return alerts;
  }, [entities]);

  // Get recent activity (mock data - in real app this would come from audit log)
  const recentActivity = useMemo(() => {
    const allEntities = [];
    Object.entries(entities).forEach(([type, entitiesOfType]) => {
      if (Array.isArray(entitiesOfType)) {
        entitiesOfType.forEach(entity => {
          allEntities.push({
            ...entity,
            entityType: type
          });
        });
      }
    });

    // Sort by ID (newest first) and take top 5
    return allEntities
      .sort((a, b) => (b.id || '').localeCompare(a.id || ''))
      .slice(0, 5);
  }, [entities]);

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
          Välkommen till Enterprise Architecture Framework
        </h2>
        <p className="text-primary-100 text-lg">
          Visualisera och hantera din enterprise-arkitektur med ArchiMate 3.1
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

      {/* Alerts & Recommendations */}
      {(eolWarnings.length > 0 || portfolioAlerts.length > 0) && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Varningar & Rekommendationer
            </h3>
          </div>

          <div className="space-y-3">
            {/* EOL Warnings */}
            {eolWarnings.slice(0, 3).map((warning, idx) => (
              <Link
                key={`eol-${idx}`}
                to="/technology-lifecycle"
                className="flex items-start p-3 rounded-lg border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                <Clock className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${
                  warning.severity === 'expired' ? 'text-red-600' :
                  warning.severity === 'critical' ? 'text-orange-600' : 'text-yellow-600'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">
                    {warning.entity.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {warning.severity === 'expired' 
                      ? `EOL passerat (${Math.abs(warning.daysUntilEOL)} dagar sedan)`
                      : `EOL om ${warning.daysUntilEOL} dagar`
                    }
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </Link>
            ))}

            {/* Portfolio Alerts */}
            {portfolioAlerts.slice(0, 3).map((alert, idx) => (
              <Link
                key={`portfolio-${idx}`}
                to="/application-portfolio"
                className={`flex items-start p-3 rounded-lg border transition-colors ${
                  alert.type === 'eliminate' 
                    ? 'border-red-200 bg-red-50 hover:bg-red-100'
                    : 'border-amber-200 bg-amber-50 hover:bg-amber-100'
                }`}
              >
                <TrendingUp className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${
                  alert.type === 'eliminate' ? 'text-red-600' : 'text-amber-600'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">
                    {alert.entity.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {alert.message}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </Link>
            ))}

            {(eolWarnings.length > 3 || portfolioAlerts.length > 3) && (
              <div className="text-center pt-2">
                <Link 
                  to="/heatmaps"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Visa alla rekommendationer →
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Two Column Layout: Recent Activity + Architecture Layers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="h-6 w-6 text-primary-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Senaste aktivitet
                </h3>
              </div>
              <Link 
                to="/entities"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Visa alla
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((entity, idx) => (
              <Link
                key={`activity-${idx}`}
                to={`/entities/${entity.entityType}/${entity.id}`}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {entity.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {entity.entityType}
                  </p>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              </Link>
            ))}
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
          <div className="grid grid-cols-1 gap-3">
            {metamodel.layers && metamodel.layers.slice(0, 6).map((layer) => {
              const layerEntityTypes = getEntityTypesForLayer(layer.id || layer.name.toLowerCase());
              const layerEntities = layerEntityTypes.reduce(
                (sum, type) => sum + (entities[type]?.length || 0),
                0
              );
              
              return (
                <Link
                  key={layer.name}
                  to={`/perspectives/${layer.id || layer.name.toLowerCase()}`}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: layer.color + '40' }}
                    >
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: layer.color }}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{layer.name}</h4>
                      <p className="text-xs text-gray-600">
                        {layerEntityTypes.length} entitetstyper
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-900 mr-2">
                      {layerEntities}
                    </span>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {/* Quick Actions - More Action Oriented */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Vad vill du göra idag?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/impact-analysis"
            className="group flex flex-col p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <TrendingUp className="h-8 w-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-gray-900 mb-1">Analysera påverkan</div>
            <div className="text-sm text-gray-600">Se hur ändringar påverkar systemet</div>
          </Link>
          <Link
            to="/application-portfolio"
            className="group flex flex-col p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <BarChart3 className="h-8 w-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-gray-900 mb-1">Utvärdera portfolio</div>
            <div className="text-sm text-gray-600">Identifiera investeringsbehov</div>
          </Link>
          <Link
            to="/visualizer"
            className="group flex flex-col p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <Network className="h-8 w-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-gray-900 mb-1">Visualisera arkitektur</div>
            <div className="text-sm text-gray-600">Utforska system och relationer</div>
          </Link>
          <Link
            to="/entities"
            className="group flex flex-col p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-colors"
          >
            <Database className="h-8 w-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-medium text-gray-900 mb-1">Hantera data</div>
            <div className="text-sm text-gray-600">Lägg till eller redigera entiteter</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
