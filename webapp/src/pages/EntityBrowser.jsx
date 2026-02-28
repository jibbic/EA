import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Plus, Filter, ChevronRight, X, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import Toast from '../components/Toast';

const EntityBrowser = () => {
  const { metamodel, entities, getAllEntities, addEntity } = useData();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [newEntity, setNewEntity] = useState({
    entityType: '',
    name: '',
    description: '',
    criticality: 'normal',
    status: 'active',
    owner: ''
  });

  // Read type from URL query parameter on mount
  useEffect(() => {
    const typeFromUrl = searchParams.get('type');
    if (typeFromUrl) {
      setSelectedType(typeFromUrl);
    }
  }, [searchParams]);

  const allEntities = getAllEntities();

  // Helper function to get entity types for a layer
  const getEntityTypesForLayer = (layerId) => {
    if (!metamodel.entityTypes) return [];
    return metamodel.entityTypes
      .filter(et => et.layer === layerId)
      .map(et => et.id);
  };

  const filteredEntities = allEntities.filter((entity) => {
    const matchesSearch = entity.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLayer = selectedLayer === 'all' || 
      (() => {
        const layer = metamodel.layers.find(l => l.name === selectedLayer);
        if (!layer) return false;
        const layerTypes = getEntityTypesForLayer(layer.id || layer.name.toLowerCase());
        return layerTypes.includes(entity.entityType);
      })();
    
    const matchesType = selectedType === 'all' || entity.entityType === selectedType;

    return matchesSearch && matchesLayer && matchesType;
  });

  const getLayerForEntityType = (entityType) => {
    if (!metamodel.entityTypes) return null;
    const entityTypeDef = metamodel.entityTypes.find(et => et.id === entityType);
    if (!entityTypeDef) return null;
    return metamodel.layers.find(layer => layer.id === entityTypeDef.layer || layer.name.toLowerCase() === entityTypeDef.layer);
  };

  // Get available entity types based on selected layer
  const getAvailableEntityTypes = () => {
    if (selectedLayer === 'all') {
      return [...new Set(allEntities.map(e => e.entityType))];
    }
    
    const layer = metamodel.layers.find(l => l.name === selectedLayer);
    if (!layer) return [];
    
    const layerTypes = getEntityTypesForLayer(layer.id || layer.name.toLowerCase());
    return [...new Set(allEntities.map(e => e.entityType))].filter(type => layerTypes.includes(type));
  };

  const entityTypes = getAvailableEntityTypes();

  // Reset selectedType if it's not available in current layer
  useEffect(() => {
    if (selectedType !== 'all' && !entityTypes.includes(selectedType)) {
      setSelectedType('all');
    }
  }, [selectedLayer, entityTypes, selectedType]);

  const handleAddEntity = () => {
    if (!newEntity.entityType || !newEntity.name) {
      setToastMessage('⚠️ Vänligen fyll i entitetstyp och namn');
      setShowToast(true);
      return;
    }

    const entityId = `${newEntity.entityType.toLowerCase()}-${Date.now()}`;
    const entityToAdd = {
      id: entityId,
      ...newEntity
    };

    addEntity(newEntity.entityType, entityToAdd);
    
    // Reset form
    setNewEntity({
      entityType: '',
      name: '',
      description: '',
      criticality: 'normal',
      status: 'active',
      owner: ''
    });
    setShowModal(false);
    
    setToastMessage(`✅ Entitet "${newEntity.name}" har lagts till!`);
    setShowToast(true);
  };

  const handleInputChange = (field, value) => {
    setNewEntity(prev => ({ ...prev, [field]: value }));
  };

  const allEntityTypes = metamodel.entityTypes ? metamodel.entityTypes.map(et => et.id) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Entitetshantering</h2>
            <p className="text-gray-600 mt-1">
              Bläddra, sök och hantera alla entiteter i arkitekturen
            </p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Lägg till entitet
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sök entiteter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Alla skikt</option>
            {metamodel.layers.map((layer) => (
              <option key={layer.name} value={layer.name}>
                {layer.name}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Alla typer</option>
            {entityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Visar <span className="font-semibold">{filteredEntities.length}</span> av{' '}
          <span className="font-semibold">{allEntities.length}</span> entiteter
        </p>
      </div>

      {/* Entity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntities.map((entity) => {
          const layer = getLayerForEntityType(entity.entityType);
          
          return (
            <Link
              key={entity.id}
              to={`/entities/${entity.entityType}/${entity.id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 group"
              style={{ borderLeftColor: layer?.color || '#999' }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-1 gap-2">
                      <span
                        className="inline-block px-2 py-1 text-xs font-medium rounded"
                        style={{
                          backgroundColor: layer?.color + '20',
                          color: layer?.color
                        }}
                      >
                        {entity.entityType}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {entity.name}
                    </h3>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                
                {entity.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {entity.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {entity.criticality && (
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                      entity.criticality === 'critical' ? 'bg-red-100 text-red-800' :
                      entity.criticality === 'high' ? 'bg-orange-100 text-orange-800' :
                      entity.criticality === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {entity.criticality}
                    </span>
                  )}
                  {entity.status && (
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded ${
                      entity.status === 'production' || entity.status === 'active' || entity.status === 'implemented'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {entity.status}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredEntities.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Filter className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Inga entiteter hittades
          </h3>
          <p className="text-gray-600">
            Prova att ändra dina filterinställningar eller sökterm
          </p>
        </div>
      )}

      {/* Add Entity Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Lägg till ny entitet</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Entity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entitetstyp <span className="text-red-500">*</span>
                </label>
                <select
                  value={newEntity.entityType}
                  onChange={(e) => handleInputChange('entityType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Välj typ...</option>
                  {allEntityTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Namn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newEntity.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="T.ex. 'Customer Portal' eller 'Web Server 01'"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beskrivning
                </label>
                <textarea
                  value={newEntity.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Beskriv entitetens syfte och funktion..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Criticality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kritikalitet
                  </label>
                  <select
                    value={newEntity.criticality}
                    onChange={(e) => handleInputChange('criticality', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={newEntity.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="production">Production</option>
                    <option value="development">Development</option>
                    <option value="retired">Retired</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>

              {/* Owner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ägare/Ansvarig
                </label>
                <input
                  type="text"
                  value={newEntity.owner}
                  onChange={(e) => handleInputChange('owner', e.target.value)}
                  placeholder="T.ex. 'IT Department' eller 'Security Team'"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Info box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tips:</strong> Efter att entiteten lagts till kan du redigera den för att lägga till fler specifika attribut.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleAddEntity}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Lägg till entitet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default EntityBrowser;
