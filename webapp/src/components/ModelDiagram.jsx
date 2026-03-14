import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import { useData } from '../context/DataContext';
import { getLayerColor } from '../utils/archimateStyles';
import EntityQuickView from './EntityQuickView';
import EntityDetailModal from './EntityDetailModal';
import {
  ZoomIn, ZoomOut, Maximize2, RefreshCw, Tag, EyeOff, AlertTriangle
} from 'lucide-react';

cytoscape.use(cola);

const MAX_NODES = 150;

// ── ArchiMate 2-letter type abbreviations (shown as top-right badge) ─────────
const TYPE_ABBREV = {
  Goal: 'Go', Driver: 'Dr', Assessment: 'As', Principle: 'Pr',
  Requirement: 'Re', Constraint: 'Co', Meaning: 'Me', Value: 'Va', Outcome: 'Ot',
  Capability: 'Ca', Resource: 'Rs', CourseOfAction: 'CA',
  BusinessActor: 'BA', BusinessRole: 'BR', BusinessCollaboration: 'BCo',
  BusinessInterface: 'BI', BusinessProcess: 'BP', BusinessFunction: 'BF',
  BusinessInteraction: 'BI', BusinessEvent: 'BE', BusinessService: 'BS',
  BusinessObject: 'BO', Contract: 'Ct', Representation: 'Rp', Product: 'Pd',
  ApplicationComponent: 'AC', ApplicationCollaboration: 'ACl',
  ApplicationInterface: 'AI', ApplicationFunction: 'AF', ApplicationProcess: 'AP',
  ApplicationInteraction: 'AI', ApplicationEvent: 'AE', ApplicationService: 'AS',
  DataObject: 'DO',
  Node: 'Nd', Device: 'Dv', SystemSoftware: 'SS', TechnologyCollaboration: 'TCo',
  TechnologyInterface: 'TI', Path: 'Pa', CommunicationNetwork: 'CN',
  TechnologyFunction: 'TF', TechnologyProcess: 'TP', TechnologyService: 'TS', Artifact: 'Ar',
  WorkPackage: 'WP', Deliverable: 'Dl', ImplementationEvent: 'IE', Gap: 'Gp', Plateau: 'Pl',
  Stakeholder: 'St', Junction: 'Jn', Location: 'Lo',
};

// ── Layer palette (ArchiMate layer colors) ────────────────────────────────────
const LAYER_STYLE = {
  purple: { fill: '#F3E8FF', border: '#9333EA' },
  violet: { fill: '#EDE9FE', border: '#7C3AED' },
  yellow: { fill: '#FEF9C3', border: '#CA8A04' },
  blue:   { fill: '#DBEAFE', border: '#2563EB' },
  green:  { fill: '#DCFCE7', border: '#16A34A' },
  slate:  { fill: '#F1F5F9', border: '#475569' },
  orange: { fill: '#FFF7ED', border: '#EA580C' },
};
const getLayerStyle = (entityType) => {
  const c = getLayerColor(entityType);
  return LAYER_STYLE[c] || LAYER_STYLE.slate;
};

// Generate SVG type badge as inline data URI
const typeBadge = (abbrev, borderColor) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="16"><rect width="24" height="16" rx="2" fill="${borderColor}"/><text x="12" y="11.5" font-size="8.5" font-family="monospace" font-weight="bold" text-anchor="middle" fill="white">${abbrev}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

// ── Edge helpers ──────────────────────────────────────────────────────────────
const edgeColor = (relType) => ({
  realization: '#7c3aed', composition: '#0369a1', aggregation: '#0891b2',
  serving: '#059669', assignment: '#d97706', influence: '#9333ea',
  access: '#6366f1', flow: '#14b8a6', triggering: '#f43f5e', association: '#94a3b8',
})[relType] || '#94a3b8';

const edgeDash  = (rt) => ['influence', 'association', 'realization'].includes(rt) ? 'dashed' : 'solid';
const edgeArrow = (rt) => ({ composition: 'square', aggregation: 'diamond',
  realization: 'triangle-hollow', influence: 'vee', access: 'triangle-hollow',
  association: 'none' })[rt] || 'triangle';

/**
 * ModelDiagram – ArchiMate-styled diagram.
 * Props:
 *  - viewpoint        : VIEWPOINTS object
 *  - model            : { focalEntityId?, depth?, entityIds?, relTypeFilter? }
 *  - height           : CSS string
 *  - onNodeClick      : callback(entity)
 */
const ModelDiagram = ({ viewpoint, model = {}, height = '600px', onNodeClick }) => {
  const { entities, relationships, getEntityById } = useData();

  const containerRef = useRef(null);
  const cyRef        = useRef(null);
  const [showLabels, setShowLabels]           = useState(true);
  const [quickViewEntity, setQuickViewEntity] = useState(null);
  const [quickViewPos, setQuickViewPos]       = useState(null);
  const [detailEntity, setDetailEntity]       = useState(null);
  const [stats, setStats] = useState({ nodes: 0, edges: 0, truncated: false });

  const allowedTypes    = useMemo(() => new Set([...viewpoint.primaryTypes, ...viewpoint.secondaryTypes]), [viewpoint]);
  const allowedRelTypes = useMemo(() => new Set(model.relTypeFilter || viewpoint.allowedRelTypes || []), [model, viewpoint]);

  const buildElements = useCallback(() => {
    const flatEntities = Object.values(entities).flat();
    const entityMap    = new Map(flatEntities.map(e => [e.id, e]));
    let filteredEntities;

    if (model.focalEntityId) {
      // BFS from focal entity
      const depth   = model.depth ?? 2;
      const visited = new Set([model.focalEntityId]);
      let frontier  = [model.focalEntityId];
      for (let d = 0; d < depth; d++) {
        const next = [];
        for (const id of frontier) {
          relationships
            .filter(r => (r.source === id || r.target === id) &&
              (allowedRelTypes.size === 0 || allowedRelTypes.has(r.type)))
            .forEach(r => {
              const otherId = r.source === id ? r.target : r.source;
              if (!visited.has(otherId)) {
                const e = entityMap.get(otherId);
                if (e && (allowedTypes.size === 0 || allowedTypes.has(e.entityType))) {
                  visited.add(otherId); next.push(otherId);
                }
              }
            });
        }
        frontier = next;
        if (!frontier.length) break;
      }
      filteredEntities = [...visited].map(id => entityMap.get(id)).filter(Boolean);
    } else {
      filteredEntities = flatEntities.filter(e => allowedTypes.has(e.entityType));
      if (model.entityIds?.length) {
        const idSet = new Set(model.entityIds);
        filteredEntities = filteredEntities.filter(e => idSet.has(e.id));
      }
    }

    const truncated = filteredEntities.length > MAX_NODES;
    if (truncated) filteredEntities = filteredEntities.slice(0, MAX_NODES);
    const entityIdSet = new Set(filteredEntities.map(e => e.id));

    const filteredRels = relationships.filter(
      r => entityIdSet.has(r.source) && entityIdSet.has(r.target) &&
        (allowedRelTypes.size === 0 || allowedRelTypes.has(r.type))
    );

    const nodes = filteredEntities.map(entity => {
      const ls     = getLayerStyle(entity.entityType);
      const abbrev = TYPE_ABBREV[entity.entityType] || entity.entityType.slice(0, 2).toUpperCase();
      return {
        data: {
          id:         entity.id,
          label:      entity.name,
          entityType: entity.entityType,
          fill:       ls.fill,
          border:     ls.border,
          badgeUrl:   typeBadge(abbrev, ls.border),
          isFocal:    entity.id === model.focalEntityId,
          isPrimary:  viewpoint.primaryTypes.includes(entity.entityType),
        },
      };
    });

    const edges = filteredRels.map(rel => ({
      data: {
        id:      rel.id || `${rel.source}-${rel.target}-${rel.type}`,
        source:  rel.source,
        target:  rel.target,
        label:   rel.type,
        relType: rel.type,
      },
    }));

    return { nodes, edges, truncated };
  }, [entities, relationships, viewpoint, model, allowedTypes, allowedRelTypes]);

  // ── Init / rebuild Cytoscape ─────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const { nodes, edges, truncated } = buildElements();
    setStats({ nodes: nodes.length, edges: edges.length, truncated });

    if (cyRef.current) { cyRef.current.destroy(); cyRef.current = null; }
    if (!nodes.length) return;

    const layout = model.focalEntityId
      ? {
          name: 'breadthfirst',
          directed: false,
          roots: `#${CSS.escape(model.focalEntityId)}`,
          padding: 36,
          spacingFactor: 1.75,
          animate: false,
        }
      : {
          name: 'cola',
          animate: false,
          fit: true,
          padding: 28,
          ...(viewpoint.layoutOpts || {}),
        };

    const cy = cytoscape({
      container: containerRef.current,
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            shape: 'rectangle',
            'background-color':  'data(fill)',
            'border-color':      'data(border)',
            'border-width':      2,
            'background-image':              'data(badgeUrl)',
            'background-fit':               'none',
            'background-width':             24,
            'background-height':            16,
            'background-position-x':        '100%',
            'background-position-y':        '0%',
            'background-clip':              'none',
            'background-image-containment': 'over',
            label:               showLabels ? 'data(label)' : '',
            'text-valign':       'center',
            'text-halign':       'center',
            color:               '#1e293b',
            'font-size':         '10px',
            'font-weight':       '500',
            'text-wrap':         'wrap',
            'text-max-width':    '100px',
            width:               128,
            height:              46,
            'min-zoomed-font-size': 6,
          },
        },
        {
          selector: 'node[?isFocal]',
          style: {
            'border-width':     4,
            'border-color':     '#0284c7',
            'background-color': '#E0F2FE',
            width:    148,
            height:    54,
            'font-weight': '700',
          },
        },
        {
          selector: 'node:selected',
          style: { 'border-color': '#0ea5e9', 'border-width': 4 },
        },
        {
          selector: 'edge',
          style: {
            width:                1.5,
            'line-color':         (e) => edgeColor(e.data('relType')),
            'line-style':         (e) => edgeDash(e.data('relType')),
            'target-arrow-color': (e) => edgeColor(e.data('relType')),
            'target-arrow-shape': (e) => edgeArrow(e.data('relType')),
            'arrow-scale':        0.9,
            'curve-style':        'bezier',
            label:                showLabels ? 'data(label)' : '',
            'font-size':          '8px',
            color:                '#64748b',
            'text-background-color':   '#fff',
            'text-background-opacity': 0.85,
            'text-background-padding': '2px',
            'min-zoomed-font-size':    5,
          },
        },
        {
          selector: 'edge:selected',
          style: { width: 3, 'line-color': '#0ea5e9', 'target-arrow-color': '#0ea5e9' },
        },
      ],
      layout,
    });

    cy.on('tap', 'node', (evt) => {
      const entity = getEntityById(evt.target.id());
      if (entity) {
        const me = evt.originalEvent;
        setQuickViewEntity(entity);
        setQuickViewPos({ x: me?.clientX ?? 400, y: me?.clientY ?? 300 });
        onNodeClick?.(entity);
      }
    });
    cy.on('tap', (evt) => { if (evt.target === cy) setQuickViewEntity(null); });

    cyRef.current = cy;
    return () => { if (cy) cy.destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewpoint, model, entities, relationships]);

  useEffect(() => {
    if (!cyRef.current) return;
    cyRef.current.style()
      .selector('node').style({ label: showLabels ? 'data(label)' : '' })
      .selector('edge').style({ label: showLabels ? 'data(label)' : '' })
      .update();
  }, [showLabels]);

  const zoomIn     = () => cyRef.current?.zoom(cyRef.current.zoom() * 1.25);
  const zoomOut    = () => cyRef.current?.zoom(cyRef.current.zoom() * 0.8);
  const fitView    = () => cyRef.current?.fit(undefined, 20);
  const reRunLayout = () => {
    const ly = model.focalEntityId
      ? { name: 'breadthfirst', directed: false, roots: `#${CSS.escape(model.focalEntityId)}`, padding: 36, spacingFactor: 1.75, animate: true }
      : { name: 'cola', animate: true, animationDuration: 600, fit: true, padding: 28, ...(viewpoint.layoutOpts || {}) };
    cyRef.current?.layout(ly).run();
  };

  return (
    <div className="flex flex-col" style={{ height }}>
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200 text-xs text-gray-500 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <span className="font-medium text-gray-700">{stats.nodes} noder</span>
          <span>·</span>
          <span>{stats.edges} relationer</span>
          {stats.truncated && (
            <span className="flex items-center text-amber-600">
              <AlertTriangle size={12} className="mr-1" />
              Begränsad till {MAX_NODES} noder
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <button onClick={() => setShowLabels(!showLabels)}
            title={showLabels ? 'Dölj etiketter' : 'Visa etiketter'}
            className="p-1.5 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700">
            {showLabels ? <EyeOff size={14} /> : <Tag size={14} />}
          </button>
          <button onClick={zoomIn}       className="p-1.5 rounded hover:bg-gray-200"><ZoomIn size={14} /></button>
          <button onClick={zoomOut}      className="p-1.5 rounded hover:bg-gray-200"><ZoomOut size={14} /></button>
          <button onClick={fitView}      className="p-1.5 rounded hover:bg-gray-200"><Maximize2 size={14} /></button>
          <button onClick={reRunLayout}  className="p-1.5 rounded hover:bg-gray-200"><RefreshCw size={14} /></button>
        </div>
      </div>

      <div className="flex-1 relative bg-white overflow-hidden min-h-0">
        <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        {stats.nodes === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
            <div className="text-5xl mb-3">◻</div>
            <p className="text-sm font-medium">Inga entiteter att visa</p>
            <p className="text-xs mt-1 text-center max-w-xs">
              {model.focalEntityId
                ? 'Den valda entiteten har inga kopplade entiteter inom denna vytyp'
                : `Lägg till entiteter av typerna: ${viewpoint.primaryTypes.join(', ')}`}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1 px-3 py-2 bg-gray-50 border-t border-gray-200 flex-shrink-0">
        {[...new Set(viewpoint.allowedRelTypes)].map(rt => (
          <span key={rt} className="flex items-center text-xs text-gray-500">
            <span className="inline-block w-5 h-0.5 mr-1 rounded" style={{ backgroundColor: edgeColor(rt) }} />
            {rt}
          </span>
        ))}
      </div>

      <EntityQuickView
        entity={quickViewEntity}
        position={quickViewPos}
        onClose={() => { setQuickViewEntity(null); setQuickViewPos(null); }}
        onViewDetails={() => { setDetailEntity(quickViewEntity); setQuickViewEntity(null); setQuickViewPos(null); }}
      />
      {detailEntity && <EntityDetailModal entity={detailEntity} onClose={() => setDetailEntity(null)} />}
    </div>
  );
};

export default ModelDiagram;
