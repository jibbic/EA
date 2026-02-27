import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Layers, 
  Database, 
  Network, 
  Shield,
  Menu,
  X,
  GitBranch,
  Calendar,
  Settings as SettingsIcon
} from 'lucide-react';
import { useState } from 'react';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Visualisering', href: '/visualizer', icon: Network },
    { name: 'Entiteter', href: '/entities', icon: Database },
    { name: 'Relationer', href: '/relationships', icon: GitBranch },
    { name: 'Roadmap', href: '/roadmap', icon: Calendar },
    { name: 'Arkitekturperspektiv', href: '/perspectives/business', icon: Layers },
    { name: 'NIS 2 Compliance', href: '/compliance', icon: Shield },
    { name: 'Inställningar', href: '/settings', icon: SettingsIcon },
  ];

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
                NIS 2 Enterprise Architecture
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Framework v1.0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="h-full overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href || 
                (item.href.includes('perspectives') && location.pathname.includes('perspectives'));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 px-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Snabbinfo
            </h3>
            <div className="mt-3 space-y-2">
              <div className="text-sm">
                <div className="text-gray-500">Arkitekturskikt</div>
                <div className="text-lg font-semibold text-gray-900">6</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-500">Entitetstyper</div>
                <div className="text-lg font-semibold text-gray-900">48</div>
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
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
