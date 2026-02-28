import { useEffect, useRef, useState } from 'react';
import { useData } from '../context/DataContext';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import EntityQuickView from './EntityQuickView';
import EntityDetailModal from './EntityDetailModal';

cytoscape.use(cola);

// ArchiMate 3.1 styling helper
const getArchimateStyle = (entityType) => {
  const styles = {
    // Business Layer (Yellow/Beige)
    'BusinessProcess': { shape: 'round-rectangle', color: '#FFF4A3', borderColor: '#F4D03F' },
    'BusinessActor': { shape: 'round-rectangle', color: '#FFF4A3', borderColor: '#F4D03F' },
    'BusinessRole': { shape: 'round-rectangle', color: '#FFE8A3', borderColor: '#F4D03F' },
    'BusinessFunction': { shape: 'round-rectangle', color: '#FFF4A3', borderColor: '#F4D03F' },
    'BusinessService': { shape: 'round-rectangle', color: '#FFE8A3', borderColor: '#F4D03F' },
    'BusinessObject': { shape: 'rectangle', color: '#FFF4A3', borderColor: '#F4D03F' },
    'Contract': { shape: 'rectangle', color: '#FFE8A3', borderColor: '#F4D03F' },
    
    // Application Layer (Light Blue)
    'ApplicationComponent': { shape: 'rectangle', color: '#B5E7FE', borderColor: '#5DADE2' },
    'ApplicationInterface': { shape: 'ellipse', color: '#B5E7FE', borderColor: '#5DADE2' },
    'ApplicationFunction': { shape: 'round-rectangle', color: '#B5E7FE', borderColor: '#5DADE2' },
    'ApplicationService': { shape: 'round-rectangle', color: '#B5E7FE', borderColor: '#5DADE2' },
    'DataObject': { shape: 'rectangle', color: '#D6EAF8', borderColor: '#5DADE2' },
    
    // Technology Layer (Green)
    'Node': { shape: 'rectangle', color: '#C9E7B7', borderColor: '#52BE80' },
    'Device': { shape: 'rectangle', color: '#C9E7B7', borderColor: '#52BE80' },
    'SystemSoftware': { shape: 'rectangle', color: '#A9DFBF', borderColor: '#52BE80' },
    'TechnologyService': { shape: 'round-rectangle', color: '#C9E7B7', borderColor: '#52BE80' },
    'CommunicationNetwork': { shape: 'round-rectangle', color: '#A9DFBF', borderColor: '#52BE80' },
    'Artifact': { shape: 'rectangle', color: '#D5F4E6', borderColor: '#52BE80' },
    
    // Motivation Layer (Light Pink/Purple)
    'Goal': { shape: 'ellipse', color: '#FADBD8', borderColor: '#E74C3C' },
    'Requirement': { shape: 'rectangle', color: '#FADBD8', borderColor: '#E74C3C' },
    'Stakeholder': { shape: 'round-rectangle', color: '#F5CBA7', borderColor: '#E67E22' },
    'Principle': { shape: 'rectangle', color: '#D4E6F1', borderColor: '#3498DB' },
    
    // Strategy Layer (Light Purple)
    'Capability': { shape: 'round-rectangle', color: '#E8DAEF', borderColor: '#AF7AC5' },
    'Resource': { shape: 'rectangle', color: '#E8DAEF', borderColor: '#AF7AC5' },
    
    // Physical Layer (Gray)
    'Facility': { shape: 'rectangle', color: '#D5DBDB', borderColor: '#797D7F' },
    'Equipment': { shape: 'rectangle', color: '#D5DBDB', borderColor: '#797D7F' },
    
    // Implementation Layer (Orange/Pink)
    'WorkPackage': { shape: 'rectangle', color: '#FADBD8', borderColor: '#EC7063' },
    'Deliverable': { shape: 'rectangle', color: '#FDE3CE', borderColor: '#F39C12' },
    'Gap': { shape: 'round-rectangle', color: '#F5B7B1', borderColor: '#E74C3C' }
  };
  
  return styles[entityType] || { shape: 'ellipse', color: '#E0E0E0', borderColor: '#999999' };
};

const EntityGraph = ({ entityId }) => {
  const { getEntityById, relationships, metamodel } = useData();
  const containerRef = useRef(null);
  const cyRef = useRef(null);
  const [quickViewEntity, setQuickViewEntity] = useState(null);
  const [quickViewPosition, setQuickViewPosition] = useState(null);
  const [detailModalEntity, setDetailModalEntity] = useState(null);

  useEffect(() => {
    if (!containerRef.current || !entityId) return;

    const entity = getEntityById(entityId);
    if (!entity) return;

    // Helper to find layer for entity type in new metamodel structure
    const getLayerForEntityType = (entityType) => {
      if (!metamodel.entityTypes) return null;
      const entityTypeDef = metamodel.entityTypes.find(et => et.id === entityType);
      if (!entityTypeDef) return null;
      return metamodel.layers.find(layer => 
        layer.id === entityTypeDef.layer || 
        layer.name.toLowerCase() === entityTypeDef.layer
      );
    };

    // Get all related entities (1 hop)
    const relatedIds = new Set();
    const relevantRelationships = [];

    relationships.forEach(rel => {
      if (rel.source === entityId) {
        relatedIds.add(rel.target);
        relevantRelationships.push(rel);
      } else if (rel.target === entityId) {
        relatedIds.add(rel.source);
        relevantRelationships.push(rel);
      }
    });

    // Create nodes
    const nodes = [];
    
    // Add center entity
    const centerLayer = getLayerForEntityType(entity.entityType);
    const centerArchimateStyle = getArchimateStyle(entity.entityType);
    nodes.push({
      data: {
        id: entity.id,
        label: entity.name,
        entityType: entity.entityType,
        color: centerArchimateStyle.color,
        borderColor: centerArchimateStyle.borderColor,
        shape: centerArchimateStyle.shape,
        isCenter: true,
        criticality: entity.criticality || 'normal'
      }
    });

    // Add related entities
    relatedIds.forEach(id => {
      const relatedEntity = getEntityById(id);
      if (relatedEntity) {
        const layer = getLayerForEntityType(relatedEntity.entityType);
        const archimateStyle = getArchimateStyle(relatedEntity.entityType);
        nodes.push({
          data: {
            id: relatedEntity.id,
            label: relatedEntity.name,
            entityType: relatedEntity.entityType,
            color: archimateStyle.color,
            borderColor: archimateStyle.borderColor,
            shape: archimateStyle.shape,
            isCenter: false,
            criticality: relatedEntity.criticality || 'normal'
          }
        });
      }
    });

    // Create edges
    const edges = relevantRelationships.map(rel => ({
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
            'font-size': '10px',
            'font-weight': '500',
            'width': (ele) => {
              if (ele.data('isCenter')) return 70;
              const criticality = ele.data('criticality');
              if (criticality === 'critical') return 60;
              if (criticality === 'high') return 50;
              return 45;
            },
            'height': (ele) => {
              if (ele.data('isCenter')) return 70;
              const criticality = ele.data('criticality');
              if (criticality === 'critical') return 60;
              if (criticality === 'high') return 50;
              return 45;
            },
            'border-width': (ele) => {
              if (ele.data('isCenter')) return 5;
              return 3;
            },
            'border-color': (ele) => {
              if (ele.data('isCenter')) return '#0ea5e9';
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
            'font-size': '8px',
            'color': '#64748b',
            'text-background-color': '#fff',
            'text-background-opacity': 0.8,
            'text-background-padding': '2px'
          }
        }
      ],
      layout: {
        name: 'cola',
        animate: true,
        animationDuration: 300,
        nodeSpacing: 30,
        edgeLength: 80,
        fit: true,
        padding: 20
      }
    });

    // Add click handler for nodes
    cyInstance.on('tap', 'node', (evt) => {
      const node = evt.target;
      const nodeEntity = getEntityById(node.id());
      
      if (nodeEntity) {
        // Use actual mouse position from the original event
        const mouseEvent = evt.originalEvent;
        
        setQuickViewEntity(nodeEntity);
        setQuickViewPosition({
          x: mouseEvent.clientX,
          y: mouseEvent.clientY
        });
      }
    });

    cyRef.current = cyInstance;

    return () => {
      if (cyInstance) {
        cyInstance.destroy();
      }
    };
  }, [entityId, relationships, metamodel, getEntityById]);

  if (!entityId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Ingen entitet vald
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="entity-graph-container"
        style={{ width: '100%', height: '100%', minHeight: '300px' }}
      />
      
      {/* Quick view popover */}
      <EntityQuickView
        entity={quickViewEntity}
        position={quickViewPosition}
        onClose={() => {
          setQuickViewEntity(null);
          setQuickViewPosition(null);
        }}
        onViewDetails={() => {
          setDetailModalEntity(quickViewEntity);
          setQuickViewEntity(null);
          setQuickViewPosition(null);
        }}
      />

      {/* Detail modal */}
      {detailModalEntity && (
        <EntityDetailModal
          entity={detailModalEntity}
          onClose={() => setDetailModalEntity(null)}
        />
      )}
    </>
  );
};

export default EntityGraph;
