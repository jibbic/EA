/**
 * ArchiMate 3.2 Viewpoint Definitions
 *
 * Each viewpoint describes:
 *  – which entity types are relevant (primary + secondary)
 *  – which relationship types to render
 *  – layout hint for Cytoscape
 *  – UI metadata (color, icon-name, category)
 *
 * "relevance" is computed at runtime by checking entity counts in the active dataset.
 */

// Category metadata (color token matches Tailwind class prefixes in the UI)
export const VIEWPOINT_CATEGORIES = {
  motivation:     { label: 'Motivation',         color: 'purple', tailwind: 'purple' },
  strategy:       { label: 'Strategi',            color: 'violet', tailwind: 'violet' },
  business:       { label: 'Verksamhet',          color: 'yellow', tailwind: 'yellow' },
  application:    { label: 'Applikation',         color: 'blue',   tailwind: 'blue'   },
  technology:     { label: 'Teknologi',           color: 'green',  tailwind: 'green'  },
  implementation: { label: 'Implementering',      color: 'orange', tailwind: 'orange' },
  crosslayer:     { label: 'Tvärskikt',           color: 'slate',  tailwind: 'slate'  },
};

// All ArchiMate 3.2 viewpoints supported by this tool
export const VIEWPOINTS = [
  // ─────────────────── MOTIVATION ───────────────────
  {
    id: 'stakeholder',
    name: 'Intressentvy',
    archimateStd: 'Stakeholder Viewpoint',
    category: 'motivation',
    description: 'Visar intressenter, drivkrafter och hur de bedöms. Används för att kommunicera med beslutsfattare om varför förändringar behövs.',
    primaryTypes:   ['Stakeholder', 'BusinessActor'],
    secondaryTypes: ['Driver', 'Assessment', 'Goal'],
    allowedRelTypes: ['influence', 'association', 'realization'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 60, edgeLengthVal: 120, animate: false },
    icon: 'Users',
    exampleUseCases: ['Intressentanalys', 'Förändringsmandat', 'Politisk förankring'],
  },
  {
    id: 'motivation',
    name: 'Motivationsvy',
    archimateStd: 'Motivation Viewpoint',
    category: 'motivation',
    description: 'Visar drivkrafter, mål, principer och krav samt hur de påverkar varandra. Ger svar på "varför" verksamheten ser ut som den gör.',
    primaryTypes:   ['Driver', 'Goal', 'Principle', 'Outcome'],
    secondaryTypes: ['Requirement', 'Constraint', 'BusinessActor'],
    allowedRelTypes: ['influence', 'realization', 'composition', 'association'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 55, edgeLengthVal: 140, animate: false },
    icon: 'Target',
    exampleUseCases: ['Strategisk alignment', 'NIS2-motivation', 'Principbasell'],
  },
  {
    id: 'goal-realization',
    name: 'Målrealisering',
    archimateStd: 'Goal Realization Viewpoint',
    category: 'motivation',
    description: 'Fokuserar på hur mål och krav bryts ned och realiseras via förmågor och principer. Visar sporingen från strategi till förmågor.',
    primaryTypes:   ['Goal', 'Outcome', 'Principle'],
    secondaryTypes: ['Requirement', 'Capability', 'Driver'],
    allowedRelTypes: ['realization', 'influence', 'composition'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 50, edgeLengthVal: 130, animate: false },
    icon: 'CheckCircle',
    exampleUseCases: ['Strategisk spårbarhet', 'Måltavla', 'Compliance-motivering'],
  },

  // ─────────────────── STRATEGY ───────────────────
  {
    id: 'capability-map',
    name: 'Förmågekarta',
    archimateStd: 'Capability Map Viewpoint',
    category: 'strategy',
    description: 'Hierarkisk karta över verksamhetens förmågor på alla nivåer. Grundläggande verktyg för capability-baserad planering och gap-analys.',
    primaryTypes:   ['Capability'],
    secondaryTypes: ['Goal', 'Resource'],
    allowedRelTypes: ['composition', 'aggregation', 'realization', 'association'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 30, edgeLengthVal: 80, animate: false, alignment: true },
    icon: 'Map',
    exampleUseCases: ['Capability gap-analys', 'Investeringsprioritering', 'Outsourcing-beslut'],
  },
  {
    id: 'strategy',
    name: 'Strategivy',
    archimateStd: 'Strategy Viewpoint',
    category: 'strategy',
    description: 'Visar hur resurser och förmågor kombineras till handlingsvägar för att nå strategiska mål. Binder strategi till verksamhetsarkitektur.',
    primaryTypes:   ['Capability', 'Resource', 'CourseOfAction'],
    secondaryTypes: ['Goal', 'Outcome', 'Driver'],
    allowedRelTypes: ['realization', 'influence', 'association', 'serving'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 60, edgeLengthVal: 150, animate: false },
    icon: 'Compass',
    exampleUseCases: ['Strategisk planering', 'Förmåge-investering', 'Digitalisering'],
  },
  {
    id: 'outcome-realization',
    name: 'Utfallsrealisering',
    archimateStd: 'Outcome Realization Viewpoint',
    category: 'strategy',
    description: 'Spårar hur verksamhetens utfall realiseras via förmågor, processer och applikationer. Starkt kopplat till värdeskapande och KPIer.',
    primaryTypes:   ['Outcome', 'Goal'],
    secondaryTypes: ['Capability', 'BusinessProcess', 'ApplicationComponent'],
    allowedRelTypes: ['realization', 'influence', 'serving', 'assignment'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 65, edgeLengthVal: 160, animate: false },
    icon: 'TrendingUp',
    exampleUseCases: ['Value stream mapping', 'OKR-arkitektur', 'Fördelsmätning'],
  },

  // ─────────────────── BUSINESS ───────────────────
  {
    id: 'organization',
    name: 'Organisationsvy',
    archimateStd: 'Organization Viewpoint',
    category: 'business',
    description: 'Visar den interna organisationsstrukturen: avdelningar, roller och deras inbördes relationer. Används för ansvarskartläggning.',
    primaryTypes:   ['BusinessActor', 'BusinessRole'],
    secondaryTypes: ['BusinessCollaboration', 'Location'],
    allowedRelTypes: ['composition', 'aggregation', 'assignment', 'association'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 40, edgeLengthVal: 100, animate: false },
    icon: 'Building2',
    exampleUseCases: ['Rollkartläggning', 'RACI-underlag', 'Strukturförändring'],
  },
  {
    id: 'business-process',
    name: 'Affärsprocessvy',
    archimateStd: 'Business Process Viewpoint',
    category: 'business',
    description: 'Visar processer, deras flöde och hur de hänger samman. Inkluderar triggande händelser, tjänster och vilka roller som ansvarar.',
    primaryTypes:   ['BusinessProcess', 'BusinessFunction', 'BusinessEvent'],
    secondaryTypes: ['BusinessRole', 'BusinessActor', 'BusinessObject', 'BusinessService'],
    allowedRelTypes: ['composition', 'realization', 'assignment', 'serving', 'flow', 'triggering'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 45, edgeLengthVal: 110, animate: false },
    icon: 'GitBranch',
    exampleUseCases: ['Processmodellering', 'Processkartläggning', 'As-is/To-be'],
  },
  {
    id: 'business-function',
    name: 'Affärsfunktionsvy',
    archimateStd: 'Business Function Viewpoint',
    category: 'business',
    description: 'Fokuserar på de funktioner (stödprocesser) som verksamheten utför internt, oberoende av trigger och flöde.',
    primaryTypes:   ['BusinessFunction'],
    secondaryTypes: ['BusinessRole', 'BusinessActor', 'BusinessService'],
    allowedRelTypes: ['composition', 'assignment', 'serving', 'realization'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 50, edgeLengthVal: 120, animate: false },
    icon: 'Puzzle',
    exampleUseCases: ['Funktionell dekomposition', 'Kompetensanalys', 'Outsourcing'],
  },
  {
    id: 'business-object',
    name: 'Affärsobjektvy',
    archimateStd: 'Business Object Viewpoint',
    category: 'business',
    description: 'Kartlägger de affärsobjekt (informationsenheter) som skapas, används och uppdateras i processer och av roller. Underlag för informationsarkitektur.',
    primaryTypes:   ['BusinessObject', 'DataObject', 'Contract'],
    secondaryTypes: ['BusinessProcess', 'BusinessRole', 'ApplicationComponent'],
    allowedRelTypes: ['access', 'composition', 'association', 'realization', 'flow'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 45, edgeLengthVal: 100, animate: false },
    icon: 'FileText',
    exampleUseCases: ['Informationsarkitektur', 'Databehov', 'GDPR-inventering'],
  },

  // ─────────────────── APPLICATION ───────────────────
  {
    id: 'application-architecture',
    name: 'Applikationsarkitektur',
    archimateStd: 'Application Architecture Viewpoint',
    category: 'application',
    description: 'Visar applikationskomponenter, deras gränssnitt och tjänster samt hur de samverkar. Centralt för systemförvaltning och integrationsdesign.',
    primaryTypes:   ['ApplicationComponent', 'ApplicationInterface', 'ApplicationService'],
    secondaryTypes: ['DataObject', 'ApplicationFunction'],
    allowedRelTypes: ['composition', 'serving', 'realization', 'flow', 'association', 'assignment'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 40, edgeLengthVal: 100, animate: false },
    icon: 'Cpu',
    exampleUseCases: ['Systemkarta', 'Integrationsarkitektur', 'API-inventering'],
  },
  {
    id: 'application-cooperation',
    name: 'Applikationssamverkan',
    archimateStd: 'Application Cooperation Viewpoint',
    category: 'application',
    description: 'Visar dataflöden och samverkan mellan applikationskomponenter. Bra för att identifiera integrationsberoenden och datakritiska snitt.',
    primaryTypes:   ['ApplicationComponent', 'ApplicationService'],
    secondaryTypes: ['DataObject', 'BusinessObject'],
    allowedRelTypes: ['flow', 'serving', 'access', 'association'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 55, edgeLengthVal: 130, animate: false },
    icon: 'Share2',
    exampleUseCases: ['Integrationsanalys', 'Dataflödeskarta', 'API-design'],
  },
  {
    id: 'application-usage',
    name: 'Applikationsanvändning',
    archimateStd: 'Application Usage Viewpoint',
    category: 'application',
    description: 'Visar hur processer och roller använder applikationstjänster. Binder verksamhetslagret till applikationslagret.',
    primaryTypes:   ['ApplicationComponent', 'ApplicationService', 'BusinessProcess'],
    secondaryTypes: ['BusinessRole', 'DataObject'],
    allowedRelTypes: ['serving', 'assignment', 'realization', 'access'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 50, edgeLengthVal: 120, animate: false },
    icon: 'Monitor',
    exampleUseCases: ['Processstödsanalys', 'Verksamhetskrav', 'Arkitekturbeslutsunderlag'],
  },
  {
    id: 'data-architecture',
    name: 'Dataarkitektur',
    archimateStd: 'Information Structure Viewpoint',
    category: 'application',
    description: 'Visar datastrukturer, informationsobjekt och deras relationer. Underlag för informationsmodellering, masterdatastrategi och datagonvernance.',
    primaryTypes:   ['DataObject', 'BusinessObject', 'Contract'],
    secondaryTypes: ['ApplicationComponent', 'BusinessProcess'],
    allowedRelTypes: ['composition', 'association', 'realization', 'access', 'flow'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 40, edgeLengthVal: 100, animate: false },
    icon: 'Database',
    exampleUseCases: ['Informationsmodell', 'Datakatalog', 'GDPR-datakartläggning'],
  },

  // ─────────────────── TECHNOLOGY ───────────────────
  {
    id: 'technology-architecture',
    name: 'Teknikarkitektur',
    archimateStd: 'Technology Architecture Viewpoint',
    category: 'technology',
    description: 'Visar noder, systemprogramvara, nätverk och artefakter. Målgrupp: infrastrukturteam och säkerhetsarkitekter.',
    primaryTypes:   ['Node', 'SystemSoftware', 'TechnologyService', 'CommunicationNetwork'],
    secondaryTypes: ['Artifact', 'Device'],
    allowedRelTypes: ['composition', 'realization', 'assignment', 'serving', 'association'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 50, edgeLengthVal: 120, animate: false },
    icon: 'Server',
    exampleUseCases: ['Infrastrukturkarta', 'Cloud-migration', 'Nätverkstopologi'],
  },
  {
    id: 'technology-usage',
    name: 'Teknikanvändning',
    archimateStd: 'Technology Usage Viewpoint',
    category: 'technology',
    description: 'Visar hur applikationer är deployade på infrastruktur. Binder applikationslagret till tekniklagret för drifts- och säkerhetsanalyser.',
    primaryTypes:   ['ApplicationComponent', 'Node', 'SystemSoftware'],
    secondaryTypes: ['CommunicationNetwork', 'Artifact'],
    allowedRelTypes: ['assignment', 'realization', 'serving', 'composition'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 55, edgeLengthVal: 130, animate: false },
    icon: 'HardDrive',
    exampleUseCases: ['Deployment-karta', 'Cloud-strategi', 'Redundansanalys'],
  },

  // ─────────────────── IMPLEMENTATION ───────────────────
  {
    id: 'project',
    name: 'Projektvy',
    archimateStd: 'Project Viewpoint',
    category: 'implementation',
    description: 'Visar projekt/arbetspaket och vad de levererar i form av förmågor, applikationer och principer. Binder förändringsinitiativ till arkitektur.',
    primaryTypes:   ['WorkPackage', 'Deliverable'],
    secondaryTypes: ['Capability', 'ApplicationComponent', 'Goal', 'Principle', 'Node'],
    allowedRelTypes: ['realization', 'influence', 'assignment', 'composition', 'association'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 55, edgeLengthVal: 140, animate: false },
    icon: 'FolderKanban',
    exampleUseCases: ['Förändringsportfölj', 'Roadmap-underlag', 'Business case'],
  },
  {
    id: 'implementation-migration',
    name: 'Implementering & Migration',
    archimateStd: 'Implementation and Migration Viewpoint',
    category: 'implementation',
    description: 'Kombinerar arbetspaket, milstolpar, plåtar och gap för att planera migreringar och transformationer på ett strukturerat sätt.',
    primaryTypes:   ['WorkPackage', 'Gap', 'Plateau', 'ImplementationEvent'],
    secondaryTypes: ['Deliverable', 'ApplicationComponent', 'Capability', 'Goal'],
    allowedRelTypes: ['realization', 'composition', 'influence', 'association', 'triggering'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 60, edgeLengthVal: 150, animate: false },
    icon: 'ArrowRightLeft',
    exampleUseCases: ['Transformationsplan', 'As-is/To-be gap', 'ERP-migration'],
  },

  // ─────────────────── CROSS-LAYER ───────────────────
  {
    id: 'layered',
    name: 'Skiktad arkitekturvy',
    archimateStd: 'Layered Viewpoint',
    category: 'crosslayer',
    description: 'Visar arkitekturen i tre lager (verksamhet, applikation, teknik) med vertikala samband. Ger en komplett helhetsbild.',
    primaryTypes:   ['BusinessProcess', 'BusinessFunction', 'ApplicationComponent', 'Node', 'SystemSoftware'],
    secondaryTypes: ['BusinessRole', 'DataObject', 'CommunicationNetwork'],
    allowedRelTypes: ['serving', 'realization', 'assignment', 'composition'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 40, edgeLengthVal: 100, animate: false },
    icon: 'Layers',
    exampleUseCases: ['Styrelsepresentation', 'TOGAF-leverabel', 'Helhetsöversikt'],
  },
  {
    id: 'landscape',
    name: 'Landskapsvy',
    archimateStd: 'Landscape Map Viewpoint',
    category: 'crosslayer',
    description: 'Övergripande karta med alla element över lager. Bra som anslagstavla och ingångspunkt i arkitekturmodellen.',
    primaryTypes:   ['Goal', 'Capability', 'BusinessProcess', 'ApplicationComponent', 'Node'],
    secondaryTypes: ['Driver', 'Principle', 'BusinessActor', 'DataObject', 'SystemSoftware'],
    allowedRelTypes: ['realization', 'serving', 'assignment', 'composition', 'influence'],
    layout: 'cola',
    layoutOpts: { nodeSpacing: 35, edgeLengthVal: 90, animate: false },
    icon: 'Globe',
    exampleUseCases: ['Ledningspresentation', 'Onboarding', 'EA-kommunikation'],
  },
];

/** Returns how relevant a viewpoint is (0-3) given the current entity counts */
export function scoreViewpoint(viewpoint, entityCounts) {
  const all = [...viewpoint.primaryTypes, ...viewpoint.secondaryTypes];
  const primary = viewpoint.primaryTypes;
  const presentPrimary   = primary.filter(t => (entityCounts[t] || 0) > 0).length;
  const presentSecondary = viewpoint.secondaryTypes.filter(t => (entityCounts[t] || 0) > 0).length;

  if (presentPrimary === primary.length) return 3;          // fully relevant
  if (presentPrimary >= Math.ceil(primary.length / 2)) return 2;  // mostly relevant
  if (presentPrimary > 0)  return 1;                       // partially relevant
  return 0;                                                // not relevant
}

/** Human-readable relevance label */
export function relevanceLabel(score) {
  return ['Inga data', 'Delvis relevant', 'Relevant', 'Fullt relevant'][score];
}

export default VIEWPOINTS;
