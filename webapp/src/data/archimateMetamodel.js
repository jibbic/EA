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
      attributes: ["name", "description", "responsibilities", "required_competencies"],
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
      attributes: ["name", "description", "owner", "criticality", "rto", "rpo", "status"],
    },
    {
      id: "BusinessFunction",
      name: "Business Function",
      layer: "business",
      category: "behavior",
      shape: "round-rectangle",
      icon: "Box",
      description: "Collection of business behavior based on criteria",
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
      attributes: ["name", "description", "supplier", "criticality", "valid_from", "valid_until", "review_date", "security_requirements"],
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
      attributes: ["name", "description", "criticality", "owner", "status", "version", "vendor", "data_classification", "lifecycle_phase", "users"],
    },
    {
      id: "ApplicationInterface",
      name: "Application Interface",
      layer: "application",
      category: "active_structure",
      shape: "circle",
      icon: "Plug",
      description: "Point of access for application services",
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
      attributes: ["name", "description", "classification", "gdpr_relevant", "encryption_required", "retention_period", "backup_frequency"],
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
      attributes: ["name", "description", "type", "criticality", "location", "ip_address", "os", "patching_status", "last_patch_date", "monitoring_enabled"],
    },
    {
      id: "Device",
      name: "Device",
      layer: "technology",
      category: "active_structure",
      shape: "cube",
      icon: "Smartphone",
      description: "Physical IT resource",
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
      attributes: ["name", "description", "vendor", "version", "patch_level", "eol_date", "license", "criticality"],
    },
    {
      id: "CommunicationNetwork",
      name: "Communication Network",
      layer: "technology",
      category: "active_structure",
      shape: "line",
      icon: "Wifi",
      description: "Physical communication medium",
      attributes: ["name", "description", "type", "security_zone", "encryption", "monitoring", "firewall_enabled", "ids_ips_enabled"],
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
      attributes: ["name", "description", "rationale", "implications", "status"],
    },
    {
      id: "Requirement",
      name: "Requirement",
      layer: "motivation",
      category: "element",
      shape: "rectangle",
      icon: "ListChecks",
      description: "Statement of need",
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
      attributes: ["name", "description", "maturity_level", "criticality", "owner"],
    },
    {
      id: "Resource",
      name: "Resource",
      layer: "strategy",
      category: "element",
      shape: "rectangle",
      icon: "Box",
      description: "Asset owned or controlled",
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
      attributes: ["name", "description", "location", "owner", "criticality", "serial_number", "purchase_date"],
    },
    {
      id: "Facility",
      name: "Facility",
      layer: "physical",
      category: "element",
      shape: "cube",
      icon: "Building",
      description: "Physical location or environment",
      attributes: ["name", "description", "address", "security_level", "access_control", "monitoring_24_7", "backup_power"],
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
