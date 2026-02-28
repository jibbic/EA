import { useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

// Color scheme for different entity types (ArchiMate 3.1)
const getEntityColor = (entityType, level) => {
  const baseColors = {
    // Business Layer
    'BusinessProcess': { bg: '#ECFDF5', border: '#10B981', text: '#047857' },
    'BusinessActor': { bg: '#D1FAE5', border: '#14B8A6', text: '#0F766E' },
    'BusinessFunction': { bg: '#DBEAFE', border: '#0EA5E9', text: '#0369A1' },
    // Application Layer
    'ApplicationComponent': { bg: '#DBEAFE', border: '#3B82F6', text: '#1E40AF' },
    'DataObject': { bg: '#FCE7F3', border: '#EC4899', text: '#BE185D' },
    // Technology Layer
    'Node': { bg: '#F3E8FF', border: '#A855F7', text: '#7C3AED' },
    // Strategy Layer
    'Capability': { bg: '#EEF2FF', border: '#6366F1', text: '#4338CA' },
    // Motivation Layer
    'Goal': { bg: '#FEF3C7', border: '#F59E0B', text: '#D97706' },
    'Requirement': { bg: '#FFEDD5', border: '#F97316', text: '#EA580C' },
  };
  
  const colors = baseColors[entityType] || { bg: '#F3F4F6', border: '#6B7280', text: '#374151' };
  
  // Darken for deeper levels
  const opacity = 1 - (level * 0.1);
  return {
    ...colors,
    opacity: Math.max(opacity, 0.6)
  };
};

const HierarchyTree = ({ entityType, onNodeClick }) => {
  const { entities, relationships } = useData();
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !entityType) return;

    // Get entities of selected type (entities is grouped by type)
    const entitiesOfType = entities[entityType] || [];
    
    if (entitiesOfType.length === 0) return;

    // Build hierarchy map
    const hierarchyMap = new Map();
    entitiesOfType.forEach(entity => {
      hierarchyMap.set(entity.id, {
        ...entity,
        children: []
      });
    });

    // Link children to parents based on parentId
    entitiesOfType.forEach(entity => {
      if (entity.parentId && hierarchyMap.has(entity.parentId)) {
        hierarchyMap.get(entity.parentId).children.push(entity.id);
      }
    });

    // Find root nodes (no parent or parent not in filtered set)
    const rootNodes = entitiesOfType.filter(e => !e.parentId || !hierarchyMap.has(e.parentId));

    // Create nodes
    const nodes = entitiesOfType.map(entity => {
      const level = entity.level || 1;
      const colors = getEntityColor(entityType, level);
      
      return {
        data: {
          id: entity.id,
          label: entity.name,
          level: level,
          criticality: entity.criticality,
          status: entity.status,
          ...colors
        }
      };
    });

    // Create edges based on parentId (primary) and composes relationships (fallback)
    const edges = [];
    
    // First, create edges from parentId
    entitiesOfType.forEach(entity => {
      if (entity.parentId && hierarchyMap.has(entity.parentId)) {
        edges.push({
          data: {
            id: `edge-parent-${entity.id}`,
            source: entity.parentId,
            target: entity.id,
            label: ''
          }
        });
      }
    });
    
    // Also add edges from composes relationships (if not already added)
    const existingEdges = new Set(edges.map(e => `${e.data.source}-${e.data.target}`));
    relationships
      .filter(rel => 
        rel.type === 'composes' &&
        hierarchyMap.has(rel.source) &&
        hierarchyMap.has(rel.target)
      )
      .forEach(rel => {
        const edgeKey = `${rel.source}-${rel.target}`;
        if (!existingEdges.has(edgeKey)) {
          edges.push({
            data: {
              id: `edge-${rel.id}`,
              source: rel.source,
              target: rel.target,
              label: ''
            }
          });
        }
      });

    // Cleanup previous instance
    if (cyRef.current) {
      cyRef.current.destroy();
    }

    // Create cytoscape instance
    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(bg)',
            'border-width': 3,
            'border-color': 'data(border)',
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': 'data(text)',
            'font-size': '12px',
            'font-weight': 'bold',
            'text-wrap': 'wrap',
            'text-max-width': '120px',
            'width': '140px',
            'height': '60px',
            'shape': 'round-rectangle',
            'padding': '10px',
            'opacity': 'data(opacity)'
          }
        },
        {
          selector: 'node[?criticality="critical"]',
          style: {
            'border-width': 4,
            'border-color': '#DC2626'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#9CA3AF',
            'target-arrow-color': '#9CA3AF',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'arrow-scale': 1.5
          }
        },
        {
          selector: 'node:selected',
          style: {
            'border-width': 5,
            'border-color': '#F59E0B',
            'background-color': '#FEF3C7'
          }
        },
        {
          selector: 'node:hover',
          style: {
            'border-width': 4,
            'border-color': '#F59E0B'
          }
        }
      ],
      
      layout: {
        name: 'dagre',
        rankDir: 'TB', // Top to Bottom
        nodeSep: 50,
        rankSep: 100,
        edgeSep: 20,
        padding: 30
      },
      
      minZoom: 0.3,
      maxZoom: 3,
      wheelSensitivity: 0.2
    });

    // Add click handler
    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      const entityId = node.id();
      if (onNodeClick) {
        onNodeClick(entityId);
      }
    });

    // Fit and center
    cy.fit(30);
    cy.center();

    cyRef.current = cy;

    // Cleanup
    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
        cyRef.current = null;
      }
    };
  }, [entityType, entities, relationships, onNodeClick]);

  return (
    <div className="w-full h-full bg-gray-50 rounded-lg border-2 border-gray-200">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default HierarchyTree;
