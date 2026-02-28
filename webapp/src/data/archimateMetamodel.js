/**
 * ArchiMate 3.1 Metamodel for Enterprise Architecture
 * Complete metamodel definition for enterprise architecture
 */

export const archimateMetamodel = {
  version: "3.1",
  
  // ============================================================================
  // LAYERS
  // ============================================================================
  layers: [
    {
      id: "business",
      name: "Business",
      color: "#FFF4C4",
      description: "Business architecture elements",
      icon: "Briefcase"
    },
    {
      id: "application",
      name: "Application",
      color: "#C9E4F7",
      description: "Application architecture elements",
      icon: "Layers"
    },
    {
      id: "technology",
      name: "Technology",
      color: "#C8E6C9",
      description: "Technology architecture elements",
      icon: "Server"
    },
    {
      id: "motivation",
      name: "Motivation",
      color: "#E8F5E9",
      description: "Motivational elements - goals, requirements, principles",
      icon: "Target"
    },
    {
      id: "strategy",
      name: "Strategy",
      color: "#FFF9C4",
      description: "Strategic elements",
      icon: "TrendingUp"
    },
    {
      id: "physical",
      name: "Physical",
      color: "#E0E0E0",
      description: "Physical elements",
      icon: "Box"
    },
    {
      id: "implementation",
      name: "Implementation & Migration",
      color: "#FCE4EC",
      description: "Implementation and migration elements",
      icon: "GitBranch"
    }
  ],

  // ============================================================================
  // ENTITY TYPES
  // ============================================================================
  entityTypes: [
    // Business Layer - Active Structure
    {
      id: "BusinessActor",
      name: "Business Actor",
      layer: "business",
      category: "active_structure",
      shape: "rectangle",
      icon: "User",
      description: "Organizational entity capable of performing behavior",
      nis2_required: false,
      nis2_mappings: ["Article 6 - Governance"],
      attributes: ["name", "description", "responsibilities", "contact"]
    },
    {
      id: "BusinessRole",
      name: "Business Role",
      layer: "business",
      category: "active_structure",
      shape: "rectangle",
      icon: "UserCog",
      description: "Named specific behavior of a business actor",
      nis2_required: true,
      nis2_mappings: ["Article 20 - Governance", "Article 21 - Risk management roles"],
      attributes: ["name", "description", "responsibilities", "required_competencies"],
      required_for_nis2: ["CISO", "Data Protection Officer", "Incident Response Lead"]
    },
    
    // Business Layer - Behavior
    {
      id: "BusinessProcess",
      name: "Business Process",
      layer: "business",
      category: "behavior",
      shape: "round-rectangle",
      icon: "Activity",
      description: "Sequence of business behaviors",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Critical processes", "Article 21.2 - Business continuity"],
      attributes: ["name", "description", "owner", "criticality", "rto", "rpo", "status"],
      required_attributes_nis2: ["criticality", "rto", "rpo", "owner"]
    },
    {
      id: "BusinessFunction",
      name: "Business Function",
      layer: "business",
      category: "behavior",
      shape: "round-rectangle",
      icon: "Box",
      description: "Collection of business behavior based on criteria",
      nis2_required: false,
      attributes: ["name", "description", "owner"]
    },
    {
      id: "BusinessService",
      name: "Business Service",
      layer: "business",
      category: "behavior",
      shape: "round-rectangle",
      icon: "CloudCheckIcon",
      description: "Explicitly defined behavior exposed to environment",
      nis2_required: false,
      attributes: ["name", "description", "sla", "availability"]
    },
    
    // Business Layer - Passive Structure
    {
      id: "BusinessObject",
      name: "Business Object",
      layer: "business",
      category: "passive_structure",
      shape: "rectangle",
      icon: "FileText",
      description: "Concept used within a particular business domain",
      nis2_required: false,
      attributes: ["name", "description", "classification"]
    },
    {
      id: "Contract",
      name: "Contract",
      layer: "business",
      category: "passive_structure",
      shape: "rectangle",
      icon: "FileSignature",
      description: "Formal or informal specification of agreement",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Supply chain security", "Article 28 - Supplier contracts"],
      attributes: ["name", "description", "supplier", "criticality", "valid_from", "valid_until", "review_date", "security_requirements"],
      required_attributes_nis2: ["supplier", "criticality", "security_requirements", "review_date"]
    },
    
    // Application Layer - Active Structure
    {
      id: "ApplicationComponent",
      name: "Application Component",
      layer: "application",
      category: "active_structure",
      shape: "rectangle",
      icon: "Package",
      description: "Modular, deployable, and replaceable part",
      nis2_required: true,
      nis2_mappings: ["Article 21 - IT systems inventory", "Article 23 - Asset register"],
      attributes: ["name", "description", "criticality", "owner", "status", "version", "vendor", "data_classification", "lifecycle_phase", "users"],
      required_attributes_nis2: ["criticality", "owner", "data_classification", "version"]
    },
    {
      id: "ApplicationInterface",
      name: "Application Interface",
      layer: "application",
      category: "active_structure",
      shape: "circle",
      icon: "Plug",
      description: "Point of access for application services",
      nis2_required: false,
      attributes: ["name", "protocol", "authentication_required", "encryption"]
    },
    
    // Application Layer - Behavior
    {
      id: "ApplicationFunction",
      name: "Application Function",
      layer: "application",
      category: "behavior",
      shape: "round-rectangle",
      icon: "Cpu",
      description: "Automated behavior performed by component",
      nis2_required: false,
      attributes: ["name", "description", "criticality"]
    },
    {
      id: "ApplicationService",
      name: "Application Service",
      layer: "application",
      category: "behavior",
      shape: "round-rectangle",
      icon: "Cloud",
      description: "Explicitly defined application behavior",
      nis2_required: false,
      attributes: ["name", "description", "sla", "availability", "authentication_method"]
    },
    
    // Application Layer - Passive Structure
    {
      id: "DataObject",
      name: "Data Object",
      layer: "application",
      category: "passive_structure",
      shape: "rectangle",
      icon: "Database",
      description: "Data structured for automated processing",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Data protection", "Article 32 - GDPR alignment"],
      attributes: ["name", "description", "classification", "gdpr_relevant", "encryption_required", "retention_period", "backup_frequency"],
      required_attributes_nis2: ["classification", "gdpr_relevant", "encryption_required"]
    },
    
    // Technology Layer - Active Structure
    {
      id: "Node",
      name: "Node",
      layer: "technology",
      category: "active_structure",
      shape: "cube",
      icon: "Server",
      description: "Computational or physical resource",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Infrastructure security", "Article 23 - Configuration management"],
      attributes: ["name", "description", "type", "criticality", "location", "ip_address", "os", "patching_status", "last_patch_date", "monitoring_enabled"],
      required_attributes_nis2: ["criticality", "location", "patching_status", "monitoring_enabled"]
    },
    {
      id: "Device",
      name: "Device",
      layer: "technology",
      category: "active_structure",
      shape: "cube",
      icon: "Smartphone",
      description: "Physical IT resource",
      nis2_required: false,
      attributes: ["name", "type", "location", "owner"]
    },
    {
      id: "SystemSoftware",
      name: "System Software",
      layer: "technology",
      category: "active_structure",
      shape: "cube",
      icon: "HardDrive",
      description: "Software environment for specific types of components",
      nis2_required: true,
      nis2_mappings: ["Article 21 - System hardening", "Article 21.2.e - Patch management"],
      attributes: ["name", "description", "vendor", "version", "patch_level", "eol_date", "license", "criticality"],
      required_attributes_nis2: ["version", "patch_level", "eol_date"]
    },
    {
      id: "CommunicationNetwork",
      name: "Communication Network",
      layer: "technology",
      category: "active_structure",
      shape: "line",
      icon: "Wifi",
      description: "Physical communication medium",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Network security", "Article 21.2.c - Network segmentation"],
      attributes: ["name", "description", "type", "security_zone", "encryption", "monitoring", "firewall_enabled", "ids_ips_enabled"],
      required_attributes_nis2: ["security_zone", "encryption", "monitoring"]
    },
    
    // Technology Layer - Behavior
    {
      id: "TechnologyService",
      name: "Technology Service",
      layer: "technology",
      category: "behavior",
      shape: "round-rectangle",
      icon: "Settings",
      description: "Explicitly defined technology behavior",
      nis2_required: false,
      attributes: ["name", "description", "availability", "sla"]
    },
    
    // Technology Layer - Passive Structure
    {
      id: "Artifact",
      name: "Artifact",
      layer: "technology",
      category: "passive_structure",
      shape: "rectangle",
      icon: "FileCode",
      description: "Physical piece of data",
      nis2_required: false,
      attributes: ["name", "type", "format", "location"]
    },
    
    // Motivation Layer
    {
      id: "Stakeholder",
      name: "Stakeholder",
      layer: "motivation",
      category: "element",
      shape: "rectangle",
      icon: "UserCheck",
      description: "Role of individual, team, or organization",
      nis2_required: false,
      attributes: ["name", "description", "concerns", "influence"]
    },
    {
      id: "Goal",
      name: "Goal",
      layer: "motivation",
      category: "element",
      shape: "ellipse",
      icon: "Target",
      description: "High-level statement of intent",
      nis2_required: false,
      attributes: ["name", "description", "target_date", "status"]
    },
    {
      id: "Principle",
      name: "Principle",
      layer: "motivation",
      category: "element",
      shape: "rectangle",
      icon: "Shield",
      description: "Normative property of implementation",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Security policies", "Article 20 - Governance framework"],
      attributes: ["name", "description", "rationale", "implications", "status"],
      required_for_nis2: ["Least Privilege", "Defense in Depth", "Zero Trust"]
    },
    {
      id: "Requirement",
      name: "Requirement",
      layer: "motivation",
      category: "element",
      shape: "rectangle",
      icon: "ListChecks",
      description: "Statement of need",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Cybersecurity requirements", "NIS2 Compliance requirements"],
      attributes: ["name", "description", "nis2_article", "compliance_status", "evidence", "priority", "implementation_status"],
      required_attributes_nis2: ["nis2_article", "compliance_status"]
    },
    
    // Strategy Layer
    {
      id: "Capability",
      name: "Capability",
      layer: "strategy",
      category: "element",
      shape: "rectangle",
      icon: "Zap",
      description: "Ability that organization possesses",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Security capabilities", "Business continuity capabilities"],
      attributes: ["name", "description", "maturity_level", "criticality", "owner"],
      required_attributes_nis2: ["maturity_level", "criticality"]
    },
    {
      id: "Resource",
      name: "Resource",
      layer: "strategy",
      category: "element",
      shape: "rectangle",
      icon: "Box",
      description: "Asset owned or controlled",
      nis2_required: false,
      attributes: ["name", "description", "type", "value"]
    },
    
    // Physical Layer
    {
      id: "Equipment",
      name: "Equipment",
      layer: "physical",
      category: "element",
      shape: "cube",
      icon: "Box",
      description: "Physical machine, tool or other equipment",
      nis2_required: true,
      nis2_mappings: ["Article 23 - Asset inventory"],
      attributes: ["name", "description", "location", "owner", "criticality", "serial_number", "purchase_date"],
      required_attributes_nis2: ["location", "owner", "criticality"]
    },
    {
      id: "Facility",
      name: "Facility",
      layer: "physical",
      category: "element",
      shape: "cube",
      icon: "Building",
      description: "Physical location or environment",
      nis2_required: true,
      nis2_mappings: ["Article 21 - Physical security", "Data center locations"],
      attributes: ["name", "description", "address", "security_level", "access_control", "monitoring_24_7", "backup_power"],
      required_attributes_nis2: ["security_level", "access_control"]
    },
    
    // Implementation & Migration Layer
    {
      id: "WorkPackage",
      name: "Work Package",
      layer: "implementation",
      category: "element",
      shape: "rectangle",
      icon: "Folder",
      description: "Series of actions for achieving goal",
      nis2_required: false,
      attributes: ["name", "description", "start_date", "end_date", "status", "budget", "progress", "priority", "project_manager", "team_size", "risk_level", "category", "phase", "sponsor"]
    },
    {
      id: "Deliverable",
      name: "Deliverable",
      layer: "implementation",
      category: "element",
      shape: "rectangle",
      icon: "Package",
      description: "Precisely defined result of a work package",
      nis2_required: false,
      attributes: ["name", "description", "target_date", "actual_date", "status", "milestone"]
    },
    {
      id: "Gap",
      name: "Gap",
      layer: "implementation",
      category: "element",
      shape: "rectangle",
      icon: "AlertCircle",
      description: "Difference between two plateaus",
      nis2_required: false,
      attributes: ["name", "description", "current_state", "target_state", "priority"]
    }
  ],

  // ============================================================================
  // RELATIONSHIP TYPES
  // ============================================================================
  relationshipTypes: [
    // Structural Relationships
    {
      id: "composition",
      name: "Composition",
      category: "structural",
      symbol: "◆─",
      arrow: "filled-diamond",
      description: "Part-of relationship, dependent lifecycle",
      color: "#374151",
      nis2_usage: "Critical for system decomposition and impact analysis",
      nis2_required: false,
      validFrom: ["*"],
      validTo: ["*"]
    },
    {
      id: "aggregation",
      name: "Aggregation",
      category: "structural",
      symbol: "◇─",
      arrow: "hollow-diamond",
      description: "Part-of relationship, independent lifecycle",
      color: "#374151",
      nis2_usage: "Group related components",
      nis2_required: false,
      validFrom: ["*"],
      validTo: ["*"]
    },
    {
      id: "assignment",
      name: "Assignment",
      category: "structural",
      symbol: "●─",
      arrow: "filled-circle",
      description: "Allocation of responsibility",
      color: "#374151",
      nis2_usage: "Map ownership and accountability (NIS2 Article 20)",
      nis2_required: true,
      validFrom: ["BusinessActor", "BusinessRole", "ApplicationComponent"],
      validTo: ["BusinessProcess", "ApplicationComponent", "Node"]
    },
    {
      id: "realization",
      name: "Realization",
      category: "structural",
      symbol: "─ ─>",
      arrow: "dashed",
      description: "Implementation relationship",
      color: "#374151",
      nis2_usage: "Link requirements to implementation",
      nis2_required: true,
      validFrom: ["ApplicationComponent", "Node", "BusinessProcess"],
      validTo: ["Requirement", "Goal", "Capability"]
    },
    
    // Dependency Relationships
    {
      id: "serving",
      name: "Serving",
      category: "dependency",
      symbol: "──>",
      arrow: "solid",
      description: "Service provision",
      color: "#3B82F6",
      nis2_usage: "Map service dependencies for availability analysis",
      nis2_required: true,
      validFrom: ["ApplicationComponent", "ApplicationService", "TechnologyService", "Node"],
      validTo: ["ApplicationComponent", "BusinessProcess", "ApplicationService"]
    },
    {
      id: "access",
      name: "Access",
      category: "dependency",
      symbol: "─○>",
      arrow: "open-circle",
      description: "Read or write access",
      color: "#10B981",
      access_types: ["read", "write", "read-write"],
      nis2_usage: "Data flow and access control (Article 21.2.a - Access control)",
      nis2_required: true,
      validFrom: ["ApplicationComponent", "BusinessProcess", "BusinessActor"],
      validTo: ["DataObject", "BusinessObject"]
    },
    {
      id: "influence",
      name: "Influence",
      category: "dependency",
      symbol: "─ ─>",
      arrow: "dashed",
      description: "Effect without dependency",
      color: "#F59E0B",
      nis2_usage: "Risk and impact relationships",
      nis2_required: false,
      validFrom: ["*"],
      validTo: ["*"]
    },
    
    // Dynamic Relationships
    {
      id: "flow",
      name: "Flow",
      category: "dynamic",
      symbol: "──>",
      arrow: "solid",
      description: "Transfer or exchange",
      color: "#EC4899",
      nis2_usage: "Data flows, information exchange (GDPR Article 32)",
      nis2_required: true,
      validFrom: ["BusinessProcess", "ApplicationComponent", "ApplicationFunction"],
      validTo: ["BusinessProcess", "ApplicationComponent", "DataObject"]
    },
    {
      id: "triggering",
      name: "Triggering",
      category: "dynamic",
      symbol: "──>",
      arrow: "solid",
      description: "Temporal or causal relationship",
      color: "#8B5CF6",
      nis2_usage: "Incident response workflows, process orchestration",
      nis2_required: false,
      validFrom: ["BusinessProcess", "ApplicationService"],
      validTo: ["BusinessProcess", "ApplicationService"]
    },
    
    // Other Relationships
    {
      id: "specialization",
      name: "Specialization",
      category: "other",
      symbol: "──▷",
      arrow: "hollow-triangle",
      description: "Generalization relationship",
      color: "#6B7280",
      nis2_usage: "Classify entity types",
      nis2_required: false,
      validFrom: ["*"],
      validTo: ["*"]
    },
    {
      id: "association",
      name: "Association",
      category: "other",
      symbol: "───",
      arrow: "none",
      description: "Unspecified relationship",
      color: "#9CA3AF",
      validFrom: ["*"],
      validTo: ["*"]
    }
  ]
};

export default archimateMetamodel;
