import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HierarchyTree from './HierarchyTree';
import { GitBranch } from 'lucide-react';

const HierarchyView = ({ entityTypes }) => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(entityTypes[0] || '');

  const handleNodeClick = (entityId) => {
    navigate(`/entities/${selectedType}/${entityId}`);
  };

  // Entity types that typically have hierarchies (ArchiMate 3.1 types)
  const hierarchicalTypes = entityTypes.filter(type => 
    ['BusinessProcess', 'Capability', 'BusinessFunction', 
     'ApplicationComponent', 'Node', 'Goal', 'Requirement'].includes(type)
  );

  // Update selectedType when entityTypes changes (e.g., when switching perspectives)
  useEffect(() => {
    if (hierarchicalTypes.length > 0 && !hierarchicalTypes.includes(selectedType)) {
      setSelectedType(hierarchicalTypes[0]);
    }
  }, [entityTypes, hierarchicalTypes, selectedType]);

  if (hierarchicalTypes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <GitBranch className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Hierarkiska vyer
            </h2>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {hierarchicalTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Klicka på en nod för att se detaljer. Använd mushjulet för att zooma.
        </p>
      </div>
      <div className="p-6" style={{ height: '600px' }}>
        {selectedType && (
          <HierarchyTree 
            entityType={selectedType} 
            onNodeClick={handleNodeClick}
          />
        )}
      </div>
    </div>
  );
};

export default HierarchyView;
