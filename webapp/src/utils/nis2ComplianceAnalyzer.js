/**
 * NIS2 Compliance Analyzer
 * Analyzes entities and relationships for NIS2 compliance
 */

import { archimateMetamodel } from '../data/archimateMetamodel.js';

/**
 * Analyze compliance for a specific NIS2 article
 */
export function analyzeArticleCompliance(article, entities, relationships, metamodel) {
  const articleDef = archimateMetamodel.nis2_compliance.articles.find(a => a.id === article);
  if (!articleDef) return null;

  const results = {
    article: articleDef.id,
    title: articleDef.title,
    description: articleDef.description,
    checks: [],
    overallScore: 0,
    complianceLevel: 'not_applicable'
  };

  // Run each compliance check
  for (const check of articleDef.compliance_checks) {
    const checkResult = evaluateCheck(check, articleDef, entities, relationships, metamodel);
    results.checks.push({
      ...check,
      ...checkResult
    });
  }

  // Calculate overall score
  const totalWeight = results.checks.reduce((sum, c) => sum + c.weight, 0);
  const weightedScore = results.checks.reduce((sum, c) => sum + (c.score * c.weight / 100), 0);
  results.overallScore = totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;

  // Determine compliance level
  results.complianceLevel = getComplianceLevel(results.overallScore);

  return results;
}

/**
 * Evaluate a single compliance check
 */
function evaluateCheck(check, articleDef, entities, relationships, metamodel) {
  const checkId = check.id;
  let score = 0;
  let details = [];
  let issues = [];

  // Check-specific logic
  switch (checkId) {
    case 'ciso_defined':
      {
        const cisoRoles = entities.filter(e => 
          e.type === 'BusinessRole' && 
          (e.name?.toLowerCase().includes('ciso') || 
           e.name?.toLowerCase().includes('security officer') ||
           e.name?.toLowerCase().includes('säkerhetsansvarig'))
        );
        score = cisoRoles.length > 0 ? 100 : 0;
        if (cisoRoles.length > 0) {
          details.push(`Found ${cisoRoles.length} CISO/Security Officer role(s)`);
        } else {
          issues.push('No CISO or Security Officer role defined');
        }
      }
      break;

    case 'management_approval':
      {
        const approvalDocs = entities.filter(e => 
          e.attributes?.management_approval || 
          e.attributes?.approved_by
        );
        score = approvalDocs.length > 0 ? 100 : 50;
        if (approvalDocs.length === 0) {
          issues.push('No explicit management approval documented');
        } else {
          details.push(`${approvalDocs.length} items with management approval`);
        }
      }
      break;

    case 'governance_framework':
      {
        const principles = entities.filter(e => e.type === 'Principle');
        const policies = entities.filter(e => 
          e.type === 'BusinessObject' && 
          (e.name?.toLowerCase().includes('policy') || e.name?.toLowerCase().includes('policy'))
        );
        const total = principles.length + policies.length;
        score = Math.min(100, total * 10);
        if (total > 0) {
          details.push(`${principles.length} principles, ${policies.length} policies defined`);
        } else {
          issues.push('No governance framework elements found');
        }
      }
      break;

    case 'critical_systems':
      {
        const systems = entities.filter(e => 
          (e.type === 'ApplicationComponent' || e.type === 'Node') &&
          e.attributes?.criticality
        );
        const criticalSystems = systems.filter(s => 
          ['critical', 'high', 'hög', 'kritisk'].includes(s.attributes.criticality?.toLowerCase())
        );
        score = systems.length > 0 ? Math.min(100, (systems.length / 10) * 100) : 0;
        details.push(`${systems.length} systems with criticality classification`);
        details.push(`${criticalSystems.length} critical systems identified`);
        if (systems.length === 0) {
          issues.push('No systems with criticality classification');
        }
      }
      break;

    case 'risk_assessments':
      {
        const riskEntities = entities.filter(e => 
          e.attributes?.risk_level || 
          e.attributes?.risk_assessment_date ||
          e.attributes?.risk
        );
        score = riskEntities.length > 0 ? Math.min(100, (riskEntities.length / 20) * 100) : 0;
        if (riskEntities.length > 0) {
          details.push(`${riskEntities.length} entities with risk assessments`);
        } else {
          issues.push('No risk assessments found');
        }
      }
      break;

    case 'security_controls':
      {
        const controls = entities.filter(e => 
          e.type === 'Principle' ||
          (e.type === 'Requirement' && e.attributes?.nis2_article)
        );
        score = controls.length > 0 ? Math.min(100, (controls.length / 30) * 100) : 0;
        if (controls.length > 0) {
          details.push(`${controls.length} security controls documented`);
        } else {
          issues.push('No security controls found');
        }
      }
      break;

    case 'business_continuity':
      {
        const bcpProcesses = entities.filter(e => 
          e.type === 'BusinessProcess' &&
          (e.attributes?.rto || e.attributes?.rpo || e.attributes?.bc_plan)
        );
        score = bcpProcesses.length > 0 ? Math.min(100, (bcpProcesses.length / 15) * 100) : 0;
        if (bcpProcesses.length > 0) {
          details.push(`${bcpProcesses.length} processes with BCP parameters (RTO/RPO)`);
        } else {
          issues.push('No business continuity parameters defined');
        }
      }
      break;

    case 'incident_response':
      {
        const irProcesses = entities.filter(e => 
          e.type === 'BusinessProcess' &&
          (e.name?.toLowerCase().includes('incident') || 
           e.name?.toLowerCase().includes('response') ||
           e.name?.toLowerCase().includes('incident'))
        );
        score = irProcesses.length > 0 ? 100 : 0;
        if (irProcesses.length > 0) {
          details.push(`${irProcesses.length} incident response process(es) defined`);
        } else {
          issues.push('No incident response procedures found');
        }
      }
      break;

    case 'supply_chain':
      {
        const contracts = entities.filter(e => e.type === 'Contract');
        const contractsWithSecurity = contracts.filter(c => 
          c.attributes?.security_requirements || 
          c.attributes?.cybersecurity_clause
        );
        score = contracts.length > 0 ? Math.round((contractsWithSecurity.length / contracts.length) * 100) : 0;
        details.push(`${contractsWithSecurity.length}/${contracts.length} contracts with security requirements`);
        if (contracts.length === 0) {
          issues.push('No supplier contracts found');
        } else if (contractsWithSecurity.length === 0) {
          issues.push('No contracts with security requirements');
        }
      }
      break;

    case 'network_segmentation':
      {
        const networks = entities.filter(e => e.type === 'CommunicationNetwork');
        const segmented = networks.filter(n => n.attributes?.security_zone);
        score = networks.length > 0 ? Math.round((segmented.length / networks.length) * 100) : 0;
        if (networks.length > 0) {
          details.push(`${segmented.length}/${networks.length} networks with security zones`);
        } else {
          issues.push('No networks defined');
        }
      }
      break;

    case 'encryption':
      {
        const dataObjects = entities.filter(e => e.type === 'DataObject');
        const encrypted = dataObjects.filter(d => d.attributes?.encryption_required === true);
        const networks = entities.filter(e => e.type === 'CommunicationNetwork');
        const encryptedNetworks = networks.filter(n => n.attributes?.encryption === true);
        const total = dataObjects.length + networks.length;
        const encryptedTotal = encrypted.length + encryptedNetworks.length;
        score = total > 0 ? Math.round((encryptedTotal / total) * 100) : 50;
        if (total > 0) {
          details.push(`${encryptedTotal}/${total} data/network elements with encryption`);
        } else {
          issues.push('No data objects or networks to assess');
        }
      }
      break;

    case 'access_control':
      {
        const accessRels = relationships.filter(r => r.type === 'access');
        const systems = entities.filter(e => 
          e.type === 'ApplicationComponent' && 
          e.attributes?.authentication_method
        );
        score = accessRels.length > 0 || systems.length > 0 ? 
          Math.min(100, (accessRels.length * 5 + systems.length * 10)) : 0;
        details.push(`${accessRels.length} access relationships, ${systems.length} systems with authentication`);
        if (accessRels.length === 0 && systems.length === 0) {
          issues.push('No access control information');
        }
      }
      break;

    case 'mfa':
      {
        const mfaSystems = entities.filter(e => 
          e.attributes?.mfa_enabled === true ||
          e.attributes?.authentication_method?.toLowerCase().includes('mfa') ||
          e.attributes?.authentication_method?.toLowerCase().includes('multi-factor')
        );
        score = mfaSystems.length > 0 ? Math.min(100, mfaSystems.length * 20) : 0;
        if (mfaSystems.length > 0) {
          details.push(`${mfaSystems.length} systems with MFA enabled`);
        } else {
          issues.push('No MFA implementation found');
        }
      }
      break;

    case 'asset_inventory':
      {
        const assets = entities.filter(e => 
          e.type === 'ApplicationComponent' || 
          e.type === 'Node' || 
          e.type === 'Equipment' ||
          e.type === 'SystemSoftware'
        );
        const withOwner = assets.filter(a => a.attributes?.owner);
        const withCriticality = assets.filter(a => a.attributes?.criticality);
        score = assets.length > 0 ? 
          Math.round(((withOwner.length + withCriticality.length) / (assets.length * 2)) * 100) : 0;
        details.push(`${assets.length} assets in inventory`);
        details.push(`${withOwner.length} with owner, ${withCriticality.length} with criticality`);
        if (assets.length === 0) {
          issues.push('No assets in inventory');
        }
      }
      break;

    case 'config_management':
      {
        const nodes = entities.filter(e => e.type === 'Node');
        const software = entities.filter(e => e.type === 'SystemSoftware');
        const withVersion = [...nodes, ...software].filter(e => e.attributes?.version);
        const withPatch = nodes.filter(n => n.attributes?.patching_status);
        score = (nodes.length + software.length) > 0 ? 
          Math.round(((withVersion.length + withPatch.length) / ((nodes.length + software.length) * 2)) * 100) : 0;
        details.push(`${withVersion.length} items with version tracking`);
        details.push(`${withPatch.length} nodes with patch status`);
        if (withVersion.length === 0 && withPatch.length === 0) {
          issues.push('No configuration management information');
        }
      }
      break;

    case 'audit_trails':
      {
        const withMonitoring = entities.filter(e => 
          e.attributes?.monitoring_enabled === true ||
          e.attributes?.logging_enabled === true ||
          e.attributes?.audit_enabled === true
        );
        score = withMonitoring.length > 0 ? Math.min(100, withMonitoring.length * 5) : 0;
        if (withMonitoring.length > 0) {
          details.push(`${withMonitoring.length} elements with monitoring/logging`);
        } else {
          issues.push('No audit trails or monitoring configured');
        }
      }
      break;

    case 'supplier_requirements':
      {
        const contracts = entities.filter(e => e.type === 'Contract');
        const withReqs = contracts.filter(c => 
          c.attributes?.security_requirements ||
          c.attributes?.cybersecurity_requirements
        );
        score = contracts.length > 0 ? Math.round((withReqs.length / contracts.length) * 100) : 0;
        if (contracts.length > 0) {
          details.push(`${withReqs.length}/${contracts.length} contracts with security requirements`);
        } else {
          issues.push('No supplier contracts found');
        }
      }
      break;

    case 'third_party_risk':
      {
        const suppliers = entities.filter(e => 
          e.type === 'BusinessActor' && 
          (e.attributes?.is_supplier || e.attributes?.supplier_type)
        );
        const assessed = suppliers.filter(s => 
          s.attributes?.risk_assessment || 
          s.attributes?.risk_level
        );
        score = suppliers.length > 0 ? Math.round((assessed.length / suppliers.length) * 100) : 0;
        if (suppliers.length > 0) {
          details.push(`${assessed.length}/${suppliers.length} suppliers with risk assessment`);
        } else {
          issues.push('No suppliers identified');
        }
      }
      break;

    case 'contractual_obligations':
      {
        const contracts = entities.filter(e => e.type === 'Contract');
        const withSLA = contracts.filter(c => 
          c.attributes?.sla || 
          c.attributes?.security_sla
        );
        score = contracts.length > 0 ? Math.round((withSLA.length / contracts.length) * 100) : 50;
        if (contracts.length > 0) {
          details.push(`${withSLA.length}/${contracts.length} contracts with SLA/obligations`);
        }
      }
      break;

    case 'supplier_monitoring':
      {
        const contracts = entities.filter(e => e.type === 'Contract');
        const monitored = contracts.filter(c => 
          c.attributes?.review_date || 
          c.attributes?.last_audit_date
        );
        score = contracts.length > 0 ? Math.round((monitored.length / contracts.length) * 100) : 0;
        if (contracts.length > 0) {
          details.push(`${monitored.length}/${contracts.length} contracts with review/audit dates`);
        } else {
          issues.push('No supplier monitoring evidence');
        }
      }
      break;

    case 'personal_data':
      {
        const dataObjects = entities.filter(e => e.type === 'DataObject');
        const classified = dataObjects.filter(d => 
          d.attributes?.gdpr_relevant !== undefined ||
          d.attributes?.contains_pii !== undefined
        );
        score = dataObjects.length > 0 ? Math.round((classified.length / dataObjects.length) * 100) : 0;
        details.push(`${classified.length}/${dataObjects.length} data objects classified for GDPR`);
        if (dataObjects.length === 0) {
          issues.push('No data objects defined');
        } else if (classified.length === 0) {
          issues.push('No GDPR classification on data objects');
        }
      }
      break;

    case 'data_protection':
      {
        const dataObjects = entities.filter(e => e.type === 'DataObject');
        const protectedData = dataObjects.filter(d => 
          d.attributes?.encryption_required === true ||
          d.attributes?.access_control === true
        );
        score = dataObjects.length > 0 ? Math.round((protectedData.length / dataObjects.length) * 100) : 0;
        if (dataObjects.length > 0) {
          details.push(`${protectedData.length}/${dataObjects.length} data objects with protection measures`);
        } else {
          issues.push('No data protection measures defined');
        }
      }
      break;

    case 'privacy_design':
      {
        const requirements = entities.filter(e => 
          e.type === 'Requirement' &&
          (e.name?.toLowerCase().includes('privacy') ||
           e.name?.toLowerCase().includes('gdpr') ||
           e.attributes?.gdpr_related === true)
        );
        score = requirements.length > 0 ? Math.min(100, requirements.length * 20) : 0;
        if (requirements.length > 0) {
          details.push(`${requirements.length} privacy/GDPR requirements defined`);
        } else {
          issues.push('No privacy by design requirements');
        }
      }
      break;

    case 'retention_policies':
      {
        const dataObjects = entities.filter(e => e.type === 'DataObject');
        const withRetention = dataObjects.filter(d => 
          d.attributes?.retention_period || 
          d.attributes?.retention_policy
        );
        score = dataObjects.length > 0 ? Math.round((withRetention.length / dataObjects.length) * 100) : 0;
        if (dataObjects.length > 0) {
          details.push(`${withRetention.length}/${dataObjects.length} data objects with retention policies`);
        } else {
          issues.push('No data retention policies');
        }
      }
      break;

    default:
      score = 50; // Default partial compliance
      details.push('Check not yet implemented');
  }

  return {
    score,
    status: score >= 80 ? 'pass' : score >= 50 ? 'partial' : 'fail',
    details,
    issues
  };
}

/**
 * Get compliance level based on score
 */
function getComplianceLevel(score) {
  const levels = archimateMetamodel.nis2_compliance.compliance_levels;
  for (const level of levels) {
    if (level.score_min !== null && score >= level.score_min) {
      return level.level;
    }
  }
  return 'not_applicable';
}

/**
 * Analyze all NIS2 articles
 */
export function analyzeAllCompliance(entities, relationships, metamodel) {
  const articles = archimateMetamodel.nis2_compliance.articles;
  const results = articles.map(article => 
    analyzeArticleCompliance(article.id, entities, relationships, metamodel)
  );

  // Calculate overall compliance
  const overallScore = Math.round(
    results.reduce((sum, r) => sum + r.overallScore, 0) / results.length
  );

  return {
    articles: results,
    overallScore,
    overallLevel: getComplianceLevel(overallScore),
    timestamp: new Date().toISOString()
  };
}

/**
 * Get missing NIS2 requirements for an entity
 */
export function getMissingNIS2Requirements(entity, metamodel) {
  const entityType = archimateMetamodel.entityTypes.find(et => et.id === entity.type);
  if (!entityType || !entityType.nis2_required) {
    return { required: false, missing: [] };
  }

  const missing = [];
  
  // Check required attributes
  if (entityType.required_attributes_nis2) {
    for (const attr of entityType.required_attributes_nis2) {
      if (!entity.attributes || !entity.attributes[attr]) {
        missing.push({
          type: 'attribute',
          name: attr,
          description: `Mandatory NIS2 attribute: ${attr}`
        });
      }
    }
  }

  return {
    required: true,
    entityType: entityType.name,
    nis2_mappings: entityType.nis2_mappings || [],
    missing,
    compliance: missing.length === 0 ? 'complete' : 'incomplete'
  };
}

/**
 * Get compliance badge info for an entity
 */
export function getEntityComplianceBadge(entity, metamodel) {
  const requirements = getMissingNIS2Requirements(entity, metamodel);
  
  if (!requirements.required) {
    return null;
  }

  return {
    nis2Required: true,
    missingCount: requirements.missing.length,
    status: requirements.compliance,
    color: requirements.compliance === 'complete' ? '#10B981' : '#F59E0B',
    icon: requirements.compliance === 'complete' ? 'CheckCircle' : 'AlertTriangle'
  };
}

export default {
  analyzeArticleCompliance,
  analyzeAllCompliance,
  getMissingNIS2Requirements,
  getEntityComplianceBadge
};
