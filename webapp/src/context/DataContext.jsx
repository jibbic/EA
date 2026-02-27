import { createContext, useContext, useState, useEffect } from 'react';
import yaml from 'js-yaml';
import sampleData from '../data/sampleData';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

// Transform sampleData to initial metamodel structure
const initialMetamodel = {
  layers: [
    {
      name: 'Business',
      color: '#FFD93D',
      entityTypes: ['BusinessCapability', 'BusinessProcess', 'OrganizationalUnit', 'Person', 'Role']
    },
    {
      name: 'Application',
      color: '#6BCB77',
      entityTypes: ['ApplicationSystem', 'ApplicationComponent', 'ApplicationInterface']
    },
    {
      name: 'Technology',
      color: '#4D96FF',
      entityTypes: ['InfrastructureNode', 'Network', 'TechnologyPlatform', 'Location']
    },
    {
      name: 'Security',
      color: '#FF6B6B',
      entityTypes: ['SecurityControl', 'ThreatScenario', 'Vulnerability', 'SecurityIncident', 'RiskAssessment']
    },
    {
      name: 'Data',
      color: '#9B59B6',
      entityTypes: ['DataObject', 'DataStore', 'DataFlow']
    },
    {
      name: 'Governance',
      color: '#95A5A6',
      entityTypes: ['Policy', 'Supplier', 'ComplianceRequirement']
    }
  ],
  relationshipTypes: sampleData.metamodel.relationshipTypes
};

// Transform flat entity array to grouped object by type
const groupEntitiesByType = (entities) => {
  const grouped = {};
  entities.forEach(entity => {
    const type = entity.type;
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

export const DataProvider = ({ children }) => {
  const [metamodel, setMetamodel] = useState(initialMetamodel);
  const [entities, setEntities] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('nis2-entities');
    return saved ? JSON.parse(saved) : initialEntities;
  });
  const [relationships, setRelationships] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('nis2-relationships');
    return saved ? JSON.parse(saved) : initialRelationships;
  });
  const [nis2Mappings, setNis2Mappings] = useState(null);

  // Save entities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nis2-entities', JSON.stringify(entities));
  }, [entities]);

  // Save relationships to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('nis2-relationships', JSON.stringify(relationships));
  }, [relationships]);

  // Load NIS2 mappings
  useEffect(() => {
    // In a real app, this would load from the YAML file
    setNis2Mappings({
      'Article 21a': {
        title: 'Risk Analysis and Security Policies',
        entities: ['RiskAssessment', 'Policy', 'ThreatScenario']
      },
      'Article 21b': {
        title: 'Incident Handling',
        entities: ['SecurityIncident', 'BusinessProcess']
      },
      'Article 21c': {
        title: 'Business Continuity',
        entities: ['BusinessProcess', 'ApplicationSystem']
      },
      'Article 21d': {
        title: 'Supply Chain Security',
        entities: ['Supplier', 'ApplicationSystem', 'InfrastructureNode']
      },
      'Article 21e': {
        title: 'Security in Acquisition',
        entities: ['Supplier', 'Policy']
      },
      'Article 21f': {
        title: 'Effectiveness of Security Measures',
        entities: ['SecurityControl', 'RiskAssessment']
      },
      'Article 21g': {
        title: 'Cryptography',
        entities: ['SecurityControl', 'DataStore', 'DataFlow']
      },
      'Article 21h': {
        title: 'Personnel Security',
        entities: ['Person', 'Role', 'Policy']
      },
      'Article 21i': {
        title: 'Access Control',
        entities: ['SecurityControl', 'Person', 'Role']
      },
      'Article 21j': {
        title: 'Asset Management',
        entities: ['ApplicationSystem', 'InfrastructureNode', 'DataStore']
      },
      'Article 21k': {
        title: 'Authentication',
        entities: ['SecurityControl', 'ApplicationSystem']
      }
    });
  }, []);

  const addEntity = (entityType, entity) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: [...(prev[entityType] || []), entity]
    }));
  };

  const updateEntity = (entityType, entityId, updatedEntity) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: prev[entityType].map(e => 
        e.id === entityId ? updatedEntity : e
      )
    }));
  };

  const deleteEntity = (entityType, entityId) => {
    setEntities(prev => ({
      ...prev,
      [entityType]: prev[entityType].filter(e => e.id !== entityId)
    }));
  };

  // Get valid relationship types between two entity types
  const getValidRelationshipTypes = (sourceEntityType, targetEntityType) => {
    if (!sourceEntityType || !targetEntityType) {
      return [];
    }

    return metamodel.relationshipTypes.filter(relType => {
      const validSource = relType.validFrom.includes(sourceEntityType);
      const validTarget = relType.validTo.includes(targetEntityType);
      return validSource && validTarget;
    });
  };

  // Check if a specific relationship is valid according to metamodel
  const isRelationshipValid = (sourceEntityType, targetEntityType, relationshipType) => {
    const validTypes = getValidRelationshipTypes(sourceEntityType, targetEntityType);
    return validTypes.some(relType => relType.name === relationshipType);
  };

  const addRelationship = (relationship) => {
    // Get source and target entities
    const sourceEntity = getEntityById(relationship.source);
    const targetEntity = getEntityById(relationship.target);

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

    setRelationships(prev => [...prev, relationship]);
  };

  const deleteRelationship = (relationshipId) => {
    setRelationships(prev => prev.filter(r => r.id !== relationshipId));
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
    if (!nis2Mappings) return {};
    
    const status = {};
    Object.entries(nis2Mappings).forEach(([article, config]) => {
      const requiredEntities = config.entities;
      const existingEntities = requiredEntities.filter(
        entityType => entities[entityType] && entities[entityType].length > 0
      );
      
      status[article] = {
        title: config.title,
        covered: existingEntities.length,
        total: requiredEntities.length,
        percentage: Math.round((existingEntities.length / requiredEntities.length) * 100)
      };
    });
    
    return status;
  };

  // Export all data as JSON
  const exportData = () => {
    const data = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      entities,
      relationships
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nis2-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import data from JSON
  const importData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (!data.entities || !data.relationships) {
        throw new Error('Ogiltig filformat');
      }
      
      setEntities(data.entities);
      setRelationships(data.relationships);
      
      return { success: true, message: 'Data importerad' };
    } catch (error) {
      return { success: false, message: `Import misslyckades: ${error.message}` };
    }
  };

  // Reset to initial data
  const resetData = () => {
    setEntities(initialEntities);
    setRelationships(initialRelationships);
    localStorage.removeItem('nis2-entities');
    localStorage.removeItem('nis2-relationships');
  };

  const value = {
    metamodel,
    entities,
    relationships,
    nis2Mappings,
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
    resetData
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
