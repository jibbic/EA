import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Network, Trash2, Plus, Filter, Search, X, AlertTriangle } from 'lucide-react';
import Toast from '../components/Toast';

const RelationshipManager = () => {
  const { 
    relationships, 
    getAllEntities, 
    addRelationship, 
    deleteRelationship, 
    getEntityById,
    getValidRelationshipTypes
  } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [newRelation, setNewRelation] = useState({
    source: '',
    target: '',
    type: '',
    description: ''
  });

  const allEntities = getAllEntities();

  // Get valid relationship types based on selected source and target
  const validRelationshipTypes = useMemo(() => {
    if (!newRelation.source || !newRelation.target) return [];
    
    const sourceEntity = getEntityById(newRelation.source);
    const targetEntity = getEntityById(newRelation.target);
    if (!sourceEntity || !targetEntity) return [];
    
    return getValidRelationshipTypes(sourceEntity.entityType, targetEntity.entityType);
  }, [newRelation.source, newRelation.target, getEntityById, getValidRelationshipTypes]);

  const filteredRelationships = relationships.filter(rel => {
    const matchesSearch = 
      rel.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getEntityById(rel.source)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getEntityById(rel.target)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || rel.type === filterType;

    return matchesSearch && matchesType;
  });

  const handleAddRelationship = () => {
    if (!newRelation.source || !newRelation.target) {
      setToastMessage('⚠️ Välj både källa och målentitet');
      setShowToast(true);
      return;
    }

    if (!newRelation.type) {
      setToastMessage('⚠️ Välj en relationstyp');
      setShowToast(true);
      return;
    }

    if (newRelation.source === newRelation.target) {
      setToastMessage('⚠️ Källa och mål kan inte vara samma entitet');
      setShowToast(true);
      return;
    }

    try {
      const relationId = `rel-${Date.now()}`;
      const sourceEntity = getEntityById(newRelation.source);
      const targetEntity = getEntityById(newRelation.target);
      
      const relationToAdd = {
        id: relationId,
        source: newRelation.source,
        target: newRelation.target,
        type: newRelation.type,
        description: newRelation.description || `${sourceEntity?.name} ${newRelation.type} ${targetEntity?.name}`
      };

      addRelationship(relationToAdd);
      
      setNewRelation({
        source: '',
        target: '',
        type: '',
        description: ''
      });
      setShowAddModal(false);
      setToastMessage(`✅ Relation tillagd: ${sourceEntity?.name} → ${targetEntity?.name}`);
      setShowToast(true);
    } catch (error) {
      setToastMessage(`❌ ${error.message}`);
      setShowToast(true);
    }
  };

  const handleDeleteRelationship = (relationId, description) => {
    if (confirm(`Är du säker på att du vill ta bort relationen: ${description}?`)) {
      deleteRelationship(relationId);
      setToastMessage('✅ Relation borttagen');
      setShowToast(true);
    }
  };

  const uniqueTypes = [...new Set(relationships.map(r => r.type))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Relationshantering</h2>
            <p className="text-gray-600 mt-1">
              Hantera alla relationer mellan entiteter i arkitekturen
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Lägg till relation
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sök relationer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Alla typer</option>
            {uniqueTypes.map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totala relationer</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{relationships.length}</p>
            </div>
            <div className="bg-blue-100 rounded-lg p-3">
              <Network className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Relationstyper</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{uniqueTypes.length}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-3">
              <Filter className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Filtrerade</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{filteredRelationships.length}</p>
            </div>
            <div className="bg-purple-100 rounded-lg p-3">
              <Search className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Relationships List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          {filteredRelationships.length > 0 ? (
            <div className="space-y-3">
              {filteredRelationships.map((rel) => {
                const sourceEntity = getEntityById(rel.source);
                const targetEntity = getEntityById(rel.target);

                return (
                  <div
                    key={rel.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {sourceEntity?.name || rel.source}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({sourceEntity?.entityType || 'Unknown'})
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                            {rel.type.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {targetEntity?.name || rel.target}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({targetEntity?.entityType || 'Unknown'})
                          </span>
                        </div>
                      </div>
                      {rel.description && (
                        <p className="text-sm text-gray-600 ml-0">
                          {rel.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteRelationship(rel.id, rel.description)}
                      className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Ta bort relation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Network className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Inga relationer hittades
              </h3>
              <p className="text-gray-600">
                {searchTerm || filterType !== 'all' 
                  ? 'Prova att ändra dina filterinställningar' 
                  : 'Lägg till din första relation för att komma igång'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Relationship Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Lägg till ny relation</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Source Entity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Källentitet <span className="text-red-500">*</span>
                </label>
                <select
                  value={newRelation.source}
                  onChange={(e) => setNewRelation(prev => ({ ...prev, source: e.target.value, type: '' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Välj källentitet...</option>
                  {allEntities.map(e => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.entityType})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Entity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Målentitet <span className="text-red-500">*</span>
                </label>
                <select
                  value={newRelation.target}
                  onChange={(e) => setNewRelation(prev => ({ ...prev, target: e.target.value, type: '' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Välj målentitet...</option>
                  {allEntities
                    .filter(e => e.id !== newRelation.source)
                    .map(e => (
                      <option key={e.id} value={e.id}>
                        {e.name} ({e.entityType})
                      </option>
                    ))}
                </select>
              </div>

              {/* Relationship Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationstyp <span className="text-red-500">*</span>
                </label>
                <select
                  value={newRelation.type}
                  onChange={(e) => setNewRelation(prev => ({ ...prev, type: e.target.value }))}
                  disabled={!newRelation.source || !newRelation.target}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!newRelation.source || !newRelation.target 
                      ? 'Välj först källa och mål' 
                      : 'Välj relationstyp...'}
                  </option>
                  {validRelationshipTypes.map(relType => (
                    <option key={relType.name} value={relType.name}>
                      {relType.name.replace(/_/g, ' ')} - {relType.description}
                    </option>
                  ))}
                </select>
                {newRelation.source && newRelation.target && validRelationshipTypes.length === 0 && (
                  <div className="mt-2 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <strong>Ingen tillåten relationstyp</strong>
                      <p className="mt-1">
                        Det finns ingen tillåten relationstyp mellan {getEntityById(newRelation.source)?.entityType} och{' '}
                        {getEntityById(newRelation.target)?.entityType} enligt metamodellen.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beskrivning (valfri)
                </label>
                <textarea
                  value={newRelation.description}
                  onChange={(e) => setNewRelation(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Beskriv relationen..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Info box - show available types */}
              {newRelation.source && newRelation.target && validRelationshipTypes.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    ✓ <strong>Tillåtna relationstyper för denna kombination:</strong>
                  </p>
                  <ul className="text-xs text-green-700 mt-2 space-y-1">
                    {validRelationshipTypes.map(relType => (
                      <li key={relType.name}>
                        • <strong>{relType.name.replace(/_/g, ' ')}</strong> - {relType.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {(!newRelation.source || !newRelation.target) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    💡 Välj källa och mål för att se tillåtna relationstyper enligt metamodellen
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleAddRelationship}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Lägg till relation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default RelationshipManager;
