import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Map, Target, CheckCircle, Compass, TrendingUp,
  Building2, GitBranch, Puzzle, FileText, Cpu, Share2,
  Monitor, Database, Server, HardDrive, FolderKanban,
  ArrowRightLeft, Layers, Globe, Users,
  Plus, ChevronRight, ChevronDown, Trash2, Edit3,
  LayoutTemplate, Eye, X, Save, AlertCircle, BarChart3,
  Sparkles, Search, GitMerge
} from 'lucide-react';
import VIEWPOINTS, {
  VIEWPOINT_CATEGORIES,
  scoreViewpoint,
  relevanceLabel,
} from '../data/archimateViewpoints';
import { getLayerColor, layerBadgeClass } from '../utils/archimateStyles';
import ModelDiagram from '../components/ModelDiagram';
import { useData } from '../context/DataContext';

// ── Icon mapping ──────────────────────────────────────────────────────────────
const ICONS = {
  Users, Target, CheckCircle, Map, Compass, TrendingUp,
  Building2, GitBranch, Puzzle, FileText, Cpu, Share2,
  Monitor, Database, Server, HardDrive, FolderKanban,
  ArrowRightLeft, Layers, Globe, LayoutTemplate,
};

const ViewpointIcon = ({ name, size = 20, className = '' }) => {
  const Icon = ICONS[name] || LayoutTemplate;
  return <Icon size={size} className={className} />;
};

// ── Category color classes ────────────────────────────────────────────────────
const CAT_COLORS = {
  motivation:     { bg: 'bg-purple-500', light: 'bg-purple-50', ring: 'ring-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
  strategy:       { bg: 'bg-violet-500', light: 'bg-violet-50', ring: 'ring-violet-200', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
  business:       { bg: 'bg-yellow-500', light: 'bg-yellow-50', ring: 'ring-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  application:    { bg: 'bg-blue-500',   light: 'bg-blue-50',   ring: 'ring-blue-200',   text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700'   },
  technology:     { bg: 'bg-green-500',  light: 'bg-green-50',  ring: 'ring-green-200',  text: 'text-green-700',  badge: 'bg-green-100 text-green-700'  },
  implementation: { bg: 'bg-orange-500', light: 'bg-orange-50', ring: 'ring-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  crosslayer:     { bg: 'bg-slate-500',  light: 'bg-slate-50',  ring: 'ring-slate-200',  text: 'text-slate-700',  badge: 'bg-slate-100 text-slate-700'  },
};

// ── Relevance dot ─────────────────────────────────────────────────────────────
const RelevanceDot = ({ score }) => {
  const configs = [
    { dot: 'bg-gray-300',   label: 'Inga data',       text: 'text-gray-400' },
    { dot: 'bg-amber-400',  label: 'Delvis relevant',  text: 'text-amber-600' },
    { dot: 'bg-blue-400',   label: 'Relevant',         text: 'text-blue-600' },
    { dot: 'bg-green-500',  label: 'Fullt relevant',   text: 'text-green-600' },
  ];
  const c = configs[score];
  return (
    <span className={`flex items-center text-xs ${c.text}`}>
      <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${c.dot}`} />
      {c.label}
    </span>
  );
};

// ── Local storage helpers ─────────────────────────────────────────────────────
const STORAGE_KEY = 'nis2-ea-models';
const loadModels = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
};
const saveModels = (models) => localStorage.setItem(STORAGE_KEY, JSON.stringify(models));

// ── Create-Model form (inline under a viewpoint card) ─────────────────────────
const CreateModelForm = ({ viewpoint, onSave, onCancel }) => {
  const { entities } = useData();
  const [name, setName]           = useState(`${viewpoint.name} – ${new Date().toLocaleDateString('sv-SE')}`);
  const [desc, setDesc]           = useState('');
  const [search, setSearch]       = useState('');
  const [focalEntity, setFocal]   = useState(null);
  const [depth, setDepth]         = useState(2);
  const [showSuggestions, setSuggestions] = useState(false);

  const allEntities = useMemo(() => Object.values(entities).flat(), [entities]);
  const allowedTypes = useMemo(() => new Set([...viewpoint.primaryTypes, ...viewpoint.secondaryTypes]), [viewpoint]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allEntities
      .filter(e => allowedTypes.has(e.entityType) && e.name.toLowerCase().includes(q))
      .slice(0, 8);
  }, [search, allEntities, allowedTypes]);

  const selectEntity = (e) => {
    setFocal(e);
    setSearch(e.name);
    setSuggestions(false);
    if (name.startsWith(viewpoint.name)) setName(`${e.name} – ${viewpoint.name}`);
  };

  const handleSave = () => {
    if (!name.trim() || !focalEntity) return;
    const model = {
      id: `model-${Date.now()}`,
      viewpointId:   viewpoint.id,
      name:          name.trim(),
      description:   desc,
      focalEntityId: focalEntity.id,
      depth,
      entityIds:     null,
      createdAt:     new Date().toISOString(),
      updatedAt:     new Date().toISOString(),
    };
    onSave(model);
  };

  const DEPTHS = [
    { v: 1, label: '1 hop',  desc: 'Direkta kopplingar' },
    { v: 2, label: '2 hopp', desc: 'Grannar till grannar' },
    { v: 3, label: '3 hopp', desc: 'Bred kontext' },
  ];

  return (
    <div className="border border-dashed border-gray-300 rounded-xl bg-white p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-gray-800 text-sm flex items-center">
          <Plus size={14} className="mr-1.5 text-primary-600" />
          Ny modell – {viewpoint.name}
        </h4>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X size={16} /></button>
      </div>

      {/* Focal entity search */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Utgångsentitet *
          <span className="ml-1 text-gray-400 font-normal">(diagrammet byggs utifrån denna)</span>
        </label>
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setFocal(null); setSuggestions(true); }}
            onFocus={() => setSuggestions(true)}
            onBlur={() => setTimeout(() => setSuggestions(false), 150)}
            className="w-full text-sm border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-primary-400 outline-none"
            placeholder={`Sök bland ${[...allowedTypes].slice(0, 2).join(', ')}…`}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {suggestions.map(e => (
                <li key={e.id}>
                  <button
                    onMouseDown={() => selectEntity(e)}
                    className="flex items-center w-full px-3 py-2 text-left hover:bg-gray-50"
                  >
                    <span className={`text-xs px-1.5 py-0.5 rounded mr-2 flex-shrink-0 ${layerBadgeClass(getLayerColor(e.entityType))}`}>
                      {e.entityType}
                    </span>
                    <span className="text-sm text-gray-700 truncate">{e.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {focalEntity && (
          <div className="mt-1.5 flex items-center text-xs text-green-600">
            <GitMerge size={12} className="mr-1" />
            Vald: <span className="font-semibold ml-1">{focalEntity.name}</span>
            <span className="ml-1 text-gray-400">({focalEntity.entityType})</span>
          </div>
        )}
      </div>

      {/* Depth */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">Expansionsdjup</label>
        <div className="flex gap-2">
          {DEPTHS.map(d => (
            <button
              key={d.v}
              onClick={() => setDepth(d.v)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs border transition-all ${
                depth === d.v
                  ? 'bg-primary-50 border-primary-400 text-primary-700 font-semibold'
                  : 'border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold">{d.label}</div>
              <div className="text-gray-400 mt-0.5">{d.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Model name */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Modellnamn *</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 outline-none"
          placeholder="Ge modellen ett namn…"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Beskrivning (valfritt)</label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          rows={2}
          className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-400 outline-none resize-none"
          placeholder="Vad visar denna modell?"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800">Avbryt</button>
        <button
          onClick={handleSave}
          disabled={!focalEntity || !name.trim()}
          className="flex items-center px-4 py-1.5 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save size={13} className="mr-1.5" />
          Skapa &amp; Öppna
        </button>
      </div>
    </div>
  );
};

// ── Viewpoint Card ────────────────────────────────────────────────────────────
const ViewpointCard = ({ viewpoint, score, savedModels, entityCounts, onCreate, onOpenModel, onDeleteModel }) => {
  const [expanded, setExpanded]       = useState(false);
  const [showCreate, setShowCreate]   = useState(false);
  const [showModels, setShowModels]   = useState(false);
  const cat = CAT_COLORS[viewpoint.category] || CAT_COLORS.crosslayer;

  const handleCreate = (model) => {
    onCreate(model);
    setShowCreate(false);
    onOpenModel(model);
  };

  return (
    <div
      className={`rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col ${
        score === 3 ? 'border-gray-200' : score === 0 ? 'opacity-60 border-gray-100' : 'border-gray-200'
      }`}
    >
      {/* Color band header */}
      <div className={`${cat.bg} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-2 text-white">
          <ViewpointIcon name={viewpoint.icon} size={18} />
          <span className="font-semibold text-sm">{viewpoint.name}</span>
        </div>
        <span className="text-white/70 text-xs">{viewpoint.archimateStd}</span>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col space-y-3">
        {/* Description */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{viewpoint.description}</p>

        {/* Entity type pills */}
        <div className="flex flex-wrap gap-1.5">
          {viewpoint.primaryTypes.map(t => (
            <span key={t} className={`text-xs px-2 py-0.5 rounded-full font-medium ${layerBadgeClass(getLayerColor(t))}`}>
              {t}
            </span>
          ))}
          {viewpoint.secondaryTypes.slice(0, 3).map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
              {t}
            </span>
          ))}
          {viewpoint.secondaryTypes.length > 3 && (
            <span className="text-xs text-gray-400">+{viewpoint.secondaryTypes.length - 3}</span>
          )}
        </div>

        {/* Relevance + stats row */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <RelevanceDot score={score} />
          <span className="text-xs text-gray-400">
            {savedModels.length > 0 ? `${savedModels.length} modell${savedModels.length > 1 ? 'er' : ''}` : 'Inga modeller'}
          </span>
        </div>

        {/* Use cases (expandable) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-xs text-gray-400 hover:text-gray-600"
        >
          {expanded ? <ChevronDown size={12} className="mr-1" /> : <ChevronRight size={12} className="mr-1" />}
          Exempel på användningsfall
        </button>
        {expanded && (
          <ul className="space-y-0.5 pl-3">
            {viewpoint.exampleUseCases.map(uc => (
              <li key={uc} className="text-xs text-gray-500 list-disc">{uc}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions footer */}
      <div className="border-t border-gray-100 px-4 py-2.5 flex items-center justify-between bg-gray-50">
        {savedModels.length > 0 ? (
          <button
            onClick={() => setShowModels(!showModels)}
            className="flex items-center text-xs text-gray-600 hover:text-gray-800"
          >
            <Eye size={13} className="mr-1" />
            {showModels ? 'Dölj' : 'Visa'} modeller
          </button>
        ) : (
          <span className="text-xs text-gray-400 italic">Inga sparade modeller</span>
        )}
        <button
          onClick={() => { setShowCreate(!showCreate); setShowModels(false); }}
          disabled={score === 0}
          className="flex items-center text-xs font-medium px-3 py-1.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={13} className="mr-1" />
          Ny modell
        </button>
      </div>

      {/* Saved models list */}
      {showModels && savedModels.length > 0 && (
        <div className="border-t border-gray-100 divide-y divide-gray-50">
          {savedModels.map(m => (
            <div key={m.id} className="flex items-center px-4 py-2 hover:bg-gray-50 group">
              <LayoutTemplate size={13} className="text-gray-400 mr-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-700 truncate">{m.name}</p>
                <p className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString('sv-SE')}</p>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => onOpenModel(m)} className="p-1 text-primary-600 hover:text-primary-700">
                  <Eye size={13} />
                </button>
                <button onClick={() => onDeleteModel(m.id)} className="p-1 text-red-400 hover:text-red-600">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create form */}
      {showCreate && (
        <div className="border-t border-gray-100 p-4">
          <CreateModelForm
            viewpoint={viewpoint}

            onSave={handleCreate}
            onCancel={() => setShowCreate(false)}
          />
        </div>
      )}
    </div>
  );
};

// ── Model Viewer (full-width canvas mode) ─────────────────────────────────────
const ModelViewer = ({ model, viewpoint, onClose, onRename }) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(model.name);

  const saveRename = () => { onRename(model.id, newName); setEditing(false); };

  return (
    <div className="flex flex-col h-full">
      {/* Viewer header */}
      <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center space-x-3 min-w-0">
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 flex-shrink-0">
            <X size={18} />
          </button>
          <div className={`w-2 h-6 rounded-sm ${CAT_COLORS[viewpoint.category]?.bg || 'bg-gray-400'} flex-shrink-0`} />
          {editing ? (
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') saveRename(); if (e.key === 'Escape') setEditing(false); }}
                className="flex-1 text-sm font-semibold border-b-2 border-primary-400 outline-none bg-transparent"
                autoFocus
              />
              <button onClick={saveRename} className="text-primary-600 hover:text-primary-700"><Save size={14} /></button>
              <button onClick={() => setEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 min-w-0">
              <h2 className="text-sm font-semibold text-gray-800 truncate">{model.name}</h2>
              <button onClick={() => setEditing(true)} className="p-1 text-gray-300 hover:text-gray-500 flex-shrink-0">
                <Edit3 size={13} />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
          <span className={`text-xs px-2 py-0.5 rounded-full ${CAT_COLORS[viewpoint.category]?.badge}`}>
            {viewpoint.name}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(model.createdAt).toLocaleDateString('sv-SE')}
          </span>
        </div>
      </div>

      {/* Diagram */}
      <div className="flex-1 min-h-0">
        <ModelDiagram
          viewpoint={viewpoint}
          model={{
            focalEntityId: model.focalEntityId || null,
            depth:         model.depth ?? 2,
            relTypeFilter: model.relTypeFilter || null,
          }}
          height="100%"
        />
      </div>
    </div>
  );
};

// ── Main Models page ──────────────────────────────────────────────────────────
export default function Models() {
  const { entities } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedModels, setSavedModels]       = useState(loadModels);
  const [openModel, setOpenModel]           = useState(null); // { model, viewpoint }

  // ── Entity counts by type ─────────────────────────────────────────────────
  const entityCounts = useMemo(() => {
    const counts = {};
    Object.values(entities).flat().forEach(e => {
      counts[e.entityType] = (counts[e.entityType] || 0) + 1;
    });
    return counts;
  }, [entities]);

  // ── Scored viewpoints ─────────────────────────────────────────────────────
  const scoredViewpoints = useMemo(() =>
    VIEWPOINTS.map(vp => ({ ...vp, score: scoreViewpoint(vp, entityCounts) }))
      .sort((a, b) => b.score - a.score),
    [entityCounts]
  );

  // ── Category breakdown ────────────────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    const counts = { all: scoredViewpoints.length };
    scoredViewpoints.forEach(vp => {
      counts[vp.category] = (counts[vp.category] || 0) + 1;
    });
    return counts;
  }, [scoredViewpoints]);

  const visibleViewpoints = useMemo(() =>
    activeCategory === 'all'
      ? scoredViewpoints
      : scoredViewpoints.filter(vp => vp.category === activeCategory),
    [scoredViewpoints, activeCategory]
  );

  // Relevance stats for the banner
  const relevantCount = scoredViewpoints.filter(v => v.score >= 2).length;

  // ── Model CRUD ────────────────────────────────────────────────────────────
  const handleCreate = useCallback((model) => {
    setSavedModels(prev => {
      const updated = [...prev, model];
      saveModels(updated);
      return updated;
    });
  }, []);

  const handleDelete = useCallback((modelId) => {
    setSavedModels(prev => {
      const updated = prev.filter(m => m.id !== modelId);
      saveModels(updated);
      return updated;
    });
    if (openModel?.model.id === modelId) setOpenModel(null);
  }, [openModel]);

  const handleRename = useCallback((modelId, newName) => {
    setSavedModels(prev => {
      const updated = prev.map(m => m.id === modelId ? { ...m, name: newName, updatedAt: new Date().toISOString() } : m);
      saveModels(updated);
      return updated;
    });
    if (openModel?.model.id === modelId) {
      setOpenModel(prev => ({ ...prev, model: { ...prev.model, name: newName } }));
    }
  }, [openModel]);

  const handleOpenModel = useCallback((model) => {
    const viewpoint = VIEWPOINTS.find(v => v.id === model.viewpointId);
    if (viewpoint) setOpenModel({ model, viewpoint });
  }, []);

  // ── Render: model viewer ──────────────────────────────────────────────────
  if (openModel) {
    return (
      <div className="-m-6 flex flex-col" style={{ height: 'calc(100vh - 64px)' }}>
        <ModelViewer
          model={openModel.model}
          viewpoint={openModel.viewpoint}
          onClose={() => setOpenModel(null)}
          onRename={handleRename}
        />
      </div>
    );
  }

  // ── Render: gallery ───────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Modellbibliotek</h1>
          <p className="mt-1 text-sm text-gray-500">
            ArchiMate-vyer baserade på ditt dataset. Välj en vykonfiguration och skapa en namngiven modell.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-xl border">
          <Sparkles size={15} className="text-amber-500" />
          <span><strong className="text-gray-800">{relevantCount}</strong> av {scoredViewpoints.length} vytyper passar ditt dataset</span>
        </div>
      </div>

      {/* Layout: sidebar + grid */}
      <div className="flex gap-6">
        {/* Category sidebar */}
        <div className="w-52 flex-shrink-0 space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">ArchiMate-kategori</p>
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
              activeCategory === 'all' ? 'bg-primary-50 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>Alla</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{categoryCounts.all}</span>
          </button>
          {Object.entries(VIEWPOINT_CATEGORIES).map(([key, cat]) => {
            const count = categoryCounts[key] || 0;
            if (!count) return null;
            const isActive = activeCategory === key;
            const c = CAT_COLORS[key];
            const savedInCat = savedModels.filter(m => {
              const vp = VIEWPOINTS.find(v => v.id === m.viewpointId);
              return vp?.category === key;
            }).length;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? `${c.light} ${c.text} font-semibold` : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{cat.label}</span>
                <div className="flex items-center space-x-1.5">
                  {savedInCat > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${c.badge}`}>{savedInCat}</span>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{count}</span>
                </div>
              </button>
            );
          })}

          {/* Divider + saved models summary */}
          {savedModels.length > 0 && (
            <>
              <div className="my-3 border-t border-gray-200" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Sparade modeller</p>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {savedModels
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map(m => {
                    const vp = VIEWPOINTS.find(v => v.id === m.viewpointId);
                    const c = CAT_COLORS[vp?.category] || CAT_COLORS.crosslayer;
                    return (
                      <button
                        key={m.id}
                        onClick={() => handleOpenModel(m)}
                        className="flex items-center w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-gray-100 group"
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${c.bg}`} />
                        <span className="truncate text-gray-700 flex-1">{m.name}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-red-300 hover:text-red-500 flex-shrink-0"
                        >
                          <X size={11} />
                        </button>
                      </button>
                    );
                  })}
              </div>
            </>
          )}
        </div>

        {/* Viewpoint grid */}
        <div className="flex-1 min-w-0">
          {/* Section heading */}
          {activeCategory !== 'all' && (
            <div className="mb-4 flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${CAT_COLORS[activeCategory]?.bg}`} />
              <h2 className="text-base font-semibold text-gray-800">
                {VIEWPOINT_CATEGORIES[activeCategory]?.label}
              </h2>
              <span className="text-sm text-gray-400">{categoryCounts[activeCategory]} vyer</span>
            </div>
          )}

          {/* Relevance groups when showing "all" */}
          {activeCategory === 'all' ? (
            <div className="space-y-8">
              {[3, 2, 1, 0].map(score => {
                const group = visibleViewpoints.filter(vp => vp.score === score);
                if (!group.length) return null;
                const labels = ['Inga data', 'Delvis relevanta', 'Relevanta', 'Fullt relevanta'];
                const divColors = ['text-gray-400', 'text-amber-500', 'text-blue-500', 'text-green-600'];
                return (
                  <div key={score}>
                    <h3 className={`text-sm font-semibold mb-3 flex items-center ${divColors[score]}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${
                        ['bg-gray-300', 'bg-amber-400', 'bg-blue-400', 'bg-green-500'][score]
                      }`} />
                      {labels[score]}
                      <span className="ml-2 text-gray-400 font-normal">({group.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {group.map(vp => (
                        <ViewpointCard
                          key={vp.id}
                          viewpoint={vp}
                          score={vp.score}
                          savedModels={savedModels.filter(m => m.viewpointId === vp.id)}
                          entityCounts={entityCounts}
                          onCreate={handleCreate}
                          onOpenModel={handleOpenModel}
                          onDeleteModel={handleDelete}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {visibleViewpoints.map(vp => (
                <ViewpointCard
                  key={vp.id}
                  viewpoint={vp}
                  score={vp.score}
                  savedModels={savedModels.filter(m => m.viewpointId === vp.id)}
                  entityCounts={entityCounts}
                  onCreate={handleCreate}
                  onOpenModel={handleOpenModel}
                  onDeleteModel={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
