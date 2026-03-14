/**
 * Project Analyzer Utility
 * Centralised analysis functions for project health, impact and portfolio management.
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const ENTITY_LAYER_MAP = {
  Capability:           'strategy',
  Goal:                 'strategy',
  Driver:               'strategy',
  Principle:            'motivation',
  Requirement:          'motivation',
  Stakeholder:          'motivation',
  BusinessActor:        'business',
  BusinessRole:         'business',
  BusinessProcess:      'business',
  BusinessFunction:     'business',
  BusinessService:      'business',
  BusinessObject:       'business',
  Contract:             'business',
  ApplicationComponent: 'application',
  ApplicationInterface: 'application',
  ApplicationFunction:  'application',
  ApplicationService:   'application',
  DataObject:           'application',
  Node:                 'technology',
  Device:               'technology',
  SystemSoftware:       'technology',
  CommunicationNetwork: 'technology',
  TechnologyService:    'technology',
  Artifact:             'technology',
  Equipment:            'physical',
  Facility:             'physical',
  Gap:                  'implementation',
  Plateau:              'implementation',
  WorkPackage:          'implementation',
  Deliverable:          'implementation',
};

// ─── Health Calculation ───────────────────────────────────────────────────────

/**
 * Calculate the health score and RAG status for a single project.
 * Uses schedule variance, budget burn rate, risk level, and number of blockers.
 *
 * @param {object} project - WorkPackage entity
 * @returns {{ score: number, rag: 'green'|'amber'|'red', indicators: object[] }}
 */
export function calculateProjectHealth(project) {
  const indicators = [];
  let score = 100;

  // --- Schedule ---------------------------------------------------------------
  const scheduleVariance = getScheduleVariance(project); // days; negative = late
  if (scheduleVariance < -30) {
    const penalty = Math.min(40, Math.abs(scheduleVariance) / 2);
    score -= penalty;
    indicators.push({
      key: 'schedule',
      label: 'Schema',
      status: scheduleVariance < -60 ? 'red' : 'amber',
      detail: `${Math.abs(scheduleVariance)} dagar sent`,
    });
  } else if (scheduleVariance >= 0) {
    indicators.push({
      key: 'schedule',
      label: 'Schema',
      status: 'green',
      detail: scheduleVariance === 0 ? 'Enligt plan' : `${scheduleVariance} dagar före`,
    });
  } else {
    score -= 10;
    indicators.push({
      key: 'schedule',
      label: 'Schema',
      status: 'amber',
      detail: `${Math.abs(scheduleVariance)} dagar sent`,
    });
  }

  // --- Budget -----------------------------------------------------------------
  const budgetVariance = getBudgetVariance(project); // positive = under budget
  if (budgetVariance < -15) {
    score -= Math.min(35, Math.abs(budgetVariance));
    indicators.push({
      key: 'budget',
      label: 'Budget',
      status: budgetVariance < -25 ? 'red' : 'amber',
      detail: `${Math.abs(budgetVariance).toFixed(0)}% \u00f6ver budget`,
    });
  } else if (budgetVariance >= 0) {
    indicators.push({
      key: 'budget',
      label: 'Budget',
      status: 'green',
      detail: `${budgetVariance.toFixed(0)}% under budget`,
    });
  } else {
    score -= 5;
    indicators.push({
      key: 'budget',
      label: 'Budget',
      status: 'amber',
      detail: `${Math.abs(budgetVariance).toFixed(0)}% \u00f6ver budget`,
    });
  }

  // --- Risk -------------------------------------------------------------------
  const riskPenalty = { low: 0, medium: 5, high: 20 };
  score -= (riskPenalty[project.risk_level] ?? 10);
  indicators.push({
    key: 'risk',
    label: 'Risk',
    status: project.risk_level === 'high' ? 'red' : project.risk_level === 'medium' ? 'amber' : 'green',
    detail: riskLevelLabel(project.risk_level),
  });

  // --- Blockers ---------------------------------------------------------------
  const blockerCount = (project.blockers ?? []).length;
  if (blockerCount > 0) {
    score -= blockerCount * 8;
    indicators.push({
      key: 'blockers',
      label: 'Blockerare',
      status: blockerCount >= 2 ? 'red' : 'amber',
      detail: `${blockerCount} aktiv${blockerCount > 1 ? 'a' : ''} blockerare`,
    });
  } else {
    indicators.push({ key: 'blockers', label: 'Blockerare', status: 'green', detail: 'Inga blockerare' });
  }

  // --- Status adjustments -----------------------------------------------------
  if (project.status === 'on-hold')   score = Math.min(score, 40);
  if (project.status === 'cancelled') score = 0;
  if (project.status === 'completed') score = 100;

  score = Math.max(0, Math.min(100, Math.round(score)));

  const rag = score >= 70 ? 'green' : score >= 45 ? 'amber' : 'red';

  return { score, rag, indicators };
}

// ─── Variance helpers ─────────────────────────────────────────────────────────

/**
 * Returns days ahead (+) or behind (-) schedule.
 * Uses explicit schedule_variance if present; otherwise derives via expected progress.
 */
export function getScheduleVariance(project) {
  if (project.schedule_variance !== undefined) return project.schedule_variance;

  const now    = new Date();
  const start  = new Date(project.start_date);
  const end    = new Date(project.end_date);

  if (now < start) return 0;
  if (now > end) {
    if (project.status === 'completed') return 0;
    return -Math.ceil((now - end) / 86400000);
  }

  const elapsed     = now - start;
  const total       = end   - start;
  const expectedPct = (elapsed / total) * 100;
  const actualPct   = project.progress ?? 0;
  const pctDiff     = actualPct - expectedPct; // positive = ahead

  const remainingDays = Math.ceil((end - now) / 86400000);
  return Math.round((pctDiff / 100) * (total / 86400000));
}

/**
 * Returns budget variance as a percentage (positive = under budget).
 */
export function getBudgetVariance(project) {
  if (project.budget_variance !== undefined) return project.budget_variance;

  const budget = toNumber(project.budget);
  const spent  = toNumber(project.spent ?? 0);

  if (budget === 0) return 0;

  const expectedSpentPct = (() => {
    const now   = new Date();
    const start = new Date(project.start_date);
    const end   = new Date(project.end_date);
    if (now <= start) return 0;
    if (now >= end)   return 100;
    return ((now - start) / (end - start)) * 100;
  })();

  const expectedSpent = (expectedSpentPct / 100) * budget;
  if (expectedSpent === 0) return 0;

  return ((expectedSpent - spent) / expectedSpent) * 100;
}

// ─── Portfolio Summary ────────────────────────────────────────────────────────

/**
 * Aggregate health metrics across all projects.
 * @param {object[]} projects
 * @returns {{ green: number, amber: number, red: number, avgScore: number, totalBudget: number, totalSpent: number, atRisk: object[] }}
 */
export function getPortfolioSummary(projects) {
  let green = 0, amber = 0, red = 0, scoreSum = 0;
  let totalBudget = 0, totalSpent = 0;
  const atRisk = [];

  projects.forEach(p => {
    if (p.status === 'cancelled') return;
    const { score, rag } = calculateProjectHealth(p);
    if (rag === 'green') green++;
    else if (rag === 'amber') amber++;
    else { red++; atRisk.push(p); }
    scoreSum += score;

    totalBudget += toNumber(p.budget);
    totalSpent  += toNumber(p.spent ?? 0);
  });

  const count = green + amber + red;

  return {
    green,
    amber,
    red,
    avgScore: count ? Math.round(scoreSum / count) : 0,
    totalBudget,
    totalSpent,
    budgetUtilization: totalBudget ? (totalSpent / totalBudget) * 100 : 0,
    atRisk,
  };
}

// ─── Resource Conflicts ───────────────────────────────────────────────────────

/**
 * Find months where a resource is allocated over 100 %.
 * @param {object[]} allocations - resourceAllocations array from context
 * @param {object[]} resources   - Resource entities
 * @param {object[]} projects    - WorkPackage entities
 * @returns {object[]} conflict records with resource, month, total, projects
 */
export function detectResourceConflicts(allocations, resources, projects) {
  const byResourceMonth = {};

  allocations.forEach(alloc => {
    const start = alloc.start_month;
    const end   = alloc.end_month;
    if (!start || !end) return;

    const months = monthRange(start, end);
    months.forEach(month => {
      const key = `${alloc.resource_id}|${month}`;
      if (!byResourceMonth[key]) byResourceMonth[key] = { total: 0, entries: [] };
      byResourceMonth[key].total += alloc.allocation_percent ?? alloc.allocation ?? 0;
      byResourceMonth[key].entries.push(alloc);
    });
  });

  const conflicts = [];
  Object.entries(byResourceMonth).forEach(([key, data]) => {
    if (data.total > 100) {
      const [resourceId, month] = key.split('|');
      const resource = resources.find(r => r.id === resourceId);
      const involvedProjects = data.entries.map(e => projects.find(p => p.id === e.project_id)).filter(Boolean);
      conflicts.push({ resource, month, total: data.total, allocations: data.entries, projects: involvedProjects });
    }
  });

  return conflicts.sort((a, b) => a.month.localeCompare(b.month));
}

// ─── Architecture Impact ──────────────────────────────────────────────────────

/**
 * Traverse relationships outward from a project and categorise impacted entities by layer.
 * @param {string}   projectId
 * @param {object}   entitiesByType - { EntityType: entity[] }
 * @param {object[]} relationships
 * @param {number}   maxDepth - traversal depth (default 3)
 * @returns {{ byLayer: object, total: number, entities: object[] }}
 */
export function getProjectArchitectureImpact(projectId, entitiesByType, relationships, maxDepth = 3) {
  const allEntities = Object.values(entitiesByType).flat();

  const visited = new Set([projectId]);
  const impacted = [];

  const traverse = (entityId, depth) => {
    if (depth > maxDepth) return;

    const connected = relationships.filter(r => r.source === entityId || r.target === entityId);
    connected.forEach(rel => {
      const otherId = rel.source === entityId ? rel.target : rel.source;
      if (visited.has(otherId)) return;
      visited.add(otherId);

      const entity = allEntities.find(e => e.id === otherId);
      if (!entity) return;
      if (entity.entityType === 'WorkPackage') return; // skip sibling projects

      impacted.push({ ...entity, _depth: depth, _relType: rel.type });
      traverse(otherId, depth + 1);
    });
  };

  traverse(projectId, 1);

  const byLayer = {};
  impacted.forEach(e => {
    const layer = ENTITY_LAYER_MAP[e.entityType] ?? 'other';
    if (!byLayer[layer]) byLayer[layer] = [];
    byLayer[layer].push(e);
  });

  return { byLayer, total: impacted.length, entities: impacted };
}

/**
 * Which projects are blocked by or blocking the given project.
 * @param {string}   projectId
 * @param {object[]} projects
 * @param {object[]} relationships
 * @returns {{ blockedBy: object[], blocks: object[], dependents: object[] }}
 */
export function getProjectDependencies(projectId, projects, relationships) {
  const projectIds = new Set(projects.map(p => p.id));

  const blocks = relationships
    .filter(r => r.source === projectId && projectIds.has(r.target))
    .map(r => projects.find(p => p.id === r.target))
    .filter(Boolean);

  const blockedBy = relationships
    .filter(r => r.target === projectId && projectIds.has(r.source))
    .map(r => projects.find(p => p.id === r.source))
    .filter(Boolean);

  // Also check the explicit blocked_by arrays if populated in data
  const explicitBlockedBy = (projects.find(p => p.id === projectId)?.blocked_by ?? [])
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean);

  const allBlockedBy = [...new Map([...blockedBy, ...explicitBlockedBy].map(p => [p.id, p])).values()];

  return { blockedBy: allBlockedBy, blocks };
}

// ─── Critical Path / At-Risk ──────────────────────────────────────────────────

/**
 * Find projects whose delay would propagate the most risk across dependents.
 * Returns projects sorted by cascading impact count (descending).
 */
export function findHighImpactProjects(projects, relationships) {
  const projectIds = new Set(projects.map(p => p.id));

  const dependentCount = {};
  projects.forEach(p => {
    dependentCount[p.id] = 0;
    const traverse = (id, visited = new Set()) => {
      relationships
        .filter(r => r.source === id && projectIds.has(r.target) && !visited.has(r.target))
        .forEach(r => {
          visited.add(r.target);
          dependentCount[p.id]++;
          traverse(r.target, visited);
        });
    };
    traverse(p.id);
  });

  return projects
    .map(p => ({ ...p, _cascadeRisk: dependentCount[p.id] }))
    .sort((a, b) => b._cascadeRisk - a._cascadeRisk);
}

// ─── Strategic Alignment ─────────────────────────────────────────────────────

/**
 * Resolve the motivation chain for a single project:
 * which Goals, Drivers and Principles the project directly connects to
 * (via relationships OR the objectives[] property).
 */
export function getStrategicAlignment(project, entitiesByType, relationships) {
  const allEntities = Object.values(entitiesByType).flat();
  const pid = project.id;

  // IDs reachable directly from this project via any relationship
  const directTargetIds = relationships
    .filter(r => r.source === pid)
    .map(r => r.target);

  const pick = (type) =>
    directTargetIds
      .map(id => allEntities.find(e => e.id === id && e.entityType === type))
      .filter(Boolean);

  const relGoals      = pick('Goal');
  const relDrivers    = pick('Driver');
  const relPrinciples = pick('Principle');
  const relGaps       = pick('Gap');

  // Merge explicit objectives[] with relationship-based goals
  const objGoals = (project.objectives ?? [])
    .map(id => allEntities.find(e => e.id === id && e.entityType === 'Goal'))
    .filter(Boolean);

  const goals = [...new Map([...relGoals, ...objGoals].map(g => [g.id, g])).values()];

  return { goals, drivers: relDrivers, principles: relPrinciples, gaps: relGaps };
}

/**
 * Portfolio-level strategic coverage:
 * for every Goal and Driver, list which projects address it,
 * and identify goals with no project investment ("vita fläckar").
 */
export function getPortfolioStrategicCoverage(projects, entitiesByType, relationships) {
  const goals   = entitiesByType.Goal   ?? [];
  const drivers = entitiesByType.Driver ?? [];

  const goalCoverage = goals.map(goal => {
    const covering = projects.filter(p => {
      const viaRel = relationships.some(r => r.source === p.id && r.target === goal.id);
      const viaObj = (p.objectives ?? []).includes(goal.id);
      return viaRel || viaObj;
    });
    return { goal, projects: covering, covered: covering.length > 0 };
  });

  const driverCoverage = drivers.map(driver => {
    const covering = projects.filter(p =>
      relationships.some(r => r.source === p.id && r.target === driver.id)
    );
    return { driver, projects: covering, covered: covering.length > 0 };
  });

  const unmappedProjects = projects.filter(p => {
    const hasRel  = goals.some(g => relationships.some(r => r.source === p.id && r.target === g.id));
    const hasObjc = (p.objectives ?? []).length > 0;
    return !hasRel && !hasObjc;
  });

  return { goalCoverage, driverCoverage, unmappedProjects };
}

// ─── Capability Portfolio ─────────────────────────────────────────────────────

/**
 * Build a capability→projects investment matrix for the portfolio.
 * Groups L1 capabilities under their L0 domain parent.
 *
 * @param {object[]} projects       - WorkPackage entities
 * @param {object}   entitiesByType - { EntityType: entity[] }
 * @param {object[]} relationships
 * @returns {{ byDomain: object[], portfolio: object[], orphaned: object[] }}
 */
export function getCapabilityPortfolio(projects, entitiesByType, relationships) {
  const l0Capabilities = (entitiesByType.Capability ?? []).filter(c => c.level === 0);
  const l1Capabilities = (entitiesByType.Capability ?? []).filter(c => c.level === 1);

  const portfolio = l1Capabilities.map(cap => {
    const developingProjects = projects.filter(p =>
      relationships.some(r =>
        r.source === p.id &&
        r.target === cap.id &&
        ['realization', 'influence', 'association'].includes(r.type)
      )
    );

    const activeProjects  = developingProjects.filter(p => p.status === 'in-progress');
    const plannedProjects = developingProjects.filter(p => p.status === 'planned');

    const investmentStatus =
      activeProjects.length  > 0 ? 'active'  :
      plannedProjects.length > 0 ? 'planned' : 'none';

    const currentMaturity = cap.current_maturity ?? null;
    const targetMaturity  = cap.target_maturity  ?? null;
    const maturityGap     = (currentMaturity !== null && targetMaturity !== null)
      ? targetMaturity - currentMaturity
      : null;

    return {
      capability: cap,
      projects: developingProjects,
      activeProjects,
      plannedProjects,
      investmentStatus,
      currentMaturity,
      targetMaturity,
      maturityGap,
    };
  });

  const byDomain = l0Capabilities.map(l0 => ({
    domain: l0,
    capabilities: portfolio.filter(p => p.capability.parentId === l0.id),
  })).filter(d => d.capabilities.length > 0);

  const orphaned = portfolio.filter(
    p => !l0Capabilities.some(l0 => l0.id === p.capability.parentId)
  );

  return { byDomain, orphaned, portfolio };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toNumber(value) {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  return parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
}

function riskLevelLabel(level) {
  return { low: 'L\u00e5g risk', medium: 'Medel risk', high: 'H\u00f6g risk' }[level] ?? level ?? 'Ok\u00e4nd';
}

/** Generate YYYY-MM strings between two YYYY-MM start/end strings (inclusive). */
function monthRange(start, end) {
  const months = [];
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end.split('-').map(Number);

  let year = sy, month = sm;
  while (year < ey || (year === ey && month <= em)) {
    months.push(`${year}-${String(month).padStart(2, '0')}`);
    month++;
    if (month > 12) { month = 1; year++; }
  }
  return months;
}

export const RAG_CONFIG = {
  green: { label: 'Gr\u00f6n', bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500', border: 'border-green-300' },
  amber: { label: 'Gul',   bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500', border: 'border-yellow-300' },
  red:   { label: 'R\u00f6d',    bg: 'bg-red-100',    text: 'text-red-800',    dot: 'bg-red-500',    border: 'border-red-400'   },
};

export const LAYER_LABELS = {
  strategy:    { label: 'Strategi',      color: 'text-violet-700', bg: 'bg-violet-50', border: 'border-violet-200' },
  motivation:  { label: 'Motivering',    color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  business:    { label: 'Verksamhet',    color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  application: { label: 'Applikation',   color: 'text-blue-700',   bg: 'bg-blue-50',   border: 'border-blue-200'   },
  technology:  { label: 'Teknologi',     color: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200'  },
  physical:    { label: 'Fysisk',        color: 'text-gray-700',   bg: 'bg-gray-50',   border: 'border-gray-200'   },
  implementation: { label: 'Genomf\u00f6rande', color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' },
  other:       { label: '\u00d6vrigt',   color: 'text-gray-600',   bg: 'bg-gray-50',   border: 'border-gray-200'   },
};
