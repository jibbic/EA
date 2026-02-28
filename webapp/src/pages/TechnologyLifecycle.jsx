import { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { AlertTriangle, CheckCircle, Clock, XCircle, Calendar, TrendingDown } from 'lucide-react';

const TechnologyLifecycle = () => {
  const { entities } = useData();

  const technologies = useMemo(() => {
    const systemSoftware = entities.SystemSoftware || [];
    const nodes = entities.Node || [];
    const equipment = entities.Equipment || [];
    
    const allTech = [...systemSoftware, ...nodes, ...equipment];
    
    const now = new Date();
    
    return allTech.map(tech => {
      const eolDate = tech.eol_date || tech.eolDate || tech.retirementDate;
      const version = tech.version || 'N/A';
      const vendor = tech.vendor || tech.manufacturer || 'Unknown';
      
      let lifecycleStatus = 'active';
      let daysUntilEOL = null;
      let severity = 'ok';
      
      if (eolDate) {
        const eol = new Date(eolDate);
        daysUntilEOL = Math.ceil((eol - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilEOL < 0) {
          lifecycleStatus = 'eol';
          severity = 'critical';
        } else if (daysUntilEOL < 90) {
          lifecycleStatus = 'critical';
          severity = 'critical';
        } else if (daysUntilEOL < 180) {
          lifecycleStatus = 'warning';
          severity = 'warning';
        } else if (daysUntilEOL < 365) {
          lifecycleStatus = 'attention';
          severity = 'attention';
        }
      }
      
      return {
        ...tech,
        version,
        vendor,
        eolDate,
        daysUntilEOL,
        lifecycleStatus,
        severity,
        entityType: tech.entityType
      };
    });
  }, [entities]);

  const stats = useMemo(() => {
    const statuses = {
      eol: technologies.filter(t => t.lifecycleStatus === 'eol').length,
      critical: technologies.filter(t => t.lifecycleStatus === 'critical').length,
      warning: technologies.filter(t => t.lifecycleStatus === 'warning').length,
      attention: technologies.filter(t => t.lifecycleStatus === 'attention').length,
      active: technologies.filter(t => t.lifecycleStatus === 'active').length
    };
    
    return {
      total: technologies.length,
      ...statuses,
      needsAttention: statuses.eol + statuses.critical + statuses.warning
    };
  }, [technologies]);

  const statusConfig = {
    eol: {
      label: 'End of Life',
      color: '#DC2626',
      bgColor: '#FEE2E2',
      icon: XCircle,
      description: 'Teknologin har passerat EOL-datum'
    },
    critical: {
      label: 'Kritisk (<90 dagar)',
      color: '#EA580C',
      bgColor: '#FFEDD5',
      icon: AlertTriangle,
      description: 'EOL inom 90 dagar'
    },
    warning: {
      label: 'Varning (90-180 dagar)',
      color: '#F59E0B',
      bgColor: '#FEF3C7',
      icon: Clock,
      description: 'EOL inom 6 månader'
    },
    attention: {
      label: 'Uppmärksamhet (6-12 mån)',
      color: '#3B82F6',
      bgColor: '#DBEAFE',
      icon: Calendar,
      description: 'EOL inom 12 månader'
    },
    active: {
      label: 'Aktiv',
      color: '#10B981',
      bgColor: '#D1FAE5',
      icon: CheckCircle,
      description: 'Ingen känd EOL eller >12 månader kvar'
    }
  };

  const groupedByStatus = useMemo(() => {
    const groups = {
      eol: [],
      critical: [],
      warning: [],
      attention: [],
      active: []
    };
    
    technologies.forEach(tech => {
      groups[tech.lifecycleStatus].push(tech);
    });
    
    // Sort by days until EOL (closest first)
    Object.keys(groups).forEach(status => {
      if (status !== 'active') {
        groups[status].sort((a, b) => {
          if (a.daysUntilEOL === null) return 1;
          if (b.daysUntilEOL === null) return -1;
          return a.daysUntilEOL - b.daysUntilEOL;
        });
      }
    });
    
    return groups;
  }, [technologies]);

  const getTechnologyTypeColor = (type) => {
    const colors = {
      SystemSoftware: '#8B5CF6',
      Node: '#3B82F6',
      Equipment: '#10B981'
    };
    return colors[type] || '#6B7280';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE');
  };

  const formatDaysUntilEOL = (days) => {
    if (days === null) return null;
    if (days < 0) return `${Math.abs(days)} dagar sedan`;
    if (days === 0) return 'Idag';
    if (days < 30) return `${days} dagar`;
    if (days < 365) return `${Math.floor(days / 30)} månader`;
    return `${Math.floor(days / 365)} år`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Technology Lifecycle Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Översikt över teknologier och deras livscykelstatus - identifiera EOL-risker proaktivt
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Totalt</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">teknologier</p>
        </div>
        
        <div className="bg-red-50 rounded-lg shadow p-4 border-l-4 border-red-500">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-900 font-medium">EOL</p>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.eol}</p>
          <p className="text-xs text-red-700 mt-1">passerat EOL</p>
        </div>

        <div className="bg-orange-50 rounded-lg shadow p-4 border-l-4 border-orange-500">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            <p className="text-sm text-orange-900 font-medium">Kritisk</p>
          </div>
          <p className="text-2xl font-bold text-orange-600 mt-1">{stats.critical}</p>
          <p className="text-xs text-orange-700 mt-1">{'<90 dagar'}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg shadow p-4 border-l-4 border-yellow-500">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-600" />
            <p className="text-sm text-yellow-900 font-medium">Varning</p>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.warning}</p>
          <p className="text-xs text-yellow-700 mt-1">90-180 dagar</p>
        </div>

        <div className="bg-blue-50 rounded-lg shadow p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <p className="text-sm text-blue-900 font-medium">Planera</p>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.attention}</p>
          <p className="text-xs text-blue-700 mt-1">6-12 månader</p>
        </div>

        <div className="bg-green-50 rounded-lg shadow p-4 border-l-4 border-green-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm text-green-900 font-medium">Aktiv</p>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
          <p className="text-xs text-green-700 mt-1">{'>12 månader'}</p>
        </div>
      </div>

      {/* Alert Banner if critical items exist */}
      {stats.needsAttention > 0 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-orange-900">
                {stats.needsAttention} teknologier kräver uppmärksamhet
              </h4>
              <p className="text-orange-700 mt-1">
                {stats.eol > 0 && `${stats.eol} har passerat EOL. `}
                {stats.critical > 0 && `${stats.critical} når EOL inom 90 dagar. `}
                {stats.warning > 0 && `${stats.warning} når EOL inom 6 månader. `}
                Planera uppgraderingar eller ersättningar för att undvika säkerhetsrisker och supportproblem.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Technology Lists by Status */}
      <div className="space-y-6">
        {Object.entries(statusConfig).map(([statusKey, config]) => {
          const techList = groupedByStatus[statusKey];
          const Icon = config.icon;
          
          if (techList.length === 0) return null;
          
          return (
            <div key={statusKey} className="bg-white rounded-lg shadow">
              <div 
                className="p-6 border-b border-gray-200"
                style={{ backgroundColor: config.bgColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6" style={{ color: config.color }} />
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: config.color }}>
                        {config.label} ({techList.length})
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5">{config.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {techList.map((tech) => (
                  <div key={tech.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900 truncate">{tech.name}</h4>
                          <span
                            className="px-2 py-0.5 text-xs font-medium rounded flex-shrink-0"
                            style={{
                              backgroundColor: getTechnologyTypeColor(tech.entityType) + '20',
                              color: getTechnologyTypeColor(tech.entityType)
                            }}
                          >
                            {tech.entityType}
                          </span>
                          {tech.criticality && (
                            <span
                              className={`px-2 py-0.5 text-xs font-medium rounded flex-shrink-0 ${
                                tech.criticality === 'critical'
                                  ? 'bg-red-100 text-red-700'
                                  : tech.criticality === 'high'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {tech.criticality}
                            </span>
                          )}
                        </div>
                        
                        {tech.description && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{tech.description}</p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>
                            <strong className="text-gray-700">Leverantör:</strong> {tech.vendor}
                          </span>
                          <span>
                            <strong className="text-gray-700">Version:</strong> {tech.version}
                          </span>
                          {tech.eolDate && (
                            <>
                              <span>
                                <strong className="text-gray-700">EOL:</strong> {formatDate(tech.eolDate)}
                              </span>
                              {tech.daysUntilEOL !== null && (
                                <span
                                  className="font-medium"
                                  style={{ color: config.color }}
                                >
                                  {formatDaysUntilEOL(tech.daysUntilEOL)}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {statusKey !== 'active' && tech.daysUntilEOL !== null && (
                        <div className="flex-shrink-0 text-right">
                          <div
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg"
                            style={{
                              backgroundColor: config.bgColor,
                              color: config.color
                            }}
                          >
                            <TrendingDown className="w-4 h-4" />
                            <div>
                              <div className="text-xs font-medium">
                                {tech.daysUntilEOL < 0 ? 'Förfallen' : 'Återstår'}
                              </div>
                              <div className="text-lg font-bold">
                                {Math.abs(tech.daysUntilEOL)}
                              </div>
                              <div className="text-xs">dagar</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Så fungerar lifecykel-hantering</h4>
            <div className="space-y-2 text-blue-800 text-sm">
              <p>
                Dashboard:en visar teknologier (SystemSoftware, Node, Equipment) och deras End of Life (EOL) status.
              </p>
              <p>
                <strong>Tips:</strong> Lägg till attributet 'eol_date' eller 'retirementDate' (format: YYYY-MM-DD) 
                på dina teknologier för att få automatiska varningar och livscykelstatus.
              </p>
              <p>
                <strong>Best practice:</strong> Planera uppgraderingar minst 6 månader innan EOL för att säkerställa 
                säker migration och undvika osäkra system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyLifecycle;
