import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { ArrowLeft, Edit, Trash2, Network, Plus, X, AlertTriangle } from 'lucide-react';
import { useState, useMemo } from 'react';
import Toast from '../components/Toast';
import EntityGraph from '../components/EntityGraph';

const EntityDetail = () => {
  const { entityType, entityId } = useParams();
  const navigate = useNavigate();
  const { 
    entities, 
    getRelationshipsForEntity, 
    metamodel, 
    getAllEntities, 
    addRelationship, 
    deleteRelationship,
    getValidRelationshipTypes,
    getEntityById,
    updateEntity,
    deleteEntity
  } = useData();
  const [showAddRelationModal, setShowAddRelationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [newRelation, setNewRelation] = useState({
    target: '',
    type: '',
    description: ''
  });
  const [editForm, setEditForm] = useState({});

  const entity = entities[entityType]?.find(e => e.id === entityId);
  const relationships = getRelationshipsForEntity(entityId);

  // Define field types with predefined options
  const fieldOptions = {
    lifecyclePhase: [
      { value: 'planned', label: 'Planerad' },
      { value: 'development', label: 'Under utveckling' },
      { value: 'production', label: 'I produktion' },
      { value: 'maintenance', label: 'Underhåll' },
      { value: 'phaseout', label: 'Utfasning' },
      { value: 'retired', label: 'Avvecklad' }
    ],
    status: [
      { value: 'production', label: 'Produktion' },
      { value: 'development', label: 'Utveckling' },
      { value: 'testing', label: 'Test' },
      { value: 'retired', label: 'Avvecklad' },
      { value: 'planned', label: 'Planerad' }
    ],
    criticality: [
      { value: 'critical', label: 'Kritisk' },
      { value: 'high', label: 'Hög' },
      { value: 'medium', label: 'Medel' },
      { value: 'low', label: 'Låg' }
    ],
    dataClassification: [
      { value: 'secret', label: 'Hemlig' },
      { value: 'confidential', label: 'Konfidentiell' },
      { value: 'internal', label: 'Intern' },
      { value: 'public', label: 'Offentlig' }
    ],
    severity: [
      { value: 'critical', label: 'Kritisk' },
      { value: 'high', label: 'Hög' },
      { value: 'medium', label: 'Medel' },
      { value: 'low', label: 'Låg' }
    ],
    priority: [
      { value: 'critical', label: 'Kritisk' },
      { value: 'high', label: 'Hög' },
      { value: 'medium', label: 'Medel' },
      { value: 'low', label: 'Låg' }
    ],
    riskLevel: [
      { value: 'critical', label: 'Kritisk' },
      { value: 'high', label: 'Hög' },
      { value: 'medium', label: 'Medel' },
      { value: 'low', label: 'Låg' }
    ]
  };

  // Get valid relationship types based on selected target
  const validRelationshipTypes = useMemo(() => {
    if (!newRelation.target) return [];
    
    const targetEntity = getAllEntities().find(e => e.id === newRelation.target);
    if (!targetEntity) return [];
    
    return getValidRelationshipTypes(entityType, targetEntity.entityType);
  }, [newRelation.target, entityType, getValidRelationshipTypes, getAllEntities]);

  const handleAddRelationship = () => {
    if (!newRelation.target) {
      setToastMessage('⚠️ Välj en målentitet för relationen');
      setShowToast(true);
      return;
    }

    if (!newRelation.type) {
      setToastMessage('⚠️ Välj en relationstyp');
      setShowToast(true);
      return;
    }

    if (newRelation.target === entityId) {
      setToastMessage('⚠️ En entitet kan inte ha relation till sig själv');
      setShowToast(true);
      return;
    }

    try {
      const targetEntity = getAllEntities().find(e => e.id === newRelation.target);
      const relationId = `rel-${Date.now()}`;
      const relationToAdd = {
        id: relationId,
        source: entityId,
        target: newRelation.target,
        type: newRelation.type,
        description: newRelation.description || `${entity.name} ${newRelation.type} ${targetEntity?.name}`
      };

      addRelationship(relationToAdd);
      
      setNewRelation({
        target: '',
        type: '',
        description: ''
      });
      setShowAddRelationModal(false);
      setToastMessage(`✅ Relation tillagd: ${relationToAdd.type}`);
      setShowToast(true);
    } catch (error) {
      setToastMessage(`❌ ${error.message}`);
      setShowToast(true);
    }
  };

  const handleDeleteRelationship = (relationId) => {
    if (confirm('Är du säker på att du vill ta bort denna relation?')) {
      deleteRelationship(relationId);
      setToastMessage('✅ Relation borttagen');
      setShowToast(true);
    }
  };

  const handleEdit = () => {
    setEditForm({ ...entity });
    setShowEditModal(true);
  };

  const handleUpdateEntity = () => {
    if (!editForm.name || editForm.name.trim() === '') {
      setToastMessage('⚠️ Namn är obligatoriskt');
      setShowToast(true);
      return;
    }

    updateEntity(entityType, entityId, {
      ...editForm,
      id: entityId,
      entityType: entityType
    });

    setShowEditModal(false);
    setToastMessage('✅ Entitet uppdaterad');
    setShowToast(true);
  };

  const handleDeleteEntity = () => {
    if (confirm(`Är du säker på att du vill ta bort ${entity.name}? Alla relationer kommer också att tas bort.`)) {
      // Delete all relationships for this entity
      const entityRelations = getRelationshipsForEntity(entityId);
      entityRelations.forEach(rel => deleteRelationship(rel.id));
      
      // Delete the entity
      deleteEntity(entityType, entityId);
      
      // Navigate back to entities page
      navigate('/entities');
    }
  };

  if (!entity) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Entitet hittades inte</h2>
        <p className="text-gray-600 mb-6">Den begärda entiteten kunde inte hittas.</p>
        <Link
          to="/entities"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tillbaka till entiteter
        </Link>
      </div>
    );
  }

  const layer = metamodel.layers.find(l => l.entityTypes.includes(entityType));

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600">
        <Link to="/entities" className="hover:text-primary-600">
          Entiteter
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{entity.name}</span>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <span
                  className="inline-block px-3 py-1 text-sm font-medium rounded-lg"
                  style={{
                    backgroundColor: layer?.color + '20',
                    color: layer?.color
                  }}
                >
                  {entityType}
                </span>
                {layer && (
                  <span className="ml-2 text-sm text-gray-500">
                    {layer.name} Layer
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{entity.name}</h1>
              {entity.description && (
                <p className="text-gray-600">{entity.description}</p>
              )}
            </div>
            <div className="flex space-x-2 ml-4">
              <button 
                onClick={handleEdit}
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Redigera entitet"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button 
                onClick={handleDeleteEntity}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Ta bort entitet"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Egenskaper</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(entity).map(([key, value]) => {
              if (key === 'id' || key === 'name' || key === 'description' || key === 'entityType') {
                return null;
              }

              return (
                <div key={key} className="border-l-2 border-gray-200 pl-4">
                  <dt className="text-sm font-medium text-gray-500 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                  </dd>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Network className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Nätverksvy</h2>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Visualisering av denna entitet och dess direkta kopplingar
          </p>
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg" style={{ height: '400px' }}>
            <EntityGraph entityId={entityId} />
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Visar {relationships.length} direkta relationer. Blå ram = vald entitet.
          </p>
        </div>
      </div>

      {/* Relationships */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Network className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">
                Relationer ({relationships.length})
              </h2>
            </div>
            <button
              onClick={() => setShowAddRelationModal(true)}
              className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Lägg till relation
            </button>
          </div>
        </div>
        <div className="p-6">
          {relationships.length > 0 ? (
            <div className="space-y-4">
              {relationships.map((rel) => {
                const isSource = rel.source === entityId;
                const relatedId = isSource ? rel.target : rel.source;
                const direction = isSource ? 'utgående' : 'inkommande';
                const relatedEntity = getEntityById(relatedId);

                return (
                  <div
                    key={rel.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          isSource ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {rel.type}
                        </span>
                        <span className="ml-2 text-xs text-gray-500 uppercase">
                          {direction}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900">{rel.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Relaterad till: <span className="font-medium">{relatedEntity?.name || relatedId}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteRelationship(rel.id)}
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
            <p className="text-gray-600 text-center py-8">
              Inga relationer är definierade för denna entitet
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <Link
          to="/entities"
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tillbaka till entiteter
        </Link>
        <Link
          to="/visualizer"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Network className="h-4 w-4 mr-2" />
          Visa i visualisering
        </Link>
      </div>

      {/* Add Relationship Modal */}
      {showAddRelationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Lägg till relation</h3>
              <button
                onClick={() => setShowAddRelationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Källa:</strong> {entity.name} ({entityType})
                </p>
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
                  {getAllEntities()
                    .filter(e => e.id !== entityId)
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
                  disabled={!newRelation.target}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {newRelation.target ? 'Välj relationstyp...' : 'Välj först målentitet'}
                  </option>
                  {validRelationshipTypes.map(relType => (
                    <option key={relType.name} value={relType.name}>
                      {relType.name.replace(/_/g, ' ')} - {relType.description}
                    </option>
                  ))}
                </select>
                {newRelation.target && validRelationshipTypes.length === 0 && (
                  <div className="mt-2 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      <strong>Ingen tillåten relationstyp</strong>
                      <p className="mt-1">
                        Det finns ingen tillåten relationstyp mellan {entityType} och{' '}
                        {getAllEntities().find(e => e.id === newRelation.target)?.entityType} enligt metamodellen.
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

              {/* Info box - only show available types */}
              {newRelation.target && validRelationshipTypes.length > 0 && (
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
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowAddRelationModal(false)}
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

      {/* Edit Entity Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Redigera entitet</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>Typ:</strong> {entityType}
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Namn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ange namn..."
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Beskrivning
                </label>
                <textarea
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Beskriv entiteten..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Dynamic properties */}
              {Object.entries(editForm).map(([key, value]) => {
                if (key === 'id' || key === 'name' || key === 'description' || key === 'entityType' || key === 'type') {
                  return null;
                }

                // Check if this field has predefined options (dropdown)
                const hasOptions = fieldOptions[key];
                const fieldLabel = key.replace(/([A-Z])/g, ' $1').trim();
                const isDateField = key.toLowerCase().includes('date') || key === 'validFrom' || key === 'validTo';
                const isNumberField = key.toLowerCase().includes('users') || key.toLowerCase().includes('count') || key.toLowerCase().includes('number');

                return (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {fieldLabel}
                    </label>
                    {hasOptions ? (
                      // Render dropdown for fields with predefined options
                      <select
                        value={value || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="">Välj {fieldLabel.toLowerCase()}...</option>
                        {hasOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : isDateField ? (
                      // Render date input for date fields
                      <input
                        type="date"
                        value={value || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    ) : isNumberField ? (
                      // Render number input for numeric fields
                      <input
                        type="number"
                        value={value || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={`Ange ${fieldLabel.toLowerCase()}...`}
                        min="0"
                      />
                    ) : (
                      // Render text input for other fields
                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => setEditForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder={`Ange ${fieldLabel.toLowerCase()}...`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Avbryt
              </button>
              <button
                onClick={handleUpdateEntity}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Spara ändringar
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

export default EntityDetail;
