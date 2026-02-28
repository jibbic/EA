import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Database, 
  Network,
  Menu,
  X,
  GitBranch,
  Calendar,
  Briefcase,
  Settings as SettingsIcon,
  TrendingUp,
  Grid3x3,
  Clock,
  Flame,
  ChevronDown,
  ChevronRight,
  Home,
  Box,
  FolderKanban,
  HelpCircle
} from 'lucide-react';
import { useState } from 'react';
import { useData } from '../context/DataContext';
import Breadcrumbs from './Breadcrumbs';
import Tooltip from './Tooltip';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    portfolio: true,
    analysis: true,
    data: true
  });
  const { entities, relationships } = useData();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigationSections = [
    {
      id: 'overview',
      title: 'Översikt',
      icon: LayoutDashboard,
      items: [
        { 
          name: 'Dashboard', 
          href: '/', 
          icon: Home,
          tooltip: 'Översikt över arkitekturen och snabbåtkomst'
        },
        { 
          name: 'Arkitekturvy', 
          href: '/visualizer', 
          icon: Network,
          tooltip: 'Interaktiv visualisering av alla komponenter och relationer'
        },
        { 
          name: 'Perspektiv', 
          href: '/perspectives/business', 
          icon: Layers,
          tooltip: 'Olika arkitekturperspektiv (verksamhet, applikation, teknologi)'
        }
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio',
      icon: Briefcase,
      items: [
        { 
          name: 'Applikationer', 
          href: '/application-portfolio', 
          icon: Grid3x3,
          tooltip: 'Analysera applikationsportfölj för investeringsbeslut'
        },
        { 
          name: 'Teknologi', 
          href: '/technology-lifecycle', 
          icon: Clock,
          tooltip: 'Tekniklivscykel och EOL-varningar'
        },
        { 
          name: 'Projekt', 
          href: '/projects', 
          icon: FolderKanban,
          tooltip: 'Projektportfölj och initiativ'
        },
        { 
          name: 'Roadmap', 
          href: '/roadmap', 
          icon: Calendar,
          tooltip: 'Tidslinje för planerade förändringar'
        }
      ]
    },
    {
      id: 'analysis',
      title: 'Analys',
      icon: TrendingUp,
      items: [
        { 
          name: 'Påverkansanalys', 
          href: '/impact-analysis', 
          icon: GitBranch,
          tooltip: 'Analysera hur ändringar påverkar andra komponenter'
        },
        { 
          name: 'Värmekarta', 
          href: '/heatmaps', 
          icon: Flame,
          tooltip: 'Visualisera kostnad, risk och komplexitet'
        }
      ]
    },
    {
      id: 'data',
      title: 'Arkitekturdata',
      icon: Database,
      items: [
        { 
          name: 'Entiteter', 
          href: '/entities', 
          icon: Box,
          tooltip: 'Hantera alla arkitekturkomponenter'
        },
        { 
          name: 'Relationer', 
          href: '/relationships', 
          icon: GitBranch,
          tooltip: 'Hantera kopplingar mellan komponenter'
        }
      ]
    }
  ];

  const totalEntities = Object.values(entities).reduce(
    (sum, items) => sum + items.length,
    0
  );

  const criticalSystems = entities.ApplicationComponent?.filter(
    s => s.criticality === 'critical'
  ).length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-900">
                Enterprise Architecture Framework
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Tooltip content="Hjälp och dokumentation">
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <HelpCircle size={20} />
                </button>
              </Tooltip>
              <span className="text-sm text-gray-500">
                v2.0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-20 overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="h-full py-4">
          <div className="px-3 space-y-2">
            {/* Navigation Sections */}
            {navigationSections.map((section) => (
              <div key={section.id} className="mb-2">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <section.icon className="w-4 h-4 mr-2" />
                    {section.title}
                  </div>
                  {expandedSections[section.id] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Section Items */}
                {expandedSections[section.id] && (
                  <div className="mt-1 space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href || 
                        (item.href.includes('perspectives') && location.pathname.includes('perspectives'));
                      
                      return (
                        <Tooltip key={item.name} content={item.tooltip} position="right">
                          <Link
                            to={item.href}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                              isActive
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <Icon className="mr-3 h-4 w-4" />
                            {item.name}
                          </Link>
                        </Tooltip>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Settings */}
            <Tooltip content="Systeminställningar och dataimport/export" position="right">
              <Link
                to="/settings"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === '/settings'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SettingsIcon className="mr-3 h-4 w-4" />
                Inställningar
              </Link>
            </Tooltip>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 px-6 pt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Snabbinfo
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Totalt entiteter</span>
                <span className="font-semibold text-gray-900">{totalEntities}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Kritiska system</span>
                <span className="font-semibold text-red-600">{criticalSystems}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Relationer</span>
                <span className="font-semibold text-gray-900">{relationships.length}</span>
              </div>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}
      >
        <div className="p-6">
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
