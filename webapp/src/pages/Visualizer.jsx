import { useEffect, useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { ZoomIn, ZoomOut, Maximize2, Download, Filter, X, Search } from 'lucide-react';

// Register the layout
cytoscape.use(cola);

// ArchiMate-inspired styling helper
const getArchimateStyle = (entityType) => {
  const styles = {
    // Business Layer (Yellow/Beige)
    'BusinessProcess': { shape: 'round-rectangle', color: '#FFF4A3', borderColor: '#F4D03F' },
    'BusinessCapability': { shape: 'round-rectangle', color: '#FFF4A3', borderColor: '#F4D03F' },
    'OrganizationalUnit': { shape: 'round-rectangle', color: '#FFF4A3', borderColor: '#F4D03F' },
    'Person': { shape: 'ellipse', color: '#FFE8A3', borderColor: '#F4D03F' },
    
    // Application Layer (Light Blue)
    'ApplicationSystem': { shape: 'rectangle', color: '#B5E7FE', borderColor: '#5DADE2' },
    'ApplicationService': { shape: 'round-rectangle', color: '#B5E7FE', borderColor: '#5DADE2' },
    'DataObject': { shape: 'rectangle', color: '#D6EAF8', borderColor: '#5DADE2' },
    
    // Technology Layer (Green)
    'InfrastructureNode': { shape: 'rectangle', color: '#C9E7B7', borderColor: '#52BE80' },
    'TechnologyService': { shape: 'round-rectangle', color: '#C9E7B7', borderColor: '#52BE80' },
    'DataStore': { shape: 'barrel', color: '#A9DFBF', borderColor: '#52BE80' },
    
    // Security / Motivation (Light Blue/Purple)
    'SecurityControl': { shape: 'round-rectangle', color: '#D4E6F1', borderColor: '#3498DB' },
    'ThreatScenario': { shape: 'round-rectangle', color: '#FADBD8', borderColor: '#E74C3C' },
    'Vulnerability': { shape: 'round-rectangle', color: '#FADBD8', borderColor: '#E74C3C' },
    
    // Strategy / Governance (Light Gray/Purple)
    'Policy': { shape: 'rectangle', color: '#E8DAEF', borderColor: '#AF7AC5' },
    'ComplianceRequirement': { shape: 'rectangle', color: '#E8DAEF', borderColor: '#AF7AC5' },
    
    // Implementation (Pink/Orange)
    'Supplier': { shape: 'rectangle', color: '#FADBD8', borderColor: '#EC7063' }
  };
  
  return styles[entityType] || { shape: 'ellipse', color: '#E0E0E0', borderColor: '#999999' };
};

const Visualizer = () => {
  const { getAllEntities, relationships, metamodel } = useData();
  const cyRef = useRef(null);
  const containerRef = useRef(null);
  const entityTypeFilterRef = useRef(null);
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [cy, setCy] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [hopsLevel, setHopsLevel] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntityTypes, setSelectedEntityTypes] = useState([]);
  const [showEntityTypeFilter, setShowEntityTypeFilter] = useState(false);

  // Get all unique entity types from metamodel
  const getAllEntityTypes = () => {
    const types = [];
    metamodel.layers.forEach(layer => {
      layer.entityTypes.forEach(type => {
        if (!types.includes(type)) {
          types.push(type);
        }
      });
    });
    return types.sort();
  };

  // Close entity type filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (entityTypeFilterRef.current && !entityTypeFilterRef.current.contains(event.target)) {
        setShowEntityTypeFilter(false);
      }
    };

    if (showEntityTypeFilter) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEntityTypeFilter]);

  // Function to get entities within N hops from selected entities
  // Returns both entities and the relationships used in the hop path
  const getEntitiesWithinHops = (startEntities, maxHops) => {
    if (startEntities.length === 0) {
      return { 
        entities: getAllEntities(), 
        hopRelationships: relationships 
      };
    }

    const visited = new Set(startEntities);
    const currentLevel = new Set(startEntities);
    const usedRelationships = new Set(); // Track which relationships are in the hop path
    
    for (let hop = 0; hop < maxHops; hop++) {
      const nextLevel = new Set();
      
      currentLevel.forEach(entityId => {
        // Find all related entities
        relationships.forEach(rel => {
          if (rel.source === entityId && !visited.has(rel.target)) {
            nextLevel.add(rel.target);
            visited.add(rel.target);
            usedRelationships.add(rel.id); // Mark this relationship as part of hop path
          } else if (rel.target === entityId && !visited.has(rel.source)) {
            nextLevel.add(rel.source);
            visited.add(rel.source);
            usedRelationships.add(rel.id); // Mark this relationship as part of hop path
          }
        });
      });
      
      nextLevel.forEach(id => currentLevel.add(id));
    }
    
    const allEntities = getAllEntities();
    return {
      entities: allEntities.filter(e => visited.has(e.id)),
      hopRelationships: relationships.filter(r => usedRelationships.has(r.id))
    };
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const allEntities = getAllEntities();

    // Apply entity and hops filtering
    let hopResult = selectedEntities.length > 0
      ? getEntitiesWithinHops(selectedEntities, hopsLevel)
      : { entities: allEntities, hopRelationships: relationships };
    
    let entitiesToShow = hopResult.entities;
    let relationshipsToShow = hopResult.hopRelationships;

    // Filter entities by layer
    let filteredEntities = selectedLayer === 'all'
      ? entitiesToShow
      : entitiesToShow.filter(entity => {
          const layer = metamodel.layers.find(l => 
            l.entityTypes.includes(entity.entityType)
          );
          return layer?.name === selectedLayer;
        });

    // Filter entities by entity type
    if (selectedEntityTypes.length > 0) {
      filteredEntities = filteredEntities.filter(entity => 
        selectedEntityTypes.includes(entity.entityType)
      );
    }

    // Create nodes
    const nodes = filteredEntities.map(entity => {
      const layer = metamodel.layers.find(l =>
        l.entityTypes.includes(entity.entityType)
      );
      const archimateStyle = getArchimateStyle(entity.entityType);

      return {
        data: {
          id: entity.id,
          label: entity.name,
          entityType: entity.entityType,
          color: archimateStyle.color,
          borderColor: archimateStyle.borderColor,
          shape: archimateStyle.shape,
          criticality: entity.criticality || 'normal'
        }
      };
    });

    // Create edges from relationships
    // Only use relationships from the hop path, and only where both nodes are in filtered entities
    const edges = relationshipsToShow
      .filter(rel => {
        // Only include edges where both nodes are in filtered entities
        const sourceExists = filteredEntities.find(e => e.id === rel.source);
        const targetExists = filteredEntities.find(e => e.id === rel.target);
        return sourceExists && targetExists;
      })
      .map(rel => ({
        data: {
          id: rel.id,
          source: rel.source,
          target: rel.target,
          label: rel.type,
          relType: rel.type
        }
      }));

    // Initialize Cytoscape
    const cyInstance = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'shape': 'data(shape)',
            'background-color': 'data(color)',
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#333',
            'text-outline-color': '#fff',
            'text-outline-width': 2,
            'font-size': '12px',
            'font-weight': '500',
            'width': (ele) => {
              const criticality = ele.data('criticality');
              if (criticality === 'critical') return 70;
              if (criticality === 'high') return 60;
              return 50;
            },
            'height': (ele) => {
              const criticality = ele.data('criticality');
              if (criticality === 'critical') return 70;
              if (criticality === 'high') return 60;
              return 50;
            },
            'border-width': 3,
            'border-color': (ele) => {
              const criticality = ele.data('criticality');
              if (criticality === 'critical') return '#dc2626';
              if (criticality === 'high') return '#f59e0b';
              return ele.data('borderColor');
            }
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#cbd5e1',
            'target-arrow-color': '#cbd5e1',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '10px',
            'color': '#64748b',
            'text-background-color': '#fff',
            'text-background-opacity': 0.8,
            'text-background-padding': '2px'
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 4,
            'border-color': '#0ea5e9',
            'overlay-color': '#0ea5e9',
            'overlay-opacity': 0.2,
            'overlay-padding': 8
          }
        },
        {
          selector: 'edge:selected',
          style: {
            'line-color': '#0ea5e9',
            'target-arrow-color': '#0ea5e9',
            'width': 3
          }
        }
      ],
      layout: {
        name: 'cola',
        animate: true,
        animationDuration: 500,
        nodeSpacing: 50,
        edgeLength: 100,
        fit: true,
        padding: 30
      }
    });

    // Add tooltips
    cyInstance.on('tap', 'node', (evt) => {
      const node = evt.target;
      console.log('Selected node:', node.data());
    });

    setCy(cyInstance);
    cyRef.current = cyInstance;

    return () => {
      if (cyInstance) {
        cyInstance.destroy();
      }
    };
  }, [selectedLayer, getAllEntities, relationships, metamodel, selectedEntities, hopsLevel, selectedEntityTypes]);

  const handleZoomIn = () => {
    if (cy) {
      cy.zoom(cy.zoom() * 1.2);
      cy.center();
    }
  };

  const handleZoomOut = () => {
    if (cy) {
      cy.zoom(cy.zoom() * 0.8);
      cy.center();
    }
  };

  const handleFit = () => {
    if (cy) {
      cy.fit(null, 50);
    }
  };

  const handleExport = () => {
    if (cy) {
      const png = cy.png({ full: true, scale: 2 });
      const link = document.createElement('a');
      link.download = 'architecture-graph.png';
      link.href = png;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Arkitekturvisualisering</h2>
            <p className="text-gray-600 mt-1">
              Interaktiv graf över entiteter och deras relationer
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* First row: Layer filter, Entity Type filter, and Entity filter button */}
          <div className="flex flex-wrap items-center gap-4">
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

            {/* Entity Type Filter */}
            <div className="relative" ref={entityTypeFilterRef}>
              <button
                onClick={() => setShowEntityTypeFilter(!showEntityTypeFilter)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-600" />
                Objekttyper
                {selectedEntityTypes.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-primary-600 text-white text-xs font-semibold rounded-full">
                    {selectedEntityTypes.length}
                  </span>
                )}
              </button>

              {showEntityTypeFilter && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      {selectedEntityTypes.length > 0 ? `${selectedEntityTypes.length} valda` : 'Välj objekttyper'}
                    </span>
                    {selectedEntityTypes.length > 0 && (
                      <button
                        onClick={() => setSelectedEntityTypes([])} 
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Rensa alla
                      </button>
                    )}
                  </div>
                  <div className="p-2">
                    {getAllEntityTypes().map(entityType => {
                      const isSelected = selectedEntityTypes.includes(entityType);
                      const archimateStyle = getArchimateStyle(entityType);
                      return (
                        <div
                          key={entityType}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedEntityTypes(selectedEntityTypes.filter(t => t !== entityType));
                            } else {
                              setSelectedEntityTypes([...selectedEntityTypes, entityType]);
                            }
                          }}
                          className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                            isSelected ? 'bg-primary-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="h-4 w-4 text-primary-600 rounded mr-3"
                          />
                          <div
                            className="w-4 h-4 rounded mr-2 border-2"
                            style={{ 
                              backgroundColor: archimateStyle.color,
                              borderColor: archimateStyle.borderColor
                            }}
                          />
                          <span className="text-sm text-gray-700">{entityType}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filtrera entiteter
              {selectedEntities.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-white text-primary-700 text-xs font-semibold rounded-full">
                  {selectedEntities.length}
                </span>
              )}
            </button>

            {selectedEntities.length > 0 && (
              <>
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Visa hopp:</label>
                  <select
                    value={hopsLevel}
                    onChange={(e) => setHopsLevel(parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="1">1 hopp</option>
                    <option value="2">2 hopp</option>
                    <option value="3">3 hopp</option>
                    <option value="4">4 hopp</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    setSelectedEntities([]);
                    setHopsLevel(1);
                  }}
                  className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 border border-red-300 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 mr-1" />
                  Rensa filter
                </button>
              </>
            )}
          </div>

          {/* Second row: Zoom controls */}
          <div className="flex items-center justify-end space-x-2">
            <button
              onClick={handleZoomIn}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Zooma in"
            >
              <ZoomIn className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Zooma ut"
            >
              <ZoomOut className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleFit}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Anpassa till skärm"
            >
              <Maximize2 className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleExport}
              className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              title="Exportera som PNG"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Förklaring</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metamodel.layers.map((layer) => (
            <div key={layer.name} className="flex items-center">
              <div
                className="w-4 h-4 rounded mr-2"
                style={{ backgroundColor: layer.color }}
              />
              <span className="text-sm text-gray-700">{layer.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full border-4 border-red-600 mr-2" />
              <span className="text-gray-700">Kritisk</span>
            </div>
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full border-2 border-amber-600 mr-2" />
              <span className="text-gray-700">Hög</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full border-2 border-gray-600 mr-2" />
              <span className="text-gray-700">Normal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Container */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div
          ref={containerRef}
          className="cy-container"
          style={{ height: '600px', width: '100%' }}
        />
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Instruktioner</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Klicka på "Objekttyper" för att filtrera vilka typer av entiteter som ska visas</li>
          <li>• Klicka på "Filtrera entiteter" för att välja specifika entiteter och visa deras nätverk</li>
          <li>• Välj antal "hopp" för att se entiteter som är 1-4 steg bort från valda entiteter</li>
          <li>• Klicka på en nod för att välja den och se dess information</li>
          <li>• Dra noder för att ändra layouten</li>
          <li>• Använd mushjulet för att zooma</li>
          <li>• Filtrera efter skikt för att förenkla vyn</li>
          <li>• Exportera grafen som PNG för dokumentation</li>
        </ul>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Välj entiteter att visualisera</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Sök entiteter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              {/* Selected Count */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {selectedEntities.length} entiteter valda
                </p>
                {selectedEntities.length > 0 && (
                  <button
                    onClick={() => setSelectedEntities([])}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Rensa alla
                  </button>
                )}
              </div>

              {/* Entity List */}
              <div className="space-y-2">
                {getAllEntities()
                  .filter(entity => {
                    if (!searchTerm) return true;
                    return entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entity.description?.toLowerCase().includes(searchTerm.toLowerCase());
                  })
                  .map((entity) => {
                    const layer = metamodel.layers.find(l =>
                      l.entityTypes.includes(entity.entityType)
                    );
                    const isSelected = selectedEntities.includes(entity.id);

                    return (
                      <div
                        key={entity.id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedEntities(selectedEntities.filter(id => id !== entity.id));
                          } else {
                            setSelectedEntities([...selectedEntities, entity.id]);
                          }
                        }}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}}
                          className="h-4 w-4 text-primary-600 rounded mr-3"
                        />
                        <div
                          className="w-3 h-3 rounded mr-3"
                          style={{ backgroundColor: layer?.color || '#999' }}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{entity.name}</p>
                          <p className="text-sm text-gray-500">{entity.entityType}</p>
                        </div>
                        {entity.criticality === 'critical' && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            Kritisk
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600">
                Välj entiteter och antal hopp för att visualisera deras nätverk
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setShowFilterModal(false);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
                >
                  Stäng
                </button>
                <button
                  onClick={() => {
                    setShowFilterModal(false);
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Använd filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visualizer;
