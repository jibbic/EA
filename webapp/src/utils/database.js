// Database Layer using localStorage
// Drop-in replacement for SQLite - same API, no WASM required

const STORAGE_KEY = 'nis2-ea-entities';
const REL_KEY = 'nis2-ea-relationships';
const ALLOC_KEY = 'nis2-ea-allocations';
const META_KEY = 'nis2-ea-metadata';

function loadEntities() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveEntities(entities) { localStorage.setItem(STORAGE_KEY, JSON.stringify(entities)); }

function loadRelationships() {
  try { return JSON.parse(localStorage.getItem(REL_KEY) || '[]'); }
  catch { return []; }
}
function saveRelationships(rels) { localStorage.setItem(REL_KEY, JSON.stringify(rels)); }

function loadAllocations() {
  try { return JSON.parse(localStorage.getItem(ALLOC_KEY) || '[]'); }
  catch { return []; }
}
function saveAllocations(allocs) { localStorage.setItem(ALLOC_KEY, JSON.stringify(allocs)); }

export async function initDatabase() {
  console.log('✅ localStorage database ready');
  return true;
}

export function addEntity(entity) {
  const entities = loadEntities();
  const idx = entities.findIndex(e => e.id === entity.id);
  if (idx >= 0) { entities[idx] = entity; } else { entities.push(entity); }
  saveEntities(entities);
}

export function updateEntity(entityId, updatedEntity) {
  const entities = loadEntities();
  const idx = entities.findIndex(e => e.id === entityId);
  if (idx >= 0) { entities[idx] = { ...updatedEntity, id: entityId }; saveEntities(entities); }
}

export function deleteEntity(entityId) {
  saveEntities(loadEntities().filter(e => e.id !== entityId));
  saveRelationships(loadRelationships().filter(r => r.source !== entityId && r.target !== entityId));
}

export function getEntityById(entityId) {
  return loadEntities().find(e => e.id === entityId) || null;
}

export function getAllEntities() { return loadEntities(); }

export function getEntitiesByType(entityType) {
  return loadEntities().filter(e => e.entityType === entityType);
}

export function getEntitiesGroupedByType() {
  const grouped = {};
  loadEntities().forEach(entity => {
    if (!grouped[entity.entityType]) grouped[entity.entityType] = [];
    grouped[entity.entityType].push(entity);
  });
  return grouped;
}

export function addRelationship(rel) {
  const rels = loadRelationships();
  const id = rel.id || `rel-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  rels.push({ ...rel, id });
  saveRelationships(rels);
}

export function updateRelationship(relId, updated) {
  const rels = loadRelationships();
  const idx = rels.findIndex(r => r.id === relId);
  if (idx >= 0) { rels[idx] = { ...updated, id: relId }; saveRelationships(rels); }
}

export function deleteRelationship(relId) {
  saveRelationships(loadRelationships().filter(r => r.id !== relId));
}

export function getAllRelationships() { return loadRelationships(); }

export function getRelationshipsForEntity(entityId) {
  return loadRelationships().filter(r => r.source === entityId || r.target === entityId);
}

export function addResourceAllocation(alloc) {
  const allocs = loadAllocations();
  const id = alloc.id || `alloc-${Date.now()}`;
  allocs.push({ ...alloc, id });
  saveAllocations(allocs);
}

export function updateResourceAllocation(allocId, updated) {
  const allocs = loadAllocations();
  const idx = allocs.findIndex(a => a.id === allocId);
  if (idx >= 0) { allocs[idx] = { ...updated, id: allocId }; saveAllocations(allocs); }
}

export function deleteResourceAllocation(allocId) {
  saveAllocations(loadAllocations().filter(a => a.id !== allocId));
}

export function getAllocationsForProject(projectId) {
  return loadAllocations().filter(a => a.project_id === projectId);
}

export function getAllocationsForResource(resourceId) {
  return loadAllocations().filter(a => a.resource_id === resourceId);
}

export function importData(data) {
  let entityArray = [];
  if (data.entities) {
    if (Array.isArray(data.entities)) {
      entityArray = data.entities;
    } else {
      entityArray = Object.entries(data.entities).flatMap(([type, items]) =>
        items.map(item => ({ ...item, entityType: item.entityType || type }))
      );
    }
  }
  saveEntities(entityArray);

  if (data.relationships && Array.isArray(data.relationships)) {
    const rels = data.relationships.map((r, i) => ({ ...r, id: r.id || `rel-${i}-${Date.now()}` }));
    saveRelationships(rels);
  }

  if (data.resourceAllocations && Array.isArray(data.resourceAllocations)) {
    const allocs = data.resourceAllocations.map((a, i) => ({ ...a, id: a.id || `alloc-${i}-${Date.now()}` }));
    saveAllocations(allocs);
  }

  if (data.version) {
    localStorage.setItem(META_KEY, JSON.stringify({ version: data.version }));
  }
}

export function exportData() {
  return {
    version: JSON.parse(localStorage.getItem(META_KEY) || '{}').version || '1.0',
    exportDate: new Date().toISOString(),
    entities: getEntitiesGroupedByType(),
    relationships: loadRelationships(),
    resourceAllocations: loadAllocations()
  };
}

export function clearAllData() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(REL_KEY);
  localStorage.removeItem(ALLOC_KEY);
  localStorage.removeItem(META_KEY);
}

export function getDatabaseStats() {
  const entities = loadEntities();
  const byType = {};
  entities.forEach(e => { byType[e.entityType] = (byType[e.entityType] || 0) + 1; });
  return {
    totalEntities: entities.length,
    totalRelationships: loadRelationships().length,
    entitiesByType: byType
  };
}
