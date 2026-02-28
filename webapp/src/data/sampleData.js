// Livsmedelsverket Enterprise Architecture - Sample Data
// Baserad på offentlig information om Livsmedelsverkets uppdrag och organisation
// ArchiMate 3.1 compliant data model

const sampleData = {
  entities: [
    // ========================================================================
    // STRATEGY LAYER - Goals & Drivers
    // ========================================================================
    {
      id: 'goal-001',
      entityType: 'Goal',
      name: 'Säker mat och bra dricksvatten',
      description: 'Övergripande mål att säkerställa att mat och dricksvatten är säkert för Sveriges befolkning'
    },
    {
      id: 'goal-002',
      entityType: 'Goal',
      name: 'Hållbar livsmedelskonsumtion',
      description: 'Främja hållbara matvanor som är bra för både hälsa och miljö'
    },
    {
      id: 'goal-003',
      entityType: 'Goal',
      name: 'Effektiv myndighetskontroll',
      description: 'Genomföra riskbaserad och effektiv kontroll av livsmedelsföretag'
    },
    {
      id: 'goal-004',
      entityType: 'Goal',
      name: 'Stark krisberedskap',
      description: 'Snabb och effektiv hantering av livsmedelskriser och utbrott'
    },
    {
      id: 'driver-001',
      entityType: 'Driver',
      name: 'EU-lagstiftning',
      description: 'Krav från EU:s livsmedelslagstiftning och förordningar'
    },
    {
      id: 'driver-002',
      entityType: 'Driver',
      name: 'Folkhälsokrav',
      description: 'Ökad medvetenhet om matens påverkan på folkhälsan'
    },
    {
      id: 'driver-003',
      entityType: 'Driver',
      name: 'Digitalisering',
      description: 'Krav på automatisering och digitala tjänster från företag och konsumenter'
    },
    {
      id: 'principle-001',
      entityType: 'Principle',
      name: 'Riskbaserad kontroll',
      description: 'Kontrollen ska fokusera på de områden där riskerna är störst'
    },
    {
      id: 'principle-002',
      entityType: 'Principle',
      name: 'Öppenhet och transparens',
      description: 'Information om livsmedelssäkerhet ska vara tillgänglig för allmänheten'
    },
    {
      id: 'principle-003',
      entityType: 'Principle',
      name: 'Vetenskaplig grund',
      description: 'Beslut ska baseras på bästà tillgängliga vetenskapliga underlag'
    },

    // ========================================================================
    // BUSINESS LAYER - Capabilities (3+ nivåer)
    // ========================================================================
    
    // Level 1: Strategiska förmågor
    {
      id: 'cap-l1-001',
      entityType: 'Capability',
      name: 'Riskvärdering och Riskhantering',
      description: 'Förmåga att identifiera, värdera och hantera risker i livsmedelskedjan',
      level: 1,
      parentId: null
    },
    {
      id: 'cap-l1-002',
      entityType: 'Capability',
      name: 'Kontroll och Tillsyn',
      description: 'Förmåga att utföra kontroll och tillsyn av livsmedelsaktörer',
      level: 1,
      parentId: null
    },
    {
      id: 'cap-l1-003',
      entityType: 'Capability',
      name: 'Tillståndsgivning och Registrering',
      description: 'Förmåga att hantera tillstånd och registreringar för livsmedelsverksamheter',
      level: 1,
      parentId: null
    },
    {
      id: 'cap-l1-004',
      entityType: 'Capability',
      name: 'Konsumentinformation',
      description: 'Förmåga att informera och utbilda konsumenter om mat och hälsa',
      level: 1,
      parentId: null
    },
    {
      id: 'cap-l1-005',
      entityType: 'Capability',
      name: 'Kost och Näringsrekommendationer',
      description: 'Förmåga att ta fram och sprida näringsrekommendationer',
      level: 1,
      parentId: null
    },
    {
      id: 'cap-l1-006',
      entityType: 'Capability',
      name: 'Krisberedskap och Krishantering',
      description: 'Förmåga att hantera livsmedelskriser och utbrott',
      level: 1,
      parentId: null
    },
    {
      id: 'cap-l1-007',
      entityType: 'Capability',
      name: 'Internationellt Samarbete',
      description: 'Förmåga att samarbeta internationellt inom livsmedelssäkerhet',
      level: 1,
      parentId: null
    },
    {
      id: 'cap-l1-008',
      entityType: 'Capability',
      name: 'Laboratorieverksamhet',
      description: 'Förmåga att utföra analyser och provtagning',
      level: 1,
      parentId: null
    },

    // Level 2: Taktiska förmågor under Riskvärdering
    {
      id: 'cap-l2-001',
      entityType: 'Capability',
      name: 'Kemisk Riskvärdering',
      description: 'Värdera risker från kemiska ämnen i livsmedel',
      level: 2,
      parentId: 'cap-l1-001'
    },
    {
      id: 'cap-l2-002',
      entityType: 'Capability',
      name: 'Mikrobiologisk Riskvärdering',
      description: 'Värdera risker från mikroorganismer och patogener',
      level: 2,
      parentId: 'cap-l1-001'
    },
    {
      id: 'cap-l2-003',
      entityType: 'Capability',
      name: 'Allergiriskvärdering',
      description: 'Värdera risker relaterade till allergener i livsmedel',
      level: 2,
      parentId: 'cap-l1-001'
    },
    {
      id: 'cap-l2-004',
      entityType: 'Capability',
      name: 'Vetenskaplig Utvärdering',
      description: 'Granska och utvärdera vetenskaplig litteratur och studier',
      level: 2,
      parentId: 'cap-l1-001'
    },

    // Level 2: Taktiska förmågor under Kontroll och Tillsyn
    {
      id: 'cap-l2-010',
      entityType: 'Capability',
      name: 'Planering av Kontroll',
      description: 'Planera och prioritera kontrollverksamhet riskbaserat',
      level: 2,
      parentId: 'cap-l1-002'
    },
    {
      id: 'cap-l2-011',
      entityType: 'Capability',
      name: 'Genomförande av Kontroll',
      description: 'Utföra inspektioner och kontroller på plats',
      level: 2,
      parentId: 'cap-l1-002'
    },
    {
      id: 'cap-l2-012',
      entityType: 'Capability',
      name: 'Provtagning och Analys',
      description: 'Ta prover och analysera livsmedel',
      level: 2,
      parentId: 'cap-l1-002'
    },
    {
      id: 'cap-l2-013',
      entityType: 'Capability',
      name: 'Hantering av Avvikelser',
      description: 'Hantera brister och bristande efterlevnad',
      level: 2,
      parentId: 'cap-l1-002'
    },
    {
      id: 'cap-l2-014',
      entityType: 'Capability',
      name: 'Uppföljning och Efterkontroll',
      description: 'Följa upp åtgärder och utföra efterkontroller',
      level: 2,
      parentId: 'cap-l1-002'
    },

    // Level 2: Taktiska förmågor under Tillståndsgivning
    {
      id: 'cap-l2-020',
      entityType: 'Capability',
      name: 'Registrering av Livsmedelsföretag',
      description: 'Registrera nya livsmedelsföretagare',
      level: 2,
      parentId: 'cap-l1-003'
    },
    {
      id: 'cap-l2-021',
      entityType: 'Capability',
      name: 'Godkännande av Anläggningar',
      description: 'Godkänna anläggningar för specifika verksamheter',
      level: 2,
      parentId: 'cap-l1-003'
    },
    {
      id: 'cap-l2-022',
      entityType: 'Capability',
      name: 'Hantering av Ansökningar',
      description: 'Ta emot och behandla olika typer av ansökningar',
      level: 2,
      parentId: 'cap-l1-003'
    },

    // Level 2: Taktiska förmågor under Konsumentinformation
    {
      id: 'cap-l2-030',
      entityType: 'Capability',
      name: 'Webbkommunikation',
      description: 'Publicera information på webbplatsen',
      level: 2,
      parentId: 'cap-l1-004'
    },
    {
      id: 'cap-l2-031',
      entityType: 'Capability',
      name: 'Kampanjer och Utbildning',
      description: 'Genomföra informationskampanjer och utbildningsinsatser',
      level: 2,
      parentId: 'cap-l1-004'
    },
    {
      id: 'cap-l2-032',
      entityType: 'Capability',
      name: 'Hantering av Konsumentfrågor',
      description: 'Besvara frågor från allmänheten',
      level: 2,
      parentId: 'cap-l1-004'
    },

    // Level 2: Taktiska förmågor under Krisberedskap
    {
      id: 'cap-l2-040',
      entityType: 'Capability',
      name: 'Utbrottsutredning',
      description: 'Utreda matförgiftningsutbrott och smittspridning',
      level: 2,
      parentId: 'cap-l1-006'
    },
    {
      id: 'cap-l2-041',
      entityType: 'Capability',
      name: 'Återkallelser och Vanningar',
      description: 'Hantera återkallelser av livsmedel',
      level: 2,
      parentId: 'cap-l1-006'
    },
    {
      id: 'cap-l2-042',
      entityType: 'Capability',
      name: 'Krishantering och Samordning',
      description: 'Samordna krishantering med andra myndigheter',
      level: 2,
      parentId: 'cap-l1-006'
    },

    // Level 3: Operativa förmågor under Kemisk Riskvärdering
    {
      id: 'cap-l3-001',
      entityType: 'Capability',
      name: 'Tungmetallanalys',
      description: 'Analysera och värdera risker från tungmetaller (bly, kadmium, kvicksilver)',
      level: 3,
      parentId: 'cap-l2-001'
    },
    {
      id: 'cap-l3-002',
      entityType: 'Capability',
      name: 'Bekämpningsmedelsrester',
      description: 'Utvärdera rester av bekämpningsmedel i livsmedel',
      level: 3,
      parentId: 'cap-l2-001'
    },
    {
      id: 'cap-l3-003',
      entityType: 'Capability',
      name: 'Processkontaminanter',
      description: 'Värdera risker från ämnen som bildas vid tillverkning (t.ex. akrylamid)',
      level: 3,
      parentId: 'cap-l2-001'
    },
    {
      id: 'cap-l3-004',
      entityType: 'Capability',
      name: 'Tillsatsämnesutvärdering',
      description: 'Utvärdera säkerheten för livsmedelstillsatser',
      level: 3,
      parentId: 'cap-l2-001'
    },

    // Level 3: Operativa förmågor under Mikrobiologisk Riskvärdering
    {
      id: 'cap-l3-010',
      entityType: 'Capability',
      name: 'Salmonellakontroll',
      description: 'Värdera och övervaka salmonellarisker',
      level: 3,
      parentId: 'cap-l2-002'
    },
    {
      id: 'cap-l3-011',
      entityType: 'Capability',
      name: 'Campylobacterövervakning',
      description: 'Övervaka campylobacter i livsmedelskedjan',
      level: 3,
      parentId: 'cap-l2-002'
    },
    {
      id: 'cap-l3-012',
      entityType: 'Capability',
      name: 'Listeriakontroll',
      description: 'Hantera listeria-risker i redo-to-eat produkter',
      level: 3,
      parentId: 'cap-l2-002'
    },
    {
      id: 'cap-l3-013',
      entityType: 'Capability',
      name: 'Virusövervakning',
      description: 'Övervaka virus i livsmedel (t.ex. norovirus)',
      level: 3,
      parentId: 'cap-l2-002'
    },

    // Level 3: Operativa förmågor under Genomförande av Kontroll
    {
      id: 'cap-l3-020',
      entityType: 'Capability',
      name: 'Restauranginspektion',
      description: 'Utföra kontroll av restauranger och storhushåll',
      level: 3,
      parentId: 'cap-l2-011'
    },
    {
      id: 'cap-l3-021',
      entityType: 'Capability',
      name: 'Slakteriinspektion',
      description: 'Kontrollera slakterier och kött',
      level: 3,
      parentId: 'cap-l2-011'
    },
    {
      id: 'cap-l3-022',
      entityType: 'Capability',
      name: 'Butikskontroll',
      description: 'Inspektera livsmedelsbutiker',
      level: 3,
      parentId: 'cap-l2-011'
    },
    {
      id: 'cap-l3-023',
      entityType: 'Capability',
      name: 'Livsmedelsindustriinspektion',
      description: 'Kontrollera livsmedelstillverkande industrier',
      level: 3,
      parentId: 'cap-l2-011'
    },
    {
      id: 'cap-l3-024',
      entityType: 'Capability',
      name: 'Importkontroll',
      description: 'Kontrollera importerade livsmedel vid gränsen',
      level: 3,
      parentId: 'cap-l2-011'
    },

    // ========================================================================
    // BUSINESS LAYER - Business Processes (3+ nivåer)
    // ========================================================================
    
    // Level 1: Huvudprocesser
    {
      id: 'proc-l1-001',
      entityType: 'BusinessProcess',
      name: 'Kontrollprocess',
      description: 'Övergripande process för planering, genomförande och uppföljning av kontroller',
      level: 1,
      parentId: null
    },
    {
      id: 'proc-l1-002',
      entityType: 'BusinessProcess',
      name: 'Tillståndsprocess',
      description: 'Process för hantering av tillstånd och registreringar',
      level: 1,
      parentId: null
    },
    {
      id: 'proc-l1-003',
      entityType: 'BusinessProcess',
      name: 'Riskvärderingsprocess',
      description: 'Process för vetenskaplig riskvärdering',
      level: 1,
      parentId: null
    },
    {
      id: 'proc-l1-004',
      entityType: 'BusinessProcess',
      name: 'Krisrespons',
      description: 'Process för hantering av livsmedelskriser',
      level: 1,
      parentId: null
    },

    // Level 2: Delprocesser under Kontrollprocess
    {
      id: 'proc-l2-001',
      entityType: 'BusinessProcess',
      name: 'Kontrollplanering',
      description: 'Planera och prioritera kontrollverksamhet för kommande period',
      level: 2,
      parentId: 'proc-l1-001'
    },
    {
      id: 'proc-l2-002',
      entityType: 'BusinessProcess',
      name: 'Platskontroll',
      description: 'Genomföra fysisk inspektion hos företag',
      level: 2,
      parentId: 'proc-l1-001'
    },
    {
      id: 'proc-l2-003',
      entityType: 'BusinessProcess',
      name: 'Dokumentkontroll',
      description: 'Granska dokument och rutiner',
      level: 2,
      parentId: 'proc-l1-001'
    },
    {
      id: 'proc-l2-004',
      entityType: 'BusinessProcess',
      name: 'Avvikelsehantering',
      description: 'Hantera identifierade brister',
      level: 2,
      parentId: 'proc-l1-001'
    },
    {
      id: 'proc-l2-005',
      entityType: 'BusinessProcess',
      name: 'Rapportering',
      description: 'Rapportera kontrollresultat internt och till EU',
      level: 2,
      parentId: 'proc-l1-001'
    },

    // Level 2: Delprocesser under Tillståndsprocess
    {
      id: 'proc-l2-010',
      entityType: 'BusinessProcess',
      name: 'Ansökan och Registrering',
      description: 'Ta emot och registrera ansökningar',
      level: 2,
      parentId: 'proc-l1-002'
    },
    {
      id: 'proc-l2-011',
      entityType: 'BusinessProcess',
      name: 'Handläggning',
      description: 'Utreda och bedöma ansökan',
      level: 2,
      parentId: 'proc-l1-002'
    },
    {
      id: 'proc-l2-012',
      entityType: 'BusinessProcess',
      name: 'Beslut och Kommunikation',
      description: 'Fatta beslut och kommunicera till sökande',
      level: 2,
      parentId: 'proc-l1-002'
    },

    // Level 3: Aktiviteter under Platskontroll
    {
      id: 'proc-l3-001',
      entityType: 'BusinessProcess',
      name: 'Förberedelse av Kontroll',
      description: 'Samla information om företaget och tidigare kontroller',
      level: 3,
      parentId: 'proc-l2-002'
    },
    {
      id: 'proc-l3-002',
      entityType: 'BusinessProcess',
      name: 'Öppningsmöte',
      description: 'Inledande möte med företrädare för företaget',
      level: 3,
      parentId: 'proc-l2-002'
    },
    {
      id: 'proc-l3-003',
      entityType: 'BusinessProcess',
      name: 'Inspektion av Lokaler',
      description: 'Fysisk genomgång av lokaler och utrustning',
      level: 3,
      parentId: 'proc-l2-002'
    },
    {
      id: 'proc-l3-004',
      entityType: 'BusinessProcess',
      name: 'Granskning av Egenkontroll',
      description: 'Kontrollera att företaget har fungerande egenkontroll',
      level: 3,
      parentId: 'proc-l2-002'
    },
    {
      id: 'proc-l3-005',
      entityType: 'BusinessProcess',
      name: 'Provtagning',
      description: 'Ta prover för analys',
      level: 3,
      parentId: 'proc-l2-002'
    },
    {
      id: 'proc-l3-006',
      entityType: 'BusinessProcess',
      name: 'Slutmöte',
      description: 'Genomgång av iakttagelser med företaget',
      level: 3,
      parentId: 'proc-l2-002'
    },
    {
      id: 'proc-l3-007',
      entityType: 'BusinessProcess',
      name: 'Upprättande av Kontrollrapport',
      description: 'Dokumentera kontrollens resultat',
      level: 3,
      parentId: 'proc-l2-002'
    },

    // Level 3: Aktiviteter under Avvikelsehantering
    {
      id: 'proc-l3-010',
      entityType: 'BusinessProcess',
      name: 'Klassificering av Avvikelse',
      description: 'Bedöma allvarlighetsgrad av brist',
      level: 3,
      parentId: 'proc-l2-004'
    },
    {
      id: 'proc-l3-011',
      entityType: 'BusinessProcess',
      name: 'Krav på Åtgärder',
      description: 'Ställa krav på företaget att åtgärda brister',
      level: 3,
      parentId: 'proc-l2-004'
    },
    {
      id: 'proc-l3-012',
      entityType: 'BusinessProcess',
      name: 'Sanktionsärende',
      description: 'Överväga föreläggande, förbud eller anmälan',
      level: 3,
      parentId: 'proc-l2-004'
    },
    {
      id: 'proc-l3-013',
      entityType: 'BusinessProcess',
      name: 'Uppföljning av Åtgärd',
      description: 'Kontrollera att åtgärd har vidtagits',
      level: 3,
      parentId: 'proc-l2-004'
    },

    // ========================================================================
    // BUSINESS LAYER - Business Actors & Roles
    // ========================================================================
    {
      id: 'org-001',
      entityType: 'BusinessActor',
      name: 'Generaldirektör',
      description: 'Myndighetschef för Livsmedelsverket'
    },
    {
      id: 'org-002',
      entityType: 'BusinessActor',
      name: 'Avdelning Riskvärdering och Forskning',
      description: 'Ansvarar för vetenskaplig riskvärdering'
    },
    {
      id: 'org-003',
      entityType: 'BusinessActor',
      name: 'Avdelning Kontroll',
      description: 'Ansvarar för kontroll och tillsyn'
    },
    {
      id: 'org-004',
      entityType: 'BusinessActor',
      name: 'Avdelning Kost och Måltid',
      description: 'Tar fram näringsrekommendationer och information'
    },
    {
      id: 'org-005',
      entityType: 'BusinessActor',
      name: 'Juridisk Avdelning',
      description: 'Juridiskt stöd och regelverksutveckling'
    },
    {
      id: 'org-006',
      entityType: 'BusinessActor',
      name: 'Kommunikationsavdelning',
      description: 'Extern och intern kommunikation'
    },
    {
      id: 'org-007',
      entityType: 'BusinessActor',
      name: 'IT-avdelning',
      description: 'IT-stöd och systemförvaltning'
    },
    {
      id: 'org-008',
      entityType: 'BusinessActor',
      name: 'Nationellt Centrum för Livsmedel',
      description: 'Laboratorieverksamhet och provanalys'
    },
    {
      id: 'org-009',
      entityType: 'BusinessActor',
      name: 'Region Nord',
      description: 'Regional kontrollenhet för norra Sverige'
    },
    {
      id: 'org-010',
      entityType: 'BusinessActor',
      name: 'Region Syd',
      description: 'Regional kontrollenhet för södra Sverige'
    },
    {
      id: 'role-001',
      entityType: 'BusinessRole',
      name: 'Livsmedelsinspektör',
      description: 'Utför kontroller hos livsmedelsföretag'
    },
    {
      id: 'role-002',
      entityType: 'BusinessRole',
      name: 'Riskbedömare',
      description: 'Utför vetenskapliga riskvärderingar'
    },
    {
      id: 'role-003',
      entityType: 'BusinessRole',
      name: 'Handläggare Tillstånd',
      description: 'Hanterar tillståndsärenden'
    },

    // ========================================================================
    // APPLICATION LAYER
    // ========================================================================
    
    // Kärnverksamhetssystem
    {
      id: 'app-001',
      entityType: 'ApplicationComponent',
      name: 'KLASSA',
      description: 'KontrolLApplikation för SVA och SLV - Kontrollsystem för livsmedelskontrollen',
      criticality: 'critical',
      vendor: 'Jordbruksverket',
      technical_health: 6,
      business_value: 9,
      cost_per_year: 3500000
    },
    {
      id: 'app-002',
      entityType: 'ApplicationComponent',
      name: 'Företagsregistret',
      description: 'Register över registrerade och godkända livsmedelsföretag',
      criticality: 'critical',
      technical_health: 5,
      business_value: 9,
      cost_per_year: 1200000
    },
    {
      id: 'app-003',
      entityType: 'ApplicationComponent',
      name: 'Ärendehanteringssystem',
      description: 'System för hantering av tillstånd, registreringar och ärenden',
      criticality: 'high',
      vendor: 'Inhouse',
      technical_health: 4,
      business_value: 8,
      cost_per_year: 2800000
    },
    {
      id: 'app-004',
      entityType: 'ApplicationComponent',
      name: 'LIMS (Laboratory Information Management System)',
      description: 'Laboratoriedatasystem för provhantering och analysresultat',
      criticality: 'high',
      vendor: 'Thermo Scientific',
      version: '11.2',
      eol_date: '2027-12-31',
      technical_health: 7,
      business_value: 8,
      cost_per_year: 1800000
    },
    {
      id: 'app-005',
      entityType: 'ApplicationComponent',
      name: 'RASFF Portal',
      description: 'System för rapportering till EU:s snabbvarningssystem för livsmedel',
      criticality: 'critical',
      vendor: 'EU Kommissionen',
      technical_health: 7,
      business_value: 9,
      cost_per_year: 150000
    },
    {
      id: 'app-006',
      entityType: 'ApplicationComponent',
      name: 'Webbplats och CMS',
      description: 'Livsmedelsverkets publika webbplats med information till allmänheten',
      criticality: 'high',
      vendor: 'Episerver',
      version: '12',
      technical_health: 7,
      business_value: 8,
      cost_per_year: 900000
    },
    {
      id: 'app-007',
      entityType: 'ApplicationComponent',
      name: 'Myndighetens Kontrollkvalitetssystem (MKK)',
      description: 'System för att säkerställa kvalitet och likformighet i kontrollverksamheten',
      criticality: 'medium',
      technical_health: 5,
      business_value: 7,
      cost_per_year: 600000
    },
    {
      id: 'app-008',
      entityType: 'ApplicationComponent',
      name: 'EFSA Föredatarapporteringssystem',
      description: 'System för rapportering av kontrolldata till EFSA (European Food Safety Authority)',
      criticality: 'high',
      technical_health: 6,
      business_value: 8,
      cost_per_year: 400000
    },
    {
      id: 'app-009',
      entityType: 'ApplicationComponent',
      name: 'Riskbedömningsdatabas',
      description: 'Databas med vetenskapliga underlag och riskbedömningar',
      criticality: 'medium',
      technical_health: 5,
      business_value: 7,
      cost_per_year: 500000
    },
    {
      id: 'app-010',
      entityType: 'ApplicationComponent',
      name: 'Digitala Undersökningar',
      description: 'Plattform för matvanor och konsumentundersökningar',
      criticality: 'low',
      vendor: 'Netigate',
      technical_health: 8,
      business_value: 6,
      cost_per_year: 250000
    },

    // Stödsystem
    {
      id: 'app-011',
      entityType: 'ApplicationComponent',
      name: 'Agresso/Unit4 ERP',
      description: 'Ekonomisystem för redovisning och ekonomistyrning',
      criticality: 'high',
      vendor: 'Unit4',
      version: '8.5',
      eol_date: '2026-06-30',
      technical_health: 4,
      business_value: 8,
      cost_per_year: 1500000
    },
    {
      id: 'app-012',
      entityType: 'ApplicationComponent',
      name: 'Primula',
      description: 'Personal- och lönesystem',
      criticality: 'high',
      vendor: 'Evry',
      technical_health: 6,
      business_value: 7,
      cost_per_year: 800000
    },
    {
      id: 'app-013',
      entityType: 'ApplicationComponent',
      name: 'Microsoft 365',
      description: 'Office-paket, e-post och samarbetsverktyg',
      criticality: 'critical',
      vendor: 'Microsoft',
      technical_health: 8,
      business_value: 9,
      cost_per_year: 2400000
    },
    {
      id: 'app-014',
      entityType: 'ApplicationComponent',
      name: 'SharePoint',
      description: 'Intranät och dokumenthantering',
      criticality: 'high',
      vendor: 'Microsoft',
      version: 'Online',
      technical_health: 7,
      business_value: 7,
      cost_per_year: 600000
    },
    {
      id: 'app-015',
      entityType: 'ApplicationComponent',
      name: 'ePhorte',
      description: 'Diarium och ärendehanteringssystem',
      criticality: 'critical',
      vendor: 'Tieto',
      version: '5.8',
      technical_health: 5,
      business_value: 9,
      cost_per_year: 1200000
    },

    // ========================================================================
    // TECHNOLOGY LAYER
    // ========================================================================
    {
      id: 'tech-001',
      entityType: 'SystemSoftware',
      name: 'Windows Server 2019',
      description: 'Operativsystem för servrar',
      vendor: 'Microsoft',
      version: '2019',
      eol_date: '2029-01-09',
      technical_health: 7
    },
    {
      id: 'tech-002',
      entityType: 'SystemSoftware',
      name: 'SQL Server 2019',
      description: 'Databasplattform',
      vendor: 'Microsoft',
      version: '2019',
      eol_date: '2030-01-08',
      technical_health: 8
    },
    {
      id: 'tech-003',
      entityType: 'SystemSoftware',
      name: 'Oracle Database 19c',
      description: 'Databasplattform för vissa affärskritiska system',
      vendor: 'Oracle',
      version: '19c',
      eol_date: '2027-03-31',
      technical_health: 6
    },
    {
      id: 'tech-004',
      entityType: 'SystemSoftware',
      name: 'Red Hat Enterprise Linux 8',
      description: 'Linux-operativsystem',
      vendor: 'Red Hat',
      version: '8',
      eol_date: '2029-05-31',
      technical_health: 8
    },
    {
      id: 'tech-005',
      entityType: 'Node',
      name: 'VMware vSphere Cluster',
      description: 'Virtualiseringsplattform',
      vendor: 'VMware',
      version: '7.0',
      eol_date: '2027-10-15',
      technical_health: 7
    },
    {
      id: 'tech-006',
      entityType: 'Node',
      name: 'Azure Cloud Services',
      description: 'Molnplattform för vissa tjänster',
      vendor: 'Microsoft',
      technical_health: 9
    },
    {
      id: 'tech-007',
      entityType: 'Equipment',
      name: 'Datacenter Uppsala',
      description: 'Primärt datacenter',
      location: 'Uppsala'
    },
    {
      id: 'tech-008',
      entityType: 'Equipment',
      name: 'Backup Datacenter Stockholm',
      description: 'Sekundärt datacenter för backup och DR',
      location: 'Stockholm'
    },
    {
      id: 'tech-009',
      entityType: 'SystemSoftware',
      name: 'F5 Load Balancer',
      description: 'Lastbalanserare för webbapplikationer',
      vendor: 'F5 Networks',
      version: '16.0',
      eol_date: '2026-12-31',
      technical_health: 5
    },
    {
      id: 'tech-010',
      entityType: 'SystemSoftware',
      name: 'Fortinet Firewall',
      description: 'Brandvägg och säkerhetslösning',
      vendor: 'Fortinet',
      version: 'FortiOS 7.0',
      technical_health: 8
    },

    // ========================================================================
    // DATA OBJECTS
    // ========================================================================
    {
      id: 'data-001',
      entityType: 'DataObject',
      name: 'Livsmedelsföretagsregister',
      description: 'Register över alla registrerade och godkända livsmedelsföretag i Sverige'
    },
    {
      id: 'data-002',
      entityType: 'DataObject',
      name: 'Kontrolldata',
      description: 'Data från genomförda kontroller och inspektioner'
    },
    {
      id: 'data-003',
      entityType: 'DataObject',
      name: 'Analysresultat',
      description: 'Resultat från laboratorieanalyser'
    },
    {
      id: 'data-004',
      entityType: 'DataObject',
      name: 'Riskbedömningar',
      description: 'Vetenskapliga riskbedömningar och utvärderingar'
    },
    {
      id: 'data-005',
      entityType: 'DataObject',
      name: 'Tillståndsärenden',
      description: 'Ansökningar och beslut om tillstånd'
    },
    {
      id: 'data-006',
      entityType: 'DataObject',
      name: 'Näringsdata',
      description: 'Data om näringsvärden och livsmedelskonsumtion'
    },
    {
      id: 'data-007',
      entityType: 'DataObject',
      name: 'RASFF-notifieringar',
      description: 'Varningar och information från EU:s snabbvarningssystem'
    },
    {
      id: 'data-008',
      entityType: 'DataObject',
      name: 'Zoonos- och residudata',
      description: 'Data från övervakning av zoonoser och restämnen'
    },

    // ========================================================================
    // PROJECTS & INITIATIVES
    // ========================================================================
    {
      id: 'proj-001',
      entityType: 'WorkPackage',
      name: 'Digital Kontrollplattform 2.0',
      description: 'Modernisering av KLASSA till molnbaserad plattform',
      status: 'in-progress',
      start_date: '2026-01-15',
      end_date: '2027-12-31',
      budget: 15000000
    },
    {
      id: 'proj-002',
      entityType: 'WorkPackage',
      name: 'Utbyte av ERP-system',
      description: 'Ersätta Agresso med nytt modernt ERP-system',
      status: 'planning',
      start_date: '2026-06-01',
      end_date: '2027-12-31',
      budget: 12000000
    },
    {
      id: 'proj-003',
      entityType: 'WorkPackage',
      name: 'AI för Riskprediktion',
      description: 'Implementera AI/ML för att förutsäga risker i livsmedelskedjan',
      status: 'planning',
      start_date: '2026-09-01',
      end_date: '2028-03-31',
      budget: 8000000
    },
    {
      id: 'proj-004',
      entityType: 'WorkPackage',
      name: 'Självservice för Företag',
      description: 'Webbportal där företag kan registrera sig och rapportera egenkontrollen',
      status: 'in-progress',
      start_date: '2025-10-01',
      end_date: '2026-12-31',
      budget: 6000000
    },
    {
      id: 'proj-005',
      entityType: 'WorkPackage',
      name: 'Cloudmigrering',
      description: 'Flytta on-prem system till Azure',
      status: 'in-progress',
      start_date: '2026-03-01',
      end_date: '2028-06-30',
      budget: 20000000
    }
  ],

  // ========================================================================
  // RELATIONSHIPS
  // ========================================================================
  relationships: [
    // Goals realizes drivers
    { source: 'goal-001', target: 'driver-001', type: 'realization' },
    { source: 'goal-002', target: 'driver-002', type: 'realization' },
    { source: 'goal-003', target: 'driver-003', type: 'realization' },

    // Principles support goals
    { source: 'principle-001', target: 'goal-003', type: 'influence' },
    { source: 'principle-002', target: 'goal-001', type: 'influence' },
    { source: 'principle-003', target: 'goal-001', type: 'influence' },

    // Capabilities realize goals
    { source: 'cap-l1-001', target: 'goal-001', type: 'realization' },
    { source: 'cap-l1-002', target: 'goal-003', type: 'realization' },
    { source: 'cap-l1-003', target: 'goal-003', type: 'realization' },
    { source: 'cap-l1-004', target: 'goal-002', type: 'realization' },
    { source: 'cap-l1-006', target: 'goal-004', type: 'realization' },

    // Processes realize capabilities
    { source: 'proc-l1-001', target: 'cap-l1-002', type: 'realization' },
    { source: 'proc-l1-002', target: 'cap-l1-003', type: 'realization' },
    { source: 'proc-l1-003', target: 'cap-l1-001', type: 'realization' },
    { source: 'proc-l1-004', target: 'cap-l1-006', type: 'realization' },

    // Business actors assigned to processes
    { source: 'org-003', target: 'proc-l1-001', type: 'assignment' },
    { source: 'org-002', target: 'proc-l1-003', type: 'assignment' },
    { source: 'role-001', target: 'proc-l2-002', type: 'assignment' },
    { source: 'role-002', target: 'proc-l1-003', type: 'assignment' },
    { source: 'role-003', target: 'proc-l1-002', type: 'assignment' },

    // Applications support processes
    { source: 'app-001', target: 'proc-l1-001', type: 'serving' },
    { source: 'app-002', target: 'proc-l1-001', type: 'serving' },
    { source: 'app-003', target: 'proc-l1-002', type: 'serving' },
    { source: 'app-004', target: 'proc-l2-012', type: 'serving' },
    { source: 'app-005', target: 'proc-l1-004', type: 'serving' },
    { source: 'app-006', target: 'cap-l1-004', type: 'serving' },
    { source: 'app-007', target: 'proc-l2-001', type: 'serving' },
    { source: 'app-008', target: 'proc-l2-005', type: 'serving' },
    { source: 'app-009', target: 'proc-l1-003', type: 'serving' },
    { source: 'app-015', target: 'proc-l1-002', type: 'serving' },

    // Applications used by actors
    { source: 'role-001', target: 'app-001', type: 'assignment' },
    { source: 'role-002', target: 'app-009', type: 'assignment' },
    { source: 'role-003', target: 'app-003', type: 'assignment' },

    // Applications access data
    { source: 'app-001', target: 'data-002', type: 'access' },
    { source: 'app-002', target: 'data-001', type: 'access' },
    { source: 'app-003', target: 'data-005', type: 'access' },
    { source: 'app-004', target: 'data-003', type: 'access' },
    { source: 'app-005', target: 'data-007', type: 'access' },
    { source: 'app-009', target: 'data-004', type: 'access' },

    // Technology supports applications
    { source: 'tech-002', target: 'app-001', type: 'realization' },
    { source: 'tech-002', target: 'app-002', type: 'realization' },
    { source: 'tech-003', target: 'app-003', type: 'realization' },
    { source: 'tech-002', target: 'app-004', type: 'realization' },
    { source: 'tech-006', target: 'app-006', type: 'realization' },
    { source: 'tech-006', target: 'app-013', type: 'realization' },
    { source: 'tech-005', target: 'tech-001', type: 'realization' },
    { source: 'tech-007', target: 'tech-005', type: 'assignment' },

    // Projects realize applications/capabilities
    { source: 'proj-001', target: 'app-001', type: 'realization' },
    { source: 'proj-002', target: 'app-011', type: 'realization' },
    { source: 'proj-003', target: 'cap-l1-001', type: 'realization' },
    { source: 'proj-004', target: 'cap-l1-003', type: 'realization' },
    { source: 'proj-005', target: 'tech-006', type: 'realization' },

    // Data flows between applications
    { source: 'app-001', target: 'app-005', type: 'flow' },
    { source: 'app-001', target: 'app-008', type: 'flow' },
    { source: 'app-004', target: 'app-001', type: 'flow' },
    { source: 'app-002', target: 'app-001', type: 'flow' },
    { source: 'app-003', target: 'app-002', type: 'flow' }
  ],

  resourceAllocations: [
    { projectId: 'proj-001', resourceId: 'org-007', allocation: 80, role: 'Projektledare' },
    { projectId: 'proj-001', resourceId: 'org-003', allocation: 40, role: 'Verksamhetsexpert' },
    { projectId: 'proj-002', resourceId: 'org-007', allocation: 60, role: 'Teknisk ledning' },
    { projectId: 'proj-003', resourceId: 'org-002', allocation: 50, role: 'Forskningsledning' },
    { projectId: 'proj-004', resourceId: 'org-006', allocation: 30, role: 'Kommunikation' },
    { projectId: 'proj-005', resourceId: 'org-007', allocation: 90, role: 'Infrastrukturarkitekt' }
  ]
};

export default sampleData;
