import { useData } from '../context/DataContext';
import { Shield, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';

const Compliance = () => {
  const { getComplianceStatus, nis2Mappings, entities } = useData();
  const [expandedArticles, setExpandedArticles] = useState({});

  const complianceStatus = getComplianceStatus();

  const overallCompliance =
    Object.values(complianceStatus).length > 0
      ? Math.round(
          Object.values(complianceStatus).reduce((sum, item) => sum + item.percentage, 0) /
            Object.values(complianceStatus).length
        )
      : 0;

  const toggleArticle = (article) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [article]: !prev[article]
    }));
  };

  const getStatusColor = (percentage) => {
    if (percentage === 100) return 'green';
    if (percentage >= 66) return 'yellow';
    return 'red';
  };

  const getStatusIcon = (percentage) => {
    if (percentage === 100) {
      return <CheckCircle2 className="h-6 w-6 text-green-600" />;
    }
    return <AlertCircle className="h-6 w-6 text-amber-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-8 w-8 text-primary-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">NIS 2 Compliance-översikt</h2>
            <p className="text-gray-600 mt-1">
              Detaljerad mappning av NIS 2-krav till din arkitektur
            </p>
          </div>
        </div>

        {/* Overall Status */}
        <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 border border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Övergripande Compliance-nivå
              </h3>
              <p className="text-sm text-gray-600">
                Baserat på dokumenterade entiteter enligt NIS 2
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-primary-600">{overallCompliance}%</div>
              <div className="text-sm text-gray-600 mt-1">
                {Object.values(complianceStatus).filter((s) => s.percentage === 100).length} av{' '}
                {Object.values(complianceStatus).length} artiklar
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-primary-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallCompliance}%` }}
            />
          </div>
        </div>
      </div>

      {/* Article Details */}
      <div className="space-y-4">
        {Object.entries(complianceStatus).map(([article, status]) => {
          const isExpanded = expandedArticles[article];
          const statusColor = getStatusColor(status.percentage);
          const requiredEntities = nis2Mappings?.[article]?.entities || [];

          return (
            <div key={article} className="bg-white rounded-lg shadow">
              <button
                onClick={() => toggleArticle(article)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start flex-1">
                  <div className="mr-4">{getStatusIcon(status.percentage)}</div>
                  <div className="text-left flex-1">
                    <div className="flex items-center mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{article}</h3>
                      <span
                        className={`ml-3 px-3 py-1 text-xs font-medium rounded-full ${
                          statusColor === 'green'
                            ? 'bg-green-100 text-green-800'
                            : statusColor === 'yellow'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {status.percentage}%
                      </span>
                    </div>
                    <p className="text-gray-600">{status.title}</p>
                    <div className="mt-3 flex items-center space-x-4 text-sm">
                      <span className="text-gray-500">
                        {status.covered} av {status.total} entitetstyper dokumenterade
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">
                    Obligatoriska entitetstyper:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {requiredEntities.map((entityType) => {
                      const hasEntities = entities[entityType] && entities[entityType].length > 0;
                      const count = entities[entityType]?.length || 0;

                      return (
                        <div
                          key={entityType}
                          className={`p-3 rounded-lg border-2 ${
                            hasEntities
                              ? 'border-green-200 bg-green-50'
                              : 'border-red-200 bg-red-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{entityType}</span>
                            {hasEntities ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            {hasEntities ? `${count} dokumenterade` : 'Saknas'}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommendations */}
                  {status.percentage < 100 && (
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <h5 className="text-sm font-semibold text-amber-900 mb-2">
                        📋 Rekommenderade åtgärder:
                      </h5>
                      <ul className="text-sm text-amber-800 space-y-1">
                        {requiredEntities
                          .filter((et) => !entities[et] || entities[et].length === 0)
                          .map((et) => (
                            <li key={et}>
                              • Dokumentera minst en {et} för att uppfylla {article}
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Documentation Reference */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Om NIS 2-direktivet</h3>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p>
            NIS 2-direktivet (EU 2022/2555) ställer omfattande krav på cybersäkerhet för
            väsentliga och viktiga enheter inom EU. Artikel 21 specificerar de
            cybersäkerhetsåtgärder som organisationer måste implementera och dokumentera.
          </p>
          <p className="mt-3">
            Detta framework hjälper dig att strukturerat dokumentera din arkitektur enligt
            direktivets krav och identifiera eventuella gap i din compliance.
          </p>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <a
            href="https://eur-lex.europa.eu/eli/dir/2022/2555/oj"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            Läs NIS 2-direktivet i sin helhet
            <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>

      {/* Export Report */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Exportera Compliance-rapport</h3>
        <p className="text-primary-100 mb-4">
          Generera en detaljerad rapport för revision och dokumentation
        </p>
        <button className="px-6 py-2 bg-white text-primary-600 rounded-lg hover:bg-gray-100 font-medium transition-colors">
          Generera PDF-rapport
        </button>
      </div>
    </div>
  );
};

export default Compliance;
