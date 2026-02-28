import { X, ExternalLink } from 'lucide-react';
import { useEffect, useRef } from 'react';

const EntityQuickView = ({ entity, position, onClose, onViewDetails }) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!entity || !position) return null;

  // Calculate position to place popover near click position
  // Place it slightly offset from cursor to avoid covering the clicked element
  const popoverWidth = 320;
  const popoverHeight = 250;
  const offsetX = 5; // Small horizontal offset from cursor
  const offsetY = 5; // Small vertical offset from cursor
  
  const adjustedStyle = {
    position: 'fixed',
    left: `${Math.max(10, Math.min(position.x + offsetX, window.innerWidth - popoverWidth - 10))}px`,
    top: `${Math.max(10, Math.min(position.y + offsetY, window.innerHeight - popoverHeight - 10))}px`,
    zIndex: 9999
  };

  // Get layer color based on entity type
  const getLayerColor = (entityType) => {
    const layerColors = {
      'BusinessActor': '#F4D03F', 'BusinessRole': '#F4D03F', 'BusinessProcess': '#F4D03F',
      'BusinessFunction': '#F4D03F', 'BusinessService': '#F4D03F', 'BusinessObject': '#F4D03F',
      'ApplicationComponent': '#5DADE2', 'ApplicationInterface': '#5DADE2', 'ApplicationFunction': '#5DADE2',
      'ApplicationService': '#5DADE2', 'DataObject': '#5DADE2',
      'Node': '#52BE80', 'Device': '#52BE80', 'SystemSoftware': '#52BE80', 'TechnologyService': '#52BE80',
      'CommunicationNetwork': '#52BE80', 'Artifact': '#52BE80',
      'Goal': '#E74C3C', 'Requirement': '#E74C3C', 'Stakeholder': '#E67E22', 'Principle': '#3498DB',
      'Capability': '#AF7AC5', 'Resource': '#AF7AC5',
      'Facility': '#797D7F', 'Equipment': '#797D7F',
      'WorkPackage': '#EC7063', 'Deliverable': '#F39C12', 'Gap': '#E74C3C'
    };
    return layerColors[entityType] || '#999999';
  };

  const color = getLayerColor(entity.entityType);

  return (
    <div
      ref={popoverRef}
      className="bg-white rounded-lg shadow-2xl border-2 w-80 animate-in fade-in zoom-in duration-200"
      style={{ ...adjustedStyle, borderColor: color }}
    >
      {/* Header */}
      <div 
        className="px-4 py-3 border-b flex items-start justify-between"
        style={{ backgroundColor: `${color}20` }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="inline-block px-2 py-0.5 text-xs font-semibold rounded"
              style={{ backgroundColor: color, color: '#fff' }}
            >
              {entity.entityType}
            </span>
            {entity.criticality && (
              <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                entity.criticality === 'critical' ? 'bg-red-100 text-red-800' :
                entity.criticality === 'high' ? 'bg-orange-100 text-orange-800' :
                entity.criticality === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {entity.criticality}
              </span>
            )}
          </div>
          <h3 className="text-sm font-bold text-gray-900 truncate">{entity.name}</h3>
        </div>
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
          title="Stäng"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3 max-h-40 overflow-y-auto">
        {entity.description && (
          <p className="text-sm text-gray-700 mb-3">{entity.description}</p>
        )}
        
        {/* Quick info */}
        <div className="space-y-2 text-xs">
          {entity.owner && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Ägare:</span>
              <span className="font-medium text-gray-900">{entity.owner}</span>
            </div>
          )}
          {entity.status && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-gray-900">{entity.status}</span>
            </div>
          )}
          {entity.lifecyclePhase && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Livscykel:</span>
              <span className="font-medium text-gray-900">{entity.lifecyclePhase}</span>
            </div>
          )}
          {entity.rto && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">RTO:</span>
              <span className="font-medium text-gray-900">{entity.rto}</span>
            </div>
          )}
          {entity.budget && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Budget:</span>
              <span className="font-medium text-gray-900">{entity.budget}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer with action button */}
      <div className="px-4 py-3 border-t bg-gray-50">
        <button
          onClick={onViewDetails}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Läs mer om denna entitet
        </button>
      </div>
    </div>
  );
};

export default EntityQuickView;
