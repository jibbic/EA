import { X, Network, Edit, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const EntityDetailModal = ({ entity, onClose }) => {
  const { getRelationshipsForEntity, metamodel, getEntityById } = useData();

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!entity) return null;

  const relationships = getRelationshipsForEntity(entity.id);

  // Find layer for entity type
  const getLayerForEntityType = (entityType) => {
    if (!metamodel.entityTypes) return null;
    const entityTypeDef = metamodel.entityTypes.find(et => et.id === entityType);
    if (!entityTypeDef) return null;
    return metamodel.layers.find(layer => 
      layer.id === entityTypeDef.layer || 
      layer.name.toLowerCase() === entityTypeDef.layer
    );
  };

  const layer = getLayerForEntityType(entity.entityType);

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-4">
        <div 
          className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-block px-3 py-1 text-sm font-semibold rounded-lg"
                    style={{
                      backgroundColor: layer?.color + '20',
                      color: layer?.color
                    }}
                  >
                    {entity.entityType}
                  </span>
                  {layer && (
                    <span className="text-sm text-gray-500">
                      {layer.name} Layer
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{entity.name}</h2>
                {entity.description && (
                  <p className="text-gray-600">{entity.description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                title="Stäng (Esc)"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-4">
              {/* Properties */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Egenskaper</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(entity).map(([key, value]) => {
                    if (key === 'id' || key === 'name' || key === 'description' || key === 'entityType') {
                      return null;
                    }

                    return (
                      <div key={key} className="border-l-2 border-gray-200 pl-3">
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {typeof value === 'object' 
                            ? JSON.stringify(value, null, 2) 
                            : String(value)}
                        </dd>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Relationships */}
              {relationships.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Network className="h-5 w-5 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Relationer ({relationships.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {relationships.slice(0, 10).map((rel) => {
                      const isSource = rel.source === entity.id;
                      const otherId = isSource ? rel.target : rel.source;
                      const otherEntity = getEntityById(otherId);
                      
                      if (!otherEntity) return null;

                      return (
                        <div
                          key={rel.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-500">
                                {rel.type}
                              </span>
                              <span className="text-xs text-gray-400">
                                {isSource ? '→' : '←'}
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {otherEntity.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {otherEntity.entityType}
                            </p>
                          </div>
                          <Link
                            to={`/entities/${otherEntity.entityType}/${otherEntity.id}`}
                            className="ml-2 px-3 py-1 text-xs font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded transition-colors"
                            onClick={onClose}
                          >
                            Visa
                          </Link>
                        </div>
                      );
                    })}
                    {relationships.length > 10 && (
                      <p className="text-sm text-gray-500 text-center py-2">
                        ... och {relationships.length - 10} fler relationer
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <Link
              to={`/entities/${entity.entityType}/${entity.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
              onClick={onClose}
            >
              <Edit className="h-4 w-4" />
              Öppna fullständig detaljsida
            </Link>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              Stäng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityDetailModal;
