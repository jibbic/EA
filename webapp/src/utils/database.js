// SQLite Database Layer using sql.js
// Provides indexed, high-performance storage for EA data

import initSqlJs from 'sql.js';

let db = null;
let SQL = null;

// Save database to IndexedDB for persistence
async function saveToIndexedDB() {
  if (!db) return;
  
  const data = db.export();
  const openRequest = indexedDB.open('nis2-ea-database', 1);
  
  openRequest.onupgradeneeded = () => {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains('database')) {
      db.createObjectStore('database');
    }
  };
  
  openRequest.onsuccess = () => {
    const idb = openRequest.result;
    const transaction = idb.transaction(['database'], 'readwrite');
    const store = transaction.objectStore('database');
    store.put(data, 'sqliteDb');
  };
}

// Load database from IndexedDB
async function loadFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open('nis2-ea-database', 1);
    
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains('database')) {
        db.createObjectStore('database');
      }
    };
    
    openRequest.onsuccess = () => {
      const idb = openRequest.result;
      const transaction = idb.transaction(['database'], 'readonly');
      const store = transaction.objectStore('database');
      const getRequest = store.get('sqliteDb');
      
      getRequest.onsuccess = () => {
        resolve(getRequest.result);
      };
      
      getRequest.onerror = () => {
        resolve(null);
      };
    };
    
    openRequest.onerror = () => {
      resolve(null);
    };
  });
}

// Initialize SQLite database
export async function initDatabase() {
  if (db) return db;

  try {
    // Initialize SQL.js
    SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
    
    // Try to load existing database from IndexedDB
    const savedData = await loadFromIndexedDB();
    
    if (savedData) {
      db = new SQL.Database(new Uint8Array(savedData));
      console.log('✅ Loaded existing database from IndexedDB');
    } else {
      // Create new database
      db = new SQL.Database();

      console.log('✅ Created new database');
    }

    // Create tables if they don't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS entities (
        id TEXT PRIMARY KEY,
        entityType TEXT NOT NULL,
        name TEXT,
        description TEXT,
        properties TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_entities_type ON entities(entityType);
      CREATE INDEX IF NOT EXISTS idx_entities_name ON entities(name);

      CREATE TABLE IF NOT EXISTS relationships (
        id TEXT PRIMARY KEY,
        source TEXT NOT NULL,
        target TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        properties TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (source) REFERENCES entities(id) ON DELETE CASCADE,
        FOREIGN KEY (target) REFERENCES entities(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_relationships_source ON relationships(source);
      CREATE INDEX IF NOT EXISTS idx_relationships_target ON relationships(target);
      CREATE INDEX IF NOT EXISTS idx_relationships_type ON relationships(type);

      CREATE TABLE IF NOT EXISTS resource_allocations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id TEXT,
        resource_id TEXT,
        allocation INTEGER,
        role TEXT,
        properties TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_allocations_project ON resource_allocations(project_id);
      CREATE INDEX IF NOT EXISTS idx_allocations_resource ON resource_allocations(resource_id);

      CREATE TABLE IF NOT EXISTS metadata (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ SQLite database initialized successfully');
    return db;
  } catch (error) {
    console.error('❌ Failed to initialize database:', error);
    throw error;
  }
}

// Execute SQL and return results
function query(sql, params = []) {
  if (!db) throw new Error('Database not initialized');
  
  try {
    const stmt = db.prepare(sql);
    if (params.length > 0) {
      stmt.bind(params);
    }
    
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    
    // Save to IndexedDB after modifications
    if (sql.trim().toUpperCase().startsWith('INSERT') || 
        sql.trim().toUpperCase().startsWith('UPDATE') || 
        sql.trim().toUpperCase().startsWith('DELETE')) {
      saveToIndexedDB();
    }
    
    return results;
  } catch (error) {
    console.error('Query error:', error, 'SQL:', sql);
    throw error;
  }
}

// Execute SQL without returning results (for CREATE, DROP, etc.)
function exec(sql) {
  if (!db) throw new Error('Database not initialized');
  
  try {
    db.run(sql);
    saveToIndexedDB();
  } catch (error) {
    console.error('Exec error:', error, 'SQL:', sql);
    throw error;
  }
}

// Entity CRUD operations
export function addEntity(entity) {
  const properties = { ...entity };
  delete properties.id;
  delete properties.entityType;
  delete properties.name;
  delete properties.description;

  query(
    `INSERT INTO entities (id, entityType, name, description, properties) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      entity.id,
      entity.entityType,
      entity.name || '',
      entity.description || '',
      JSON.stringify(properties)
    ]
  );
}

export function updateEntity(entityId, updatedEntity) {
  const properties = { ...updatedEntity };
  delete properties.id;
  delete properties.entityType;
  delete properties.name;
  delete properties.description;

  query(
    `UPDATE entities 
     SET entityType = ?, name = ?, description = ?, properties = ?, updated_at = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [
      updatedEntity.entityType,
      updatedEntity.name || '',
      updatedEntity.description || '',
      JSON.stringify(properties),
      entityId
    ]
  );
}

export function deleteEntity(entityId) {
  query('DELETE FROM entities WHERE id = ?', [entityId]);
}

export function getEntityById(entityId) {
  const rows = query('SELECT * FROM entities WHERE id = ?', [entityId]);
  if (rows.length === 0) return null;
  
  const entity = rows[0];
  const properties = entity.properties ? JSON.parse(entity.properties) : {};
  
  return {
    id: entity.id,
    entityType: entity.entityType,
    name: entity.name,
    description: entity.description,
    ...properties
  };
}

export function getAllEntities() {
  const rows = query('SELECT * FROM entities ORDER BY entityType, name');
  return rows.map(entity => {
    const properties = entity.properties ? JSON.parse(entity.properties) : {};
    return {
      id: entity.id,
      entityType: entity.entityType,
      name: entity.name,
      description: entity.description,
      ...properties
    };
  });
}

export function getEntitiesByType(entityType) {
  const rows = query(
    'SELECT * FROM entities WHERE entityType = ? ORDER BY name',
    [entityType]
  );
  return rows.map(entity => {
    const properties = entity.properties ? JSON.parse(entity.properties) : {};
    return {
      id: entity.id,
      entityType: entity.entityType,
      name: entity.name,
      description: entity.description,
      ...properties
    };
  });
}

export function getEntitiesGroupedByType() {
  const entities = getAllEntities();
  const grouped = {};
  
  entities.forEach(entity => {
    if (!grouped[entity.entityType]) {
      grouped[entity.entityType] = [];
    }
    grouped[entity.entityType].push(entity);
  });
  
  return grouped;
}

// Relationship CRUD operations
export function addRelationship(relationship) {
  const properties = { ...relationship };
  delete properties.id;
  delete properties.source;
  delete properties.target;
  delete properties.type;
  delete properties.description;

  query(
    `INSERT INTO relationships (id, source, target, type, description, properties) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      relationship.id || `rel-${Date.now()}`,
      relationship.source,
      relationship.target,
      relationship.type,
      relationship.description || '',
      JSON.stringify(properties)
    ]
  );
}

export function deleteRelationship(relationshipId) {
  query('DELETE FROM relationships WHERE id = ?', [relationshipId]);
}

export function getAllRelationships() {
  const rows = query('SELECT * FROM relationships');
  return rows.map(rel => {
    const properties = rel.properties ? JSON.parse(rel.properties) : {};
    return {
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: rel.type,
      description: rel.description,
      ...properties
    };
  });
}

export function getRelationshipsForEntity(entityId) {
  const rows = query(
    'SELECT * FROM relationships WHERE source = ? OR target = ?',
    [entityId, entityId]
  );
  return rows.map(rel => {
    const properties = rel.properties ? JSON.parse(rel.properties) : {};
    return {
      id: rel.id,
      source: rel.source,
      target: rel.target,
      type: rel.type,
      description: rel.description,
      ...properties
    };
  });
}

// Resource allocation operations
export function addResourceAllocation(allocation) {
  const properties = { ...allocation };
  delete properties.project_id;
  delete properties.resource_id;
  delete properties.allocation;
  delete properties.role;

  query(
    `INSERT INTO resource_allocations (project_id, resource_id, allocation, role, properties) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      allocation.project_id,
      allocation.resource_id,
      allocation.allocation,
      allocation.role || '',
      JSON.stringify(properties)
    ]
  );
}

export function updateResourceAllocation(allocationId, updatedAllocation) {
  const properties = { ...updatedAllocation };
  delete properties.id;
  delete properties.project_id;
  delete properties.resource_id;
  delete properties.allocation;
  delete properties.role;

  query(
    `UPDATE resource_allocations 
     SET project_id = ?, resource_id = ?, allocation = ?, role = ?, properties = ? 
     WHERE id = ?`,
    [
      updatedAllocation.project_id,
      updatedAllocation.resource_id,
      updatedAllocation.allocation,
      updatedAllocation.role || '',
      JSON.stringify(properties),
      allocationId
    ]
  );
}

export function deleteResourceAllocation(allocationId) {
  query('DELETE FROM resource_allocations WHERE id = ?', [allocationId]);
}

export function getAllocationsForProject(projectId) {
  const rows = query(
    'SELECT * FROM resource_allocations WHERE project_id = ?',
    [projectId]
  );
  return rows.map(alloc => {
    const properties = alloc.properties ? JSON.parse(alloc.properties) : {};
    return {
      id: alloc.id,
      project_id: alloc.project_id,
      resource_id: alloc.resource_id,
      allocation: alloc.allocation,
      role: alloc.role,
      ...properties
    };
  });
}

export function getAllocationsForResource(resourceId) {
  const rows = query(
    'SELECT * FROM resource_allocations WHERE resource_id = ?',
    [resourceId]
  );
  return rows.map(alloc => {
    const properties = alloc.properties ? JSON.parse(alloc.properties) : {};
    return {
      id: alloc.id,
      project_id: alloc.project_id,
      resource_id: alloc.resource_id,
      allocation: alloc.allocation,
      role: alloc.role,
      ...properties
    };
  });
}

// Import/Export operations
export function importData(data) {
  // Clear existing data
  exec('DELETE FROM resource_allocations');
  exec('DELETE FROM relationships');
  exec('DELETE FROM entities');

  // Import entities
  if (data.entities) {
    // Handle both grouped and flat entity arrays
    const entityArray = Array.isArray(data.entities) 
      ? data.entities 
      : Object.entries(data.entities).flatMap(([type, items]) => 
          items.map(item => ({ ...item, entityType: item.entityType || type }))
        );

    for (const entity of entityArray) {
      addEntity(entity);
    }
  }

  // Import relationships
  if (data.relationships && Array.isArray(data.relationships)) {
    for (const rel of data.relationships) {
      addRelationship(rel);
    }
  }

  // Import resource allocations
  if (data.resourceAllocations && Array.isArray(data.resourceAllocations)) {
    for (const alloc of data.resourceAllocations) {
      addResourceAllocation(alloc);
    }
  }

  // Set metadata
  query(
    `INSERT OR REPLACE INTO metadata (key, value, updated_at) 
     VALUES ('data_version', ?, CURRENT_TIMESTAMP)`,
    [data.version || '1.0']
  );
}

export function exportData() {
  const entities = getEntitiesGroupedByType();
  const relationships = getAllRelationships();
  const resourceAllocations = query('SELECT * FROM resource_allocations');

  return {
    version: '1.0',
    exportDate: new Date().toISOString(),
    entities,
    relationships,
    resourceAllocations: resourceAllocations.map(alloc => {
      const properties = alloc.properties ? JSON.parse(alloc.properties) : {};
      return {
        project_id: alloc.project_id,
        resource_id: alloc.resource_id,
        allocation: alloc.allocation,
        role: alloc.role,
        ...properties
      };
    })
  };
}

// Clear all data
export function clearAllData() {
  exec('DELETE FROM resource_allocations');
  exec('DELETE FROM relationships');
  exec('DELETE FROM entities');
  exec('DELETE FROM metadata');
}

// Database statistics
export function getDatabaseStats() {
  const entityCount = query('SELECT COUNT(*) as count FROM entities');
  const relationshipCount = query('SELECT COUNT(*) as count FROM relationships');
  const entityTypes = query(
    'SELECT entityType, COUNT(*) as count FROM entities GROUP BY entityType'
  );

  return {
    totalEntities: entityCount[0]?.count || 0,
    totalRelationships: relationshipCount[0]?.count || 0,
    entitiesByType: entityTypes.reduce((acc, row) => {
      acc[row.entityType] = row.count;
      return acc;
    }, {})
  };
}
