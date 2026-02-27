import { useParams, Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Layers, ChevronRight } from 'lucide-react';

const Perspectives = () => {
  const { perspective } = useParams();
  const { metamodel, entities } = useData();

  const currentPerspective = perspective || 'business';
  const layer = metamodel.layers.find(
    l => l.name.toLowerCase() === currentPerspective.toLowerCase()
  );

  if (!layer) {
    return <div>Perspektiv hittades inte</div>;
  }

  const perspectiveInfo = {
    business: {
      title: 'Business Architecture',
      description: 'Affärskapabiliteter, processer och organisationsstruktur',
      icon: '🏢',
      keyAspects: [
        'Affärsprocesser och aktiviteter',
        'Organisationsenheter och roller',
        'Affärskapabiliteter',
        'RTO/RPO för kritiska processer'
      ]
    },
    application: {
      title: 'Application Architecture',
      description: 'Applikationssystem och deras relationer',
      icon: '💻',
      keyAspects: [
        'Applikationssystem och komponenter',
        'Applikationsgränssnitt',
        'Kritikalitetsklassificering',
        'Systemägare och ansvar'
      ]
    },
    technology: {
      title: 'Technology Architecture',
      description: 'Infrastruktur, nätverk och teknologiplattformar',
      icon: '🖥️',
      keyAspects: [
        'Infrastrukturnoder och servrar',
        'Nätverk och säkerhetszoner',
        'Teknologiplattformar',
        'Fysiska och molnbaserade platser'
      ]
    },
    security: {
      title: 'Security Architecture',
      description: 'Säkerhetskontroller, hot och sårbarheter',
      icon: '🔒',
      keyAspects: [
        'Säkerhetskontroller enligt NIS 2',
        'Hotscenarier och sårbarheter',
        'Säkerhetincidenter',
        'Riskbedömningar'
      ]
    },
    data: {
      title: 'Data Architecture',
      description: 'Dataobjekt, lagring och flöden',
      icon: '📊',
      keyAspects: [
        'Dataobjekt och klassificering',
        'Datalagring och databaser',
        'Dataflöden mellan system',
        'GDPR-compliance och kryptering'
      ]
    },
    governance: {
      title: 'Governance Architecture',
      description: 'Policyer, leverantörer och compliance',
      icon: '⚖️',
      keyAspects: [
        'Säkerhetspolicyer',
        'Leverantörshantering',
        'Compliance-krav',
        'Styrning och ansvar'
      ]
    }
  };

  const info = perspectiveInfo[currentPerspective.toLowerCase()] || {};

  return (
    <div className="space-y-6">
      {/* Perspective Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto" aria-label="Tabs">
            {metamodel.layers.map((l) => {
              const isActive = l.name.toLowerCase() === currentPerspective.toLowerCase();
              return (
                <Link
                  key={l.name}
                  to={`/perspectives/${l.name.toLowerCase()}`}
                  className={`px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    isActive
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  style={isActive ? { borderBottomColor: l.color } : {}}
                >
                  {l.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Perspective Header */}
        <div className="p-6">
          <div className="flex items-start">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl mr-4"
              style={{ backgroundColor: layer.color + '20' }}
            >
              {info.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{info.title}</h1>
              <p className="text-gray-600">{info.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Aspects */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Nyckelaspekter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {info.keyAspects?.map((aspect, index) => (
            <div
              key={index}
              className="flex items-start p-3 border border-gray-200 rounded-lg"
            >
              <div
                className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                style={{ backgroundColor: layer.color }}
              />
              <span className="text-sm text-gray-700">{aspect}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Entity Types in this Perspective */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Layers className="h-5 w-5 text-primary-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Entitetstyper i detta perspektiv
            </h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {layer.entityTypes.map((entityType) => {
              const entityCount = entities[entityType]?.length || 0;
              
              return (
                <Link
                  key={entityType}
                  to={`/entities?type=${entityType}`}
                  className="group p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                      {entityType}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{entityCount}</span>
                    <span className="text-sm text-gray-500">entiteter</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* NIS 2 Relevance */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow p-6 border border-blue-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          NIS 2-relevans för {info.title}
        </h2>
        <p className="text-gray-700 mb-4">
          Detta perspektiv är kritiskt för NIS 2-compliance och används för att dokumentera
          och hantera flera artiklar i direktivet.
        </p>
        <Link
          to="/compliance"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Se detaljerad compliance-mappning
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default Perspectives;
