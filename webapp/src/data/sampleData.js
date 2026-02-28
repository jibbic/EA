// Livsmedelsverket Enterprise Architecture - Komplett Exempeldata
// Version 2.0 - ~70 applikationer med 3-nivåers process- och capability-modell
// ArchiMate 3.1 compliant

const sampleData = {
  entities: [
    // ========================================================================
    // STRATEGY LAYER
    // ========================================================================
    
    // Goals
    { id: 'goal-001', entityType: 'Goal', name: 'Säker mat och bra dricksvatten', description: 'Säkerställa säker mat och dricksvatten för Sveriges befolkning' },
    { id: 'goal-002', entityType: 'Goal', name: 'Hållbar livsmedelskonsumtion', description: 'Främja hållbara matvanor' },
    { id: 'goal-003', entityType: 'Goal', name: 'Effektiv myndighetskontroll', description: 'Riskbaserad och effektiv kontroll' },
    { id: 'goal-004', entityType: 'Goal', name: 'Stark krisberedskap', description: 'Hantera livsmedelskriser effektivt' },
    { id: 'goal-005', entityType: 'Goal', name: 'Djurskydd och djurhälsa', description: 'Säkerställa gott djurskydd' },
    { id: 'goal-006', entityType: 'Goal', name: 'Vetenskapligt baserad verksamhet', description: 'Bygga på vetenskap och forskning' },
    
    // Drivers
    { id: 'driver-001', entityType: 'Driver', name: 'EU-lagstiftning', description: 'Krav från EU-förordningar' },
    { id: 'driver-002', entityType: 'Driver', name: 'Folkhälsokrav', description: 'Krav på livsmedelssäkerhet' },
    { id: 'driver-003', entityType: 'Driver', name: 'Digitalisering', description: 'Krav på digitala tjänster' },
    { id: 'driver-004', entityType: 'Driver', name: 'Klimat och miljö', description: 'Minskad miljöpåverkan' },
    { id: 'driver-005', entityType: 'Driver', name: 'NIS2-direktivet', description: 'Cybersäkerhetskrav' },
    
    // Principles
    { id: 'principle-001', entityType: 'Principle', name: 'Risk based approach', description: 'Fokusera på högst risk' },
    { id: 'principle-002', entityType: 'Principle', name: 'Öppenhet och transparens', description: 'Tillgänglig information' },
    { id: 'principle-003', entityType: 'Principle', name: 'Vetenskaplig grund', description: 'Evidensbaserade beslut' },
    { id: 'principle-004', entityType: 'Principle', name: 'Digital först', description: 'Digitala tjänster som standard' },
    { id: 'principle-005', entityType: 'Principle', name: 'Säkerhet och integritet', description: 'Skydda data enligt NIS2' },

    // ========================================================================
    // CAPABILITIES - Level 0 (Domäner)
    // ========================================================================
    { id: 'cap-l0-001', entityType: 'Capability', name: 'Livsmedelssäkerhet', description: 'Säker mat från jord till bord', level: 0 },
    { id: 'cap-l0-002', entityType: 'Capability', name: 'Dricksvattensäkerhet', description: 'Säkert dricksvatten', level: 0 },
    { id: 'cap-l0-003', entityType: 'Capability', name: 'Djurskydd och Djurhälsa', description: 'Övervaka djurskydd', level: 0 },
    { id: 'cap-l0-004', entityType: 'Capability', name: 'Näring och Hälsa', description: 'Främja hälsosamma matvanor', level: 0 },
    { id: 'cap-l0-005', entityType: 'Capability', name: 'Krisberedskap', description: 'Hantera livsmedelskriser', level: 0 },
    { id: 'cap-l0-006', entityType: 'Capability', name: 'Vetenskap och Innovation', description: 'Forskning och utveckling', level: 0 },
    { id: 'cap-l0-007', entityType: 'Capability', name: 'Verksamhetsstöd', description: 'IT, Ekonomi, HR support', level: 0 },

    // ========================================================================
    // CAPABILITIES - Level 1 (Funktionella områden)
    // ========================================================================
    { id: 'cap-l1-001', entityType: 'Capability', name: 'Riskvärdering', description: 'Identifiera och värdera risker', level: 1, parentId: 'cap-l0-001' },
    { id: 'cap-l1-002', entityType: 'Capability', name: 'Kontroll och Tillsyn', description: 'Kontrollera livsmedelsföretag', level: 1, parentId: 'cap-l0-001' },
    { id: 'cap-l1-003', entityType: 'Capability', name: 'Tillståndsgivning', description: 'Hantera tillstånd', level: 1, parentId: 'cap-l0-001' },
    { id: 'cap-l1-004', entityType: 'Capability', name: 'Provtagning och Analys', description: 'Laboratorieverksamhet', level: 1, parentId: 'cap-l0-001' },
    { id: 'cap-l1-005', entityType: 'Capability', name: 'Import/Export-kontroll', description: 'Gränskontroll', level: 1, parentId: 'cap-l0-001' },
    { id: 'cap-l1-006', entityType: 'Capability', name: 'Utbrottshantering', description: 'Hantera matförgiftningsutbrott', level: 1, parentId: 'cap-l0-005' },
    { id: 'cap-l1-007', entityType: 'Capability', name: 'Zoonosövervakning', description: 'Övervaka djursjukdomar', level: 1, parentId: 'cap-l0-003' },
    { id: 'cap-l1-008', entityType: 'Capability', name: 'Dricksvattenkontroll', description: 'Kontrollera dricksvatten', level: 1, parentId: 'cap-l0-002' },
    { id: 'cap-l1-009', entityType: 'Capability', name: 'Konsumentinformation', description: 'Informera om matsäkerhet', level: 1, parentId: 'cap-l0-004' },
    { id: 'cap-l1-010', entityType: 'Capability', name: 'Regelutveckling', description: 'Utveckla föreskrifter', level: 1, parentId: 'cap-l0-001' },
    { id: 'cap-l1-011', entityType: 'Capability', name: 'Matvaneforskning', description: 'Forska om matvanor', level: 1, parentId: 'cap-l0-006' },
    { id: 'cap-l1-012', entityType: 'Capability', name: 'IT-drift och Support', description: 'Driva IT-system', level: 1, parentId: 'cap-l0-007' },
    { id: 'cap-l1-013', entityType: 'Capability', name: 'Ekonomiadministration', description: 'Hantera ekonomi', level: 1, parentId: 'cap-l0-007' },
    { id: 'cap-l1-014', entityType: 'Capability', name: 'HR och Kompetens', description: 'Personaladministration', level: 1, parentId: 'cap-l0-007' },
    { id: 'cap-l1-015', entityType: 'Capability', name: 'Kemisk analys', description: 'Kemiska laboratorieanalyser', level: 1, parentId: 'cap-l0-006' },
    { id: 'cap-l1-016', entityType: 'Capability', name: 'Mikrobiologisk analys', description: 'Mikrobiologiska laboratorieanalyser', level: 1, parentId: 'cap-l0-006' },
    
    // ========================================================================
    // CAPABILITIES - Level 2 (Specifika förmågor)
    // ========================================================================
    { id: 'cap-l2-001', entityType: 'Capability', name: 'Riskklassning av företag', description: 'Klassificera företag efter risk', level: 2, parentId: 'cap-l1-001' },
    { id: 'cap-l2-002', entityType: 'Capability', name: 'Planering av oannonserade kontroller', description: 'Planera kontroller', level: 2, parentId: 'cap-l1-002' },
    { id: 'cap-l2-003', entityType: 'Capability', name: 'Dokumentation av kontroll', description: 'Dokumentera kontrollresultat', level: 2, parentId: 'cap-l1-002' },
    { id: 'cap-l2-004', entityType: 'Capability', name: 'Provtagning vid kontroll', description: 'Ta prover vid kontroller', level: 2, parentId: 'cap-l1-004' },
    { id: 'cap-l2-005', entityType: 'Capability', name: 'RASFF-rapportering', description: 'Rapportera till EU:s varningssystem', level: 2, parentId: 'cap-l1-006' },
    { id: 'cap-l2-006', entityType: 'Capability', name: 'Spårbarhet i livsmedelskedjan', description: 'Spåra produkter', level: 2, parentId: 'cap-l1-006' },
    { id: 'cap-l2-007', entityType: 'Capability', name: 'Veterinärcertifiering', description: 'Certifiera export', level: 2, parentId: 'cap-l1-005' },
    { id: 'cap-l2-008', entityType: 'Capability', name: 'Importkontroll vid gräns', description: 'Kontrollera import', level: 2, parentId: 'cap-l1-005' },
    { id: 'cap-l2-009', entityType: 'Capability', name: 'Vattenprovtagning', description: 'Ta dricksvatt enprover', level: 2, parentId: 'cap-l1-008' },
    { id: 'cap-l2-010', entityType: 'Capability', name: 'Kostundersökningar', description: 'Undersöka matvanor', level: 2, parentId: 'cap-l1-011' },
    { id: 'cap-l2-011', entityType: 'Capability', name: 'Näringsdeklarationer', description: 'Granska näringsinnehåll', level: 2, parentId: 'cap-l1-009' },
    { id: 'cap-l2-012', entityType: 'Capability', name: 'Salmonellaövervakning', description: 'Övervaka salmonella', level: 2, parentId: 'cap-l1-007' },

    // ========================================================================
    // BUSINESS PROCESSES - Level  1 (Huvudprocesser)
    // ========================================================================
    { id: 'proc-l1-001', entityType: 'BusinessProcess', name: 'Livsmedelskontroll', description: 'Huvudprocess för kontroll av livsmedelsföretag', level: 1 },
    { id: 'proc-l1-002', entityType: 'BusinessProcess', name: 'Tillståndshantering', description: 'Hantera tillstånd och godkännanden', level: 1 },
    { id: 'proc-l1-003', entityType: 'BusinessProcess', name: 'Riskbedömning', description: 'Bedöma risker i livsmedelskedjan', level: 1 },
    { id: 'proc-l1-004', entityType: 'BusinessProcess', name: 'Utbrottsutredning', description: 'Utreda och hantera matförgiftningsutbrott', level: 1 },
    { id: 'proc-l1-005', entityType: 'BusinessProcess', name: 'Laboratorieanalys', description: 'Analysera prover', level: 1 },
    { id: 'proc-l1-006', entityType: 'BusinessProcess', name: 'Import/Export-handläggning', description: 'Hantera import och export', level: 1 },
    { id: 'proc-l1-007', entityType: 'BusinessProcess', name: 'Dricksvattentillsyn', description: 'Övervaka dricksvattenproduktion', level: 1 },
    { id: 'proc-l1-008', entityType: 'BusinessProcess', name: 'Konsumentvägledning', description: 'Vägleda konsumenter', level: 1 },
    { id: 'proc-l1-009', entityType: 'BusinessProcess', name: 'Regelgivning', description: 'Ta fram föreskrifter', level: 1 },
    { id: 'proc-l1-010', entityType: 'BusinessProcess', name: 'Forskning och Utvärdering', description: 'Bedriva forskning', level: 1 },
    
    // ========================================================================
    // BUSINESS PROCESSES - Level 2 (Delprocesser)
    // ========================================================================
    { id: 'proc-l2-001', entityType: 'BusinessProcess', name: 'Planera kontroll', description: 'Planera årlig kontroll', level: 2, parentId: 'proc-l1-001' },
    { id: 'proc-l2-002', entityType: 'BusinessProcess', name: 'Genomföra platsbesök', description: 'Besöka livsmedelsföretag', level: 2, parentId: 'proc-l1-001' },
    { id: 'proc-l2-003', entityType: 'BusinessProcess', name: 'Dokumentera avvikelse', description: 'Dokumentera brister', level: 2, parentId: 'proc-l1-001' },
    { id: 'proc-l2-004', entityType: 'BusinessProcess', name: 'Fatta åtgärdsbeslut', description: 'Besluta om sanktioner', level: 2, parentId: 'proc-l1-001' },
    { id: 'proc-l2-005', entityType: 'BusinessProcess', name: 'Mottaga ansökan', description: 'Registrera tillståndsansökan', level: 2, parentId: 'proc-l1-002' },
    { id: 'proc-l2-006', entityType: 'BusinessProcess', name: 'Granska ansökan', description: 'Bedöma ansökan', level: 2, parentId: 'proc-l1-002' },
    { id: 'proc-l2-007', entityType: 'BusinessProcess', name: 'Fatta tillståndsbeslut', description: 'Besluta om tillstånd', level: 2, parentId: 'proc-l1-002' },
    { id: 'proc-l2-008', entityType: 'BusinessProcess', name: 'Identifiera fara', description: 'Identifiera potentiella faror', level: 2, parentId: 'proc-l1-003' },
    { id: 'proc-l2-009', entityType: 'BusinessProcess', name: 'Värdera risk', description: 'Kvantifiera risk', level: 2, parentId: 'proc-l1-003' },
    { id: 'proc-l2-010', entityType: 'BusinessProcess', name: 'Motta utbrottslarm', description: 'Ta emot larm om matförgiftning', level: 2, parentId: 'proc-l1-004' },
    { id: 'proc-l2-011', entityType: 'BusinessProcess', name: 'Epidemiologisk utredning', description: 'Utreda orsak', level: 2, parentId: 'proc-l1-004' },
    { id: 'proc-l2-012', entityType: 'BusinessProcess', name: 'Rapportera till RASFF', description: 'Rapportera till EU', level: 2, parentId: 'proc-l1-004' },
    { id: 'proc-l2-013', entityType: 'BusinessProcess', name: 'Ta prov', description: 'Provtagning i fält', level: 2, parentId: 'proc-l1-005' },
    { id: 'proc-l2-014', entityType: 'BusinessProcess', name: 'Analysera prov', description: 'Laboratorieanalys', level: 2, parentId: 'proc-l1-005' },
    { id: 'proc-l2-015', entityType: 'BusinessProcess', name: 'Rapportera resultat', description: 'Rapportera analysresultat', level: 2, parentId: 'proc-l1-005' },
    { id: 'proc-l2-016', entityType: 'BusinessProcess', name: 'Gränskontroll', description: 'Kontrollera vid gräns', level: 2, parentId: 'proc-l1-006' },
    { id: 'proc-l2-017', entityType: 'BusinessProcess', name: 'Utfärda exportcertifikat', description: 'Certifiera export', level: 2, parentId: 'proc-l1-006' },
    { id: 'proc-l2-018', entityType: 'BusinessProcess', name: 'Inspektera vattenverk', description: 'Kontrollera dricksvatten', level: 2, parentId: 'proc-l1-007' },
    { id: 'proc-l2-019', entityType: 'BusinessProcess', name: 'Publicera kostråd', description: 'Ge kostråd', level: 2, parentId: 'proc-l1-008' },
    { id: 'proc-l2-020', entityType: 'BusinessProcess', name: 'Besvara konsumentfrågor', description: 'Svara på frågor', level: 2, parentId: 'proc-l1-008' },
    
    // ========================================================================
    // BUSINESS PROCESSES - Level 3 (Aktiviteter)
    // ========================================================================
    { id: 'proc-l3-001', entityType: 'BusinessProcess', name: 'Hämta företagsdata', description: 'Hämta info från register', level: 3, parentId: 'proc-l2-001' },
    { id: 'proc-l3-002', entityType: 'BusinessProcess', name: 'Riskklassa företag', description: 'Klassificera enligt riskklass', level: 3, parentId: 'proc-l2-001' },
    { id: 'proc-l3-003', entityType: 'BusinessProcess', name: 'Boka kontrolltillfälle', description: 'Schemalägga besök', level: 3, parentId: 'proc-l2-002' },
    { id: 'proc-l3-004', entityType: 'BusinessProcess', name: 'Genomföra intervju', description: 'Intervjua företagare', level: 3, parentId: 'proc-l2-002' },
    { id: 'proc-l3-005', entityType: 'BusinessProcess', name: 'Inspektera lokaler', description: 'Granska lokaler', level: 3, parentId: 'proc-l2-002' },
    { id: 'proc-l3-006', entityType: 'BusinessProcess', name: 'Ta livsmedelprov', description: 'Provta produkter', level: 3, parentId: 'proc-l2-002' },
    { id: 'proc-l3-007', entityType: 'BusinessProcess', name: 'Registrera avvikelse i system', description: 'Dokumentera i IT-system', level: 3, parentId: 'proc-l2-003' },
    { id: 'proc-l3-008', entityType: 'BusinessProcess', name: 'Fotografera avvikelse', description: 'Ta foto', level: 3, parentId: 'proc-l2-003' },
    { id: 'proc-l3-009', entityType: 'BusinessProcess', name: 'Skicka provförpackning', description: 'Skicka prov till lab', level: 3, parentId: 'proc-l2-013' },
    { id: 'proc-l3-010', entityType: 'BusinessProcess', name: 'Mikrobiologisk analys', description: 'Analysera mikrober', level: 3, parentId: 'proc-l2-014' },
    { id: 'proc-l3-011', entityType: 'BusinessProcess', name: 'Kemisk analys', description: 'Analysera kemikalier', level: 3, parentId: 'proc-l2-014' },
    { id: 'proc-l3-012', entityType: 'BusinessProcess', name: 'Godkänna analysresultat', description: 'Kvalitetssäkra resultat', level: 3, parentId: 'proc-l2-015' },

    // ========================================================================
    // APPLICATION LAYER - ~70 Applikationer
    // ========================================================================
    
    // === KONTROLL & TILLSYN (15 appar) ===
    { id: 'app-001', entityType: 'ApplicationComponent', name: 'eKontroll', description: 'Huvudsystem för livsmedelskontroll', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-002', entityType: 'ApplicationComponent', name: 'Företagsregistret', description: 'Register över livsmedelsföretag', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-003', entityType: 'ApplicationComponent', name: 'Avvikelsehantering', description: 'Hantera kontroll avvikelser', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-004', entityType: 'ApplicationComponent', name: 'Riskklassificering', description: 'Klassificera företag efter risk', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-005', entityType: 'ApplicationComponent', name: 'Mobil Kontroll-app', description: 'Mobilapp för inspektörer', criticality: 'medium', lifecycle: 'operational', vendor: 'Appva' },
    { id: 'app-006', entityType: 'ApplicationComponent', name: 'Kontrollplan', description: 'Planering av årlig kontroll', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-007', entityType: 'ApplicationComponent', name: 'Dokumenthantering Kontroll', description: 'Dokumentarkiv för kontroller', criticality: 'medium', lifecycle: 'operational', vendor: 'Microsoft' },
    { id: 'app-008', entityType: 'ApplicationComponent', name: 'Sanktionsregister', description: 'Register över sanktioner', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-009', entityType: 'ApplicationComponent', name: 'Djurskyddskontroll', description: 'System för djurskyddskontroller', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-010', entityType: 'ApplicationComponent', name: 'GIS Kartverktyg', description: 'Geografisk visualisering', criticality: 'low', lifecycle: 'operational', vendor: 'ESRI' },
    { id: 'app-011', entityType: 'ApplicationComponent', name: 'Mötesbokning Företag', description: 'Företag bokar kontrolltid', criticality: 'low', lifecycle: 'development', vendor: 'Verksintern' },
    { id: 'app-012', entityType: 'ApplicationComponent', name: 'Webbaserad Egenkontroll', description: 'Portal för företag', criticality: 'medium', lifecycle: 'operational', vendor: 'Sunet' },
    { id: 'app-013', entityType: 'ApplicationComponent', name: 'Analysresultat-portal', description: 'Visa analysresultat för företag', criticality: 'low', lifecycle: 'operational', vendor: 'Sunet' },
    { id: 'app-014', entityType: 'ApplicationComponent', name: 'Statistik och Rapportering', description: 'BI-verktyg för kontrolldata', criticality: 'medium', lifecycle: 'operational', vendor: 'Microsoft' },
    { id: 'app-015', entityType: 'ApplicationComponent', name: 'Klagomålshantering', description: 'Hantera klagomål från konsumenter', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },

    // === KRISBEREDSKAP & UTBROTT (8 appar) ===
    { id: 'app-016', entityType: 'ApplicationComponent', name: 'RASFF Sverige', description: 'EU:s snabbvarslingssystem', criticality: 'critical', lifecycle: 'operational', vendor: 'EU Commission' },
    { id: 'app-017', entityType: 'ApplicationComponent', name: 'Utbrottshantering', description: 'System för utbrottsutredningar', criticality: 'critical', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-018', entityType: 'ApplicationComponent', name: 'Epidemiologisk Databas', description: 'Spåra smittspridning', criticality: 'high', lifecycle: 'operational', vendor: 'Folkhälsomyndigheten' },
    { id: 'app-019', entityType: 'ApplicationComponent', name: 'Kriskoordination', description: 'Samordna krishantering', criticality: 'critical', lifecycle: 'operational', vendor: 'MSB' },
    { id: 'app-020', entityType: 'ApplicationComponent', name: 'Återkallelsesystem', description: 'Hantera produktåterkallelser', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-021', entityType: 'ApplicationComponent', name: 'Larmcentral', description: 'Ta emot akuta larm', criticality: 'critical', lifecycle: 'operational', vendor: 'Integrationscentrum' },
    { id: 'app-022', entityType: 'ApplicationComponent', name: 'Spårbarhetsdatabas', description: 'Spåra livsmedelsprodukter', criticality: 'high', lifecycle: 'operational', vendor: 'GS1' },
    { id: 'app-023', entityType: 'ApplicationComponent', name: 'Varningspublicering', description: 'Publicera offentliga varningar', criticality: 'high', lifecycle: 'operational',vendor: 'Sunet' },

    // === LABORATORIEVERKSAMHET (10 appar) ===
    { id: 'app-024', entityType: 'ApplicationComponent', name: 'LIMS', description: 'Laboratory Information Management System', criticality: 'high', lifecycle: 'operational', vendor: 'Thermo Fisher' },
    { id: 'app-025', entityType: 'ApplicationComponent', name: 'Provhantering', description: 'Hantera inkommande prover', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-026', entityType: 'ApplicationComponent', name: 'Mikrobiologi-databas', description: 'Mikrobiologiska analysresultat', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-027', entityType: 'ApplicationComponent', name: 'Kemisk Analys', description: 'System för kemiska analyser', criticality: 'high', lifecycle: 'operational', vendor: 'Waters' },
    { id: 'app-028', entityType: 'ApplicationComponent', name: 'DNA-sekvensering', description: 'Genanalys av mikroorganismer', criticality: 'medium', lifecycle: 'operational', vendor: 'Illumina' },
    { id: 'app-029', entityType: 'ApplicationComponent', name: 'Labinstrument Integration', description: 'Integration med  labutrustning', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-030', entityType: 'ApplicationComponent', name: 'Provspårning', description: 'Spåra prover i labbet', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-031', entityType: 'ApplicationComponent', name: 'Kvalitetssäkring Lab', description: 'QA/QC-system för labbet', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-032', entityType: 'ApplicationComponent', name: 'Metoddatabas', description: 'Analysmetoder och procedurer', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-033', entityType: 'ApplicationComponent', name: 'Resultatvalidering', description: 'Validera och godkänna resultat', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },

    // === TILLSTÅND & REGISTRERING (5 appar) ===
    { id: 'app-034', entityType: 'ApplicationComponent', name: 'Tillståndssystemet', description: 'E-tjänst för tillståndsansökningar', criticality: 'high', lifecycle: 'operational', vendor: 'Sunet' },
    { id: 'app-035', entityType: 'ApplicationComponent', name: 'Ärendehantering', description: 'Handlägga tillståndsärenden', criticality: 'high', lifecycle: 'operational', vendor: 'CGI' },
    { id: 'app-036', entityType: 'ApplicationComponent', name: 'Anläggningsregister', description: 'Register över godkända anläggningar', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-037', entityType: 'ApplicationComponent', name: 'Beslutsstöd Tillstånd', description: 'Stöd för tillståndsbeslut', criticality: 'medium', lifecycle: 'development', vendor: 'Verksintern' },
    { id: 'app-038', entityType: 'ApplicationComponent', name: 'Dokumentmall-system', description: 'Mallar för beslut', criticality: 'low', lifecycle: 'operational', vendor: 'Microsoft' },

    // === IMPORT/EXPORT (6 appar) ===
    { id: 'app-039', entityType: 'ApplicationComponent', name: 'TRACES', description: 'EU:s system för import/export', criticality: 'critical', lifecycle: 'operational', vendor: 'EU Commission' },
    { id: 'app-040', entityType: 'ApplicationComponent', name: 'Gränskontroll', description: 'Hantera gränskontroller', criticality: 'high', lifecycle: 'operational', vendor: 'Tullverket' },
    { id: 'app-041', entityType: 'ApplicationComponent', name: 'Exportcertifikat', description: 'Utfärda exportcertifikat', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-042', entityType: 'ApplicationComponent', name: 'Importtillstånd', description: 'Hantera importtillstånd', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-043', entityType: 'ApplicationComponent', name: 'Veterinärcertifikat', description: 'Certifikat för djurprodukter', criticality: 'high', lifecycle: 'operational', vendor: 'Jordbruksverket' },
    { id: 'app-044', entityType: 'ApplicationComponent', name: 'Import/Export-statistik', description: 'Statistik över handel', criticality: 'low', lifecycle: 'operational', vendor: 'SCB' },

    // === DRICKSVATTEN (4 appar) ===
    { id: 'app-045', entityType: 'ApplicationComponent', name: 'Dricksvattendatabas', description: 'Register över vattenverk', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-046', entityType: 'ApplicationComponent', name: 'Vattenprovtagning', description: 'Hantera vattenprovtagning', criticality: 'high', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-047', entityType: 'ApplicationComponent', name: 'Vattenkvalitetsrapportering', description: 'Rapportera vattenkvalitet', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-048', entityType: 'ApplicationComponent', name: 'Vattenverk-GIS', description: 'Kartlägg vattenverk', criticality: 'low', lifecycle: 'operational', vendor: 'ESRI' },

    // === KOMMUNIKATION & INFORMATION (7 appar) ===
    { id: 'app-049', entityType: 'ApplicationComponent', name: 'Livsmedelsverket.se', description: 'Huvudwebbplats', criticality: 'high', lifecycle: 'operational', vendor: 'Episerver' },
    { id: 'app-050', entityType: 'ApplicationComponent', name: 'Hitta Rätt App', description: 'Konsumentapp för märkning', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-051', entityType: 'ApplicationComponent', name: 'Nyhetsbrev-system', description: 'Skicka nyhetsbrev', criticality: 'low', lifecycle: 'operational', vendor: 'MailChimp' },
    { id: 'app-052', entityType: 'ApplicationComponent', name: 'CMS Webbpublicering', description: 'Content Management System', criticality: 'high', lifecycle: 'operational', vendor: 'Episerver' },
    { id: 'app-053', entityType: 'ApplicationComponent', name: 'Pressmeddelanden', description: 'Publicera pressmeddelanden', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-054', entityType: 'ApplicationComponent', name: 'Sociala Medier-verktyg', description: 'Hantera sociala medier', criticality: 'low', lifecycle: 'operational', vendor: 'Hootsuite' },
    { id: 'app-055', entityType: 'ApplicationComponent', name: 'Kostdatabasen WebAPI', description: 'API för näringsdata', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },

    // === FORSKNING & VETENSKAP (5 appar) ===
    { id: 'app-056', entityType: 'ApplicationComponent', name: 'Riksmaten', description: 'Nationell kostundersökning', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-057', entityType: 'ApplicationComponent', name: 'Livsmedelsdata', description: 'Databas över livsmedel', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-058', entityType: 'ApplicationComponent', name: 'Forskningsdatabas', description: 'Forskningsprojekt och publikationer', criticality: 'low', lifecycle: 'operational', vendor: 'Alfresco' },
    { id: 'app-059', entityType: 'ApplicationComponent', name: 'Biobank-system', description: 'Hantera biologiska prover', criticality: 'medium', lifecycle: 'operational', vendor: 'Verksintern' },
    { id: 'app-060', entityType: 'ApplicationComponent', name: 'Statistikportal', description: 'Publicera statistik', criticality: 'low', lifecycle: 'operational', vendor: 'Tableau' },

    // === ADMINISTRATION & VERKSAMHETSSTÖD (10 appar) ===
    { id: 'app-061', entityType: 'ApplicationComponent', name: 'Agresso Ekonomi', description: 'Ekonomisystem', criticality: 'critical', lifecycle: 'operational', vendor: 'Unit4' },
    { id: 'app-062', entityType: 'ApplicationComponent', name: 'HR-system Primula', description: 'Personal- och lönesystem', criticality: 'critical', lifecycle: 'operational', vendor: 'PIR' },
    { id: 'app-063', entityType: 'ApplicationComponent', name: 'Office 365', description: 'Kontorspaket', criticality: 'high', lifecycle: 'operational', vendor: 'Microsoft' },
    { id: 'app-064', entityType: 'ApplicationComponent', name: 'SharePoint', description: 'Intranät och samarbete', criticality: 'high', lifecycle: 'operational', vendor: 'Microsoft' },
    { id: 'app-065', entityType: 'ApplicationComponent', name: 'Exchange Email', description: 'E-postsystem', criticality: 'critical', lifecycle: 'operational', vendor: 'Microsoft' },
    { id: 'app-066', entityType: 'ApplicationComponent', name: 'Teams', description: 'Samarbetsplattform', criticality: 'high', lifecycle: 'operational', vendor: 'Microsoft' },
    { id: 'app-067', entityType: 'ApplicationComponent', name: 'TimeLog', description: 'Tidsrapportering', criticality: 'medium', lifecycle: 'operational', vendor: 'TimeLog' },
    { id: 'app-068', entityType: 'ApplicationComponent', name: 'Rekryteringssystem', description: 'Hantera rekrytering', criticality: 'medium', lifecycle: 'operational', vendor: 'Visma' },
    { id: 'app-069', entityType: 'ApplicationComponent', name: 'Utbildningsplattform', description: 'Intern utbildning', criticality: 'low', lifecycle: 'operational', vendor: 'Cornerstone' },
    { id: 'app-070', entityType: 'ApplicationComponent', name: 'IT-Servicedesk', description: 'IT-support och incidenthantering', criticality: 'high', lifecycle: 'operational', vendor: 'ServiceNow' },
    
    // === INTEGRATION & INFRASTRUKTUR ===
    { id: 'app-071', entityType: 'ApplicationComponent', name: 'Enterprise Service Bus', description: 'Integrationslager', criticality: 'critical', lifecycle: 'operational', vendor: 'MuleSoft' },
    { id: 'app-072', entityType: 'ApplicationComponent', name: 'API Gateway', description: 'API-hantering', criticality: 'high', lifecycle: 'operational', vendor: 'Azure' },

    // ========================================================================
    // DATA OBJECTS
    // ========================================================================
    { id: 'data-001', entityType: 'DataObject', name: 'Företagsregister', description: 'Register över alla livsmedelsföretag' },
    { id: 'data-002', entityType: 'DataObject', name: 'Kontrollprotokoll', description: 'Protokoll från kontroller' },
    { id: 'data-003', entityType: 'DataObject', name: 'Analysresultat', description: 'Laboratorieanalysresultat' },
    { id: 'data-004', entityType: 'DataObject', name: 'Tillståndsbeslut', description: 'Underlag för tillståndsbeslut' },
    { id: 'data-005', entityType: 'DataObject', name: 'Avvikelseregister', description: 'Dokumenterade avvikelser' },
    { id: 'data-006', entityType: 'DataObject', name: 'Provdatabas', description: 'Register över tagna prover' },
    { id: 'data-007', entityType: 'DataObject', name: 'Utbrottsdata', description: 'Epidemiologiska data från utbrott' },
    { id: 'data-008', entityType: 'DataObject', name: 'Import/Export-data', description: 'Data om gränsöverskridande handel' },
    { id: 'data-009', entityType: 'DataObject', name: 'Zoonosdata', description: 'Övervakning av djursjukdomar' },
    { id: 'data-010', entityType: 'DataObject', name: 'Dricksvattendata', description: 'Kvalitetsdata för dricksvatten' },
    { id: 'data-011', entityType: 'DataObject', name: 'Kostdata', description: 'Data from kostundersökningar' },
    { id: 'data-012', entityType: 'DataObject', name: 'Näringsdata', description: 'Näringsinnehåll i livsmedel' },

    // ========================================================================
    // TECHNOLOGY LAYER
    // ========================================================================
    { id: 'tech-001', entityType: 'Node', name: 'Azure Cloud Platform', description: 'Molnplattform', provider: 'Microsoft' },
    { id: 'tech-002', entityType: 'Node', name: 'On-Prem Datacenter Uppsala', description: 'Lokalt datacenter', location: 'Uppsala' },
    { id: 'tech-003', entityType: 'Node', name: 'SQL Server Databas-cluster', description: 'Databasserver', vendor: 'Microsoft' },
    { id: 'tech-004', entityType: 'Node', name: 'PostgreSQL Databas', description: 'Open source-databas' },
    { id: 'tech-005', entityType: 'Node', name: 'Azure App Services', description: 'PaaS för webbappar' },
    { id: 'tech-006', entityType: 'Node', name: 'Azure Kubernetes Service', description: 'Containerorkestrering' },
    { id: 'tech-007', entityType: 'SystemSoftware', name: 'Windows Server 2022', description: 'Serveroperativsystem' },
    { id: 'tech-008', entityType: 'SystemSoftware', name: 'Linux Ubuntu Server', description: 'Serveroperativsystem' },
    { id: 'tech-009', entityType: 'CommunicationNetwork', name: 'Sunet', description: 'Statligt nätverksinfrastuktur' },
    { id: 'tech-010', entityType: 'CommunicationNetwork', name: 'VPN-tunnel', description: 'Säker anslutning' },

    // ========================================================================
    // ORGANIZATION
    // ========================================================================
    { id: 'org-001', entityType: 'BusinessActor', name: 'Livsmedelsverket', description: 'Hela myndigheten' },
    { id: 'org-002', entityType: 'BusinessActor', name: 'Avdelning Risk- och nyttovärdering', description: 'Vetenskaplig avdelning' },
    { id: 'org-003', entityType: 'BusinessActor', name: 'Avdelning Livsmedels- och handelskontroll', description: 'Kontrollverksamhet' },
    { id: 'org-004', entityType: 'BusinessActor', name: 'Avdelning Krisberedskap', description: 'Krishantering' },
    { id: 'org-005', entityType: 'BusinessActor', name: 'Nationellt laboratorium', description: 'Laboratorieenhet' },
    { id: 'org-006', entityType: 'BusinessActor', name: 'Avdelning Kommunikation', description: 'Kommunikationsavdelning' },
    { id: 'org-007', entityType: 'BusinessActor', name: 'IT-avdelningen', description: 'IT-drift och utveckling' },
    { id: 'org-008', entityType: 'BusinessActor', name: 'HR-avdelningen', description: 'Personalavdelning' },
    { id: 'org-009', entityType: 'BusinessActor', name: 'Ekonomiavdelningen', description: 'Ekonomiadministration' },
    
    // ROLES
    { id: 'role-001', entityType: 'BusinessRole', name: 'Livsmedelsinspektör', description: 'Utför livsmedelskontroller' },
    { id: 'role-002', entityType: 'BusinessRole', name: 'Riskbedömare', description: 'Bedömer risker' },
    { id: 'role-003', entityType: 'BusinessRole', name: 'Laboratorieanalytiker', description: 'Utför laboratorieanalyser' },
    { id: 'role-004', entityType: 'BusinessRole', name: 'Utbrottsutredare', description: 'Utreder matförgiftningar' },
    { id: 'role-005', entityType: 'BusinessRole', name: 'Tillståndshandläggare', description: 'Handlägger tillstånd' },
    { id: 'role-006', entityType: 'BusinessRole', name: 'Import/Export-handläggare', description: 'Hanterar gränskontroll' },
    { id: 'role-007', entityType: 'BusinessRole', name: 'Kommunikatör', description: 'Ansvarar för extern kommunikation' },
    { id: 'role-008', entityType: 'BusinessRole', name: 'Forskare', description: 'Bedriver forskning' },
    { id: 'role-009', entityType: 'BusinessRole', name: 'IT-arkitekt', description: 'Designar IT-arkitektur' },
    { id: 'role-010', entityType: 'BusinessRole', name: 'Systemförvaltare', description: 'Förvaltar IT-system' },

    // ========================================================================
    // PROJECTS & WORK PACKAGES
    // ========================================================================
    { id: 'proj-001', entityType: 'WorkPackage', name: 'eKontroll 2.0', description: 'Uppdatera kontrollsystem', status: 'in-progress', start_date: '2025-01-01', end_date: '2026-12-31', budget: 15000000 },
    { id: 'proj-002', entityType: 'WorkPackage', name: 'Mobil-först', description: 'Mobilappar för inspektörer', status: 'planned', start_date: '2026-06-01', end_date: '2027-12-31', budget: 8000000 },
    { id: 'proj-003', entityType: 'WorkPackage', name: 'AI Risk-analys', description: 'AI för riskbedömning', status: 'planned', start_date: '2026-09-01', end_date: '2028-12-31', budget: 12000000 },
    { id: 'proj-004', entityType: 'WorkPackage', name: 'LIMS-uppgradering', description: 'Nytt laboratoriesystem', status: 'in-progress', start_date: '2025-06-01', end_date: '2026-06-30', budget: 10000000 },
    { id: 'proj-005', entityType: 'WorkPackage', name: 'Cloud-migrering', description: 'Flytta till Azure', status: 'in-progress', start_date: '2024-03-01', end_date: '2027-12-31', budget: 25000000 },
    { id: 'proj-006', entityType: 'WorkPackage', name: 'NIS2-compliance', description: 'Uppfylla NIS2-krav', status: 'in-progress', start_date: '2025-01-01', end_date: '2026-10-17', budget: 18000000 },
    { id: 'proj-007', entityType: 'WorkPackage', name: 'Digital Först-strategi', description: 'Digitalisera alla tjänster', status: 'planned', start_date: '2026-01-01', end_date: '2029-12-31', budget: 40000000 },
    { id: 'proj-008', entityType: 'WorkPackage', name: 'Integration Platform', description: 'Gemensam integrationsplattform', status: 'in-progress', start_date: '2025-03-01', end_date: '2026-12-31', budget: 12000000 }
  ],

  // ========================================================================
  // RELATIONSHIPS - Omfattande relationsnät
  // ========================================================================
  relationships: [
    // Goals realize drivers
    { source: 'goal-001', target: 'driver-001', type: 'realization' },
    { source: 'goal-002', target: 'driver-002', type: 'realization' },
    { source: 'goal-003', target: 'driver-003', type: 'realization' },
    { source: 'goal-004', target: 'driver-001', type: 'realization' },
    { source: 'goal-006', target: 'driver-002', type: 'realization' },
    
    // Principles support goals
    { source: 'principle-001', target: 'goal-003', type: 'influence' },
    { source: 'principle-002', target: 'goal-001', type: 'influence' },
    { source: 'principle-003', target: 'goal-006', type: 'influence' },
    { source: 'principle-004', target: 'goal-003', type: 'influence' },
    { source: 'principle-005', target: 'driver-005', type: 'realization' },
    
    // Capabilities realize goals (L0 -> goals)
    { source: 'cap-l0-001', target: 'goal-001', type: 'realization' },
    { source: 'cap-l0-002', target: 'goal-001', type: 'realization' },
    { source: 'cap-l0-003', target: 'goal-005', type: 'realization' },
    { source: 'cap-l0-004', target: 'goal-002', type: 'realization' },
    { source: 'cap-l0-005', target: 'goal-004', type: 'realization' },
    { source: 'cap-l0-006', target: 'goal-006', type: 'realization' },
    
    // Processes realize capabilities
    { source: 'proc-l1-001', target: 'cap-l1-002', type: 'realization' },
    { source: 'proc-l1-002', target: 'cap-l1-003', type: 'realization' },
    { source: 'proc-l1-003', target: 'cap-l1-001', type: 'realization' },
    { source: 'proc-l1-004', target: 'cap-l1-006', type: 'realization' },
    { source: 'proc-l1-005', target: 'cap-l1-004', type: 'realization' },
    { source: 'proc-l1-006', target: 'cap-l1-005', type: 'realization' },
    { source: 'proc-l1-007', target: 'cap-l1-008', type: 'realization' },
    { source: 'proc-l1-008', target: 'cap-l1-009', type: 'realization' },
    { source: 'proc-l1-009', target: 'cap-l1-010', type: 'realization' },
    { source: 'proc-l1-010', target: 'cap-l1-011', type: 'realization' },
    
    // Organizations perform processes
    { source: 'org-003', target: 'proc-l1-001', type: 'assignment' },
    { source: 'org-003', target: 'proc-l1-002', type: 'assignment' },
    { source: 'org-002', target: 'proc-l1-003', type: 'assignment' },
    { source: 'org-004', target: 'proc-l1-004', type: 'assignment' },
    { source: 'org-005', target: 'proc-l1-005', type: 'assignment' },
    { source: 'org-003', target: 'proc-l1-006', type: 'assignment' },
    { source: 'org-006', target: 'proc-l1-008', type: 'assignment' },
    { source: 'org-002', target: 'proc-l1-010', type: 'assignment' },
    
    // Roles perform processes
    { source: 'role-001', target: 'proc-l1-001', type: 'assignment' },
    { source: 'role-002', target: 'proc-l1-003', type: 'assignment' },
    { source: 'role-003', target: 'proc-l1-005', type: 'assignment' },
    { source: 'role-004', target: 'proc-l1-004', type: 'assignment' },
    { source: 'role-005', target: 'proc-l1-002', type: 'assignment' },
    { source: 'role-006', target: 'proc-l1-006', type: 'assignment' },
    
    // Applications support processes - KONTROLL
    { source: 'app-001', target: 'proc-l1-001', type: 'serving' },
    { source: 'app-002', target: 'proc-l1-001', type: 'serving' },
    { source: 'app-003', target: 'proc-l2-003', type: 'serving' },
    { source: 'app-004', target: 'proc-l2-001', type: 'serving' },
    { source: 'app-005', target: 'proc-l2-002', type: 'serving' },
    { source: 'app-006', target: 'proc-l2-001', type: 'serving' },
    { source: 'app-008', target: 'proc-l2-004', type: 'serving' },
    { source: 'app-009', target: 'proc-l1-001', type: 'serving' },
    { source: 'app-010', target: 'proc-l1-001', type: 'serving' },
    { source: 'app-014', target: 'proc-l1-001', type: 'serving' },
    { source: 'app-015', target: 'proc-l1-008', type: 'serving' },
    
    // Applications support processes - KRIS
    { source: 'app-016', target: 'proc-l2-012', type: 'serving' },
    { source: 'app-017', target: 'proc-l1-004', type: 'serving' },
    { source: 'app-018', target: 'proc-l2-011', type: 'serving' },
    { source: 'app-019', target: 'proc-l1-004', type: 'serving' },
    { source: 'app-020', target: 'proc-l1-004', type: 'serving' },
    { source: 'app-021', target: 'proc-l2-010', type: 'serving' },
    { source: 'app-022', target: 'proc-l2-006', type: 'serving' },
    { source: 'app-023', target: 'proc-l1-008', type: 'serving' },
    
    // Applications support processes - LAB
    { source: 'app-024', target: 'proc-l1-005', type: 'serving' },
    { source: 'app-025', target: 'proc-l2-013', type: 'serving' },
    { source: 'app-026', target: 'proc-l3-010', type: 'serving' },
    { source: 'app-027', target: 'proc-l3-011', type: 'serving' },
    { source: 'app-028', target: 'proc-l2-014', type: 'serving' },
    { source: 'app-030', target: 'proc-l2-013', type: 'serving' },
    { source: 'app-031', target: 'proc-l2-015', type: 'serving' },
    { source: 'app-033', target: 'proc-l3-012', type: 'serving' },
    
    // Applications support processes - TILLSTÅND
    { source: 'app-034', target: 'proc-l1-002', type: 'serving' },
    { source: 'app-035', target: 'proc-l2-005', type: 'serving' },
    { source: 'app-035', target: 'proc-l2-006', type: 'serving' },
    { source: 'app-035', target: 'proc-l2-007', type: 'serving' },
    { source: 'app-036', target: 'proc-l1-002', type: 'serving' },
    
    // Applications support processes - IMPORT/EXPORT
    { source: 'app-039', target: 'proc-l1-006', type: 'serving' },
    { source: 'app-040', target: 'proc-l2-016', type: 'serving' },
    { source: 'app-041', target: 'proc-l2-017', type: 'serving' },
    { source: 'app-042', target: 'proc-l1-006', type: 'serving' },
    { source: 'app-043', target: 'proc-l2-017', type: 'serving' },
    
    // Applications support processes - VATTEN
    { source: 'app-045', target: 'proc-l1-007', type: 'serving' },
    { source: 'app-046', target: 'proc-l2-018', type: 'serving' },
    { source: 'app-047', target: 'proc-l1-007', type: 'serving' },
    
    // Applications support processes - KOMMUNIKATION
    { source: 'app-049', target: 'proc-l1-008', type: 'serving' },
    { source: 'app-050', target: 'proc-l1-008', type: 'serving' },
    { source: 'app-052', target: 'proc-l2-019', type: 'serving' },
    { source: 'app-053', target: 'proc-l1-008', type: 'serving' },
    { source: 'app-055', target: 'proc-l1-008', type: 'serving' },
    
    // Applications support processes - FORSKNING
    { source: 'app-056', target: 'proc-l1-010', type: 'serving' },
    { source: 'app-057', target: 'proc-l1-010', type: 'serving' },
    { source: 'app-058', target: 'proc-l1-010', type: 'serving' },
    { source: 'app-060', target: 'proc-l1-010', type: 'serving' },
    
    // Applications access data
    { source: 'app-001', target: 'data-002', type: 'access' },
    { source: 'app-002', target: 'data-001', type: 'access' },
    { source: 'app-003', target: 'data-005', type: 'access' },
    { source: 'app-004', target: 'data-001', type: 'access' },
    { source: 'app-005', target: 'data-002', type: 'access' },
    { source: 'app-016', target: 'data-007', type: 'access' },
    { source: 'app-017', target: 'data-007', type: 'access' },
    { source: 'app-024', target: 'data-003', type: 'access' },
    { source: 'app-024', target: 'data-006', type: 'access' },
    { source: 'app-034', target: 'data-004', type: 'access' },
    { source: 'app-035', target: 'data-004', type: 'access' },
    { source: 'app-039', target: 'data-008', type: 'access' },
    { source: 'app-045', target: 'data-010', type: 'access' },
    { source: 'app-056', target: 'data-011', type: 'access' },
    { source: 'app-057', target: 'data-012', type: 'access' },
    
    // Technology supports applications - Azure
    { source: 'tech-001', target: 'app-001', type: 'assignment' },
    { source: 'tech-001', target: 'app-005', type: 'assignment' },
    { source: 'tech-001', target: 'app-016', type: 'assignment' },
    { source: 'tech-001', target: 'app-034', type: 'assignment' },
    { source: 'tech-001', target: 'app-049', type: 'assignment' },
    { source: 'tech-001', target: 'app-050', type: 'assignment' },
    { source: 'tech-001', target: 'app-055', type: 'assignment' },
    { source: 'tech-005', target: 'app-001', type: 'realization' },
    { source: 'tech-006', target: 'app-071', type: 'realization' },
    { source: 'tech-006', target: 'app-072', type: 'realization' },
    
    // Technology supports applications - OnPrem
    { source: 'tech-002', target: 'app-002', type: 'assignment' },
    { source: 'tech-002', target: 'app-024', type: 'assignment' },
    { source: 'tech-002', target: 'app-035', type: 'assignment' },
    { source: 'tech-002', target: 'app-061', type: 'assignment' },
    { source: 'tech-002', target: 'app-062', type: 'assignment' },
    { source: 'tech-003', target: 'app-001', type: 'realization' },
    { source: 'tech-003', target: 'app-024', type: 'realization' },
    { source: 'tech-003', target: 'app-061', type: 'realization' },
    { source: 'tech-004', target: 'app-002', type: 'realization' },
    
    // Data flows between applications
    { source: 'app-001', target: 'app-071', type: 'flow' },
    { source: 'app-002', target: 'app-001', type: 'flow' },
    { source: 'app-003', target: 'app-001', type: 'flow' },
    { source: 'app-005', target: 'app-001', type: 'flow' },
    { source: 'app-024', target: 'app-001', type: 'flow' },
    { source: 'app-016', target: 'app-017', type: 'flow' },
    { source: 'app-017', target: 'app-023', type: 'flow' },
    { source: 'app-034', target: 'app-035', type: 'flow' },
    { source: 'app-035', target: 'app-002', type: 'flow' },
    { source: 'app-039', target: 'app-040', type: 'flow' },
    { source: 'app-049', target: 'app-052', type: 'flow' },
    { source: 'app-071', target: 'app-039', type: 'flow' },
    { source: 'app-071', target: 'app-016', type: 'flow' },
    { source: 'app-071', target: 'app-061', type: 'flow' },
    { source: 'app-071', target: 'app-062', type: 'flow' },
    
    // Projects realize applications/capabilities
    { source: 'proj-001', target: 'app-001', type: 'realization' },
    { source: 'proj-002', target: 'app-005', type: 'realization' },
    { source: 'proj-002', target: 'app-050', type: 'realization' },
    { source: 'proj-003', target: 'app-004', type: 'realization' },
    { source: 'proj-004', target: 'app-024', type: 'realization' },
    { source: 'proj-005', target: 'tech-001', type: 'realization' },
    { source: 'proj-006', target: 'cap-l0-007', type: 'influence' },
    { source: 'proj-007', target: 'principle-004', type: 'realization' },
    { source: 'proj-008', target: 'app-071', type: 'realization' },
    { source: 'proj-008', target: 'app-072', type: 'realization' }
  ],

  resourceAllocations: [
    { project_id: 'proj-001', resource_id: 'org-007', allocation: 80, role: 'Projektledare' },
    { project_id: 'proj-001', resource_id: 'org-003', allocation: 40, role: 'Verksamhetsexpert' },
    { project_id: 'proj-002', resource_id: 'org-007', allocation: 60, role: 'Teknisk ledning' },
    { project_id: 'proj-003', resource_id: 'org-002', allocation: 50, role: 'AI-specialist' },
    { project_id: 'proj-004', resource_id: 'org-005', allocation: 70, role: 'Laboratorieexpert' },
    { project_id: 'proj-005', resource_id: 'org-007', allocation: 90, role: 'Cloud-arkitekt' },
    { project_id: 'proj-006', resource_id: 'org-007', allocation: 100, role: 'Säkerhetsarkitekt' },
    { project_id: 'proj-007', resource_id: 'org-001', allocation: 30, role: 'Digitaliseringsstrateg' },
    { project_id: 'proj-008', resource_id: 'org-007', allocation: 75, role: 'Integrationsarkitekt' }
  ]
};

export default sampleData;
