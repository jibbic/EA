# Technology Architecture Perspektiv

## Översikt

Technology Architecture-perspektivet beskriver den tekniska infrastrukturen som applikationer körs på - servrar, nätverk, plattformar och fysisk lokalisering.

## Syfte inom NIS 2-kontext

- Inventering av all infrastruktur
- Patch management och sårbarhetshantering
- Nätverkssegmentering och säkerhetszoner
- Fysisk säkerhet och lokalisering
- Cloud vs on-premise hantering

## Huvudkomponenter

### 1. Infrastructure Node

**Definition**: En fysisk eller virtuell infrastrukturkomponent som kör mjukvara.

**Node-typer**:
- **Physical Server**: Fysisk server
- **Virtual Machine**: Virtuell maskin
- **Container**: Container (Docker, Kubernetes pod)
- **Network Device**: Router, switch, firewall
- **Storage Device**: SAN, NAS, storage array

**Exempel - Physical Server**:
```yaml
id: infra-srv-001
name: "Production App Server 01"
description: "Fysisk server för produktionsapplikationer"
node_type: physical_server

location: loc-stockholm-dc
hosting_type: on_premise

# Hardware
hardware:
  manufacturer: "Dell"
  model: "PowerEdge R740"
  cpu: "2x Intel Xeon Gold 6230"
  ram: "256 GB"
  storage: "2x 960GB SSD RAID1"
  
# Operating System
operating_system: "Ubuntu Server"
os_version: "22.04.3 LTS"

# Patch Management
last_patched: "2026-02-15"
patch_status: up_to_date
pending_patches: 0
auto_patching_enabled: false
patch_schedule: "Monthly, third Sunday"

# Criticality
criticality: high
hosts_applications:
  - app-erp-system
  - app-customer-portal

# Network
network_interfaces:
  - interface: "eth0"
    ip_address: "10.0.10.15"
    network: net-production
    
  - interface: "eth1"
    ip_address: "10.0.20.15"
    network: net-management
```

**Exempel - Virtual Machine (Cloud)**:
```yaml
id: infra-vm-web-01
name: "Web Server VM 01"
node_type: virtual_machine

# Cloud hosting
hosting_type: cloud
cloud_provider: "AWS"
cloud_region: "eu-north-1"
cloud_instance_type: "t3.large"
cloud_instance_id: "i-0abc123def456"

operating_system: "Amazon Linux 2"
os_version: "2023.3.20240108"

# Auto-patching in cloud
last_patched: "2026-02-20"
patch_status: up_to_date
auto_patching_enabled: true

criticality: high
```

**NIS 2-krav för Infrastructure Nodes**:
1. **Inventering**: Alla nodes måste vara inventerade
2. **Patch Management**: Aktuell patch-status måste finnas
3. **Kritikalitet**: Klassificering baserat på vad som körs
4. **Lokalisering**: Var finns datan/infrastrukturen?

### 2. Network

**Definition**: Ett nätverk eller nätverkssegment.

**Nätverkstyper**:
- **LAN**: Local Area Network
- **WAN**: Wide Area Network
- **DMZ**: Demilitarized Zone (säkerhetszon)
- **Management**: Management-nätverk
- **Production**: Produktionsnätverk

**Säkerhetszoner**:
- **Internet**: Publikt internet
- **DMZ**: Zon för externa tjänster
- **Internal**: Internt nätverk
- **Restricted**: Restrikterad zon (känsliga system)
- **Management**: Management-nätverk

**Exempel**:
```yaml
id: net-dmz
name: "DMZ Network"
description: "Säkerhetszon för externåtkomliga system"

network_type: dmz
ip_range: "10.1.0.0/24"
vlan_id: "100"

# Säkerhet - KRITISKT för NIS 2!
security_zone: dmz
firewall_protected: true
firewall_rules: "Deny all except explicit allow"

# Säkerhetskontroller
protected_by_controls:
  - ctrl-firewall-dmz
  - ctrl-ids-dmz
  - ctrl-network-monitoring

# Anslutningar till andra nätverk
connected_to:
  - network: net-internet
    firewall: fw-external
    allow_inbound: "HTTPS, SSH (rate-limited)"
    
  - network: net-internal
    firewall: fw-internal
    allow_inbound: "Database connections from DMZ only"
    allow_outbound: "Database queries, API calls"

# Komponenter i detta nätverk
hosts:
  - infra-web-server-01
  - infra-web-server-02
  - infra-api-gateway
```

**Network Segmentation (Obligatoriskt för NIS 2)**:

```
┌─────────────────────────────────────────────────────┐
│                    INTERNET                          │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ Firewall (FW-EXT)
                   ▼
┌─────────────────────────────────────────────────────┐
│                  DMZ Zone                            │
│  - Web servers                                       │
│  - API Gateway                                       │
│  - Load Balancers                                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ Firewall (FW-INT)
                   ▼
┌─────────────────────────────────────────────────────┐
│              Internal Zone                           │
│  - Application servers                               │
│  - Integration services                              │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ Firewall (FW-DB)
                   ▼
┌─────────────────────────────────────────────────────┐
│             Restricted Zone                          │
│  - Database servers                                  │
│  - Backup systems                                    │
└──────────────────────────────────────────────────────┘

               Separate Management Network
┌─────────────────────────────────────────────────────┐
│             Management Zone                          │
│  - Jump hosts                                        │
│  - Monitoring systems                                │
│  - Backup management                                 │
└──────────────────────────────────────────────────────┘
```

### 3. Technology Platform

**Definition**: En teknologiplattform eller ramverk som applikationer bygger på.

**Plattformstyper**:
- **Operating System**: Windows, Linux, etc.
- **Database Platform**: PostgreSQL, Oracle, MySQL
- **Middleware**: Application servers, message brokers
- **Container Platform**: Kubernetes, Docker Swarm
- **Cloud Platform**: AWS, Azure, GCP

**Exempel**:
```yaml
id: platform-postgresql
name: "PostgreSQL Database Platform"
description: "Databas plattform för transaktionsdatabaser"

platform_type: database_platform
vendor: supplier-postgresql-support

# Version och support
version: "14.10"
release_date: "2022-09-29"
support_end_date: "2026-11-12"  # KRITISKT - when does support end?

# Licensing
license_model: "Open Source (PostgreSQL License)"
commercial_support: true
support_vendor: "EnterpriseDB"

# Usage
used_by_systems:
  - app-customer-portal
  - app-erp-system
  - app-hr-system

# Security updates
security_patch_available: true
latest_security_patch: "14.10"
critical_vulnerabilities: 0
```

**End-of-Life Tracking (Viktigt för NIS 2)**:

```yaml
platforms_near_eol:
  - platform: platform-windows-server-2008
    support_end_date: "2020-01-14"  # ALREADY EXPIRED!
    status: critical
    affected_systems:
      - infra-legacy-app-server
    migration_plan: "Migrate to Windows Server 2022"
    migration_deadline: "2026-06-30"
    
  - platform: platform-java-8
    support_end_date: "2026-12-31"
    status: warning
    affected_systems:
      - app-legacy-erp
    migration_plan: "Upgrade to Java 17 LTS"
    migration_status: in_progress
```

### 4. Location

**Definition**: En fysisk plats där teknologi är lokaliserad.

**Lokaliseringstyper**:
- **Data Center**: Eget eller co-location datacenter
- **Office**: Kontorslokal
- **Cloud Region**: Cloud provider region
- **Other**: Övriga lokaler

**Exempel - Data Center**:
```yaml
id: loc-stockholm-dc
name: "Stockholm Primary Data Center"
address: "Datacenter Street 1, Stockholm"
country: "Sweden"
location_type: data_center

# Physical Security
physical_security_level: high
physical_security_controls:
  - "24/7 on-site security guards"
  - "Biometric access control"
  - "Video surveillance"
  - "Mantrap entry"
  - "Visitor logging"

# Environmental Controls
environmental_controls:
  - "Redundant cooling"
  - "UPS power backup"
  - "Diesel generators"
  - "Fire suppression (FM-200)"

# Compliance
certifications:
  - "ISO 27001"
  - "SOC 2 Type II"

# Disaster Risk
natural_disaster_risk: low
flood_risk: low
earthquake_risk: very_low

# What's hosted here
hosts_infrastructure:
  - infra-srv-001
  - infra-srv-002
  - infra-storage-001
```

**Exempel - Cloud Region**:
```yaml
id: loc-aws-eu-north-1
name: "AWS Stockholm Region"
location_type: cloud_region
country: "Sweden"

cloud_provider: "AWS"
cloud_region: "eu-north-1"

# Data residency compliance
data_residency_compliant: true  # Data stays in EU
gdpr_compliant: true

# Availability Zones
availability_zones:
  - "eu-north-1a"
  - "eu-north-1b"
  - "eu-north-1c"
```

## Patch Management

**Obligatoriskt för NIS 2 (Artikel 21.2.d)**

### Patch Management Process

```yaml
patch_management_policy:
  
  scope: "All infrastructure nodes and platforms"
  
  patch_classification:
    critical:
      description: "Critical security patches"
      sla: "48 hours"
      testing_required: minimal
      approval_required: false
      
    high:
      description: "High severity security patches"
      sla: "7 days"
      testing_required: standard
      approval_required: true
      
    medium:
      description: "Medium severity patches"
      sla: "30 days"
      testing_required: standard
      approval_required: true
      
    low:
      description: "Low severity and feature updates"
      sla: "90 days"
      testing_required: full
      approval_required: true
  
  patch_schedule:
    production_systems:
      schedule: "Monthly, third Sunday 02:00-06:00"
      emergency_patches: "Within SLA, outside maintenance window"
      
    non_production:
      schedule: "Weekly, Saturday"
  
  testing_process:
    - step: "Deploy to test environment"
      responsible: "IT Operations"
      
    - step: "Automated testing"
      responsible: "QA Team"
      
    - step: "Manual verification"
      responsible: "System Owner"
      
    - step: "Approval for production"
      responsible: "Change Advisory Board"
      
    - step: "Production deployment"
      responsible: "IT Operations"
      
    - step: "Post-deployment verification"
      responsible: "IT Operations"
  
  rollback_procedure:
    documented: true
    tested: true
    last_test: "2025-12-01"
```

### Patch Status Tracking

```yaml
infrastructure_patch_status:
  
  total_nodes: 127
  
  patch_status_summary:
    up_to_date: 119  # 94%
    pending: 6       # 5%
    overdue: 2       # 1%
  
  critical_patches_pending:
    - node: infra-srv-015
      cve: "CVE-2024-1234"
      severity: critical
      days_overdue: 3
      reason: "Requires application downtime"
      mitigation: "Network ACL restricts access"
      planned_patch_date: "2026-03-01"
  
  platforms_patch_status:
    - platform: "Ubuntu 22.04"
      nodes: 45
      up_to_date: 43
      pending: 2
      
    - platform: "Windows Server 2022"
      nodes: 30
      up_to_date: 30
      pending: 0
```

## Cloud Architecture

### Cloud Deployment Models

**Infrastructure as a Service (IaaS)**:
```yaml
cloud_iaas:
  provider: "AWS"
  services_used:
    - "EC2 (Virtual Machines)"
    - "EBS (Block Storage)"
    - "VPC (Virtual Network)"
  
  responsibility_model:
    cloud_provider_responsible:
      - "Physical infrastructure"
      - "Virtualization layer"
      - "Network infrastructure"
    
    organization_responsible:
      - "Operating system patching"
      - "Application security"
      - "Data encryption"
      - "Access management"
```

**Platform as a Service (PaaS)**:
```yaml
cloud_paas:
  provider: "Azure"
  services_used:
    - "Azure App Service"
    - "Azure SQL Database"
  
  responsibility_model:
    cloud_provider_responsible:
      - "Infrastructure"
      - "Platform runtime"
      - "Platform patching"
    
    organization_responsible:
      - "Application code"
      - "Application security"
      - "Data protection"
```

**Software as a Service (SaaS)**:
```yaml
cloud_saas:
  provider: "Microsoft"
  service: "Microsoft 365"
  
  responsibility_model:
    cloud_provider_responsible:
      - "All infrastructure"
      - "All platform"
      - "Application security"
    
    organization_responsible:
      - "Access management"
      - "Data classification"
      - "User training"
```

### Multi-Cloud & Hybrid

```yaml
cloud_strategy: hybrid

environments:
  on_premise:
    use_case: "Critical systems with high security requirements"
    location: "Stockholm Data Center"
    systems:
      - app-core-banking
      - app-payment-processing
  
  aws_cloud:
    use_case: "Customer-facing applications"
    region: "eu-north-1"
    systems:
      - app-customer-portal
      - app-mobile-backend
  
  azure_cloud:
    use_case: "Office productivity and collaboration"
    region: "West Europe"
    systems:
      - "Microsoft 365"
      - "SharePoint"

connectivity:
  - connection_type: "AWS Direct Connect"
    bandwidth: "1 Gbps"
    encryption: true
    
  - connection_type: "Azure ExpressRoute"
    bandwidth: "500 Mbps"
    encryption: true
```

## Infrastructure as Code (IaC)

**Best Practice för NIS 2**:

```yaml
infrastructure_as_code:
  enabled: true
  
  tools:
    - "Terraform"
    - "Ansible"
    - "Kubernetes manifests"
  
  benefits_for_nis2:
    - "Dokumentation automatiskt i kod"
    - "Reproducerbar infrastruktur"
    - "Version control av infrastruktur"
    - "Automated compliance checks"
  
  example_terraform:
    repository: "github.com/company/infrastructure"
    code_review: "Required for all changes"
    automated_testing: true
    deployment_process: "GitOps with CI/CD"
```

## Checklista - Technology Architecture för NIS 2

### Infrastructure Inventory
- [ ] Alla servrar/nodes inventerade
- [ ] Node-typ dokumenterad
- [ ] Operating system och version dokumenterad
- [ ] Hosting-typ (on-prem/cloud) dokumenterad
- [ ] Lokalisering dokumenterad
- [ ] Kritikalitet klassificerad

### Patch Management
- [ ] Patch management policy dokumenterad
- [ ] Patch-status spårad för alla nodes
- [ ] SLA definierat för kritiska patches
- [ ] Senaste patch-datum dokumenterat för varje node
- [ ] Pending patches identifierade
- [ ] Overdue patches har mitigation eller plan
- [ ] Emergency patch process dokumenterad

### Network Security
- [ ] Alla nätverk/segment dokumenterade
- [ ] Säkerhetszoner definierade
- [ ] Nätverkssegmentering implementerad
- [ ] Firewalls mellan säkerhetszoner
- [ ] Firewall-regler dokumenterade
- [ ] IDS/IPS implementerat
- [ ] Network monitoring aktivt

### Platform Management
- [ ] Alla teknologiplattformar inventerade
- [ ] Version dokumenterad för varje plattform
- [ ] Support end-of-life datum spårat
- [ ] Platforms nära EOL har migration plan
- [ ] Licensiering dokumenterad

### Physical Security
- [ ] Alla fysiska lokationer dokumenterade
- [ ] Fysisk säkerhetsnivå bedömd
- [ ] Säkerhetskontroller dokumenterade
- [ ] Environmental controls dokumenterade
- [ ] Disaster risk bedömd

### Cloud Security
- [ ] Cloud provider dokumenterad
- [ ] Cloud region dokumenterad (data residency)
- [ ] Shared responsibility model dokumenterad
- [ ] Cloud security controls implementerade
- [ ] Cloud compliance verifierad

## Sammanfattning

Technology Architecture är grunden som allt annat vilar på. För NIS 2:

1. **Inventera infrastruktur**: Allt måste vara känt
2. **Patch Management**: Systematisk och dokumenterad process
3. **Network Segmentation**: Obligatorisk säkerhetskontroll
4. **End-of-Life Tracking**: Undvik osupporterade plattformar
5. **Cloud Responsibility**: Förstå vem som ansvarar för vad

Ohanterad infrastruktur = ohanterbar säkerhet. Dokumentation är nyckeln.
