# Data Architecture Perspektiv

## Översikt

Data Architecture-perspektivet beskriver organisationens dataobjekt, datalagring, dataflöden och dataskydd.

## Syfte inom NIS 2-kontext

- **Dataskydd**: NIS 2 kräver skydd av data genom kryptering och åtkomstkontroll
- **GDPR-koppling**: Personuppgifter måste identifieras och skyddas
- **Dataflöden**: Förstå var data flödar för att identifiera risker
- **Backup och återställning**: Kritiskt för business continuity

## Huvudkomponenter

### 1. Data Object

**Definition**: En typ av data eller datakategori som organisationen hanterar.

**Dataklassificering**:
- **Public**: Publik information
- **Internal**: Intern information, ej för externa
- **Confidential**: Konfidentiell, begränsad åtkomst
- **Secret**: Hemlig, mycket restriktiv åtkomst

**GDPR-kategorier**:
- **Personal Data**: Data som kan identifiera en person
- **Sensitive Personal Data**: GDPR Artikel 9 special categories (hälso-, religiös data, etc.)

**Exempel**:
```yaml
id: data-customer-profile
name: "Customer Profile Data"
description: "Grundläggande kundprofil information"

# Klassificering
data_category: personal_data
classification: confidential
personal_data: true
sensitive_personal_data: false

# GDPR
gdpr_applicable: true
data_subjects: "Customers"
data_elements:
  - "Name"
  - "Email address"
  - "Phone number"
  - "Postal address"
  - "Customer ID"

# Legal basis (GDPR Artikel 6)
legal_basis: "Contract (GDPR Art 6.1.b)"
purpose: "Customer relationship management and service delivery"

# Retention
retention_period: "7 years after last transaction"
retention_justification: "Legal requirement (accounting law)"
deletion_procedure: "Automated deletion after retention period"

# Data protection requirements
protection_requirements:
  encryption_required: true
  access_logging_required: true
  anonymization_possible: false
  pseudonymization_recommended: true
```

**Datatyper att dokumentera**:
- Customer data
- Employee data
- Financial data
- Transaction data
- Technical logs
- Business documents
- Intellectual property

### 2. Data Store

**Definition**: En lagringsplats för data.

**Lagringstyper**:
- **Database**: Databas (SQL, NoSQL)
- **File System**: Filsystem
- **Object Storage**: Object storage (S3, Azure Blob)
- **Backup**: Backup-lagring
- **Archive**: Arkivlagring

**Exempel - Production Database**:
```yaml
id: datastore-customer-db
name: "Customer Database"
description: "Primär databas för kunddata"

store_type: database
database_type: "PostgreSQL"
database_version: "14.10"

# Hosting
hosting: infra-db-server-01
location: loc-stockholm-dc
cloud_provider: null  # on-premise

# Data stored
stores_data_objects:
  - data-customer-profile
  - data-customer-transactions
  - data-customer-preferences

# Size
size_gb: 450
growth_rate: "~10 GB/month"

# Security - KRITISKT för NIS 2!
encryption_at_rest:
  enabled: true
  algorithm: "AES-256"
  key_management: "Hardware Security Module (HSM)"
  
access_controls:
  enabled: true
  authentication: "Certificate-based"
  authorization: "Database roles with least privilege"
  privileged_access_logging: true

network_access:
  allowed_from:
    - network: net-application
      port: 5432
      protocol: "PostgreSQL wire protocol"
  public_access: false

# Backup
backup_configured: true
backup_frequency: "Daily full, hourly incremental"
backup_location: datastore-backup-vault
backup_encryption: true
backup_retention: "30 days online, 7 years archive"
last_backup: "2026-02-26T02:00:00Z"
last_backup_test: "2026-02-15"
restore_tested: true
average_restore_time: "2 hours"

# Monitoring
monitoring_enabled: true
monitored_metrics:
  - "Storage capacity"
  - "Query performance"
  - "Connection count"
  - "Replication lag"
alerts_configured: true

# High Availability
ha_configured: true
ha_type: "Synchronous replication"
ha_nodes:
  - datastore-customer-db-replica1
  - datastore-customer-db-replica2
automatic_failover: true
```

**Exempel - Cloud Object Storage**:
```yaml
id: datastore-s3-documents
name: "Document Storage (S3)"
store_type: object_storage

cloud_provider: "AWS"
cloud_service: "S3"
cloud_region: "eu-north-1"
bucket_name: "company-documents-prod"

# Data
stores_data_objects:
  - data-customer-documents
  - data-contracts

# Security
encryption_at_rest:
  enabled: true
  algorithm: "AES-256"
  key_management: "AWS KMS"
  server_side_encryption: "SSE-KMS"

access_controls:
  public_access: false
  bucket_policy: "Deny all except specific IAM roles"
  iam_roles_with_access:
    - "app-document-management-role"
  
versioning_enabled: true
lifecycle_policy:
  - rule: "Move to Glacier after 90 days"
  - rule: "Delete after 7 years"

# Compliance
compliance_features:
  - "Object Lock (WORM)"
  - "Audit logging to CloudTrail"
  - "Encryption enforced"
```

### 3. Data Flow

**Definition**: Ett flöde av data mellan system, komponenter eller datastores.

**Varför dokumentera dataflöden?**
- **Säkerhetsrisker**: Identifiera var data kan läcka
- **Compliance**: Veta var personuppgifter flödar (GDPR)
- **Kryptering**: Säkerställ kryptering vid överföring
- **Trust boundaries**: Identifiera när data lämnar säkra zoner

**Exempel - Internal Data Flow**:
```yaml
id: flow-app-to-db
name: "Application to Database"
description: "Kundportal läser/skriver kunddata från databas"

# Source and Target
source:
  type: application
  id: app-customer-portal
  component: comp-customer-api

target:
  type: datastore
  id: datastore-customer-db

# Data
data_objects:
  - data-customer-profile
  - data-customer-transactions

direction: bidirectional
frequency: "Real-time (1000+ queries/hour)"
data_volume: "~1 MB/hour"

# Security - KRITISKT!
encryption_in_transit:
  enabled: true
  protocol: "TLS 1.3"
  certificate_validation: true

authentication_required: true
authentication_method: "Certificate-based mutual TLS"

crosses_trust_boundary: false
source_security_zone: internal
target_security_zone: restricted

# Network path
network_path:
  - network: net-application
  - firewall: fw-database
    rules: "Allow PostgreSQL from app servers only"
  - network: net-database

# Monitoring
data_flow_monitored: true
anomaly_detection: true
```

**Exempel - External Data Flow**:
```yaml
id: flow-api-to-payment
name: "API to Payment Gateway"
description: "Skicka betalningstransaktioner till extern payment gateway"

source:
  type: application
  id: app-customer-portal
  component: comp-payment-service

target:
  type: external_service
  id: supplier-payment-gateway
  name: "Stripe Payment Gateway"

# Data
data_objects:
  - data-payment-transaction
  - data-customer-payment-info  # PCI-DSS relevant!

direction: source_to_target
frequency: "Per transaction (~100/day)"
data_volume: "~1 KB per transaction"

# Security
encryption_in_transit:
  enabled: true
  protocol: "TLS 1.3"

authentication_required: true
authentication_method: "API Key + OAuth 2.0"

crosses_trust_boundary: true  # LEAVING ORGANIZATION!
source_security_zone: dmz
target_security_zone: external

# Compliance
compliance_requirements:
  - "PCI-DSS"  # Payment card data
  - "GDPR"     # Personal data leaves EU? No, Stripe EU

data_processing_agreement: true
dpa_signed_date: "2025-03-15"
dpa_review_date: "2027-03-15"

# Risk mitigation
security_controls:
  - ctrl-api-rate-limiting
  - ctrl-data-minimization  # Only send necessary data
  - ctrl-tokenization  # Tokenize card data

# Monitoring
data_flow_monitored: true
alerts:
  - "Failed transactions > 5%"
  - "API errors"
  - "Unusual data volume"
```

### Trust Boundary Analysis

**Trust Boundaries**:
```
Internal Systems → DMZ → External
     (High Trust)     ↓     (Low Trust)
                Cross Boundary
                   (Risk!)
```

**Dataflöden som korsar trust boundaries måste ha**:
1. **Kryptering**: TLS 1.2+ minimum
2. **Stark autentisering**: API keys, certificates, OAuth
3. **Data minimization**: Skicka bara nödvändig data
4. **Monitoring**: Logga alla transaktioner
5. **Input validation**: Validera inkommande data

## Data Protection Strategy

### Encryption Strategy

**NIS 2 Krav (Artikel 21.2.g)**: Kryptografi och kryptering

```yaml
encryption_strategy:
  
  encryption_at_rest:
    scope: "All data classified as Confidential or Secret"
    
    databases:
      standard: "AES-256"
      key_management: "Hardware Security Module (HSM)"
      key_rotation: "Annually"
    
    file_storage:
      standard: "AES-256"
      key_management: "Cloud KMS (AWS KMS / Azure Key Vault)"
    
    backups:
      standard: "AES-256"
      encrypted: "Always"
      key_management: "Separate key from production"
  
  encryption_in_transit:
    scope: "All network traffic containing sensitive data"
    
    external_connections:
      standard: "TLS 1.3"
      minimum: "TLS 1.2"
      certificate_authority: "Public CA (Let's Encrypt, DigiCert)"
      certificate_validity: "1 year maximum"
    
    internal_connections:
      standard: "TLS 1.2+"
      exceptions: "Internal management VLANs (documented)"
    
    apis:
      standard: "HTTPS only, no HTTP"
      hsts_enabled: true
  
  key_management:
    key_storage: "HSM or Cloud KMS"
    key_backup: "Encrypted backup in separate location"
    key_rotation_policy: "Annually for data encryption, every 2 years for certificates"
    key_access_control: "Least privilege, multi-person control"
    key_destruction: "Secure deletion when no longer needed"
```

### Data Loss Prevention (DLP)

```yaml
dlp_strategy:
  
  objectives:
    - "Prevent accidental data leakage"
    - "Detect insider threats"
    - "Ensure compliance with data policies"
  
  controls:
    email:
      scanner: "Microsoft 365 DLP"
      rules:
        - "Block emails with credit card numbers"
        - "Warn on emails with >100 customer records"
    
    endpoint:
      agent: "Endpoint DLP agent"
      rules:
        - "Block USB storage devices"
        - "Block upload to unauthorized cloud services"
    
    network:
      proxy: "Web proxy with SSL inspection"
      rules:
        - "Block upload to unauthorized sites"
        - "Detect large data transfers"
```

### Backup & Recovery Strategy

**NIS 2 Krav (Artikel 21.2.b)**: Business Continuity - Backup är kritiskt

```yaml
backup_strategy:
  
  backup_scope:
    - "All production databases"
    - "All file servers"
    - "All configuration data"
    - "Virtual machine images (for critical systems)"
  
  backup_types:
    full_backup:
      frequency: "Weekly (Sunday)"
      retention: "4 weeks online, 1 year archive"
    
    incremental_backup:
      frequency: "Daily"
      retention: "30 days"
    
    transaction_log_backup:
      frequency: "Hourly"
      retention: "7 days"
  
  backup_locations:
    primary:
      location: loc-stockholm-dc
      storage: "Backup appliance"
      
    secondary:
      location: loc-backup-cloud
      storage: "AWS S3 Glacier"
      type: "Archive"
  
  backup_security:
    encryption: "Always (AES-256)"
    encryption_key: "Separate from production keys"
    access_control: "Restricted to backup admins"
    immutable_backups: true  # Cannot be deleted (ransomware protection)
    multi_factor_auth: "Required for restore operations"
  
  backup_testing:
    test_frequency: "Monthly"
    test_type: "Sample restore and verify"
    full_restore_test_frequency: "Annually"
    last_full_test: "2026-01-20"
    test_result: "Success - RTO met"
    
  restore_procedures:
    documented: true
    location: "Disaster Recovery Plan"
    practiced: "Annually"
```

**3-2-1 Backup Rule**:
- **3** copies of data
- **2** different media types
- **1** copy off-site

## Data Governance

### Data Ownership

```yaml
data_governance:
  
  roles:
    data_owner:
      description: "Business owner responsible for data"
      responsibilities:
        - "Define data classification"
        - "Approve access requests"
        - "Define retention period"
      example: "CFO owns financial data"
    
    data_custodian:
      description: "Technical role managing data"
      responsibilities:
        - "Implement security controls"
        - "Manage backups"
        - "Ensure compliance"
      example: "Database Administrator"
    
    data_steward:
      description: "Ensures data quality"
      responsibilities:
        - "Data quality management"
        - "Metadata management"
        - "Data lifecycle management"
  
  data_classification_policy:
    policy_name: "Data Classification Policy v2.0"
    owner: "CISO"
    approved: "2025-06-01"
    review_frequency: "Annual"
```

### Data Retention & Deletion

```yaml
data_retention:
  
  policy_name: "Data Retention and Deletion Policy"
  version: "1.5"
  last_updated: "2025-09-01"
  
  retention_schedules:
    
    customer_data:
      data_object: data-customer-profile
      retention_period: "7 years after last transaction"
      legal_basis: "Accounting Act"
      deletion_method: "Automated deletion via script"
      deletion_verification: "Audit log"
    
    employee_data:
      data_object: data-employee-records
      retention_period: "10 years after employment ends"
      legal_basis: "Tax Law"
      deletion_method: "Manual review + automated deletion"
    
    logs:
      data_object: data-security-logs
      retention_period: "1 year online, 7 years archive"
      legal_basis: "NIS 2 requirement"
      deletion_method: "Automated rollover"
    
    backups:
      retention_period: "30 days online, 1 year archive"
      deletion_method: "Automated deletion by backup system"
```

### GDPR Data Mapping

**GDPR Krav**: Veta var personuppgifter finns (Art. 30 - Register)

```yaml
gdpr_data_mapping:
  
  personal_data_register:
    
    - processing_activity: "Customer Relationship Management"
      
      data_objects:
        - data-customer-profile
        - data-customer-transactions
      
      data_subjects: "Customers"
      
      purpose: "Manage customer relationships and deliver services"
      
      legal_basis: "Contract (GDPR Art 6.1.b)"
      
      data_categories:
        - "Contact information"
        - "Transaction history"
      
      storage_locations:
        - datastore-customer-db
        - datastore-backup-vault
      
      retention_period: "7 years"
      
      recipients:
        - "Internal sales team"
        - "Customer support"
      
      third_party_transfers:
        - recipient: "CRM Provider (Salesforce)"
          location: "EU"
          safeguards: "Standard Contractual Clauses"
      
      data_subject_rights:
        - "Right to access: Supported via customer portal"
        - "Right to erasure: Documented procedure"
        - "Right to portability: Export function available"
      
      security_measures:
        - "Encryption at rest"
        - "Access control with MFA"
        - "Audit logging"
```

## Data Architecture Patterns

### Master Data Management

```yaml
master_data_management:
  
  master_data_domains:
    - Customer Master Data
    - Product Master Data
    - Employee Master Data
  
  golden_records:
    customer_master:
      system_of_record: app-crm
      synchronization:
        - target: app-erp
          frequency: "Real-time"
        - target: app-customer-portal
          frequency: "Every 5 minutes"
```

### Data Lake / Data Warehouse

```yaml
analytics_architecture:
  
  data_warehouse:
    system: datastore-analytics-warehouse
    purpose: "Business intelligence and reporting"
    technology: "Snowflake"
    
    data_sources:
      - source: datastore-customer-db
        sync_frequency: "Daily"
      - source: app-erp
        sync_frequency: "Daily"
    
    data_classification: internal
    contains_personal_data: true
    pseudonymization: true  # Personal identifiers pseudonymized
    
    security:
      encryption: true
      access_control: "Role-based, read-only"
```

## Checklista - Data Architecture för NIS 2

### Data Inventory
- [ ] Alla dataobjekt identifierade
- [ ] Dataklassificering satt för alla dataobjekt
- [ ] Personuppgifter identifierade (GDPR)
- [ ] Känsliga personuppgifter identifierade (GDPR Art 9)
- [ ] Legal basis dokumenterad för personuppgifter
- [ ] Retention period definierad för alla datatyper

### Data Storage
- [ ] Alla datastores inventerade
- [ ] Kryptering at rest för konfidentiell data
- [ ] Access controls implementerade
- [ ] Backup konfigurerad för kritiska datastores
- [ ] Backup testat (restore verification)
- [ ] Backup encrypted

### Data Flows
- [ ] Kritiska dataflöden dokumenterade
- [ ] Kryptering in transit för känslig data
- [ ] Autentisering för alla gränssnitt
- [ ] Trust boundary crossings identifierade
- [ ] External data flows har dataskyddsavtal (DPA)

### Data Protection
- [ ] Encryption policy dokumenterad
- [ ] Key management process dokumenterad
- [ ] Backup & recovery strategy dokumenterad
- [ ] RTO/RPO uppfyllt i backup tests
- [ ] DLP (Data Loss Prevention) implementerat

### GDPR Compliance
- [ ] Data processing register (Art 30) dokumenterat
- [ ] Data subject rights procedures dokumenterade
- [ ] Data retention policy dokumenterad
- [ ] Data deletion procedures implementerade
- [ ] Third-party data transfers dokumenterade med safeguards

## Sammanfattning

Data Architecture är kritiskt för både NIS 2 och GDPR. Fokusområden:

1. **Inventera data**: Veta vad ni har
2. **Klassificera**: Public/Internal/Confidential/Secret
3. **Skydda**: Kryptering at rest och in transit
4. **Backup**: Testad och encrypted backup
5. **GDPR**: Personuppgifter kräver extra omsorg
6. **Dataflöden**: Förstå var data flödar och skydda trust boundary crossings

Data är den främsta tillgången - skydda den därefter.
