/**
 * Shared ArchiMate 3.2 styling helper.
 * Returns { shape, color, borderColor } for a given entityType string.
 * Used by both EntityGraph and ModelDiagram.
 */
export const getArchimateStyle = (entityType) => {
  const styles = {
    // ── Motivation (pink/purple) ───────────────────
    Driver:       { shape: 'round-rectangle', color: '#EDE9FE', borderColor: '#7C3AED' },
    Assessment:   { shape: 'round-rectangle', color: '#EDE9FE', borderColor: '#7C3AED' },
    Goal:         { shape: 'ellipse',         color: '#FECACA', borderColor: '#DC2626' },
    Outcome:      { shape: 'ellipse',         color: '#FEE2E2', borderColor: '#EF4444' },
    Principle:    { shape: 'rectangle',       color: '#DBEAFE', borderColor: '#2563EB' },
    Requirement:  { shape: 'rectangle',       color: '#EFF6FF', borderColor: '#3B82F6' },
    Constraint:   { shape: 'round-rectangle', color: '#FEF3C7', borderColor: '#D97706' },
    Stakeholder:  { shape: 'round-rectangle', color: '#FCE7F3', borderColor: '#BE185D' },

    // ── Strategy (violet) ─────────────────────────
    Capability:      { shape: 'round-rectangle', color: '#EDE9FE', borderColor: '#7C3AED' },
    Resource:        { shape: 'rectangle',        color: '#F3E8FF', borderColor: '#9333EA' },
    CourseOfAction:  { shape: 'round-rectangle',  color: '#FAF5FF', borderColor: '#A855F7' },
    ValueStream:     { shape: 'round-rectangle',  color: '#F5F3FF', borderColor: '#8B5CF6' },

    // ── Business (yellow/amber) ───────────────────
    BusinessProcess:       { shape: 'round-rectangle', color: '#FEF9C3', borderColor: '#CA8A04' },
    BusinessFunction:      { shape: 'round-rectangle', color: '#FEF3C7', borderColor: '#D97706' },
    BusinessInteraction:   { shape: 'round-rectangle', color: '#FFFBEB', borderColor: '#F59E0B' },
    BusinessEvent:         { shape: 'round-rectangle', color: '#FEF9C3', borderColor: '#EAB308' },
    BusinessService:       { shape: 'round-rectangle', color: '#FEF3C7', borderColor: '#CA8A04' },
    BusinessObject:        { shape: 'rectangle',        color: '#FFFDE7', borderColor: '#EAB308' },
    BusinessActor:         { shape: 'round-rectangle',  color: '#FEF3C7', borderColor: '#D97706' },
    BusinessRole:          { shape: 'round-rectangle',  color: '#FFF7ED', borderColor: '#EA580C' },
    BusinessCollaboration: { shape: 'round-rectangle',  color: '#FEF9C3', borderColor: '#CA8A04' },
    Contract:              { shape: 'rectangle',         color: '#FFEDD5', borderColor: '#EA580C' },
    Product:               { shape: 'round-rectangle',  color: '#FEF9C3', borderColor: '#CA8A04' },
    Representation:        { shape: 'rectangle',         color: '#FFFDE7', borderColor: '#EAB308' },

    // ── Application (blue) ────────────────────────
    ApplicationComponent: { shape: 'rectangle',        color: '#DBEAFE', borderColor: '#2563EB' },
    ApplicationInterface: { shape: 'ellipse',           color: '#EFF6FF', borderColor: '#3B82F6' },
    ApplicationFunction:  { shape: 'round-rectangle',  color: '#DBEAFE', borderColor: '#2563EB' },
    ApplicationProcess:   { shape: 'round-rectangle',  color: '#DBEAFE', borderColor: '#2563EB' },
    ApplicationService:   { shape: 'round-rectangle',  color: '#EFF6FF', borderColor: '#3B82F6' },
    ApplicationEvent:     { shape: 'round-rectangle',  color: '#EFF6FF', borderColor: '#60A5FA' },
    ApplicationInteraction:{ shape: 'round-rectangle', color: '#DBEAFE', borderColor: '#2563EB' },
    ApplicationCollaboration:{ shape: 'round-rectangle',color: '#DBEAFE', borderColor: '#2563EB' },
    DataObject:           { shape: 'rectangle',         color: '#E0F2FE', borderColor: '#0284C7' },

    // ── Technology (green) ────────────────────────
    Node:                { shape: 'rectangle',        color: '#DCFCE7', borderColor: '#16A34A' },
    Device:              { shape: 'rectangle',        color: '#D1FAE5', borderColor: '#059669' },
    SystemSoftware:      { shape: 'round-rectangle',  color: '#DCFCE7', borderColor: '#16A34A' },
    TechnologyCollaboration:{ shape: 'round-rectangle',color: '#D1FAE5',borderColor: '#059669' },
    TechnologyInterface: { shape: 'ellipse',           color: '#ECFDF5', borderColor: '#10B981' },
    TechnologyFunction:  { shape: 'round-rectangle',  color: '#D1FAE5', borderColor: '#059669' },
    TechnologyProcess:   { shape: 'round-rectangle',  color: '#DCFCE7', borderColor: '#16A34A' },
    TechnologyInteraction:{ shape: 'round-rectangle', color: '#DCFCE7', borderColor: '#16A34A' },
    TechnologyEvent:     { shape: 'round-rectangle',  color: '#F0FDF4', borderColor: '#22C55E' },
    TechnologyService:   { shape: 'round-rectangle',  color: '#D1FAE5', borderColor: '#059669' },
    CommunicationNetwork:{ shape: 'round-rectangle',  color: '#ECFDF5', borderColor: '#10B981' },
    Artifact:            { shape: 'rectangle',         color: '#F0FDF4', borderColor: '#4ADE80' },

    // ── Physical (slate) ─────────────────────────
    Facility:            { shape: 'rectangle',         color: '#F1F5F9', borderColor: '#64748B' },
    Equipment:           { shape: 'rectangle',         color: '#E2E8F0', borderColor: '#475569' },
    DistributionNetwork: { shape: 'round-rectangle',  color: '#F1F5F9', borderColor: '#64748B' },
    Material:            { shape: 'rectangle',         color: '#F8FAFC', borderColor: '#94A3B8' },

    // ── Implementation (orange/rose) ──────────────
    WorkPackage:         { shape: 'round-rectangle',  color: '#FFEDD5', borderColor: '#EA580C' },
    Deliverable:         { shape: 'rectangle',         color: '#FEF3C7', borderColor: '#D97706' },
    Gap:                 { shape: 'round-rectangle',  color: '#FEE2E2', borderColor: '#DC2626' },
    Plateau:             { shape: 'round-rectangle',  color: '#DBEAFE', borderColor: '#2563EB' },
    ImplementationEvent: { shape: 'round-rectangle',  color: '#FCE7F3', borderColor: '#DB2777' },
  };

  return styles[entityType] || { shape: 'ellipse', color: '#F1F5F9', borderColor: '#94A3B8' };
};

/**
 * Returns the ArchiMate layer color token for a given entityType.
 * Used for UI badges etc.
 */
export const getLayerColor = (entityType) => {
  const motivation = ['Driver', 'Assessment', 'Goal', 'Outcome', 'Principle',
    'Requirement', 'Constraint', 'Stakeholder'];
  const strategy = ['Capability', 'Resource', 'CourseOfAction', 'ValueStream'];
  const business = ['BusinessProcess', 'BusinessFunction', 'BusinessInteraction',
    'BusinessEvent', 'BusinessService', 'BusinessObject', 'BusinessActor',
    'BusinessRole', 'BusinessCollaboration', 'Contract', 'Product', 'Representation'];
  const application = ['ApplicationComponent', 'ApplicationInterface', 'ApplicationFunction',
    'ApplicationProcess', 'ApplicationService', 'ApplicationEvent',
    'ApplicationInteraction', 'ApplicationCollaboration', 'DataObject'];
  const technology = ['Node', 'Device', 'SystemSoftware', 'TechnologyCollaboration',
    'TechnologyInterface', 'TechnologyFunction', 'TechnologyProcess',
    'TechnologyInteraction', 'TechnologyEvent', 'TechnologyService',
    'CommunicationNetwork', 'Artifact'];
  const physical   = ['Facility', 'Equipment', 'DistributionNetwork', 'Material'];
  const impl       = ['WorkPackage', 'Deliverable', 'Gap', 'Plateau', 'ImplementationEvent'];

  if (motivation.includes(entityType))  return 'purple';
  if (strategy.includes(entityType))    return 'violet';
  if (business.includes(entityType))    return 'yellow';
  if (application.includes(entityType)) return 'blue';
  if (technology.includes(entityType))  return 'green';
  if (physical.includes(entityType))    return 'slate';
  if (impl.includes(entityType))        return 'orange';
  return 'gray';
};

/**
 * Tailwind bg/text class pair by layer colour token.
 */
export const layerBadgeClass = (color) => {
  const map = {
    purple: 'bg-purple-100 text-purple-700',
    violet: 'bg-violet-100 text-violet-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    blue:   'bg-blue-100   text-blue-700',
    green:  'bg-green-100  text-green-700',
    slate:  'bg-slate-100  text-slate-700',
    orange: 'bg-orange-100 text-orange-700',
    gray:   'bg-gray-100   text-gray-600',
  };
  return map[color] || map.gray;
};
