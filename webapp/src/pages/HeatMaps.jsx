import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Flame, DollarSign, AlertTriangle, TrendingUp, Filter } from 'lucide-react';

const HeatMaps = () => {
  const { entities, metamodel } = useData();
  const [selectedMetric, setSelectedMetric] = useState('cost');
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'layer'

  const metrics = {
    cost: {
      label: 'Kostnad',
      icon: DollarSign,
      getValue: (entity) => entity.cost_per_year || entity.costPerYear || entity.cost || 0,
      format: (value) => `${Math.round(value).toLocaleString('sv-SE')} kr/år`,
      color: 'blue'
    },
    risk: {
      label: 'Risk',
      icon: AlertTriangle,
      getValue: (entity) => {
        const riskMap = { low: 1, medium: 5, high: 8, critical: 10 };
        return riskMap[entity.risk?.toLowerCase()] || riskMap[entity.riskLevel?.toLowerCase()] || 0;
      },
      format: (value) => {
        if (value === 0) return 'Ingen';
        if (value <= 2) return 'Låg';
        if (value <= 6) return 'Medel';
        if (value <= 9) return 'Hög';
        return 'Kritisk';
      },
      color: 'red'
    },
    complexity: {
      label: 'Komplexitet',
      icon: TrendingUp,
      getValue: (entity) => {
        const complexityMap = { low: 1, medium: 5, high: 8, very_high: 10 };
        return complexityMap[entity.complexity?.toLowerCase()] || 
               complexityMap[entity.complexityLevel?.toLowerCase()] || 
               0;
      },
      format: (value) => {
        if (value === 0) return 'Ingen';
        if (value <= 2) return 'Låg';
        if (value <= 6) return 'Medel';
        if (value <= 9) return 'Hög';
        return 'Mycket hög';
      },
      color: 'purple'
    },
    technical_health: {
      label: 'Teknisk hälsa',
      icon: Flame,
      getValue: (entity) => {
        // Invert so lower health = higher heat (red)
        const health = entity.technical_health || entity.technicalHealth || 5;
        return 10 - health; // Convert to heat scale
      },
      format: (value) => {
        const health = 10 - value;
        if (health >= 8) return 'Utmärkt';
        if (health >= 6) return 'Bra';
        if (health >= 4) return 'Godkänt';
        if (health >= 2) return 'Dålig';
        return 'Kritisk';
      },
      color: 'orange'
    }
  };

  const layers = useMemo(() => {
    if (!metamodel?.layers) return [];
    return [
      { id: 'all', name: 'Alla lager' },
      ...Object.entries(metamodel.layers).map(([id, layer]) => ({
        id,
        name: layer.name,
        color: layer.color
      }))
    ];
  }, [metamodel]);

  const allEntities = useMemo(() => {
    const result = [];
    Object.entries(entities).forEach(([type, entitiesOfType]) => {
      if (Array.isArray(entitiesOfType)) {
        entitiesOfType.forEach(entity => {
          result.push({
            ...entity,
            entityType: type
          });
        });
      }
    });
    return result;
  }, [entities]);

  const filteredEntities = useMemo(() => {
    if (selectedLayer === 'all') return allEntities;
    
    const layerTypes = metamodel?.layers?.[selectedLayer]?.types || [];
    return allEntities.filter(entity => layerTypes.includes(entity.entityType));
  }, [allEntities, selectedLayer, metamodel]);

  const heatData = useMemo(() => {
    const metric = metrics[selectedMetric];
    
    const data = filteredEntities.map(entity => {
      const value = metric.getValue(entity);
      return {
        ...entity,
        metricValue: value
      };
    });

    // Sort by value descending
    data.sort((a, b) => b.metricValue - a.metricValue);

    // Calculate stats
    const values = data.map(d => d.metricValue).filter(v => v > 0);
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;

    return {
      entities: data,
      stats: {
        max,
        min,
        avg,
        total: data.length,
        withData: values.length
      }
    };
  }, [filteredEntities, selectedMetric]);

  const getHeatColor = (value, max) => {
    if (value === 0 || max === 0) return 'rgb(243, 244, 246)'; // gray-100
    
    const intensity = Math.min(value / max, 1);
    
    // Color gradient: green (0) -> yellow (0.4) -> orange (0.7) -> red (1.0)
    if (intensity < 0.4) {
      // Green to Yellow
      const t = intensity / 0.4;
      const r = Math.round(34 + (234 - 34) * t);
      const g = Math.round(197 + (179 - 197) * t);
      const b = Math.round(94 + (0 - 94) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else if (intensity < 0.7) {
      // Yellow to Orange
      const t = (intensity - 0.4) / 0.3;
      const r = Math.round(234 + (249 - 234) * t);
      const g = Math.round(179 + (115 - 179) * t);
      const b = Math.round(0 + (22 - 0) * t);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Orange to Red
      const t = (intensity - 0.7) / 0.3;
      const r = Math.round(249 + (220 - 249) * t);
      const g = Math.round(115 + (38 - 115) * t);
      const b = Math.round(22 + (38 - 22) * t);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  const getTextColor = (value, max) => {
    if (value === 0 || max === 0) return '#6B7280';
    const intensity = Math.min(value / max, 1);
    return intensity > 0.5 ? '#FFFFFF' : '#1F2937';
  };

  const groupedByLayer = useMemo(() => {
    if (viewMode !== 'layer') return null;
    
    const groups = {};
    heatData.entities.forEach(entity => {
      let layerKey = 'other';
      
      // Find which layer this entity type belongs to
      Object.entries(metamodel?.layers || {}).forEach(([layerId, layer]) => {
        if (layer.types.includes(entity.entityType)) {
          layerKey = layerId;
        }
      });
      
      if (!groups[layerKey]) {
        groups[layerKey] = {
          layerId: layerKey,
          layerName: metamodel?.layers?.[layerKey]?.name || 'Övrigt',
          color: metamodel?.layers?.[layerKey]?.color || '#6B7280',
          entities: []
        };
      }
      
      groups[layerKey].entities.push(entity);
    });
    
    return Object.values(groups);
  }, [heatData, viewMode, metamodel]);

  const MetricIcon = metrics[selectedMetric].icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Flame className="w-8 h-8 text-orange-500" />
          Heat Maps
        </h1>
        <p className="mt-2 text-gray-600">
          Visualisera kostnad, risk, komplexitet och teknisk hälsa över arkitekturen
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filter och visningsläge</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Metric Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mätvärde</label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.entries(metrics).map(([key, metric]) => (
                <option key={key} value={key}>{metric.label}</option>
              ))}
            </select>
          </div>

          {/* Layer Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lager</label>
            <select
              value={selectedLayer}
              onChange={(e) => setSelectedLayer(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {layers.map(layer => (
                <option key={layer.id} value={layer.id}>{layer.name}</option>
              ))}
            </select>
          </div>

          {/* View Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vy</label>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="grid">Rutnät (alla)</option>
              <option value="layer">Grupperat per lager</option>
            </select>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Totalt</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{heatData.stats.total}</p>
          <p className="text-xs text-gray-500 mt-1">entiteter</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Med data</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{heatData.stats.withData}</p>
          <p className="text-xs text-gray-500 mt-1">
            {Math.round((heatData.stats.withData / heatData.stats.total) * 100)}% täckning
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Högsta värde</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {heatData.stats.max > 0 ? metrics[selectedMetric].format(heatData.stats.max) : 'N/A'}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Medelvärde</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {heatData.stats.avg > 0 ? metrics[selectedMetric].format(heatData.stats.avg) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Heat Map Grid View */}
      {viewMode === 'grid' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <MetricIcon className="w-6 h-6 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              {metrics[selectedMetric].label} - Heat Map
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {heatData.entities.map((entity) => {
              const bgColor = getHeatColor(entity.metricValue, heatData.stats.max);
              const textColor = getTextColor(entity.metricValue, heatData.stats.max);
              
              return (
                <div
                  key={entity.id}
                  className="p-3 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                  style={{ backgroundColor: bgColor, color: textColor }}
                  title={`${entity.name}\n${metrics[selectedMetric].label}: ${metrics[selectedMetric].format(entity.metricValue)}\nTyp: ${entity.entityType}`}
                >
                  <div className="text-xs font-medium mb-1 truncate">
                    {entity.name}
                  </div>
                  <div className="text-xs opacity-90 truncate">
                    {entity.entityType}
                  </div>
                  <div className="text-sm font-bold mt-1">
                    {entity.metricValue > 0 ? metrics[selectedMetric].format(entity.metricValue) : '-'}
                  </div>
                </div>
              );
            })}
          </div>

          {heatData.entities.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Flame className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Inga entiteter hittades med valda filter</p>
            </div>
          )}
        </div>
      )}

      {/* Heat Map Layer View */}
      {viewMode === 'layer' && groupedByLayer && (
        <div className="space-y-4">
          {groupedByLayer.map((group) => (
            <div key={group.layerId} className="bg-white rounded-lg shadow">
              <div
                className="p-4"
                style={{ backgroundColor: group.color + '20', borderLeft: `4px solid ${group.color}` }}
              >
                <h3 className="text-lg font-semibold" style={{ color: group.color }}>
                  {group.layerName} ({group.entities.length})
                </h3>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                  {group.entities.map((entity) => {
                    const bgColor = getHeatColor(entity.metricValue, heatData.stats.max);
                    const textColor = getTextColor(entity.metricValue, heatData.stats.max);
                    
                    return (
                      <div
                        key={entity.id}
                        className="p-3 rounded-lg transition-transform hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: bgColor, color: textColor }}
                        title={`${entity.name}\n${metrics[selectedMetric].label}: ${metrics[selectedMetric].format(entity.metricValue)}\nTyp: ${entity.entityType}`}
                      >
                        <div className="text-xs font-medium mb-1 truncate">
                          {entity.name}
                        </div>
                        <div className="text-xs opacity-90 truncate">
                          {entity.entityType}
                        </div>
                        <div className="text-sm font-bold mt-1">
                          {entity.metricValue > 0 ? metrics[selectedMetric].format(entity.metricValue) : '-'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Färgskala</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Låg</span>
          <div className="flex-1 h-8 rounded-lg" style={{
            background: 'linear-gradient(to right, #22C55E, #EAB300, #F97316, #DC2626)'
          }}></div>
          <span className="text-sm text-gray-600">Hög</span>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          Mörkare färg indikerar högre värde för valt mätvärde. Grå = ingen data tillgänglig.
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Flame className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Använd heat maps för att:</h4>
            <ul className="space-y-1 text-blue-800 text-sm list-disc list-inside">
              <li>Identifiera högkostnadssystem som kan optimeras</li>
              <li>Visualisera risker över hela arkitekturen</li>
              <li>Hitta komplex systemlandskap som behöver förenklas</li>
              <li>Upptäcka komponenter med dålig teknisk hälsa</li>
            </ul>
            <p className="mt-3 text-sm text-blue-700">
              <strong>Tips:</strong> Lägg till attribut som 'cost_per_year', 'risk', 'complexity', och 'technical_health' 
              på dina entiteter för att få mest ut av heat maps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMaps;
