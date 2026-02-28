import { createContext, useContext, useState, useEffect } from 'react';
import yaml from 'js-yaml';
import sampleData from '../data/sampleData';
import { archimateMetamodel } from '../data/archimateMetamodel.js';
import * as db from '../utils/database';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

// Use ArchiMate metamodel as the foundation
const initialMetamodel = {
  layers: archimateMetamodel.layers,
  entityTypes: archimateMetamodel.entityTypes,
  relationshipTypes: archimateMetamodel.relationshipTypes
};

// Transform flat entity array to grouped object by type
const groupEntitiesByType = (entities) => {
  const grouped = {};
  entities.forEach(entity => {
    const type = entity.entityType || entity.type; // Use entityType first, fallback to type
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(entity);
  });
  return grouped;
};

// Use sample data from sampleData.js
const initialEntities = groupEntitiesByType(sampleData.entities);
const initialRelationships = sampleData.relationships;
const initialResourceAllocations = sampleData.resourceAllocations || [];

// Data version for cache invalidation
const DATA_VERSION = '5.0'; // Livsmedelsverket sample data

export const DataProvider = ({ children }) => {
  const [metamodel, setMetamodel] = useState(initialMetamodel);
  const [entities, setEntities] = useState({});
  const [relationships, setRelationships] = useState([]);
  const [resourceAllocations, setResourceAllocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dbInitialized, setDbInitialized] = useState(false);

  // Initialize database and load data
  useEffect(() => {
    async function initializeData() {
      try {
        setIsLoading(true);
        
        // Initialize SQLite database
        await db.initDatabase();
        setDbInitialized(true);

        // Check if database is empty (first run)
        const stats = db.getDatabaseStats();
        
        if (stats.totalEntities === 0) {
          // First run - import sample data
          console.log('📦 First run - importing sample data...');
          db.importData({
            version: DATA_VERSION,
            entities: sampleData.entities,
            relationships: sampleData.relationships,
            resourceAllocations: sampleData.resourceAllocations
          });
        }

        // Load data from database
        refreshData();
        
        console.log('✅ Data loaded from SQLite');
      } catch (error) {
        console.error('❌ Failed to initialize data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    initializeData();
  }, []);

  // Refresh data from database
  const refreshData = () => {
    try {
      const entitiesData = db.getEntitiesGroupedByType();
      const relationshipsData = db.getAllRelationships();
      
      setEntities(entitiesData);
      setRelationships(relationshipsData);
      
      // Load resource allocations if needed
      // Note: This could be optimized to load on-demand
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  const addEntity = (entityType, entity) => {
    try {
      const entityWithType = { ...entity, entityType };
      db.addEntity(entityWithType);
      refreshData();
    } catch (error) {
      console.error('Failed to add entity:', error);
      throw error;
    }
  };

  const updateEntity = (entityType, entityId, updatedEntity) => {
    try {
      const entityWithType = { ...updatedEntity, entityType };
      db.updateEntity(entityId, entityWithType);
      refreshData();
    } catch (error) {
      console.error('Failed to update entity:', error);
      throw error;
    }
  };

  const deleteEntity = (entityType, entityId) => {
    try {
      db.deleteEntity(entityId);
      refreshData();
    } catch (error) {
      console.error('Failed to delete entity:', error);
      throw error;
    }
  };

  // Get valid relationship types between two entity types
  const getValidRelationshipTypes = (sourceEntityType, targetEntityType) => {
    if (!sourceEntityType || !targetEntityType) {
      return [];
    }

    return metamodel.relationshipTypes.filter(relType => {
      // Check ArchiMate format (validFrom/validTo arrays)
      if (relType.validFrom && relType.validTo) {
        const validSource = relType.validFrom.includes('*') || relType.validFrom.includes(sourceEntityType);
        const validTarget = relType.validTo.includes('*') || relType.validTo.includes(targetEntityType);
        return validSource && validTarget;
      }
      // Check legacy format (backwards compatibility)
      if (Array.isArray(relType.validFrom) && Array.isArray(relType.validTo)) {
        const validSource = relType.validFrom.includes(sourceEntityType);
        const validTarget = relType.validTo.includes(targetEntityType);
        return validSource && validTarget;
      }
      return true; // If no validation defined, allow all
    });
  };

  // Check if a specific relationship is valid according to metamodel
  const isRelationshipValid = (sourceEntityType, targetEntityType, relationshipType) => {
    const validTypes = getValidRelationshipTypes(sourceEntityType, targetEntityType);
    return validTypes.some(relType => 
      relType.name === relationshipType || 
      relType.id === relationshipType ||
      relType.name === relationshipType.toLowerCase()
    );
  };

  const addRelationship = (relationship) => {
    // Get source and target entities
    const sourceEntity = db.getEntityById(relationship.source);
    const targetEntity = db.getEntityById(relationship.target);

    if (!sourceEntity || !targetEntity) {
      throw new Error('Käll- eller målentitet hittades inte');
    }

    // Validate relationship according to metamodel
    if (!isRelationshipValid(sourceEntity.entityType, targetEntity.entityType, relationship.type)) {
      const sourceType = sourceEntity.entityType;
      const targetType = targetEntity.entityType;
      throw new Error(
        `Relationstypen "${relationship.type}" är inte tillåten mellan ${sourceType} och ${targetType} enligt metamodellen`
      );
    }

    try {
      db.addRelationship(relationship);
      refreshData();
    } catch (error) {
      console.error('Failed to add relationship:', error);
      throw error;
    }
  };

  const deleteRelationship = (relationshipId) => {
    try {
      db.deleteRelationship(relationshipId);
      refreshData();
    } catch (error) {
      console.error('Failed to delete relationship:', error);
      throw error;
    }
  };

  const getAllEntities = () => {
    const allEntities = [];
    Object.entries(entities).forEach(([type, items]) => {
      items.forEach(item => {
        allEntities.push({ ...item, entityType: type });
      });
    });
    return allEntities;
  };

  const getEntityById = (entityId) => {
    const allEntities = getAllEntities();
    return allEntities.find(e => e.id === entityId);
  };

  const getRelationshipsForEntity = (entityId) => {
    return relationships.filter(
      r => r.source === entityId || r.target === entityId
    );
  };

  const getComplianceStatus = () => {
    // Generic compliance status based on entity coverage
    const status = {};
    const layers = metamodel.layers;
    
    layers.forEach(layer => {
      const layerTypes = metamodel.entityTypes
        .filter(et => et.layer === layer.id)
        .map(et => et.id);
      
      const existingEntities = layerTypes.filter(
        entityType => entities[entityType] && entities[entityType].length > 0
      );
      
      status[layer.name] = {
        title: layer.name,
        covered: existingEntities.length,
        total: layerTypes.length,
        percentage: layerTypes.length > 0 
          ? Math.round((existingEntities.length / layerTypes.length) * 100)
          : 100
      };
    });
    
    return status;
  };

  // Export all data as JSON
  const exportData = () => {
    try {
      const data = db.exportData();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ea-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export data:', error);
      throw error;
    }
  };

  // Import data from JSON
  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (!data.entities || !data.relationships) {
        throw new Error('Ogiltig filformat');
      }
      
      db.importData(data);
      refreshData();
      
      return { success: true, message: 'Data importerad' };
    } catch (error) {
      return { success: false, message: `Import misslyckades: ${error.message}` };
    }
  };

  // Reset to initial data
  const resetData = () => {
    try {
      db.clearAllData();
      db.importData({
        version: DATA_VERSION,
        entities: sampleData.entities,
        relationships: sampleData.relationships,
        resourceAllocations: sampleData.resourceAllocations
      });
      refreshData();
    } catch (error) {
      console.error('Failed to reset data:', error);
      throw error;
    }
  };

  // Resource allocation functions
  const addResourceAllocation = (allocation) => {
    try {
      db.addResourceAllocation(allocation);
      // Note: Could refresh resource allocations here if needed
    } catch (error) {
      console.error('Failed to add resource allocation:', error);
      throw error;
    }
  };

  const updateResourceAllocation = (allocationId, updatedAllocation) => {
    try {
      db.updateResourceAllocation(allocationId, updatedAllocation);
    } catch (error) {
      console.error('Failed to update resource allocation:', error);
      throw error;
    }
  };

  const deleteResourceAllocation = (allocationId) => {
    try {
      db.deleteResourceAllocation(allocationId);
    } catch (error) {
      console.error('Failed to delete resource allocation:', error);
      throw error;
    }
  };

  const getAllocationsForProject = (projectId) => {
    try {
      return db.getAllocationsForProject(projectId);
    } catch (error) {
      console.error('Failed to get project allocations:', error);
      return [];
    }
  };

  const getAllocationsForResource = (resourceId) => {
    try {
      return db.getAllocationsForResource(resourceId);
    } catch (error) {
      console.error('Failed to get resource allocations:', error);
      return [];
    }
  };

  const value = {
    metamodel,
    entities,
    relationships,
    resourceAllocations,
    isLoading,
    dbInitialized,
    addEntity,
    updateEntity,
    deleteEntity,
    addRelationship,
    deleteRelationship,
    getAllEntities,
    getEntityById,
    getRelationshipsForEntity,
    getComplianceStatus,
    getValidRelationshipTypes,
    isRelationshipValid,
    exportData,
    importData,
    resetData,
    refreshData,
    // Resource allocation functions
    addResourceAllocation,
    updateResourceAllocation,
    deleteResourceAllocation,
    getAllocationsForProject,
    getAllocationsForResource
  };

  // Show loading state while initializing
  if (isLoading) {
    return (
      <DataContext.Provider value={value}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '2rem' }}>⏳</div>
          <div>Laddar data från SQLite...</div>
        </div>
      </DataContext.Provider>
    );
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
