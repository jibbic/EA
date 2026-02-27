import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Calendar, Filter, Download, ArrowRight, Circle, AlertCircle } from 'lucide-react';

const Roadmap = () => {
  const { getAllEntities, metamodel, resetData } = useData();
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [selectedEntityTypes, setSelectedEntityTypes] = useState([]);
  const [timelineView, setTimelineView] = useState('year'); // 'year', 'quarter', 'month'
  const [selectedYear, setSelectedYear] = useState(2024); // Start at 2024 to show more data

  // Lifecycle phases with colors
  const lifecyclePhases = {
    'planned': { label: 'Planerad', color: '#93C5FD', icon: Circle },
    'development': { label: 'Under utveckling', color: '#FDE047', icon: Circle },
    'production': { label: 'I produktion', color: '#86EFAC', icon: Circle },
    'maintenance': { label: 'Underhåll', color: '#A5B4FC', icon: Circle },
    'phaseout': { label: 'Utfasning', color: '#FCA5A5', icon: Circle },
    'retired': { label: 'Avvecklad', color: '#D1D5DB', icon: Circle }
  };

  // Generate timeline periods based on view
  const getTimelinePeriods = () => {
    const year = selectedYear;
    if (timelineView === 'year') {
      return [
        { id: year - 1, label: `${year - 1}`, start: new Date(year - 1, 0, 1), end: new Date(year - 1, 11, 31) },
        { id: year, label: `${year}`, start: new Date(year, 0, 1), end: new Date(year, 11, 31) },
        { id: year + 1, label: `${year + 1}`, start: new Date(year + 1, 0, 1), end: new Date(year + 1, 11, 31) },
        { id: year + 2, label: `${year + 2}`, start: new Date(year + 2, 0, 1), end: new Date(year + 2, 11, 31) },
        { id: year + 3, label: `${year + 3}`, start: new Date(year + 3, 0, 1), end: new Date(year + 3, 11, 31) }
      ];
    } else if (timelineView === 'quarter') {
      const quarters = [];
      for (let q = 0; q < 4; q++) {
        const start = new Date(year, q * 3, 1);
        const end = new Date(year, (q + 1) * 3, 0);
        quarters.push({
          id: `${year}-Q${q + 1}`,
          label: `Q${q + 1} ${year}`,
          start,
          end
        });
      }
      return quarters;
    } else {
      const months = [];
      for (let m = 0; m < 12; m++) {
        const start = new Date(year, m, 1);
        const end = new Date(year, m + 1, 0);
        months.push({
          id: `${year}-${m + 1}`,
          label: new Date(year, m).toLocaleDateString('sv-SE', { month: 'short' }),
          start,
          end
        });
      }
      return months;
    }
  };

  const periods = getTimelinePeriods();

  // Get entities with lifecycle data
  const entitiesWithLifecycle = useMemo(() => {
    const allEntities = getAllEntities();
    
    const entitiesWithData = allEntities.filter(entity => {
      // Filter by layer
      if (selectedLayer !== 'all') {
        const layer = metamodel.layers.find(l => l.entityTypes.includes(entity.entityType));
        if (layer?.name !== selectedLayer) return false;
      }

      // Filter by entity type
      if (selectedEntityTypes.length > 0 && !selectedEntityTypes.includes(entity.entityType)) {
        return false;
      }

      // Only show entities with lifecycle data
      return entity.lifecyclePhase || entity.plannedDate || entity.productionDate || entity.retirementDate;
    });
    
    return entitiesWithData;
  }, [getAllEntities, selectedLayer, selectedEntityTypes, metamodel]);

  // Group entities by type
  const groupedEntities = useMemo(() => {
    const groups = {};
    entitiesWithLifecycle.forEach(entity => {
      if (!groups[entity.entityType]) {
        groups[entity.entityType] = [];
      }
      groups[entity.entityType].push(entity);
    });
    return groups;
  }, [entitiesWithLifecycle]);

  // Calculate position on timeline
  const getTimelinePosition = (date, startDate, endDate) => {
    if (!date) return null;
    const d = new Date(date);
    const start = startDate.getTime();
    const end = endDate.getTime();
    const target = d.getTime();

    // Allow dates outside the range but clamp them to 0-100%
    const percentage = ((target - start) / (end - start)) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  // Export to CSV
  const handleExport = () => {
    const csv = [
      ['Entity', 'Type', 'Lifecycle Phase', 'Planned Date', 'Production Date', 'Retirement Date'].join(','),
      ...entitiesWithLifecycle.map(e => [
        e.name,
        e.entityType,
        e.lifecyclePhase || 'N/A',
        e.plannedDate || 'N/A',
        e.productionDate || 'N/A',
        e.retirementDate || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `roadmap-${selectedYear}.csv`;
    link.click();
  };

  const timelineStart = periods[0].start;
  const timelineEnd = periods[periods.length - 1].end;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Livscykel Roadmap</h2>
            <p className="text-gray-600 mt-1">
              Visualisera entiteters livscykel över tid
            </p>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Download className="h-5 w-5 mr-2" />
            Exportera
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Alla skikt</option>
            {metamodel.layers.map((layer) => (
              <option key={layer.name} value={layer.name}>
                {layer.name}
              </option>
            ))}
          </select>

          <select
            value={timelineView}
            onChange={(e) => setTimelineView(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="year">Årsvy</option>
            <option value="quarter">Kvartalsvy</option>
            <option value="month">Månadsvy</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {Array.from({ length: 16 }, (_, i) => 2020 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Livscykelfaser</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(lifecyclePhases).map(([key, phase]) => (
            <div key={key} className="flex items-center">
              <div
                className="w-6 h-6 rounded mr-2"
                style={{ backgroundColor: phase.color }}
              />
              <span className="text-sm text-gray-700">{phase.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px] p-6">
            {/* Timeline Header */}
            <div className="flex mb-6">
              <div className="w-64 flex-shrink-0">
                <h3 className="text-sm font-semibold text-gray-900">Entitet</h3>
              </div>
              <div className="flex-1 flex">
                {periods.map((period) => (
                  <div key={period.id} className="flex-1 border-l border-gray-200 px-2">
                    <span className="text-xs font-medium text-gray-600">{period.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Rows */}
            <div className="space-y-6">
              {Object.entries(groupedEntities).length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Inga entiteter med livscykeldata att visa
                  </p>
                  <p className="text-gray-600 mb-4">
                    Dina nuvarande entiteter saknar livscykelfält (lifecyclePhase, plannedDate, productionDate, retirementDate)
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto mb-4">
                    <p className="text-sm text-blue-900 font-medium mb-2">Lösning:</p>
                    <p className="text-sm text-blue-800 mb-3">
                      Återställ data för att läsa in exempeldata med livscykelinformation.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => {
                          if (confirm('Detta kommer återställa alla entiteter och relationer till exempeldata. Är du säker?')) {
                            resetData();
                            window.location.reload();
                          }
                        }}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                      >
                        Återställ data nu
                      </button>
                      <Link
                        to="/settings"
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Gå till Inställningar
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Eller lägg till livscykelfält manuellt på dina befintliga entiteter
                  </p>
                </div>
              ) : (
                Object.entries(groupedEntities).map(([entityType, entities]) => (
                  <div key={entityType} className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">{entityType}</h4>
                    {entities.map((entity) => {
                      const phase = lifecyclePhases[entity.lifecyclePhase] || lifecyclePhases['production'];
                      
                      return (
                        <div key={entity.id} className="flex items-center group hover:bg-gray-50 rounded transition-colors">
                          <div className="w-64 flex-shrink-0 pr-4">
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: phase.color }}
                              />
                              <span className="text-sm text-gray-900 truncate" title={entity.name}>
                                {entity.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 relative h-8">
                            {/* Timeline background */}
                            <div className="absolute inset-0 flex">
                              {periods.map((period, idx) => (
                                <div
                                  key={period.id}
                                  className={`flex-1 border-l border-gray-200 ${
                                    idx === 0 ? '' : ''
                                  }`}
                                />
                              ))}
                            </div>

                            {/* Lifecycle bar with phase segments */}
                            {entity.plannedDate && entity.retirementDate && (
                              (() => {
                                const planDate = new Date(entity.plannedDate);
                                const retDate = new Date(entity.retirementDate);
                                const prodDate = entity.productionDate ? new Date(entity.productionDate) : null;
                                
                                const totalStart = getTimelinePosition(entity.plannedDate, timelineStart, timelineEnd);
                                const totalEnd = getTimelinePosition(entity.retirementDate, timelineStart, timelineEnd);
                                
                                if (totalStart === null || totalEnd === null || totalEnd <= totalStart) {
                                  return null;
                                }
                                
                                // Calculate phase segments
                                const segments = [];
                                
                                if (prodDate && prodDate > planDate && prodDate < retDate) {
                                  // Has both planning and production phases
                                  const prodPos = getTimelinePosition(entity.productionDate, timelineStart, timelineEnd);
                                  
                                  // Planning phase (blue)
                                  if (prodPos > totalStart) {
                                    segments.push({
                                      left: totalStart,
                                      width: prodPos - totalStart,
                                      color: lifecyclePhases['planned'].color,
                                      label: 'Planerad'
                                    });
                                  }
                                  
                                  // Production/Maintenance phase (green or purple)
                                  const prodColor = entity.lifecyclePhase === 'maintenance' 
                                    ? lifecyclePhases['maintenance'].color 
                                    : lifecyclePhases['production'].color;
                                  
                                  if (totalEnd > prodPos) {
                                    segments.push({
                                      left: prodPos,
                                      width: totalEnd - prodPos,
                                      color: prodColor,
                                      label: entity.lifecyclePhase === 'maintenance' ? 'Underhåll' : 'Produktion'
                                    });
                                  }
                                } else {
                                  // Single phase across entire timeline
                                  const phaseColor = entity.lifecyclePhase 
                                    ? lifecyclePhases[entity.lifecyclePhase]?.color || lifecyclePhases['production'].color
                                    : lifecyclePhases['production'].color;
                                  
                                  segments.push({
                                    left: totalStart,
                                    width: totalEnd - totalStart,
                                    color: phaseColor,
                                    label: lifecyclePhases[entity.lifecyclePhase]?.label || 'Produktion'
                                  });
                                }
                                
                                // If in phaseout, color the last 25% red
                                if (entity.lifecyclePhase === 'phaseout' && segments.length > 0) {
                                  const lastSegment = segments[segments.length - 1];
                                  const phaseoutStart = lastSegment.left + (lastSegment.width * 0.75);
                                  const phaseoutWidth = lastSegment.width * 0.25;
                                  
                                  // Adjust last segment
                                  lastSegment.width = lastSegment.width * 0.75;
                                  
                                  // Add phaseout segment
                                  segments.push({
                                    left: phaseoutStart,
                                    width: phaseoutWidth,
                                    color: lifecyclePhases['phaseout'].color,
                                    label: 'Utfasning'
                                  });
                                }
                                
                                return (
                                  <div className="absolute inset-0 top-1 h-6">
                                    {segments.map((segment, idx) => (
                                      <div
                                        key={idx}
                                        className="absolute h-6 group-hover:opacity-90 transition-opacity shadow-sm"
                                        style={{
                                          left: `${segment.left}%`,
                                          width: `${segment.width}%`,
                                          backgroundColor: segment.color,
                                          borderTopLeftRadius: idx === 0 ? '4px' : '0',
                                          borderBottomLeftRadius: idx === 0 ? '4px' : '0',
                                          borderTopRightRadius: idx === segments.length - 1 ? '4px' : '0',
                                          borderBottomRightRadius: idx === segments.length - 1 ? '4px' : '0',
                                          minWidth: '2px',
                                          borderRight: idx === segments.length - 1 ? 'none' : '2px solid white'
                                        }}
                                        title={`${entity.name} - ${segment.label}: ${entity.plannedDate} → ${entity.retirementDate}`}
                                      />
                                    ))}
                                  </div>
                                );
                              })()
                            )}

                            {/* Single date indicators */}
                            {!entity.retirementDate && entity.plannedDate && (() => {
                              const pos = getTimelinePosition(entity.plannedDate, timelineStart, timelineEnd);
                              if (pos !== null) {
                                return (
                                  <div
                                    className="absolute top-1 h-6 w-2 rounded"
                                    style={{
                                      left: `${pos}%`,
                                      backgroundColor: phase.color
                                    }}
                                    title={`Planned: ${entity.plannedDate}`}
                                  />
                                );
                              }
                              return null;
                            })()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Information</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Staplarna är segmenterade med olika färger som visar livscykelfaser över tid</li>
          <li>• <strong>Blå</strong> = Planerad fas (från plannedDate till productionDate)</li>
          <li>• <strong>Grön</strong> = Produktionsfas, <strong>Lila</strong> = Underhållsfas</li>
          <li>• <strong>Röd</strong> = Utfasning (visas automatiskt för de i phaseout-fas)</li>
          <li>• Hovra över en stapel för att se detaljerad information</li>
          <li>• Exportera till CSV för användning i andra verktyg</li>
        </ul>
      </div>
    </div>
  );
};

export default Roadmap;
