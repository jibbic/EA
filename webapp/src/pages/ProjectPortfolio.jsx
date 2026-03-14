import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  Briefcase, Calendar, TrendingUp, AlertTriangle, DollarSign, 
  Users, Target, Clock, CheckCircle, XCircle, Circle, 
  Filter, Download, BarChart3, Network, ArrowRight, ChevronDown, ChevronRight,
  Activity, Zap, Shield
} from 'lucide-react';
import EntityQuickView from '../components/EntityQuickView';
import EntityDetailModal from '../components/EntityDetailModal';
import {
  calculateProjectHealth,
  getPortfolioSummary,
  getProjectArchitectureImpact,
  getProjectDependencies,
  getStrategicAlignment,
  getPortfolioStrategicCoverage,
  getCapabilityPortfolio,
  RAG_CONFIG,
  LAYER_LABELS,
} from '../utils/projectAnalyzer';

const ProjectPortfolio = () => {
  const { entities, getEntityById, relationships, resourceAllocations, getAllocationsForProject, getAllocationsForResource, addResourceAllocation, updateResourceAllocation, deleteResourceAllocation } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [viewMode, setViewMode] = useState('cards'); // 'cards', 'timeline', 'budget', 'impact', 'resources'
  const [expandedProjects, setExpandedProjects] = useState(new Set());
  const [quickViewEntity, setQuickViewEntity] = useState(null);
  const [quickViewPosition, setQuickViewPosition] = useState(null);
  const [detailModalEntity, setDetailModalEntity] = useState(null);
  const [editingAllocation, setEditingAllocation] = useState(null); // For editing resource allocations

  const workPackages = entities.WorkPackage || [];
  const resources = entities.Resource || [];

  // Toggle project expansion
  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  // Helper functions to get related entities from relationships (ArchiMate approach)
  const getDeliverablesForProject = (projectId) => {
    return relationships
      .filter(rel => rel.target === projectId && rel.type === 'realization')
      .map(rel => getEntityById(rel.source))
      .filter(entity => entity && entity.entityType === 'Deliverable')
      .sort((a, b) => new Date(a.target_date) - new Date(b.target_date));
  };

  const getAffectedSystemsForProject = (projectId) => {
    return relationships
      .filter(rel => rel.source === projectId && (rel.type === 'association' || rel.type === 'influence'))
      .map(rel => getEntityById(rel.target))
      .filter(entity => entity && ['ApplicationComponent', 'Node', 'CommunicationNetwork', 'Facility'].includes(entity.entityType));
  };

  const getAddressedGapsForProject = (projectId) => {
    return relationships
      .filter(rel => rel.source === projectId && rel.type === 'association')
      .map(rel => getEntityById(rel.target))
      .filter(entity => entity && entity.entityType === 'Gap');
  };

  const getDependenciesForProject = (projectId) => {
    return relationships
      .filter(rel => rel.target === projectId && rel.type === 'flow')
      .map(rel => getEntityById(rel.source))
      .filter(entity => entity && entity.entityType === 'WorkPackage');
  };

  // Filter projects
  const filteredProjects = useMemo(() => {
    return workPackages.filter(wp => {
      const matchesCategory = selectedCategory === 'all' || wp.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || wp.status === selectedStatus;
      const matchesRisk = selectedRisk === 'all' || wp.risk_level === selectedRisk;
      return matchesCategory && matchesStatus && matchesRisk;
    });
  }, [workPackages, selectedCategory, selectedStatus, selectedRisk]);

  // Calculate portfolio statistics
  const portfolioStats = useMemo(() => {
    const total = workPackages.length;
    const inProgress = workPackages.filter(wp => wp.status === 'in-progress').length;
    const planned = workPackages.filter(wp => wp.status === 'planned').length;
    const completed = workPackages.filter(wp => wp.status === 'completed').length;
    
    const totalBudget = workPackages.reduce((sum, wp) => {
      return sum + parseInt(wp.budget?.replace(/[^0-9]/g, '') || 0);
    }, 0);
    
    const totalSpent = workPackages.reduce((sum, wp) => {
      return sum + parseInt(wp.spent?.replace(/[^0-9]/g, '') || 0);
    }, 0);
    
    const avgProgress = workPackages.reduce((sum, wp) => sum + (wp.progress || 0), 0) / total;
    
    const highRisk = workPackages.filter(wp => wp.risk_level === 'high').length;
    const criticalPriority = workPackages.filter(wp => wp.priority === 'critical').length;

    return {
      total,
      inProgress,
      planned,
      completed,
      totalBudget: totalBudget / 1000000,
      totalSpent: totalSpent / 1000000,
      budgetUtilization: (totalSpent / totalBudget) * 100,
      avgProgress: Math.round(avgProgress),
      highRisk,
      criticalPriority,
      teamSize: workPackages.reduce((sum, wp) => sum + (wp.team_size || 0), 0)
    };
  }, [workPackages]);

  // Calculate RAG health for each project
  const healthData = useMemo(() => {
    const map = {};
    workPackages.forEach(wp => {
      map[wp.id] = calculateProjectHealth(wp);
    });
    return map;
  }, [workPackages]);

  // Portfolio-level health summary
  const portfolioHealth = useMemo(() => getPortfolioSummary(workPackages), [workPackages]);

  // Strategic coverage
  const strategicCoverage = useMemo(
    () => getPortfolioStrategicCoverage(workPackages, entities, relationships),
    [workPackages, entities, relationships]
  );

  // Capability portfolio matrix
  const capabilityPortfolio = useMemo(
    () => getCapabilityPortfolio(workPackages, entities, relationships),
    [workPackages, entities, relationships]
  );

  // Status configuration
  const statusConfig = {
    'planned': { label: 'Planerat', color: 'bg-blue-100 text-blue-800', icon: Circle },
    'in-progress': { label: 'Pågående', color: 'bg-green-100 text-green-800', icon: Clock },
    'completed': { label: 'Avslutat', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
    'on-hold': { label: 'Pausat', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
    'cancelled': { label: 'Avbrutet', color: 'bg-red-100 text-red-800', icon: XCircle }
  };

  const riskConfig = {
    'low': { label: 'Låg', color: 'bg-green-100 text-green-800' },
    'medium': { label: 'Medel', color: 'bg-yellow-100 text-yellow-800' },
    'high': { label: 'Hög', color: 'bg-red-100 text-red-800' }
  };

  const priorityConfig = {
    'low': { label: 'Låg', color: 'text-gray-600' },
    'medium': { label: 'Medel', color: 'text-blue-600' },
    'high': { label: 'Hög', color: 'text-orange-600' },
    'critical': { label: 'Kritisk', color: 'text-red-600' }
  };

  const categoryConfig = {
    'security':        { label: 'Säkerhet',        color: 'bg-red-100 text-red-800',    icon: '🔒' },
    'infrastructure':  { label: 'Infrastruktur',  color: 'bg-green-100 text-green-800',  icon: '🖥️' },
    'architecture':    { label: 'Arkitektur',     color: 'bg-blue-100 text-blue-800',    icon: '🏗️' },
    'digitalization':  { label: 'Digitalisering', color: 'bg-purple-100 text-purple-800', icon: '🚀' },
    'training':        { label: 'Utbildning',     color: 'bg-yellow-100 text-yellow-800', icon: '📚' },
  };

  // Calculate days remaining
  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Timeline calculation helpers
  const getTimelinePosition = (startDate, endDate) => {
    const minDate = new Date(Math.min(...workPackages.map(wp => new Date(wp.start_date))));
    const maxDate = new Date(Math.max(...workPackages.map(wp => new Date(wp.end_date))));
    const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startOffset = ((start - minDate) / (1000 * 60 * 60 * 24)) / totalDays * 100;
    const width = ((end - start) / (1000 * 60 * 60 * 24)) / totalDays * 100;
    
    return { left: `${startOffset}%`, width: `${width}%` };
  };

  // Calculate milestone position relative to project timeline
  const getMilestonePosition = (milestoneDate, projectStart, projectEnd) => {
    const minDate = new Date(Math.min(...workPackages.map(wp => new Date(wp.start_date))));
    const maxDate = new Date(Math.max(...workPackages.map(wp => new Date(wp.end_date))));
    const totalDays = (maxDate - minDate) / (1000 * 60 * 60 * 24);
    
    const milestone = new Date(milestoneDate);
    const milestoneOffset = ((milestone - minDate) / (1000 * 60 * 60 * 24)) / totalDays * 100;
    
    return Math.max(0, Math.min(100, milestoneOffset));
  };

  // Export to CSV
  const handleExport = () => {
    const csv = [
      ['Project', 'Status', 'Category', 'Priority', 'Risk', 'Progress', 'Budget', 'Spent', 'Start', 'End', 'PM'].join(','),
      ...filteredProjects.map(wp => [
        wp.name,
        wp.status,
        wp.category,
        wp.priority,
        wp.risk_level,
        `${wp.progress}%`,
        wp.budget,
        wp.spent,
        wp.start_date,
        wp.end_date,
        wp.project_manager
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'project-portfolio.csv';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projekt & Portföljöversikt</h1>
            <p className="text-primary-100">Hantera och spåra alla pågående och planerade projekt</p>
          </div>
          <Briefcase className="h-16 w-16 text-primary-200" />
        </div>
      </div>

      {/* Portfolio Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totala Projekt</p>
              <p className="text-3xl font-bold text-gray-900">{portfolioStats.total}</p>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="text-green-600">{portfolioStats.inProgress} pågående</span>
                <span className="text-blue-600">{portfolioStats.planned} planerade</span>
              </div>
            </div>
            <Target className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        {/* RAG Status */}
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600">Projekthälsa (RAG)</p>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-end gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{portfolioHealth.green}</div>
              <div className="text-xs text-gray-500">Grön</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500">{portfolioHealth.amber}</div>
              <div className="text-xs text-gray-500">Gul</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{portfolioHealth.red}</div>
              <div className="text-xs text-gray-500">Röd</div>
            </div>
          </div>
          <div className="flex gap-1 mt-3 rounded-full overflow-hidden h-2">
            {portfolioHealth.green > 0 && <div className="bg-green-500" style={{ flex: portfolioHealth.green }}/>}
            {portfolioHealth.amber > 0 && <div className="bg-yellow-400" style={{ flex: portfolioHealth.amber }}/>}
            {portfolioHealth.red   > 0 && <div className="bg-red-500" style={{ flex: portfolioHealth.red }}/>}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Budget</p>
              <p className="text-3xl font-bold text-gray-900">{portfolioStats.totalBudget.toFixed(0)}M</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${Math.min(portfolioStats.budgetUtilization, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">{portfolioStats.budgetUtilization.toFixed(0)}%</span>
              </div>
            </div>
            <DollarSign className="h-10 w-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Genomsnittlig Progress</p>
              <p className="text-3xl font-bold text-gray-900">{portfolioStats.avgProgress}%</p>
              <div className="mt-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${portfolioStats.avgProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <TrendingUp className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Riskprofil</p>
              <p className="text-3xl font-bold text-gray-900">{portfolioStats.highRisk}</p>
              <div className="mt-2 text-xs">
                <span className="text-red-600">{portfolioStats.highRisk} hög risk</span>
                <span className="text-gray-400"> / </span>
                <span className="text-orange-600">{portfolioStats.criticalPriority} kritisk</span>
              </div>
            </div>
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Alla kategorier</option>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.icon} {config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Alla statusar</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1">Risk</label>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Alla risknivåer</option>
                {Object.entries(riskConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'cards' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Kort
              </button>
              <button
                onClick={() => setViewMode('health')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'health' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Hälsa
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'timeline' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Tidslinje
              </button>
              <button
                onClick={() => setViewMode('budget')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'budget' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Budget
              </button>
              <button
                onClick={() => setViewMode('impact')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'impact' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Påverkan
              </button>
              <button
                onClick={() => setViewMode('resources')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'resources' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Resurser
              </button>
              <button
                onClick={() => setViewMode('strategy')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'strategy' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Strategi
              </button>
              <button
                onClick={() => setViewMode('capability')}
                className={`px-4 py-2 text-sm font-medium ${viewMode === 'capability' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Kapabilitet
              </button>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const StatusIcon = statusConfig[project.status]?.icon || Circle;
            const daysRemaining = getDaysRemaining(project.end_date);
            const budgetSpent = parseInt(project.spent?.replace(/[^0-9]/g, '') || 0);
            const budgetTotal = parseInt(project.budget?.replace(/[^0-9]/g, '') || 1);
            const budgetPercent = (budgetSpent / budgetTotal) * 100;

            return (
              <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${categoryConfig[project.category]?.color || 'bg-gray-100 text-gray-800'}`}>
                          {categoryConfig[project.category]?.icon} {categoryConfig[project.category]?.label || project.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[project.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                          <StatusIcon className="inline h-3 w-3 mr-1" />
                          {statusConfig[project.status]?.label || project.status}
                        </span>
                        {healthData[project.id] && (() => {
                          const h = healthData[project.id];
                          const rc = RAG_CONFIG[h.rag];
                          return (
                            <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${rc.bg} ${rc.text} border ${rc.border}`}>
                              <span className={`w-2 h-2 rounded-full ${rc.dot}`} />
                              {rc.label} · {h.score}
                            </span>
                          );
                        })()}
                      </div>
                      <Link to={`/entities/WorkPackage/${project.id}`} className="hover:text-primary-600 transition-colors">
                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${priorityConfig[project.priority]?.color || 'text-gray-600'}`}>
                      {priorityConfig[project.priority]?.label || project.priority}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Blockers warning */}
                  {(project.blockers ?? []).length > 0 && (
                    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs font-semibold text-red-700 mb-1 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        {(project.blockers).length} blockerare
                      </p>
                      <p className="text-xs text-red-600 truncate">{project.blockers[0]}</p>
                    </div>
                  )}

                  {/* Deliverables (Milestones) */}
                  {(() => {
                    const deliverables = getDeliverablesForProject(project.id);
                    return deliverables.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-2">Milstolpar (Deliverables)</p>
                        <div className="space-y-1">
                          {deliverables.slice(0, 3).map((deliverable) => (
                            <div
                              key={deliverable.id}
                              className="flex items-center justify-between text-xs hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer"
                              onClick={(e) => {
                                setQuickViewEntity(deliverable);
                                setQuickViewPosition({
                                  x: e.clientX,
                                  y: e.clientY
                                });
                              }}
                            >
                              <span className={`flex items-center gap-1 ${
                                deliverable.status === 'completed' ? 'text-green-600' :
                                deliverable.status === 'in-progress' ? 'text-blue-600' :
                                'text-gray-500'
                              }`}>
                                {deliverable.status === 'completed' ? <CheckCircle className="h-3 w-3" /> :
                                 deliverable.status === 'in-progress' ? <Clock className="h-3 w-3" /> :
                                 <Circle className="h-3 w-3" />}
                                {deliverable.name}
                              </span>
                              <span className="text-gray-500">{deliverable.target_date}</span>
                            </div>
                          ))}
                          {deliverables.length > 3 && (
                            <p className="text-xs text-gray-500 pl-1">+{deliverables.length - 3} fler milstolpar</p>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t">
                    <div>
                      <p className="text-xs text-gray-600">Budget</p>
                      <p className="text-sm font-semibold text-gray-900">{project.budget}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${budgetPercent > 90 ? 'bg-red-500' : budgetPercent > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{budgetPercent.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Tid kvar</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {daysRemaining > 0 ? `${daysRemaining} dagar` : 'Försenad'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{project.end_date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Projektledare</p>
                      <p className="text-sm font-semibold text-gray-900">{project.project_manager}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Risk / Team</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskConfig[project.risk_level]?.color || 'bg-gray-100 text-gray-800'}`}>
                          {riskConfig[project.risk_level]?.label || project.risk_level}
                        </span>
                        <span className="text-xs text-gray-600 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.team_size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dependencies & Impact */}
                  {(() => {
                    const dependencies = getDependenciesForProject(project.id);
                    const affectedSystems = getAffectedSystemsForProject(project.id);
                    return (dependencies.length > 0 || affectedSystems.length > 0) && (
                      <div className="pt-4 border-t">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          {dependencies.length > 0 && (
                            <div>
                              <p className="text-gray-600 mb-1">Beroenden</p>
                              <p className="text-gray-900 font-medium">{dependencies.length} projekt</p>
                            </div>
                          )}
                          {affectedSystems.length > 0 && (
                            <div>
                              <p className="text-gray-600 mb-1">Påverkade system</p>
                              <p className="text-gray-900 font-medium">{affectedSystems.length} system</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Projekttidslinje</h2>
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const position = getTimelinePosition(project.start_date, project.end_date);
              const daysRemaining = getDaysRemaining(project.end_date);
              const deliverables = getDeliverablesForProject(project.id);
              const isExpanded = expandedProjects.has(project.id);
              const hasDeliverables = deliverables.length > 0;
              const StatusIcon = statusConfig[project.status]?.icon || Circle;
              
              return (
                <div key={project.id} className="space-y-1">
                  {/* Project header row */}
                  <div className="flex items-center mb-1">
                    {hasDeliverables && (
                      <button
                        onClick={() => toggleProjectExpansion(project.id)}
                        className="mr-2 p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                        title={isExpanded ? 'Dölj milstolpar' : 'Visa milstolpar'}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-gray-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                    )}
                    {!hasDeliverables && (
                      <div className="w-9 mr-2 flex-shrink-0" />
                    )}
                    <Link to={`/entities/WorkPackage/${project.id}`} className="w-64 pr-4 text-sm font-medium text-gray-900 hover:text-primary-600 truncate flex-shrink-0">  
                      {project.name}
                    </Link>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig[project.status]?.color || 'bg-gray-100 text-gray-800'} mr-2 flex-shrink-0`}>
                      {statusConfig[project.status]?.label}
                    </span>
                    <div className="w-24 mr-2 text-xs text-gray-600 flex-shrink-0">
                      {daysRemaining > 0 ? `${daysRemaining}d kvar` : 'Försenad'}
                    </div>
                    <div className="flex-1 relative min-w-0">
                      {/* Timeline container with background */}
                      <div className="relative h-10 bg-gray-100 rounded">
                        {/* Project timeline bar */}
                        <div 
                          className={`absolute h-full rounded flex items-center px-2 z-10 ${
                            project.status === 'completed' ? 'bg-green-500' :
                            project.status === 'in-progress' ? 'bg-blue-500' :
                            'bg-gray-400'
                          }`}
                          style={position}
                        >
                          <span className="text-xs text-white font-medium truncate">{project.progress}%</span>
                        </div>
                        
                        {/* Milestone markers when expanded */}
                        {isExpanded && deliverables.map((deliverable, idx) => {
                          const deliverableDate = deliverable.actual_date || deliverable.target_date;
                          if (!deliverableDate) return null;
                          
                          const milestonePos = getMilestonePosition(deliverableDate, project.start_date, project.end_date);
                          
                          const statusColors = {
                            'completed': '#10B981',
                            'in_progress': '#F59E0B',
                            'planned': '#3B82F6',
                            'delayed': '#EF4444'
                          };
                          const markerColor = statusColors[deliverable.status] || '#3B82F6';
                          
                          return (
                            <div
                              key={deliverable.id}
                              className="absolute top-0 flex flex-col items-center z-20"
                              style={{ left: `${milestonePos}%` }}
                            >
                              {/* Diamond marker */}
                              <div 
                                className="w-3 h-3 rotate-45 border-2 border-white shadow-lg cursor-pointer hover:scale-125 transition-transform"
                                style={{ backgroundColor: markerColor }}
                                title={`${deliverable.name} - ${new Date(deliverableDate).toLocaleDateString('sv-SE')}`}
                                onClick={(e) => {
                                  setQuickViewEntity(deliverable);
                                  setQuickViewPosition({
                                    x: e.clientX,
                                    y: e.clientY
                                  });
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Vertical lines from markers to list items */}
                      {isExpanded && hasDeliverables && (
                        <div className="absolute left-0 right-0" style={{ top: '20px', height: `${deliverables.length * 24 + 16}px` }}>
                          {deliverables.map((deliverable, idx) => {
                            const deliverableDate = deliverable.actual_date || deliverable.target_date;
                            if (!deliverableDate) return null;
                            
                            const milestonePos = getMilestonePosition(deliverableDate, project.start_date, project.end_date);
                            
                            const statusColors = {
                              'completed': '#10B981',
                              'in_progress': '#F59E0B',
                              'planned': '#3B82F6',
                              'delayed': '#EF4444'
                            };
                            const lineColor = statusColors[deliverable.status] || '#3B82F6';
                            
                            // Calculate the vertical position for this deliverable (goes directly to the list item)
                            // Timeline height is 40px, line starts at 20px (middle)
                            // List starts at: (40-20) + marginTop(1) + paddingTop(1) + halfRow(12) + idx*24
                            const lineHeight = 34 + (idx * 24);
                            
                            return (
                              <div
                                key={`line-${deliverable.id}`}
                                className="absolute top-0"
                                style={{ left: `${milestonePos}%` }}
                              >
                                {/* Vertical line */}
                                <div 
                                  className="w-0.5 opacity-50"
                                  style={{ 
                                    backgroundColor: lineColor,
                                    height: `${lineHeight}px`,
                                    marginLeft: '-1px'
                                  }}
                                />
                                {/* Horizontal end cap pointing LEFT */}
                                <div 
                                  className="h-0.5 opacity-50"
                                  style={{ 
                                    backgroundColor: lineColor,
                                    width: '8px',
                                    marginTop: '-1px',
                                    marginLeft: '-9px'
                                  }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Expanded deliverables list */}
                  {isExpanded && hasDeliverables && (
                    <div className="relative" style={{ marginTop: '1px' }}>
                      <div className="w-9 mr-2 flex-shrink-0 inline-block" />
                      <div className="w-64 pr-4 flex-shrink-0 inline-block" />
                      <div className="px-2 py-1 mr-2 flex-shrink-0 inline-block opacity-0">
                        <span className="text-xs">Status</span>
                      </div>
                      <div className="w-24 mr-2 flex-shrink-0 inline-block" />
                      <div className="inline-block" style={{ paddingTop: '1px', paddingBottom: '8px' }}>
                        {deliverables.map((deliverable, idx) => {
                          const deliverableDate = deliverable.actual_date || deliverable.target_date;
                          if (!deliverableDate) return null;
                          
                          const statusColors = {
                            'completed': 'text-green-600',
                            'in_progress': 'text-yellow-600',
                            'planned': 'text-blue-600',
                            'delayed': 'text-red-600'
                          };
                          const textColor = statusColors[deliverable.status] || 'text-blue-600';
                          
                          return (
                            <div key={deliverable.id} className="flex items-center text-xs" style={{ height: '24px' }}>
                              <div className={`w-2 h-2 rotate-45 mr-2 flex-shrink-0 ${textColor.replace('text-', 'bg-')}`} />
                              <Link 
                                to={`/entities/Deliverable/${deliverable.id}`}
                                className={`${textColor} hover:text-primary-600 transition-colors mr-2 font-medium`}
                              >
                                {deliverable.name}
                              </Link>
                              <span className="text-gray-500">
                                ({new Date(deliverableDate).toLocaleDateString('sv-SE')})
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Health View */}
      {viewMode === 'health' && (
        <div className="space-y-4">
          {/* Legend */}
          <div className="bg-white rounded-lg shadow p-4 flex flex-wrap gap-6 items-center">
            <span className="text-sm font-semibold text-gray-700">Hälsostatus:</span>
            {Object.entries(RAG_CONFIG).map(([key, cfg]) => (
              <span key={key} className={`flex items-center gap-2 text-sm ${cfg.text}`}>
                <span className={`w-3 h-3 rounded-full ${cfg.dot}`} />
                {cfg.label} (hälsopoäng {key === 'green' ? '70–100' : key === 'amber' ? '45–69' : '0–44'})
              </span>
            ))}
          </div>

          {filteredProjects.map((project) => {
            const h = healthData[project.id] ?? { score: 0, rag: 'red', indicators: [] };
            const rc = RAG_CONFIG[h.rag];
            const blockers = project.blockers ?? [];
            const keyRisks = project.key_risks ?? [];
            const deps = getProjectDependencies(project.id, workPackages, relationships);
            const StatusIcon = statusConfig[project.status]?.icon || Circle;

            return (
              <div key={project.id} className={`bg-white rounded-lg shadow border-l-4 ${rc.border}`}>
                <div className="p-5">
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-bold ${rc.bg} ${rc.text} border ${rc.border}`}>
                          <span className={`w-2.5 h-2.5 rounded-full ${rc.dot}`} />
                          {rc.label}
                        </span>
                        <span className="text-2xl font-bold text-gray-800">{h.score}<span className="text-base font-normal text-gray-400">/100</span></span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[project.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                          <StatusIcon className="inline h-3 w-3 mr-1" />
                          {statusConfig[project.status]?.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryConfig[project.category]?.color || 'bg-gray-100 text-gray-800'}`}>
                          {categoryConfig[project.category]?.icon} {categoryConfig[project.category]?.label}
                        </span>
                      </div>
                      <Link to={`/entities/WorkPackage/${project.id}`} className="text-lg font-bold text-gray-900 hover:text-primary-600">
                        {project.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-0.5">{project.project_manager} · {project.team_size} pers · {project.phase}</p>
                    </div>
                    {/* Health score bar */}
                    <div className="ml-6 w-40 flex-shrink-0">
                      <div className="text-right text-xs text-gray-500 mb-1">Hälsopoäng</div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-4 rounded-full transition-all ${h.rag === 'green' ? 'bg-green-500' : h.rag === 'amber' ? 'bg-yellow-400' : 'bg-red-500'}`}
                          style={{ width: `${h.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Indicators row */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {h.indicators.map(ind => {
                      const dot = ind.status === 'green' ? 'bg-green-500' : ind.status === 'amber' ? 'bg-yellow-400' : 'bg-red-500';
                      const bg  = ind.status === 'green' ? 'bg-green-50 border-green-200 text-green-800' : ind.status === 'amber' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800';
                      return (
                        <span key={ind.key} className={`inline-flex items-center gap-1.5 px-2 py-1 rounded border text-xs font-medium ${bg}`}>
                          <span className={`w-2 h-2 rounded-full ${dot}`} />
                          <span className="font-semibold">{ind.label}:</span> {ind.detail}
                        </span>
                      );
                    })}
                  </div>

                  {/* Blockers + Key risks + Dependencies row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                    {/* Blockers */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <XCircle className={`h-3.5 w-3.5 ${blockers.length ? 'text-red-500' : 'text-gray-300'}`} />
                        Blockerare ({blockers.length})
                      </p>
                      {blockers.length > 0 ? (
                        <ul className="space-y-1">
                          {blockers.map((b, i) => (
                            <li key={i} className="text-xs text-red-700 flex items-start gap-1">
                              <span className="mt-0.5 flex-shrink-0">•</span>{b}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-400 italic">Inga aktiva blockerare</p>
                      )}
                    </div>

                    {/* Key Risks */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
                        Nyckelrisker ({keyRisks.length})
                      </p>
                      {keyRisks.length > 0 ? (
                        <ul className="space-y-1">
                          {keyRisks.slice(0, 3).map((r, i) => (
                            <li key={i} className="text-xs text-yellow-800 flex items-start gap-1">
                              <span className="mt-0.5 flex-shrink-0">•</span>{r}
                            </li>
                          ))}
                          {keyRisks.length > 3 && <li className="text-xs text-gray-400">+{keyRisks.length - 3} till</li>}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-400 italic">Inga risker dokumenterade</p>
                      )}
                    </div>

                    {/* Dependencies */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1">
                        <ArrowRight className="h-3.5 w-3.5 text-blue-500" />
                        Projektberoenden
                      </p>
                      {(deps.blockedBy.length > 0 || deps.blocks.length > 0) ? (
                        <div className="space-y-1">
                          {deps.blockedBy.map(p => (
                            <div key={p.id} className="text-xs flex items-center gap-1">
                              <span className="text-gray-400">Kräver:</span>
                              <Link to={`/entities/WorkPackage/${p.id}`} className="text-primary-600 hover:underline truncate">{p.name}</Link>
                            </div>
                          ))}
                          {deps.blocks.map(p => (
                            <div key={p.id} className="text-xs flex items-center gap-1">
                              <span className="text-gray-400">Aktiverar:</span>
                              <Link to={`/entities/WorkPackage/${p.id}`} className="text-green-600 hover:underline truncate">{p.name}</Link>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 italic">Inga projektberoenden</p>
                      )}
                    </div>
                  </div>

                  {/* Expected benefits */}
                  {project.expected_benefits && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5 text-green-500" /> Förväntad nytta
                      </p>
                      <p className="text-xs text-gray-600">{project.expected_benefits}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Budget View */}
      {viewMode === 'budget' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Budgetanalys</h2>
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const budgetSpent = parseInt(project.spent?.replace(/[^0-9]/g, '') || 0);
              const budgetTotal = parseInt(project.budget?.replace(/[^0-9]/g, '') || 1);
              const budgetPercent = (budgetSpent / budgetTotal) * 100;
              const budgetRemaining = budgetTotal - budgetSpent;
              
              return (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Link to={`/entities/WorkPackage/${project.id}`} className="hover:text-primary-600 transition-colors">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-600">{project.category} • {project.status}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      budgetPercent > 90 ? 'bg-red-100 text-red-800' :
                      budgetPercent > 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {budgetPercent.toFixed(1)}% använt
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Total Budget</p>
                      <p className="text-lg font-bold text-gray-900">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Förbrukat</p>
                      <p className="text-lg font-bold text-orange-600">{project.spent}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Återstående</p>
                      <p className="text-lg font-bold text-green-600">
                        {(budgetRemaining / 1000000).toFixed(1)}M SEK
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        budgetPercent > 90 ? 'bg-red-500' :
                        budgetPercent > 70 ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Impact View */}
      {viewMode === 'impact' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Arkitekturpåverkan per projekt</h2>
            <p className="text-sm text-gray-500">Visar vilka arkitekturkomponenter (strategi, verksamhet, applikation, teknologi) varje projekt påverkar baserat på relationsgrafen.</p>
          </div>
          {filteredProjects.map((project) => {
            const impact = getProjectArchitectureImpact(project.id, entities, relationships);
            const deps = getProjectDependencies(project.id, workPackages, relationships);
            const h = healthData[project.id] ?? { score: 0, rag: 'green' };
            const rc = RAG_CONFIG[h.rag];
            const StatusIcon = statusConfig[project.status]?.icon || Circle;
            const layerOrder = ['strategy', 'motivation', 'business', 'application', 'technology', 'physical', 'other'];
            
            return (
              <div key={project.id} className="bg-white rounded-lg shadow border">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold ${rc.bg} ${rc.text} border ${rc.border}`}>
                          <span className={`w-2 h-2 rounded-full ${rc.dot}`} />{rc.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig[project.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                          <StatusIcon className="inline h-3 w-3 mr-1" />
                          {statusConfig[project.status]?.label}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xs ${categoryConfig[project.category]?.color || 'bg-gray-100 text-gray-800'}`}>
                          {categoryConfig[project.category]?.label}
                        </span>
                      </div>
                      <Link to={`/entities/WorkPackage/${project.id}`} className="text-base font-bold text-gray-900 hover:text-primary-600">
                        {project.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary-600">{impact.total}</div>
                        <div className="text-xs text-gray-500">påverkade enheter</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{deps.blockedBy.length}</div>
                        <div className="text-xs text-gray-500">kräver projekt</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{deps.blocks.length}</div>
                        <div className="text-xs text-gray-500">aktiverar projekt</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Architecture layers impacted */}
                {impact.total > 0 ? (
                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {layerOrder.filter(layer => impact.byLayer[layer]?.length > 0).map(layer => {
                        const lc = LAYER_LABELS[layer];
                        const items = impact.byLayer[layer];
                        return (
                          <div key={layer} className={`rounded-lg border p-3 ${lc.bg} ${lc.border}`}>
                            <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${lc.color}`}>
                              {lc.label} <span className="font-bold">({items.length})</span>
                            </p>
                            <ul className="space-y-1">
                              {items.slice(0, 5).map(e => (
                                <li key={e.id} className="text-xs flex items-center gap-1">
                                  <span className="text-gray-400">·</span>
                                  <Link to={`/entities/${e.entityType}/${e.id}`} className={`${lc.color} hover:underline truncate`}>
                                    {e.name}
                                  </Link>
                                  <span className="text-gray-400 text-xs flex-shrink-0">({e.entityType.replace(/([A-Z])/g, ' $1').trim()})</span>
                                </li>
                              ))}
                              {items.length > 5 && (
                                <li className="text-xs text-gray-400 italic">+{items.length - 5} till</li>
                              )}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dependency chain */}
                    {(deps.blockedBy.length > 0 || deps.blocks.length > 0) && (
                      <div className="mt-4 flex flex-wrap gap-4">
                        {deps.blockedBy.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Kräver:</span>
                            {deps.blockedBy.map(p => (
                              <Link key={p.id} to={`/entities/WorkPackage/${p.id}`} className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded hover:bg-orange-200">
                                {p.name}
                              </Link>
                            ))}
                          </div>
                        )}
                        {deps.blocks.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1"><ArrowRight className="h-3 w-3" /> Aktiverar:</span>
                            {deps.blocks.map(p => (
                              <Link key={p.id} to={`/entities/WorkPackage/${p.id}`} className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded hover:bg-green-200">
                                {p.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="p-5 text-sm text-gray-400 italic">Inga arkitekturrelationer registrerade för detta projekt.</p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Strategy View */}
      {viewMode === 'strategy' && (() => {
        const coveredGoals   = strategicCoverage.goalCoverage.filter(c => c.covered).length;
        const totalGoals     = strategicCoverage.goalCoverage.length;
        const coveredDrivers = strategicCoverage.driverCoverage.filter(c => c.covered).length;
        const totalDrivers   = strategicCoverage.driverCoverage.length;
        const unmapped       = strategicCoverage.unmappedProjects.length;
        const totalLinks     = strategicCoverage.goalCoverage.reduce((s, c) => s + c.projects.length, 0);

        return (
          <div className="space-y-6">
            {/* Summary KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${coveredGoals === totalGoals ? 'bg-green-100' : 'bg-amber-100'}`}>
                  <Target className={`h-6 w-6 ${coveredGoals === totalGoals ? 'text-green-600' : 'text-amber-600'}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Strategiska mål täckta</p>
                  <p className="text-2xl font-bold text-gray-900">{coveredGoals}<span className="text-sm text-gray-400">/{totalGoals}</span></p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Drivkrafter adresserade</p>
                  <p className="text-2xl font-bold text-gray-900">{coveredDrivers}<span className="text-sm text-gray-400">/{totalDrivers}</span></p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unmapped > 0 ? 'bg-red-100' : 'bg-green-100'}`}>
                  <AlertTriangle className={`h-6 w-6 ${unmapped > 0 ? 'text-red-600' : 'text-green-600'}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Projekt utan strategimål</p>
                  <p className="text-2xl font-bold text-gray-900">{unmapped}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Network className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Totala strategikopplingar</p>
                  <p className="text-2xl font-bold text-gray-900">{totalLinks}</p>
                </div>
              </div>
            </div>

            {/* Unmapped warning */}
            {unmapped > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800">Projekt utan strategisk koppling</p>
                  <p className="text-xs text-amber-700 mt-1">Följande projekt saknar kopplingar till strategiska mål och bör ses över:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {strategicCoverage.unmappedProjects.map(p => (
                      <Link key={p.id} to={`/entities/WorkPackage/${p.id}`} className="text-xs bg-amber-100 text-amber-900 px-2 py-1 rounded hover:bg-amber-200 font-medium">
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Goals coverage matrix */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Strategisk täckning per verksamhetsmål</h2>
                <p className="text-sm text-gray-500 mt-1">Vilka projekt bidrar till respektive strategiskt mål. Mål utan projekt är vita fläckar i portföljen.</p>
              </div>
              <div className="divide-y">
                {strategicCoverage.goalCoverage.map(({ goal, projects: gProjects, covered }) => (
                  <div key={goal.id} className={`p-4 ${!covered ? 'bg-red-50' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`mt-0.5 w-3 h-3 rounded-full flex-shrink-0 ${covered ? 'bg-green-500' : 'bg-red-400'}`} />
                        <div>
                          <Link to={`/entities/Goal/${goal.id}`} className="text-sm font-semibold text-gray-900 hover:text-primary-600">{goal.name}</Link>
                          <p className="text-xs text-gray-500 mt-0.5">{goal.description}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded flex-shrink-0 ${covered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {gProjects.length} projekt
                      </span>
                    </div>
                    {covered ? (
                      <div className="mt-2 ml-6 flex flex-wrap gap-2">
                        {gProjects.map(p => {
                          const h = healthData[p.id];
                          const rc = h ? RAG_CONFIG[h.rag] : null;
                          return (
                            <Link key={p.id} to={`/entities/WorkPackage/${p.id}`}
                              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium ${rc ? `${rc.bg} ${rc.text} ${rc.border}` : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                              {rc && <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />}
                              {p.name}
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="mt-1 ml-6 text-xs text-red-600 italic">Vita fläckar – inga projekt adresserar detta mål</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Driver coverage */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Drivkrafter och portföljrespons</h2>
                <p className="text-sm text-gray-500 mt-1">Vilka externa och interna drivkrafter projekten svarar mot (ArchiMate Motivation layer).</p>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                {strategicCoverage.driverCoverage.map(({ driver, projects: dProjects, covered }) => (
                  <div key={driver.id} className={`rounded-lg border p-4 ${covered ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-900">{driver.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${covered ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'}`}>
                        {dProjects.length} projekt
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{driver.description}</p>
                    {dProjects.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {dProjects.map(p => (
                          <Link key={p.id} to={`/entities/WorkPackage/${p.id}`} className="text-xs bg-white text-blue-700 border border-blue-200 px-2 py-0.5 rounded hover:bg-blue-100">
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Per-project motivation chain */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <h2 className="text-base font-semibold text-gray-900">Projektkoppling – motivationskedja</h2>
                <p className="text-sm text-gray-500 mt-1">Driver → Mål → Princip → Gap som varje projekt adresserar (ArchiMate Implementation & Migration).</p>
              </div>
              <div className="divide-y">
                {filteredProjects.map(project => {
                  const alignment = getStrategicAlignment(project, entities, relationships);
                  const h = healthData[project.id];
                  const rc = h ? RAG_CONFIG[h.rag] : null;
                  return (
                    <div key={project.id} className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        {rc && <span className={`w-2.5 h-2.5 rounded-full ${rc.dot}`} />}
                        <Link to={`/entities/WorkPackage/${project.id}`} className="font-semibold text-gray-900 hover:text-primary-600">{project.name}</Link>
                        <span className={`text-xs px-2 py-0.5 rounded ${categoryConfig[project.category]?.color || 'bg-gray-100 text-gray-700'}`}>
                          {categoryConfig[project.category]?.label}
                        </span>
                        {alignment.goals.length === 0 && alignment.drivers.length === 0 && (
                          <span className="text-xs text-red-500 italic ml-auto">Inga strategikopplingar</span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        {alignment.goals.length > 0 && (
                          <div>
                            <p className="font-semibold text-violet-700 mb-1 uppercase tracking-wide">Verksamhetsmål</p>
                            <div className="space-y-1">
                              {alignment.goals.map(g => (
                                <Link key={g.id} to={`/entities/Goal/${g.id}`} className="flex items-center gap-1 text-violet-600 hover:underline">
                                  <ChevronRight className="h-3 w-3" />{g.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        {alignment.drivers.length > 0 && (
                          <div>
                            <p className="font-semibold text-blue-700 mb-1 uppercase tracking-wide">Drivkrafter</p>
                            <div className="space-y-1">
                              {alignment.drivers.map(d => (
                                <Link key={d.id} to={`/entities/Driver/${d.id}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                                  <ChevronRight className="h-3 w-3" />{d.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        {alignment.gaps.length > 0 && (
                          <div>
                            <p className="font-semibold text-orange-700 mb-1 uppercase tracking-wide">Arkitekturgap</p>
                            <div className="space-y-1">
                              {alignment.gaps.map(g => (
                                <Link key={g.id} to={`/entities/Gap/${g.id}`} className="flex items-center gap-1 text-orange-600 hover:underline">
                                  <ChevronRight className="h-3 w-3" />{g.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Capability View */}
      {viewMode === 'capability' && (() => {
        const allCaps    = capabilityPortfolio.portfolio;
        const noneCount  = allCaps.filter(c => c.investmentStatus === 'none').length;
        const activeCount  = allCaps.filter(c => c.investmentStatus === 'active').length;
        const plannedCount = allCaps.filter(c => c.investmentStatus === 'planned').length;
        const totalGap   = allCaps.reduce((s, c) => s + (c.maturityGap ?? 0), 0);

        const MaturityDots = ({ current, target }) => {
          if (current === null) return <span className="text-xs text-gray-400 italic">Ej satt</span>;
          return (
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(n => (
                  <div key={n} className={`w-3 h-3 rounded-full border ${n <= current ? 'bg-primary-500 border-primary-600' : n <= target ? 'border-primary-400 bg-primary-100' : 'border-gray-300 bg-white'}`} title={n <= current ? `Nuläge (${current})` : n <= target ? `Mål (${target})` : ''} />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">{current}→{target}</span>
            </div>
          );
        };

        const InvBadge = ({ status }) => {
          if (status === 'active')  return <span className="text-xs bg-green-100 text-green-800 border border-green-200 px-2 py-0.5 rounded-full font-medium">Aktiv investering</span>;
          if (status === 'planned') return <span className="text-xs bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full font-medium">Planerad</span>;
          return <span className="text-xs bg-red-100 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-medium">Ingen investering</span>;
        };

        return (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-5 text-center">
                <p className="text-3xl font-bold text-green-600">{activeCount}</p>
                <p className="text-xs text-gray-500 mt-1">Kapabiliteter med aktiv investering</p>
              </div>
              <div className="bg-white rounded-lg shadow p-5 text-center">
                <p className="text-3xl font-bold text-blue-600">{plannedCount}</p>
                <p className="text-xs text-gray-500 mt-1">Med planerad investering</p>
              </div>
              <div className="bg-white rounded-lg shadow p-5 text-center">
                <p className={`text-3xl font-bold ${noneCount > 0 ? 'text-red-600' : 'text-gray-400'}`}>{noneCount}</p>
                <p className="text-xs text-gray-500 mt-1">Utan projektinvestering</p>
              </div>
              <div className="bg-white rounded-lg shadow p-5 text-center">
                <p className="text-3xl font-bold text-orange-600">{totalGap}</p>
                <p className="text-xs text-gray-500 mt-1">Totalt mognadsglapp (nivåsteg)</p>
              </div>
            </div>

            {/* No-investment warning */}
            {noneCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Kapabiliteter utan projektinvestering</p>
                  <p className="text-xs text-red-700 mt-1">{noneCount} kapabiliteter har ett mognadsglapp men saknar täckande projekt inom nuvarande portfölj.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {allCaps.filter(c => c.investmentStatus === 'none' && (c.maturityGap ?? 0) > 0).map(c => (
                      <Link key={c.capability.id} to={`/entities/Capability/${c.capability.id}`} className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded hover:bg-red-200">
                        {c.capability.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Capability domains */}
            {capabilityPortfolio.byDomain.map(({ domain, capabilities: domCaps }) => (
              <div key={domain.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{domain.name}</h3>
                    <p className="text-xs text-gray-500">{domain.description}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-green-700 font-medium">{domCaps.filter(c => c.investmentStatus === 'active').length} aktiva</span>
                    <span className="text-blue-700 font-medium">{domCaps.filter(c => c.investmentStatus === 'planned').length} planerade</span>
                    <span className="text-red-700 font-medium">{domCaps.filter(c => c.investmentStatus === 'none').length} utan investering</span>
                  </div>
                </div>
                <div className="divide-y">
                  {domCaps.map(({ capability, projects: capProjects, investmentStatus, currentMaturity, targetMaturity, maturityGap }) => (
                    <div key={capability.id} className={`px-5 py-4 flex flex-wrap items-start gap-4 ${investmentStatus === 'none' && (maturityGap ?? 0) > 0 ? 'bg-red-50' : ''}`}>
                      <div className="flex-1 min-w-0">
                        <Link to={`/entities/Capability/${capability.id}`} className="text-sm font-semibold text-gray-900 hover:text-primary-600">{capability.name}</Link>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{capability.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-xs text-gray-500 mb-1">Mognad (nuläge → mål)</p>
                        <MaturityDots current={currentMaturity} target={targetMaturity} />
                      </div>
                      <div className="flex-shrink-0 min-w-[130px]">
                        <p className="text-xs text-gray-500 mb-1">Investeringsstatus</p>
                        <InvBadge status={investmentStatus} />
                      </div>
                      <div className="flex-1 min-w-0">
                        {capProjects.length > 0 ? (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Projekt</p>
                            <div className="flex flex-wrap gap-1">
                              {capProjects.map(p => {
                                const h = healthData[p.id];
                                const rc = h ? RAG_CONFIG[h.rag] : null;
                                return (
                                  <Link key={p.id} to={`/entities/WorkPackage/${p.id}`}
                                    className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${rc ? `${rc.bg} ${rc.text} ${rc.border}` : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                                    {rc && <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />}
                                    {p.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          maturityGap && maturityGap > 0
                            ? <p className="text-xs text-red-600 italic">Gap: {maturityGap} nivåsteg – inga projekt täcker detta</p>
                            : <p className="text-xs text-gray-400 italic">Inga projektinvesteringar</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Resources View */}
      {viewMode === 'resources' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-600" />
              Resursplanering
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Översikt över resursallokering per månad. Klicka på en cell för att redigera allokering.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            {(() => {
              // Generate month columns from earliest project start to latest end
              const startDates = workPackages.map(wp => new Date(wp.start_date));
              const endDates = workPackages.map(wp => new Date(wp.end_date));
              const earliestDate = new Date(Math.min(...startDates));
              const latestDate = new Date(Math.max(...endDates));
              
              // Generate array of months (YYYY-MM format)
              const months = [];
              const current = new Date(earliestDate.getFullYear(), earliestDate.getMonth(), 1);
              const end = new Date(latestDate.getFullYear(), latestDate.getMonth(), 1);
              
              while (current <= end) {
                const year = current.getFullYear();
                const month = String(current.getMonth() + 1).padStart(2, '0');
                months.push(`${year}-${month}`);
                current.setMonth(current.getMonth() + 1);
              }
              
              // Filter only human resources
              const humanResources = resources.filter(r => r.type === 'human');
              
              // Helper function to get allocations for a resource in a specific month
              const getAllocationsForResourceMonth = (resourceId, month) => {
                return resourceAllocations.filter(alloc => {
                  if (alloc.resource_id !== resourceId) return false;
                  // Check if month is within allocation period
                  const allocStart = alloc.start_month;
                  const allocEnd = alloc.end_month;
                  return month >= allocStart && month <= allocEnd;
                });
              };
              
              return (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 min-w-[200px]">
                        Resurs
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll
                      </th>
                      {months.map(month => {
                        const [year, monthNum] = month.split('-');
                        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
                        return (
                          <th key={month} className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase min-w-[100px]">
                            <div>{monthNames[parseInt(monthNum) - 1]}</div>
                            <div className="text-gray-400">{year}</div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {humanResources.map(resource => {
                      return (
                        <tr key={resource.id} className="hover:bg-gray-50">
                          <td className="sticky left-0 z-10 bg-white px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                            {resource.name}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-xs text-gray-600">
                            {resource.role}
                          </td>
                          {months.map(month => {
                            const allocations = getAllocationsForResourceMonth(resource.id, month);
                            const totalPercent = allocations.reduce((sum, a) => sum + (a.allocation_percent || 0), 0);
                            
                            const bgColor = totalPercent === 0 ? 'bg-white' :
                                          totalPercent <= 50 ? 'bg-green-50' :
                                          totalPercent <= 80 ? 'bg-yellow-50' :
                                          totalPercent <= 100 ? 'bg-orange-50' :
                                          'bg-red-50';
                            
                            const textColor = totalPercent === 0 ? 'text-gray-400' :
                                            totalPercent <= 50 ? 'text-green-700' :
                                            totalPercent <= 80 ? 'text-yellow-700' :
                                            totalPercent <= 100 ? 'text-orange-700' :
                                            'text-red-700';
                            
                            return (
                              <td 
                                key={month} 
                                className={`px-2 py-2 text-center text-xs ${bgColor} border-l border-gray-100 cursor-pointer hover:opacity-80 transition-opacity`}
                                onClick={() => {
                                  setEditingAllocation({
                                    resource,
                                    month,
                                    allocations
                                  });
                                }}
                              >
                                {allocations.length > 0 ? (
                                  <div className="space-y-1">
                                    <div className={`font-semibold ${textColor}`}>{totalPercent}%</div>
                                    {allocations.map(alloc => {
                                      const project = getEntityById(alloc.project_id);
                                      return (
                                        <div key={alloc.id} className="text-xs text-gray-600 truncate" title={project?.name}>
                                          {project?.name?.substring(0, 15)}... ({alloc.allocation_percent}%)
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <span className="text-gray-300">-</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              );
            })()}
          </div>
          
          {/* Resource utilization summary */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Färgkodning</h4>
            <div className="flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                <span className="text-gray-600">≤50% allokerad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></div>
                <span className="text-gray-600">51-80% allokerad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
                <span className="text-gray-600">81-100% allokerad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
                <span className="text-gray-600">{'>'} 100% överallokerad</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick view popover */}
      <EntityQuickView
        entity={quickViewEntity}
        position={quickViewPosition}
        onClose={() => {
          setQuickViewEntity(null);
          setQuickViewPosition(null);
        }}
        onViewDetails={() => {
          setDetailModalEntity(quickViewEntity);
          setQuickViewEntity(null);
          setQuickViewPosition(null);
        }}
      />

      {/* Detail modal */}
      {detailModalEntity && (
        <EntityDetailModal
          entity={detailModalEntity}
          onClose={() => setDetailModalEntity(null)}
        />
      )}

      {/* Edit Resource Allocation Modal */}
      {editingAllocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Redigera Resursallokering</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {editingAllocation.resource.name} - {editingAllocation.month}
                </p>
              </div>
              <button
                onClick={() => setEditingAllocation(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Nuvarande Allokeringar</h4>
                {editingAllocation.allocations.length > 0 ? (
                  <div className="space-y-2">
                    {editingAllocation.allocations.map(alloc => {
                      const project = getEntityById(alloc.project_id);
                      return (
                        <div key={alloc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{project?.name}</p>
                            <p className="text-xs text-gray-600">
                              {alloc.start_month} → {alloc.end_month}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-semibold text-primary-600">{alloc.allocation_percent}%</span>
                            <button
                              onClick={() => {
                                if (confirm('Är du säker på att du vill ta bort denna allokering?')) {
                                  deleteResourceAllocation(alloc.id);
                                  setEditingAllocation(null);
                                }
                              }}
                              className="p-1 hover:bg-red-100 rounded text-red-600"
                              title="Ta bort"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Inga allokeringar för denna månad</p>
                )}
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Lägg till Ny Allokering</h4>
                <div className="text-xs text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg">
                  💡 <strong>Tips:</strong> För att lägga till en ny allokering, använd "Lägg till entitet" och skapa en ny resursallokering med rätt resource_id, project_id, start_month och end_month.
                </div>
                <p className="text-xs text-gray-500">
                  Nuvarande total allokering: <span className="font-semibold">
                    {editingAllocation.allocations.reduce((sum, a) => sum + a.allocation_percent, 0)}%
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setEditingAllocation(null)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Stäng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPortfolio;
