import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  MinusCircle,
  TrendingUp,
  AlertTriangle,
  Shield,
  FileText,
  ChevronDown,
  ChevronUp,
  Download
} from 'lucide-react';

const ComplianceDashboard = () => {
  const { complianceAnalysis, refreshComplianceAnalysis, metamodel } = useData();
  const [expandedArticles, setExpandedArticles] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!complianceAnalysis) {
      setLoading(true);
      refreshComplianceAnalysis();
      setLoading(false);
    }
  }, [complianceAnalysis, refreshComplianceAnalysis]);

  const toggleArticle = (articleId) => {
    setExpandedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const getComplianceIcon = (level) => {
    switch (level) {
      case 'compliant':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'non_compliant':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <MinusCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getComplianceColor = (level) => {
    switch (level) {
      case 'compliant':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'non_compliant':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCheckStatus = (checkResult) => {
    if (checkResult.status === 'pass') {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    } else if (checkResult.status === 'partial') {
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    } else {
      return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const exportComplianceReport = () => {
    if (!complianceAnalysis) return;

    const report = {
      generated: new Date().toISOString(),
      overallScore: complianceAnalysis.overallScore,
      overallLevel: complianceAnalysis.overallLevel,
      articles: complianceAnalysis.articles.map(article => ({
        id: article.article,
        title: article.title,
        score: article.overallScore,
        level: article.complianceLevel,
        checks: article.checks.map(check => ({
          id: check.id,
          description: check.description,
          score: check.score,
          status: check.status,
          issues: check.issues,
          details: check.details
        }))
      }))
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nis2-compliance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading || !complianceAnalysis) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing NIS2 compliance...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            NIS2 Compliance Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Compliance status according to NIS2 Directive requirements
          </p>
        </div>
        <button
          onClick={exportComplianceReport}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      {/* Overall Compliance Card */}
      <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Overall Compliance</h2>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-gray-900">
                {complianceAnalysis.overallScore}%
              </div>
              <div className={`px-4 py-2 rounded-lg border-2 ${getComplianceColor(complianceAnalysis.overallLevel)}`}>
                <div className="flex items-center gap-2">
                  {getComplianceIcon(complianceAnalysis.overallLevel)}
                  <span className="font-semibold capitalize">
                    {complianceAnalysis.overallLevel.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Analyzed Articles</div>
            <div className="text-2xl font-bold text-gray-900">
              {complianceAnalysis.articles.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Compliance Progress</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${complianceAnalysis.overallScore}%`,
                backgroundColor: 
                  complianceAnalysis.overallScore >= 80 ? '#10B981' :
                  complianceAnalysis.overallScore >= 50 ? '#F59E0B' : '#EF4444'
              }}
            />
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {complianceAnalysis.articles.map((article) => (
          <div
            key={article.article}
            className="bg-white rounded-lg shadow-md border-2 border-gray-200 overflow-hidden"
          >
            {/* Article Header */}
            <div
              onClick={() => toggleArticle(article.article)}
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <h3 className="font-semibold text-gray-900">{article.article}</h3>
                  </div>
                  <p className="text-sm text-gray-700 font-medium mb-1">{article.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{article.description}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{article.overallScore}%</div>
                    <div className="flex items-center gap-1 justify-end mt-1">
                      {getComplianceIcon(article.complianceLevel)}
                    </div>
                  </div>
                  {expandedArticles.has(article.article) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${article.overallScore}%`,
                      backgroundColor:
                        article.overallScore >= 80 ? '#10B981' :
                        article.overallScore >= 50 ? '#F59E0B' : '#EF4444'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedArticles.has(article.article) && (
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                {/* Compliance Checks */}
                <h4 className="font-semibold text-sm text-gray-900 mb-3">Compliance Checks:</h4>
                <div className="space-y-3">
                  {article.checks.map((check) => (
                    <div
                      key={check.id}
                      className="bg-white rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getCheckStatus(check)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-sm font-medium text-gray-900">
                              {check.description}
                            </p>
                            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                              {check.score}%
                            </span>
                          </div>

                          {/* Details */}
                          {check.details && check.details.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {check.details.map((detail, idx) => (
                                <p key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{detail}</span>
                                </p>
                              ))}
                            </div>
                          )}

                          {/* Issues */}
                          {check.issues && check.issues.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {check.issues.map((issue, idx) => (
                                <p key={idx} className="text-xs text-red-600 flex items-start gap-1">
                                  <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>{issue}</span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Compliance Levels</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metamodel.nis2_compliance.compliance_levels.map((level) => (
            <div key={level.level} className="flex items-center gap-2">
              {level.level === 'compliant' && <CheckCircle className="w-5 h-5" style={{ color: level.color }} />}
              {level.level === 'partial' && <AlertCircle className="w-5 h-5" style={{ color: level.color }} />}
              {level.level === 'non_compliant' && <XCircle className="w-5 h-5" style={{ color: level.color }} />}
              {level.level === 'not_applicable' && <MinusCircle className="w-5 h-5" style={{ color: level.color }} />}
              <div>
                <div className="text-sm font-medium text-gray-900 capitalize">
                  {level.description}
                </div>
                {level.score_min !== null && (
                  <div className="text-xs text-gray-500">≥{level.score_min}%</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-center text-xs text-gray-500">
        Analysis generated: {new Date(complianceAnalysis.timestamp).toLocaleString()}
      </div>
    </div>
  );
};

export default ComplianceDashboard;
