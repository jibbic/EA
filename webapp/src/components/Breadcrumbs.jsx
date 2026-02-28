import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  // Map URL segments to readable names
  const breadcrumbNameMap = {
    'visualizer': 'Arkitekturvy',
    'entities': 'Entiteter',
    'relationships': 'Relationer',
    'projects': 'Projekt',
    'roadmap': 'Roadmap',
    'perspectives': 'Perspektiv',
    'settings': 'Inställningar',
    'impact-analysis': 'Påverkansanalys',
    'application-portfolio': 'Applikationsportfölj',
    'technology-lifecycle': 'Tekniklivscykel',
    'heatmaps': 'Värmekarta',
    'business': 'Verksamhet',
    'application': 'Applikation',
    'technology': 'Teknologi',
    'physical': 'Fysisk',
    'motivation': 'Motivation',
    'strategy': 'Strategi',
    'implementation': 'Implementation'
  };

  const getBreadcrumbName = (segment) => {
    return breadcrumbNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  if (pathnames.length === 0) {
    return null; // Don't show breadcrumbs on home page
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center hover:text-primary-600 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {pathnames.map((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <div key={routeTo} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-900">
                {getBreadcrumbName(segment)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-primary-600 transition-colors"
              >
                {getBreadcrumbName(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
