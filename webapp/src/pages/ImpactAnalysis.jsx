import { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, AlertTriangle, ArrowRight, ArrowLeft, Network } from 'lucide-react';

const ImpactAnalysis = () => {
  const { entities, relationships, getAllEntities, metamodel } = useData();
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [impactData, setImpactData] = useState(null);

  const allEntities = getAllEntities();

  // Recursive function to find all downstream dependencies
  const findDownstreamDependencies = (entityId, visited = new Set(), depth = 0, maxDepth = 5) => {
    if (visited.has(entityId) || depth > maxDepth) return [];
    visited.add(entityId);

    const directDependencies = relationships
      .filter(rel => rel.source === entityId)
      .map(rel => {
        const targetEntity = allEntities.find(e => e.id === rel.target);
        if (!targetEntity) return null;

        return {
          entity: targetEntity,
          relationship: rel,
          depth: depth,
          children: findDownstreamDependencies(rel.target, visited, depth + 1, maxDepth)
        };
      })
      .filter(Boolean);

    return directDependencies;
  };

  // Recursive function to find all upstream dependencies
  const findUpstreamDependencies = (entityId, visited = new Set(), depth = 0, maxDepth = 5) => {
    if (visited.has(entityId) || depth > maxDepth) return [];
    visited.add(entityId);

    const directDependencies = relationships
      .filter(rel => rel.target === entityId)
      .map(rel => {
        const sourceEntity = allEntities.find(e => e.id === rel.source);
        if (!sourceEntity) return null;

        return {
          entity: sourceEntity,
          relationship: rel,
          depth: depth,
          children: findUpstreamDependencies(rel.source, visited, depth + 1, maxDepth)
        };
      })
      .filter(Boolean);

    return directDependencies;
  };

  const analyzeImpact = (entity) => {
    setSelectedEntity(entity);
    
    const downstream = findDownstreamDependencies(entity.id);
    const upstream = findUpstreamDependencies(entity.id);

    // Flatten to count unique entities
    const flattenDependencies = (deps) => {
      const result = [];
      const flatten = (items) => {
        items.forEach(item => {
          result.push(item.entity);
          if (item.children && item.children.length > 0) {
            flatten(item.children);
          }
        });
      };
      flatten(deps);
      return [...new Map(result.map(e => [e.id, e])).values()];
    };

    const downstreamEntities = flattenDependencies(downstream);
    const upstreamEntities = flattenDependencies(upstream);

    // Calculate criticality score
    const criticalityScore = downstreamEntities.length * 2 + upstreamEntities.length;
    let criticalityLevel = 'Low';
    let criticalityColor = 'green';
    
    if (criticalityScore > 20) {
      criticalityLevel = 'Critical';
      criticalityColor = 'red';
    } else if (criticalityScore > 10) {
      criticalityLevel = 'High';
      criticalityColor = 'orange';
    } else if (criticalityScore > 5) {
      criticalityLevel = 'Medium';
      criticalityColor = 'yellow';
    }

    setImpactData({
      downstream,
      upstream,
      downstreamCount: downstreamEntities.length,
      upstreamCount: upstreamEntities.length,
      criticalityScore,
      criticalityLevel,
      criticalityColor,
      downstreamEntities,
      upstreamEntities
    });
  };

  const filteredEntities = allEntities.filter(entity =>
    entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entity.entityType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLayerColor = (entityType) => {
    const entityTypeDef = metamodel.entityTypes.find(et => et.id === entityType);
    if (!entityTypeDef) return '#999';
    const layer = metamodel.layers.find(l => l.id === entityTypeDef.layer);
    return layer?.color || '#999';
  };

  const renderDependencyTree = (dependencies, direction) => {
    if (!dependencies || dependencies.length === 0) {
      return (
        <p className="text-gray-500 text-sm italic">
          Inga {direction === 'downstream' ? 'nedströms' : 'uppströms'} beroenden
        </p>
      );
    }

    const renderNode = (node, index) => {
      const color = getLayerColor(node.entity.entityType);
      
      return (
        <div key={`${node.entity.id}-${index}`} className="ml-6 mt-2">
          <div className="flex items-start gap-2">
            <div className="flex-shrink-0 mt-1">
              {direction === 'downstream' ? (
                <ArrowRight className="w-4 h-4 text-gray-400" />
              ) : (
                <ArrowLeft className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 p-2 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">{node.entity.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: color + '20',
                        color: color
                      }}
                    >
                      {node.entity.entityType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    via {node.relationship.type}
                  </p>
                </div>
              </div>
              {node.children && node.children.length > 0 && (
                <div className="mt-1">
                  {node.children.map((child, idx) => renderNode(child, idx))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-1">
        {dependencies.map((dep, idx) => renderNode(dep, idx))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Impact Analysis</h1>
        <p className="mt-2 text-gray-600">
          Analysera påverkan av ändringar och identifiera kritiska beroenden
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sök efter entitet att analysera..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {searchTerm && (
          <div className="mt-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
            {filteredEntities.slice(0, 20).map(entity => {
              const color = getLayerColor(entity.entityType);
              return (
                <button
                  key={entity.id}
                  onClick={() => {
                    analyzeImpact(entity);
                    setSearchTerm('');
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-medium">{entity.name}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: color + '20',
                        color: color
                      }}
                    >
                      {entity.entityType}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Impact Analysis Results */}
      {selectedEntity && impactData && (
        <div className="space-y-6">
          {/* Selected Entity Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: getLayerColor(selectedEntity.entityType) + '20'
                  }}
                >
                  <Network className="w-8 h-8" style={{ color: getLayerColor(selectedEntity.entityType) }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEntity.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedEntity.entityType}</p>
                  {selectedEntity.description && (
                    <p className="text-sm text-gray-500 mt-2">{selectedEntity.description}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 text-${impactData.criticalityColor}-500`} />
                  <span className={`text-lg font-bold text-${impactData.criticalityColor}-600`}>
                    {impactData.criticalityLevel} Criticality
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Score: {impactData.criticalityScore}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Nedströms påverkan</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{impactData.downstreamCount}</p>
                  <p className="text-xs text-gray-500 mt-1">entiteter påverkas</p>
                </div>
                <ArrowRight className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Uppströms beroenden</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{impactData.upstreamCount}</p>
                  <p className="text-xs text-gray-500 mt-1">entiteter beror på</p>
                </div>
                <ArrowLeft className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total påverkan</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {impactData.downstreamCount + impactData.upstreamCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">totala relationer</p>
                </div>
                <Network className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Dependency Trees */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Downstream Dependencies */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Nedströms påverkan ({impactData.downstreamCount})
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Dessa entiteter påverkas om denna ändras eller tas bort
                </p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                {renderDependencyTree(impactData.downstream, 'downstream')}
              </div>
            </div>

            {/* Upstream Dependencies */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Uppströms beroenden ({impactData.upstreamCount})
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Dessa entiteter måste fungera för att denna ska fungera
                </p>
              </div>
              <div className="p-6 max-h-96 overflow-y-auto">
                {renderDependencyTree(impactData.upstream, 'upstream')}
              </div>
            </div>
          </div>

          {/* Warning Box */}
          {impactData.criticalityLevel === 'Critical' && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-lg font-semibold text-red-900">Kritisk komponent identifierad</h4>
                  <p className="text-red-700 mt-1">
                    Denna entitet har hög påverkan på systemet. Ändringar eller avveckling kräver noggrann planering
                    och omfattande testning. Överväg att skapa en detaljerad migreringsplan och identifiera
                    alternativa lösningar innan ändringar genomförs.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-red-600">
                    <li>• {impactData.downstreamCount} komponenter beror direkt eller indirekt på denna</li>
                    <li>• {impactData.upstreamCount} uppströmsberoenden måste hanteras</li>
                    <li>• Rekommendation: Genomför grundlig riskbedömning</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedEntity && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Network className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Ingen entitet vald
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Sök efter en entitet ovan för att analysera dess påverkan och beroenden.
            Verktyget visar både nedströms påverkan (vad som påverkas) och uppströms
            beroenden (vad som krävs).
          </p>
        </div>
      )}
    </div>
  );
};

export default ImpactAnalysis;
