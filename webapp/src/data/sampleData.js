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
    { id: 'driver-005', entityType: 'Driver', name: 'Informationssäkerhet', description: 'Krav på robust informations- och cybersäkerhet' },
    
    // Principles
    { id: 'principle-001', entityType: 'Principle', name: 'Risk based approach', description: 'Fokusera på högst risk' },
    { id: 'principle-002', entityType: 'Principle', name: 'Öppenhet och transparens', description: 'Tillgänglig information' },
    { id: 'principle-003', entityType: 'Principle', name: 'Vetenskaplig grund', description: 'Evidensbaserade beslut' },
    { id: 'principle-004', entityType: 'Principle', name: 'Digital först', description: 'Digitala tjänster som standard' },
    { id: 'principle-005', entityType: 'Principle', name: 'Säkerhet och integritet', description: 'Skydda personuppgifter och värdeförmågen information' },

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
    { id: 'cap-l1-001', entityType: 'Capability', name: 'Riskvärdering', description: 'Identifiera och värdera risker', level: 1, parentId: 'cap-l0-001', current_maturity: 2, target_maturity: 4 },
    { id: 'cap-l1-002', entityType: 'Capability', name: 'Kontroll och Tillsyn', description: 'Kontrollera livsmedelsföretag', level: 1, parentId: 'cap-l0-001', current_maturity: 3, target_maturity: 5 },
    { id: 'cap-l1-003', entityType: 'Capability', name: 'Tillståndsgivning', description: 'Hantera tillstånd', level: 1, parentId: 'cap-l0-001', current_maturity: 3, target_maturity: 4 },
    { id: 'cap-l1-004', entityType: 'Capability', name: 'Provtagning och Analys', description: 'Laboratorieverksamhet', level: 1, parentId: 'cap-l0-001', current_maturity: 3, target_maturity: 4 },
    { id: 'cap-l1-005', entityType: 'Capability', name: 'Import/Export-kontroll', description: 'Gränskontroll', level: 1, parentId: 'cap-l0-001', current_maturity: 3, target_maturity: 3 },
    { id: 'cap-l1-006', entityType: 'Capability', name: 'Utbrottshantering', description: 'Hantera matförgiftningsutbrott', level: 1, parentId: 'cap-l0-005', current_maturity: 4, target_maturity: 5 },
    { id: 'cap-l1-007', entityType: 'Capability', name: 'Zoonosövervakning', description: 'Övervaka djursjukdomar', level: 1, parentId: 'cap-l0-003', current_maturity: 3, target_maturity: 4 },
    { id: 'cap-l1-008', entityType: 'Capability', name: 'Dricksvattenkontroll', description: 'Kontrollera dricksvatten', level: 1, parentId: 'cap-l0-002', current_maturity: 3, target_maturity: 4 },
    { id: 'cap-l1-009', entityType: 'Capability', name: 'Konsumentinformation', description: 'Informera om matsäkerhet', level: 1, parentId: 'cap-l0-004', current_maturity: 2, target_maturity: 3 },
    { id: 'cap-l1-010', entityType: 'Capability', name: 'Regelutveckling', description: 'Utveckla föreskrifter', level: 1, parentId: 'cap-l0-001', current_maturity: 3, target_maturity: 4 },
    { id: 'cap-l1-011', entityType: 'Capability', name: 'Matvaneforskning', description: 'Forska om matvanor', level: 1, parentId: 'cap-l0-006', current_maturity: 3, target_maturity: 4 },
    { id: 'cap-l1-012', entityType: 'Capability', name: 'IT-drift och Support', description: 'Driva IT-system', level: 1, parentId: 'cap-l0-007', current_maturity: 2, target_maturity: 4 },
    { id: 'cap-l1-013', entityType: 'Capability', name: 'Ekonomiadministration', description: 'Hantera ekonomi', level: 1, parentId: 'cap-l0-007', current_maturity: 3, target_maturity: 3 },
    { id: 'cap-l1-014', entityType: 'Capability', name: 'HR och Kompetens', description: 'Personaladministration', level: 1, parentId: 'cap-l0-007', current_maturity: 2, target_maturity: 3 },
    { id: 'cap-l1-015', entityType: 'Capability', name: 'Kemisk analys', description: 'Kemiska laboratorieanalyser', level: 1, parentId: 'cap-l0-006', current_maturity: 4, target_maturity: 4 },
    { id: 'cap-l1-016', entityType: 'Capability', name: 'Mikrobiologisk analys', description: 'Mikrobiologiska laboratorieanalyser', level: 1, parentId: 'cap-l0-006', current_maturity: 4, target_maturity: 5 },
    
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
    { id: 'data-011', entityType: 'DataObject', name: 'Kostdata', description: 'Data från kostundersökningar' },
    { id: 'data-012', entityType: 'DataObject', name: 'Näringsdata', description: 'Näringsinnehåll i livsmedel' },

    // ========================================================================
    // BUSINESS OBJECTS
    // Affärsobjekt som skapas och används i Livsmedelsverkets processer
    // ========================================================================
    { id: 'bobj-001', entityType: 'BusinessObject', name: 'Inspektionsrapport', description: 'Formell rapport upprättad av inspektör efter platsbesök hos livsmedelsföretag. Dokumenterar iakttagelser, avvikelser och bedömningar.' },
    { id: 'bobj-002', entityType: 'BusinessObject', name: 'Livsmedelsprov', description: 'Fysiskt prov av livsmedel taget under kontroll eller provtagningskampanj. Åtföljs av provtagningsprotokoll och skickas för kemisk eller mikrobiologisk analys.' },
    { id: 'bobj-003', entityType: 'BusinessObject', name: 'Riskvärderingsrapport', description: 'Vetenskaplig rapport som utvärderar risker med ett specifikt ämne eller faktor i livsmedelskedjan, baserad på EFSA:s principer och tillgängliga data.' },
    { id: 'bobj-004', entityType: 'BusinessObject', name: 'Myndighetsbeslut', description: 'Formellt förvaltningsbeslut fattat av Livsmedelsverket. Kan avse tillstånd, förelägganden, förbud, sanktionsavgifter eller godkännanden. Överklagbart.' },
    { id: 'bobj-005', entityType: 'BusinessObject', name: 'Tillståndsansökan', description: 'Ansökan från livsmedelsföretag om godkännande av anläggning, processmetod eller produktkategori. Inkluderar HACCP-plan, ritningar och egenkontrollprogram.' },
    { id: 'bobj-006', entityType: 'BusinessObject', name: 'RASFF-anmälan', description: 'Anmälan till EU:s Rapid Alert System for Food and Feed. Notifiering när en allvarlig risk identifierats i livsmedel eller foder som kan påverka konsumenter i flera länder.' },
    { id: 'bobj-007', entityType: 'BusinessObject', name: 'Utbrottsrapport', description: 'Sammanställd rapport efter utredning av misstänkt eller bekräftat matförgiftningsutbrott. Inkluderar epidemiologiska data, smittkälla, spridningsmönster och vidtagna åtgärder.' },
    { id: 'bobj-008', entityType: 'BusinessObject', name: 'Exportcertifikat', description: 'Officiellt hälsocertifikat som intygar att livsmedel eller djurprodukter uppfyller importlandets krav. Utfärdas av officiell veterinär eller inspektör.' },
    { id: 'bobj-009', entityType: 'BusinessObject', name: 'Importdeklaration', description: 'Handling som medföljer sändning av livsmedel, foder eller djurprodukter vid import till EU. Verifieras vid gränskontrollstation.' },
    { id: 'bobj-010', entityType: 'BusinessObject', name: 'Laboratorierapport', description: 'Godkänd rapport från laboratorieanalys med kvantitativa resultat, mätosäkerheter, bedömning mot gränsvärden och accrediteringsinformation (ISO 17025).' },
    { id: 'bobj-011', entityType: 'BusinessObject', name: 'Riskprofil', description: 'Sammanställd riskprofil för ett livsmedelsföretag baserad på tidigare kontroller, analysresultat, sortiment och ägarförhållanden. Styr frekvens och inriktning av framtida kontroller.' },
    { id: 'bobj-012', entityType: 'BusinessObject', name: 'Åtgärdsplan', description: 'Dokumenterad plan från ett livsmedelsföretag för hur identifierade brister ska åtgärdas och inom vilken tidram. Upprättas som svar på föreläggande.' },
    { id: 'bobj-013', entityType: 'BusinessObject', name: 'Kostråd', description: 'Officiella, evidensbaserade råd om kost och matvanor publicerade av Livsmedelsverket. Riktas till befolkningen, yrkesverksamma eller specifika grupper som gravida och spädbarn.' },
    { id: 'bobj-014', entityType: 'BusinessObject', name: 'Föreskrift', description: 'Bindande rättsregel utfärdad av Livsmedelsverket med stöd i lag. Specificerar detaljerade krav som livsmedelsföretag måste uppfylla, t.ex. hygienkrav eller märkningsregler.' },
    { id: 'bobj-015', entityType: 'BusinessObject', name: 'Dricksvattenprov', description: 'Prov taget från dricksvattenanläggning för analys av kemiska och mikrobiologiska parametrar. Analyseras mot gränsvärden i SLVFS 2001:30.' },
    { id: 'bobj-016', entityType: 'BusinessObject', name: 'Zoonosrapport', description: 'Nationell eller lokal rapport om förekomst och trender för zoonotiska sjukdomar och smittämnen i djur och livsmedel. Rapporteras till ECDC och EFSA.' },
    { id: 'bobj-017', entityType: 'BusinessObject', name: 'Vetenskapligt yttrande', description: 'Formellt vetenskapligt utlåtande från Livsmedelsverkets riskbedömningsavdelning. Underlag för riskhanteringsbeslut, föreskrifter och internationella förhandlingar.' },
    { id: 'bobj-018', entityType: 'BusinessObject', name: 'Klagomålsärende', description: 'Registrerat klagomål från konsument, företag eller annan aktör rörande livsmedelsbrott, märkningsfel eller otillfredsställande kontroll. Handläggs och besvaras formellt.' },
    { id: 'bobj-019', entityType: 'BusinessObject', name: 'Egenkontrollprogram', description: 'Livsmedelsföretagets dokumenterade system för att kontrollera att verksamheten uppfyller livsmedelslagstiftningens krav, baserat på HACCP-principerna.' },
    { id: 'bobj-020', entityType: 'BusinessObject', name: 'Återkallelsemeddelande', description: 'Officiellt meddelande om att ett livsmedel dras tillbaka från marknaden på grund av säkerhetsrisk. Publiceras på Livsmedelsverkets webbplats och skickas till media.' },

    // --- BusinessObjects: Kontroll & Tillsyn (021-035) ---
    { id: 'bobj-021', entityType: 'BusinessObject', name: 'Kontrollplan', description: 'Årsvis planering av kontrollinsatser inom Livsmedelsverkets ansvarsområde. Anger vilka anläggningar som ska inspekteras, hur ofta och med vilken inriktning baserat på riskklassificering.' },
    { id: 'bobj-022', entityType: 'BusinessObject', name: 'Avvikelserapport', description: 'Dokumentation av specifik avvikelse från gällande regelverk konstaterad vid inspektion. Beskriver avvikelsens art, allvarlighetsgrad och koppling till regelkrav.' },
    { id: 'bobj-023', entityType: 'BusinessObject', name: 'Föreläggande', description: 'Formellt förvaltningsbeslut som ålägger ett livsmedelsföretag att vidta specifika åtgärder inom angiven tid. Förenas ofta med vite. Grundas i livsmedelslagen.' },
    { id: 'bobj-024', entityType: 'BusinessObject', name: 'Förbudsföreläggande', description: 'Beslut om att förbjuda ett livsmedelsföretag att bedriva viss verksamhet eller hantera vissa produkter. Används vid allvarliga hygien- eller säkerhetsbrister.' },
    { id: 'bobj-025', entityType: 'BusinessObject', name: 'Sanktionsavgiftsbeslut', description: 'Förvaltningsbeslut om påförandet av sanktionsavgift vid konstaterat brott mot livsmedelslagstiftningen. Beloppet baseras på överträdelsens allvarlighet och företagets omsättning.' },
    { id: 'bobj-026', entityType: 'BusinessObject', name: 'Uppföljningsrapport-kontroll', description: 'Rapport upprättad vid uppföljande inspektion för att verifiera att tidigare konstaterade brister åtgärdats av livsmedelsföretaget inom angiven tidsfrist.' },
    { id: 'bobj-027', entityType: 'BusinessObject', name: 'Kontrollfrekvensplan', description: 'Dokument som fastslår hur ofta olika kategorier av livsmedelsanläggningar ska inspekteras, baserat på risk-score, typ av verksamhet och historik.' },
    { id: 'bobj-028', entityType: 'BusinessObject', name: 'Revisionsdokument', description: 'Underlag och rapport från revision av ett livsmedelsföretags ledningssystem, egenkontrollen eller specifika delar av deras verksamhet. Mer djupgående än ordinär inspektion.' },
    { id: 'bobj-029', entityType: 'BusinessObject', name: 'Inspektionschecklista', description: 'Standardiserat formulär som inspektörer använder vid platsbesök för att systematiskt kontrollera regelefterlevnad. Inkluderar bedömningsskalor och hänvisning till regelkrav.' },
    { id: 'bobj-030', entityType: 'BusinessObject', name: 'Varningsskrivelse', description: 'Formell skrivelse till livsmedelsföretag som uppmärksammar risk för framtida sanktion om identifierade brister inte åtgärdas. Föregår ofta föreläggande.' },
    { id: 'bobj-031', entityType: 'BusinessObject', name: 'Informationsbrev-företag', description: 'Informerande skrivelse till livsmedelsföretag om ny lagstiftning, vägledningar, kommande kampanjer eller generella iakttagelser. Inte ett myndighetsbeslut.' },
    { id: 'bobj-032', entityType: 'BusinessObject', name: 'Yttrande till domstol', description: 'Livsmedelsverkets formella yttrande i ett överklagat ärende vid förvaltningsrätt, kammarrätt eller Högsta förvaltningsdomstolen.' },
    { id: 'bobj-033', entityType: 'BusinessObject', name: 'Polisanmälan-livsmedel', description: 'Formell anmälan till Polismyndigheten vid misstänkt livsmedelsbrott, förfalskningsbrott eller grovt brott mot livsmedelslagstiftningen.' },
    { id: 'bobj-034', entityType: 'BusinessObject', name: 'NCP-kontrollrapport', description: 'Nationell kontrollrapport som Sverige lämnar till EU-kommissionen inom ramen för den nationella kontrollplanen (NCP). Redovisar genomförda kontroller och resultat.' },
    { id: 'bobj-035', entityType: 'BusinessObject', name: 'Kontrollstatistik', description: 'Statistisk sammanfattning av genomförda livsmedelskontroller; antal besök, andel avvikelser per bransch, geografisk fördelning och trender över tid.' },

    // --- BusinessObjects: Registrering & Tillstånd (036-050) ---
    { id: 'bobj-036', entityType: 'BusinessObject', name: 'Registreringsbevis', description: 'Officiellt bevis på att en livsmedelsanläggning är registrerad hos behörig myndighet enligt EU-förordning 852/2004 artikel 6. Grundförutsättning för att bedriva livsmedelsverksamhet.' },
    { id: 'bobj-037', entityType: 'BusinessObject', name: 'Godkännandebevis', description: 'Officiellt godkännande krävt för anläggningar som hanterar livsmedel av animaliskt ursprung, t.ex. slakterier och mejeriproduktionsanläggningar, enligt EU-förordning 853/2004.' },
    { id: 'bobj-038', entityType: 'BusinessObject', name: 'HACCP-plan', description: 'Det enskilda företagets dokumenterade Hazard Analysis and Critical Control Points-plan. Identifierar faror, kritiska styrpunkter och åtgärder i tillverkningsprocessen.' },
    { id: 'bobj-039', entityType: 'BusinessObject', name: 'Flödesschema-produktion', description: 'Grafisk representation av ett livsmedelsföretags produktionsprocess. Används i HACCP-arbetet för att identifiera var faror kan uppstå i processen.' },
    { id: 'bobj-040', entityType: 'BusinessObject', name: 'Rengöringsprotokoll', description: 'Dokumentation av utförda rengörings- och desinfektionsåtgärder i en livsmedelsanläggning. Del av egenkontrollprogrammet för att upprätthålla god hygienstandard.' },
    { id: 'bobj-041', entityType: 'BusinessObject', name: 'Temperaturlogg', description: 'Kontinuerlig registrering av temperaturer i kyl- och frysutrymmen, transportfordon och tillagningsprocesser. Kritiskt underlag för att visa att temperaturkraven uppfyllts.' },
    { id: 'bobj-042', entityType: 'BusinessObject', name: 'Spårbarhetsdokumentation', description: 'Dokumentation som möjliggör spårning av livsmedel och ingredienser bakåt och framåt i produktions- och distributionskedjan, ett steg i taget (EU 178/2002 art. 18).' },
    { id: 'bobj-043', entityType: 'BusinessObject', name: 'Leverantörsintyg', description: 'Intyg från leverantör om att en råvara eller ingrediens uppfyller specificerade krav, t.ex. avseende allergener, GMO-status eller bekämpningsmedelsrester.' },
    { id: 'bobj-044', entityType: 'BusinessObject', name: 'Skadedjursprotokoll', description: 'Dokumentation av skadedjurskontroll och -bekämpning i en livsmedelsanläggning. Visar placering av fällor, observationer och eventuella åtgärder.' },
    { id: 'bobj-045', entityType: 'BusinessObject', name: 'Vattenanalys-anläggning', description: 'Analysresultat för vatten som används i livsmedelsproduktion. Kontrollerar mikrobiologiska och kemiska parametrar för att säkerställa att vattnet är lämpligt för livsmedelshantering.' },
    { id: 'bobj-046', entityType: 'BusinessObject', name: 'Ny livsmedelsanmälan', description: 'Anmälan om ny livsmedelsprodukt som kan klassas som novel food (förordning 2015/2283). Inkluderar säkerhetsdokumentation och ansökan om godkännande.' },
    { id: 'bobj-047', entityType: 'BusinessObject', name: 'Anrikningsblandingsanmälan', description: 'Anmälan om livsmedel som har tillsatts vitaminer, mineraler eller andra ämnen (förordning 1925/2006). Ska lämnas till Livsmedelsverket innan produkten säljs.' },
    { id: 'bobj-048', entityType: 'BusinessObject', name: 'Berikningsansökan', description: 'Ansökan om tillstånd att berika livsmedel med näringsamnen utöver vad som är generellt tillåtet, med motivering och säkerhetsunderlag.' },
    { id: 'bobj-049', entityType: 'BusinessObject', name: 'Specialkostanmälan', description: 'Anmälan om livsmedel för speciella medicinska ändamål (FSMP) eller komplett kostersättning för viktminskning. Lämnas till Livsmedelsverket innan marknadsföring.' },
    { id: 'bobj-050', entityType: 'BusinessObject', name: 'Verksamhetsbeskrivning', description: 'Beskrivning av livsmedelsföretagets verksamhet som bifogas vid registrering eller ansökan om godkännande. Inkluderar sortiment, kapacitet, processer och lokalbeskrivning.' },

    // --- BusinessObjects: Laboratorium & Analys (051-065) ---
    { id: 'bobj-051', entityType: 'BusinessObject', name: 'Analysbeställning', description: 'Formell beställning av laboratorieanalys från Livsmedelsverkets kontrollavdelning eller kommunkontrollanter. Anger matris, analysparametrar, prioritering och leveranstid.' },
    { id: 'bobj-052', entityType: 'BusinessObject', name: 'Analysprotokoll', description: 'Internt laboratorieprotokoll som dokumenterar alla analyssteg, använda metoder, reagenser och mätningar. Underlag för den slutliga laboratorierapporten.' },
    { id: 'bobj-053', entityType: 'BusinessObject', name: 'Kalibreringscertifikat', description: 'Certifikat som dokumenterar kalibrering av mätinstrument och utrustning i laboratoriet mot spårbara referensstandarder. Krävs för ISO 17025-ackreditering.' },
    { id: 'bobj-054', entityType: 'BusinessObject', name: 'Metodvalideringsrapport', description: 'Rapport som dokumenterar validering av en analytisk metod; specificitet, noggrannhet, precision, detektionsgräns mm. Krävs innan ny metod används rutinmässigt.' },
    { id: 'bobj-055', entityType: 'BusinessObject', name: 'Ackrediteringscertifikat', description: 'Certifikat utfärdat av SWEDAC som bekräftar att Livsmedelsverkets laboratorium uppfyller kraven i ISO/IEC 17025 för specificerade analysmetoder och matriser.' },
    { id: 'bobj-056', entityType: 'BusinessObject', name: 'Ringprovsresultat', description: 'Resultat från deltagande i interlaboratoriell jämförelse (ringprov). Visar laboratoriets prestanda i förhållande till andra laboratorier och acceptanskriterierna.' },
    { id: 'bobj-057', entityType: 'BusinessObject', name: 'Provtagningsplan-kontroll', description: 'Strategisk plan som anger vilka livsmedel, matriser och parametrar som ska provtas under ett kontrollår, baserat på riskprioritering och EU-krav.' },
    { id: 'bobj-058', entityType: 'BusinessObject', name: 'Provtagningsprotokoll', description: 'Dokumentation av hur, var och när ett specifikt prov tagits, inklusive provmängd, förpackning, transportförhållanden och kedja av förvar (chain of custody).' },
    { id: 'bobj-059', entityType: 'BusinessObject', name: 'Gränsvärdesunderlag', description: 'Vetenskapligt och rättsligt underlag för fastställande eller revidering av gränsvärden för kontaminanter, bekämpningsmedel eller tillsatser i livsmedel.' },
    { id: 'bobj-060', entityType: 'BusinessObject', name: 'Screening-rapport', description: 'Rapport från bred screeninganalys som söker efter ett stort antal ämnen (t.ex. pesticider, läkemedelsrester, miljögifter) utan specifik misstanke.' },
    { id: 'bobj-061', entityType: 'BusinessObject', name: 'Kemirapport-kontaminant', description: 'Specifik rapport om kemisk kontaminant (t.ex. aflatoxin, dioxin, tungmetaller) i livsmedel med kvantitativa data och riskbedömning.' },
    { id: 'bobj-062', entityType: 'BusinessObject', name: 'Mikrobiologirapport', description: 'Analysrapport med mikrobiologiska fynd (t.ex. Salmonella, Listeria, EHEC) i livsmedel inklusive serotypning och tydlig bedömning mot mikrobiologiska kriterier.' },
    { id: 'bobj-063', entityType: 'BusinessObject', name: 'Allergenanalysrapport', description: 'Analysrapport för allergenspårning i livsmedel. Kvantifierar förekomst av specifika allergener (t.ex. gluten, jordnötter, mjölkprotein) med immunologiska eller DNA-baserade metoder.' },
    { id: 'bobj-064', entityType: 'BusinessObject', name: 'Resthaltsrapport', description: 'Rapport om bekämpningsmedelsrester i frukt, grönsaker och spannmål. Del av EU:s samordnade kontrollprogram. Innehåller fyndfrekvens och överskridandehastighet.' },
    { id: 'bobj-065', entityType: 'BusinessObject', name: 'Statistisk analysrapport', description: 'Sammanfattande statistisk rapport över laboratorieresultat under en period; fyndfrekvenser, trendanalys, jämförelse mot föregående perioder och benchmarking mot EU-genomsnitt.' },

    // --- BusinessObjects: Import & Export (066-078) ---
    { id: 'bobj-066', entityType: 'BusinessObject', name: 'Hälsocertifikat', description: 'Officiellt certifikat utfärdat av kompetent myndighet i exportlandet som intygar att djurprodukter eller livsmedel uppfyller importlandets djur- och livsmedelshälsokrav.' },
    { id: 'bobj-067', entityType: 'BusinessObject', name: 'Sändningsdokumentation', description: 'Samling dokument som medföljer en gränsöverskridande sändning av livsmedel eller foder: faktura, fraktsedel, ursprungsintyg, hälsointyg och analysresultat.' },
    { id: 'bobj-068', entityType: 'BusinessObject', name: 'Gränskontrollbeslut', description: 'Formellt beslut vid gränskontrollstation om att godkänna, hålla kvar, omdirigera eller avvisa en sändning av livsmedel eller foder från tredjeland.' },
    { id: 'bobj-069', entityType: 'BusinessObject', name: 'Importkontrollplan', description: 'Plan som specificerar frekvens och inriktning för dokumentkontroll, identitetskontroll och materialkontroll av varor vid gränskontroll, baserat på EU-riskbasering.' },
    { id: 'bobj-070', entityType: 'BusinessObject', name: 'Frigivningsbeslut-import', description: 'Beslut om att frigiva en sändning för vidare distribution på EU-marknaden efter godkänd gränskontroll. Registreras i TRACES-systemet.' },
    { id: 'bobj-071', entityType: 'BusinessObject', name: 'Stoppbeslut-import', description: 'Beslut om att hålla kvar eller avvisa en importerad sändning på grund av att den inte uppfyller EU:s krav. Kostnad bärs av importören.' },
    { id: 'bobj-072', entityType: 'BusinessObject', name: 'Tredjelandslista', description: 'Förteckning över godkända tredjeländer och anläggningar som får exportera djurprodukter till EU, underhålls av EU-kommissionen och uppdateras löpande.' },
    { id: 'bobj-073', entityType: 'BusinessObject', name: 'TRACES-posting', description: 'Elektroniskt dokument i EU:s handelssystem TRACES (Trade Control and Expert System) för att anmäla och följa en sändning av djur, produkter eller foder.' },
    { id: 'bobj-074', entityType: 'BusinessObject', name: 'Ursprungsintyg', description: 'Handelsdokument som intygar en varas ursprungsland. Kan krävas för att fastställa om preferenstullar eller specifika importkrav är tillämpliga.' },
    { id: 'bobj-075', entityType: 'BusinessObject', name: 'Importörregistrering', description: 'Registerpost om en aktör som är godkänd för att importera specifika kategorier av djurprodukter eller livsmedel till EU från tredjeland.' },
    { id: 'bobj-076', entityType: 'BusinessObject', name: 'Export-direktiv-Sverige', description: 'Land-specifik kravspecifikation för export av svenska livsmedel till ett visst importland, baserat på bilateralt avtal eller förhandlat protokoll.' },
    { id: 'bobj-077', entityType: 'BusinessObject', name: 'Gränskontrollrapport-EU', description: 'EU-rapport om resultat av gränskontroller av importerade livsmedel och foder, sammanställd av kommissionen baserat på medlemsstaternas rapportering.' },
    { id: 'bobj-078', entityType: 'BusinessObject', name: 'Djurhälsointyg', description: 'Veterinärintyg utfärdat av officiell veterinär i exportlandet för att intyga att djurprodukterna kommer från djur som är fria från specificerade sjukdomar.' },

    // --- BusinessObjects: Kris & Utbrott (079-090) ---
    { id: 'bobj-079', entityType: 'BusinessObject', name: 'Krisledningsplan', description: 'Dokumenterat ramverk för hur Livsmedelsverket leder och samordnar insatser vid livsmedelsrelaterade kriser. Anger roller, mandat, kommunikationsvägar och eskaleringsrutiner.' },
    { id: 'bobj-080', entityType: 'BusinessObject', name: 'Incidentrapport-tidig', description: 'Tidig rapport om potentiell livsmedelssäkerhetsincident. Innehåller initiala fakta, bedömning av allvarlighetsgrad och förslag på omedelbara åtgärder.' },
    { id: 'bobj-081', entityType: 'BusinessObject', name: 'Smittspårningsrapport', description: 'Rapport från epidemiologisk smittspårning som identifierar exponeringskälla, smittväg och berörda populationer vid ett matförgiftningsutbrott.' },
    { id: 'bobj-082', entityType: 'BusinessObject', name: 'Pressmeddelande-kris', description: 'Officiellt pressmeddelande till media om en livsmedelsrelaterad kris eller säkerhetsincident. Formulerat för att ge tydlig och korrekt information till allmänheten.' },
    { id: 'bobj-083', entityType: 'BusinessObject', name: 'Konsumentvarning', description: 'Direkt varning till konsumenter att inte äta, köpa eller använda specifika livsmedel på grund av säkerhetsrisk. Publiceras på webbplats och i sociala medier.' },
    { id: 'bobj-084', entityType: 'BusinessObject', name: 'Epidemiologisk kurva', description: 'Grafisk framställning (epicurvs) av ett utbrotts tidsmässiga förlopp som visar antal sjukdomsfall per tidsenhet. Centralt epidemiologiskt analysverktyg.' },
    { id: 'bobj-085', entityType: 'BusinessObject', name: 'Åtgärdsbeslut-kris', description: 'Formellt beslut om omedelbara tvångsåtgärder vid akut livsmedelskris, t.ex. omedelbart återkallande, stängning av anläggning eller import-åtgärder.' },
    { id: 'bobj-086', entityType: 'BusinessObject', name: 'Slutrapport-utbrott', description: 'Samlad slutrapport efter avslutat utbrottsutredning med samtliga epidemiologiska, mikrobiologiska och spårbarhetsfynd samt rekommendationer för framtiden.' },
    { id: 'bobj-087', entityType: 'BusinessObject', name: 'EWRS-notifiering', description: 'Notifiering skickad till EU:s Early Warning and Response System (EWRS) om en allvarlig gränsöverskridande hälsorisk med koppling till livsmedel eller zoonoser.' },
    { id: 'bobj-088', entityType: 'BusinessObject', name: 'Krisutvärdering', description: 'Systematisk utvärdering av hanteringen av en genomgången livsmedelskris eller utbrott. Identifierar lärdomar och förbättringsåtgärder i beredskapsorganisationen.' },
    { id: 'bobj-089', entityType: 'BusinessObject', name: 'Beredskapslista-kontakter', description: 'Uppdaterad lista med kontaktuppgifter till nyckelpersoner, laboratorier, kommuner och internationella kontaktpunkter för snabb mobilisering vid krisläge.' },
    { id: 'bobj-090', entityType: 'BusinessObject', name: 'Övningsrapport-kris', description: 'Rapport från genomförd krisövning (t.ex. tabletop eller fullskalig övning) med syfte att testa beredskapsplanens effektivitet och personalens krisberedskap.' },

    // --- BusinessObjects: Dricksvatten (091-098) ---
    { id: 'bobj-091', entityType: 'BusinessObject', name: 'Dricksvattenutredning', description: 'Utredning vid misstänkt förorening av dricksvatten, t.ex. vid klusterfall av mag-tarmsjukdom kopplat till kommunalt vatten eller enskild vattentäkt.' },
    { id: 'bobj-092', entityType: 'BusinessObject', name: 'Vattenverksregister', description: 'Nationellt register över dricksvattenanläggningar med uppgifter om kapacitet, distributionsområde, ansvarig VA-huvudman och senaste kontrollresultat.' },
    { id: 'bobj-093', entityType: 'BusinessObject', name: 'Dricksvattendirektiv-rapport', description: 'Nationell rapport till EU-kommissionen om genomförande och resultat av nationell kontroll enligt dricksvattendirektivet, lämnas vart tredje år.' },
    { id: 'bobj-094', entityType: 'BusinessObject', name: 'Analysfrekvensplan-vatten', description: 'Plan som fastslår hur ofta och vilka parametrar som ska analyseras i dricksvatten för anläggningar av olika storlek, enligt SLVFS 2001:30.' },
    { id: 'bobj-095', entityType: 'BusinessObject', name: 'Åtgärdsgränsöverskridan', description: 'Rapport om att ett gränsvärde eller åtgärdsgräns överskridits i dricksvatten, med utredning av orsak och vidtagna skyddsåtgärder.' },
    { id: 'bobj-096', entityType: 'BusinessObject', name: 'Råvattenbedömning', description: 'Kvalitetsbedömning av råvatten (ytvattentäkt eller grundvattentäkt) som underlag för riskhantering i dricksvattenproduktion och skydd av vattentäkter.' },
    { id: 'bobj-097', entityType: 'BusinessObject', name: 'Kontrollprogram-vatten', description: 'Det enskilda vattenverkets egna kontrollprogram som specificerar provtagningspunkter, analysparametrar och frekvenser för att övervaka vattenkvaliteten kontinuerligt.' },
    { id: 'bobj-098', entityType: 'BusinessObject', name: 'Vattenkvalitetsintyg', description: 'Intyg utfärdat av berörd VA-huvudman om att dricksvattnets kvalitet uppfyller gällande normer och är säkert att dricka. Kan krävas av myndigheter eller köpare.' },

    // --- BusinessObjects: Nutrition & Kommunikation (099-110) ---
    { id: 'bobj-099', entityType: 'BusinessObject', name: 'Näringsvärdesdeklaration', description: 'Obligatorisk tabell på livsmedelsförpackning med uppgifter om energi, fett, kolhydrater, socker, protein och salt per 100g/100ml (EU 1169/2011). Kontrolleras av Livsmedelsverket.' },
    { id: 'bobj-100', entityType: 'BusinessObject', name: 'Märkningskontrollrapport', description: 'Rapport från kontroll av livsmedelsförpackningars märkning; obligatoriska uppgifter, allergendeklaration, bäst-före-datum, ursprungsland. Avvikelser dokumenteras.' },
    { id: 'bobj-101', entityType: 'BusinessObject', name: 'Hälsopåståendebedömning', description: 'Bedömning av om ett specifikt hälsopåstående på livsmedel är tillåtet enligt EU:s godkända lista (EU 432/2012) och hur det korrekt ska formuleras och villkoras.' },
    { id: 'bobj-102', entityType: 'BusinessObject', name: 'Matvanneundersökning', description: 'Nationell undersökning av befolkningens matvanor och kostintag (t.ex. Riksmaten). Producerar data om energiintag, näringsstatus och livsmedelsval i olika befolkningsgrupper.' },
    { id: 'bobj-103', entityType: 'BusinessObject', name: 'Näringsstudie', description: 'Vetenskaplig studie av specifika näringsamnen, livsmedel eller kostmönsters koppling till hälsoutfall. Underlag för nationella kostråd och EU-samarbete via EFSA.' },
    { id: 'bobj-104', entityType: 'BusinessObject', name: 'Folkhälsorapport-mat', description: 'Rapport om svenska befolkningens kostvanor och kopplad hälsa ur folkhälsoperspektiv; fetma, typ 2-diabetes, hjärt-kärlsjukdom med relation till matvanor.' },
    { id: 'bobj-105', entityType: 'BusinessObject', name: 'Kommunikationsplan', description: 'Strategisk plan för myndighetskommunikation kring ett specifikt tema (t.ex. socker, salt, ekologiskt) med målgrupper, kanaler, budskap, tidsplan och utvärderingsmetod.' },
    { id: 'bobj-106', entityType: 'BusinessObject', name: 'Kampanjmaterial', description: 'Tryckt och digitalt material för konsumentkampanjer om mat och hälsa; broschyrer, sociala medier-inlägg, annonser, utbildningsfilmer och webbartiklar.' },
    { id: 'bobj-107', entityType: 'BusinessObject', name: 'FAQ-dokument', description: 'Sammanställning av vanliga frågor och svar om livsmedelsregelverket, kostråd eller säkerhetsfrågor. Publiceras på webbplatsen och används av kundtjänst.' },
    { id: 'bobj-108', entityType: 'BusinessObject', name: 'Publikation-årsrapport', description: 'Livsmedelsverkets officiella årsrapport som sammanfattar verksamhetens resultat, genomförda kontroller, vetenskapliga arbeten och kommunikationsinsatser.' },
    { id: 'bobj-109', entityType: 'BusinessObject', name: 'Allergendatabas', description: 'Databas med information om allergener i livsmedel, godkända hälsopåståenden och innehållsförteckning-termer. Används av konsumenter, industri och inspektörer.' },
    { id: 'bobj-110', entityType: 'BusinessObject', name: 'Webbinnehåll-vägledning', description: 'Publicerat vägledningsinnehåll på Livsmedelsverkets webbplats riktat till livsmedelsföretag om hur de ska tolka och tillämpa specifika regelkrav.' },

    // --- BusinessObjects: Regelgivning & Juridik (111-120) ---
    { id: 'bobj-111', entityType: 'BusinessObject', name: 'Remissvar-regelgivning', description: 'Livsmedelsverkets formella svar på remiss om nytt lagstiftningsförslag eller ny förordning, nationellt eller på EU-nivå. Kan innehålla synpunkter, ändringsförslag och konsekvensbedömning.' },
    { id: 'bobj-112', entityType: 'BusinessObject', name: 'Vägledningsdokument', description: 'Icke-bindande dokument från Livsmedelsverket som förklarar hur lagstiftning ska tolkas och tillämpas i praktiken. Stor praktisk betydelse för livsmedelsföretag och kommuner.' },
    { id: 'bobj-113', entityType: 'BusinessObject', name: 'Tolkningsbesked', description: 'Formellt besked från Livsmedelsverket om hur en specifik rättslig fråga ska tolkas. Inte ett myndighetsbeslut men vägledande för tillämpningen.' },
    { id: 'bobj-114', entityType: 'BusinessObject', name: 'Konsekvensutredning', description: 'Utredning av ekonomiska och praktiska konsekvenser för företag och myndigheter av ett nytt regelkrav, enligt förordning 2007:1244. Obligatorisk vid föreskriftsutgivning.' },
    { id: 'bobj-115', entityType: 'BusinessObject', name: 'EU-förordningstexter', description: 'Officiella EU-förordningar och direktiv inom livsmedelsrätten. Livsmedelsverket ansvarar för att informera om och genomföra EU-lagstiftning i Sverige.' },
    { id: 'bobj-116', entityType: 'BusinessObject', name: 'Rättsutredning', description: 'Intern juridisk utredning av rättsläget i en specifik fråga som underlag för beslut, föreskriftsarbete eller yttrandegivning.' },
    { id: 'bobj-117', entityType: 'BusinessObject', name: 'Överklagandebeslut', description: 'Livsmedelsverkets beslut vid omprövning av ett överklagat förvaltningsbeslut, eller förvaltningsdomstolens dom i mål där Livsmedelsverket är part.' },
    { id: 'bobj-118', entityType: 'BusinessObject', name: 'Internationellt avtal', description: 'Bilateralt sanitärt och fytosanitärt (SPS-)avtal eller protokoll som Sverige/EU ingått med ett tredjeland, vilket möjliggör handel med specifika livsmedel eller djurprodukter.' },
    { id: 'bobj-119', entityType: 'BusinessObject', name: 'EU-revision-rapport', description: 'Rapport från revision utförd av EU-kommissionens GD SANTE (Food and Veterinary Office) av Sveriges livsmedelskontrollsystem. Innehåller rekommendationer till Sverige.' },
    { id: 'bobj-120', entityType: 'BusinessObject', name: 'Regleringsbrev', description: 'Det svenska regeringens årliga uppdragsdokument till Livsmedelsverket som anger mål, uppdrag, återrapporteringskrav och resurstilldelning för verksamhetsåret.' },

    // --- BusinessObjects: Övervakning & Statistik (121-130) ---
    { id: 'bobj-121', entityType: 'BusinessObject', name: 'Övervakningsprogram', description: 'EU-samordnat eller nationellt program för systematisk övervakning av förekomst av specifika smittämnen, kontaminanter eller bekämpningsmedelsrester i livsmedel och djur.' },
    { id: 'bobj-122', entityType: 'BusinessObject', name: 'Övervakningsresultat', description: 'Sammanställda fynd och kvantitativa data från ett avslutat övervakningsprogram. Skickas till EFSA och ECDC för europeisk sammanvägning och trendanalys.' },
    { id: 'bobj-123', entityType: 'BusinessObject', name: 'Trendanalysrapport', description: 'Rapport som analyserar trender i livsmedelssäkerhetsdata över tid; ökande eller minskande fyndfrekvenser, geografiska mönster och förklarande hypoteser.' },
    { id: 'bobj-124', entityType: 'BusinessObject', name: 'Kontaminantrapport', description: 'Rapport om kemiska kontaminanters (t.ex. dioxiner, PCB, PAH, tungmetaller, mykotoxiner) förekomst och halter i svenska livsmedel, med exponeringsbedömning.' },
    { id: 'bobj-125', entityType: 'BusinessObject', name: 'Bekämpningsmedelsrapport', description: 'Årsrapport om pesticidresthalter i frukt, grönsaker och spannmål, baserad på EU:s samordnade kontrollprogram och nationella program. Rapporteras till EFSA.' },
    { id: 'bobj-126', entityType: 'BusinessObject', name: 'AMR-rapport', description: 'Rapport om antibiotikaresistens (AMR) hos zoonotiska bakterier isolerade från djur, kött och livsmedel. Del av JIACRA-samarbetet mellan EFSA, ECDC och EMA.' },
    { id: 'bobj-127', entityType: 'BusinessObject', name: 'Nationell EFSA-rapport', description: 'Svensk nationell rapport till EFSA inom ramen för det europeiska datainsamlingsarbetet, t.ex. om zoonoser, kontaminanter, pesticider eller antimikrobiell resistens.' },
    { id: 'bobj-128', entityType: 'BusinessObject', name: 'Livsmedelsstatistik', description: 'Officiell statistik om livsmedelsproduktion, handel, konsumtion och kontrollresultat. Publiceras i Livsmedelsverkets statistikdatabas och i nationell statistik.' },
    { id: 'bobj-129', entityType: 'BusinessObject', name: 'Riskprofil-ämne', description: 'Sammanfattande riskprofil för ett specifikt ämne (t.ex. akrylamid, PFAS, nitrat) i livsmedel; exponeringsnivåer, farmakologiska effekter och reglerings-status.' },
    { id: 'bobj-130', entityType: 'BusinessObject', name: 'Djursjukdomsrapport', description: 'Rapport om förekomst och utbredning av djursjukdomar (inklusive zoonoser) i Sverige. Sammanställs av SVA i samverkan med Livsmedelsverket och rapporteras till OIE/WOAH.' },

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
    // KEY PROJECT RESOURCES (people)
    // ========================================================================
    { id: 'res-001', entityType: 'Resource', name: 'Anna Lindberg',   description: 'Senior IT-projektledare', type: 'human', role: 'Projektledare', department: 'IT-avdelningen', capacity: 100 },
    { id: 'res-002', entityType: 'Resource', name: 'Erik Karlsson',   description: 'Teknisk projektledare', type: 'human', role: 'Teknisk PL', department: 'IT-avdelningen', capacity: 100 },
    { id: 'res-003', entityType: 'Resource', name: 'Marcus Nilsson',  description: 'Cloud- och integrationsarkitekt', type: 'human', role: 'Arkitekt', department: 'IT-avdelningen', capacity: 100 },
    { id: 'res-004', entityType: 'Resource', name: 'Sofia Bergström', description: 'Data Scientist / AI-specialist', type: 'human', role: 'Data Scientist', department: 'Avdelning Risk- och nyttovärdering', capacity: 100 },
    { id: 'res-005', entityType: 'Resource', name: 'Sara Johansson',  description: 'Informationssäkerhetsspecialist', type: 'human', role: 'CISO-stöd', department: 'IT-avdelningen', capacity: 100 },
    { id: 'res-006', entityType: 'Resource', name: 'Per Andersson',   description: 'Digitaliseringsstrateg', type: 'human', role: 'Programdirektör', department: 'GD-kansli', capacity: 100 },
    { id: 'res-007', entityType: 'Resource', name: 'Maja Persson',    description: 'UX-designer och frontendutvecklare', type: 'human', role: 'UX-designer', department: 'IT-avdelningen', capacity: 100 },
    { id: 'res-008', entityType: 'Resource', name: 'Lars Eriksson',   description: 'Senior backend- och systemutvecklare', type: 'human', role: 'Systemutvecklare', department: 'IT-avdelningen', capacity: 100 },

    // ========================================================================
    // PROJECTS & WORK PACKAGES
    // ========================================================================
    {
      id: 'proj-001', entityType: 'WorkPackage',
      name: 'eKontroll 2.0',
      description: 'Modernisering av det digitala kontrollsystemet för inspektörer och handläggare – ny UX, offline-stöd och integrerat ärendeflöde.',
      status: 'in-progress', phase: 'execution',
      start_date: '2025-01-01', end_date: '2026-12-31',
      budget: '15 000 000 kr', spent: '9 100 000 kr',
      progress: 65, priority: 'high', risk_level: 'medium', category: 'infrastructure',
      project_manager: 'Anna Lindberg', sponsor: 'IT-direktör', team_size: 10,
      schedule_variance: 5,
      blockers: [],
      key_risks: ['API-integration med äldre systemversioner', 'Användaracceptanstest tar längre tid'],
      expected_benefits: 'Kortare handläggningstider, bättre datakvalitet, mobiliserat fältarbete.',
      objectives: ['goal-003'],
    },
    {
      id: 'proj-002', entityType: 'WorkPackage',
      name: 'Mobil-först',
      description: 'Native mobilappar för fältinspektörer med offline-kapacitet, GPS-integration och realtidssynk mot eKontroll 2.0.',
      status: 'planned', phase: 'planning',
      start_date: '2026-06-01', end_date: '2027-12-31',
      budget: '8 000 000 kr', spent: '400 000 kr',
      progress: 5, priority: 'medium', risk_level: 'low', category: 'digitalization',
      project_manager: 'Erik Karlsson', sponsor: 'Avdelningschef Kontroll', team_size: 6,
      schedule_variance: 0,
      blocked_by: ['proj-001'],
      blockers: ['eKontroll 2.0 API måste vara stabilt innan mobilutveckling startar'],
      key_risks: ['Plattformsval iOS vs Android', 'Säker offline-lagring av inspektionsdata'],
      expected_benefits: 'Effektivare fältarbete, papperlösa inspektioner, snabbare återkoppling.',
      objectives: ['goal-003'],
    },
    {
      id: 'proj-003', entityType: 'WorkPackage',
      name: 'AI Risk-analys',
      description: 'Implementera maskininlärningsmodeller för automatisk riskbedömning av livsmedelsföretag baserat på kontrollhistorik, provresultat och externa signaler.',
      status: 'planned', phase: 'inception',
      start_date: '2026-09-01', end_date: '2028-12-31',
      budget: '12 000 000 kr', spent: '960 000 kr',
      progress: 8, priority: 'medium', risk_level: 'high', category: 'architecture',
      project_manager: 'Sofia Bergström', sponsor: 'GD-kansli', team_size: 7,
      schedule_variance: 0,
      blockers: ['Upphandling av AI-plattform ej avslutad', 'GDPR-konsekvensbedömning pågår'],
      key_risks: ['Regulatorisk osäkerhet kring AI-beslutsstöd i myndighetsutövning', 'Datakvalitet i befintliga system', 'Kompetensbrist AI/ML internt'],
      expected_benefits: 'Riskbaserad resursallokering, fler träffsäkra kontroller med samma bemanning.',
      objectives: ['goal-003', 'goal-001'],
    },
    {
      id: 'proj-004', entityType: 'WorkPackage',
      name: 'LIMS-uppgradering',
      description: 'Uppgradering och delvis nyutveckling av laboratorieinformationssystemet (LIMS) för nationellt laboratorium.',
      status: 'in-progress', phase: 'execution',
      start_date: '2025-06-01', end_date: '2026-06-30',
      budget: '10 000 000 kr', spent: '7 200 000 kr',
      progress: 55, priority: 'critical', risk_level: 'high', category: 'infrastructure',
      project_manager: 'Anna Lindberg', sponsor: 'Laboratoriedirektör', team_size: 8,
      schedule_variance: -45,
      budget_variance: -12,
      blockers: ['Leverantör försenad med leverans av testmiljö – ny ETA: april 2026'],
      key_risks: ['Leverantörsberoende', 'Datamigrering från Legacy-LIMS 1200+ poster', 'Parallell drift kostsam'],
      expected_benefits: 'Snabbare provfrigivning, ISO-ackreditering bibehållen, integration med eKontroll.',
      objectives: ['goal-001'],
    },
    {
      id: 'proj-005', entityType: 'WorkPackage',
      name: 'Cloud-migrering',
      description: 'Stegvis migrering av Livsmedelsverkets IT-infrastruktur till Azure Gov-molnet, inkl. landing zone, datastyrning och säkerhetsarkitektur.',
      status: 'in-progress', phase: 'execution',
      start_date: '2024-03-01', end_date: '2027-12-31',
      budget: '25 000 000 kr', spent: '10 500 000 kr',
      progress: 42, priority: 'high', risk_level: 'medium', category: 'infrastructure',
      project_manager: 'Marcus Nilsson', sponsor: 'IT-direktör', team_size: 15,
      schedule_variance: -10,
      blocked_by: [],
      blockers: ['Azure landing zone-konfiguration försenad pga kravändringar från NCSC-S'],
      key_risks: ['Säkerhetsgranskning kan fördröja flytt av känsliga system', 'Nätverkstopologi för hybridlösning komplex'],
      expected_benefits: 'Ökad redundans, elastisk kapacitet, lägre infrastrukturkostnad på sikt.',
      objectives: ['goal-003'],
    },
    {
      id: 'proj-006', entityType: 'WorkPackage',
      name: 'Cybersäkerhet 2025',
      description: 'Stärka informationssäkerhet och cyberresiliens: SOC-implementering, utbildningsprogram, penetrationstester och säkerhetsarkitektur för kritisk infrastruktur.',
      status: 'in-progress', phase: 'execution',
      start_date: '2025-01-01', end_date: '2026-06-30',
      budget: '18 000 000 kr', spent: '7 200 000 kr',
      progress: 40, priority: 'high', risk_level: 'medium', category: 'security',
      project_manager: 'Sara Johansson', sponsor: 'Säkerhetschef (CISO)', team_size: 9,
      schedule_variance: 0,
      blockers: [],
      key_risks: ['Kompetensförsörjning säkerhetskonsulter – marknadsbrist', 'Teknikval SOC-plattform påverkar driftkostnader'],
      expected_benefits: 'Förstärkt säkerhetsläge, snabbare incidentrespons, dokumenterad säkerhetsstyrning.',
      objectives: ['goal-004'],
    },
    {
      id: 'proj-007', entityType: 'WorkPackage',
      name: 'Digital Först-strategi',
      description: 'Övergripande strategiprogram för att göra Livsmedelsverket till en digitalt ledande myndighet till 2029 – digitala tjänster, dataplattform och API-ekonomi.',
      status: 'planned', phase: 'inception',
      start_date: '2026-01-01', end_date: '2029-12-31',
      budget: '40 000 000 kr', spent: '1 200 000 kr',
      progress: 3, priority: 'critical', risk_level: 'medium', category: 'digitalization',
      project_manager: 'Per Andersson', sponsor: 'Generaldirektören', team_size: 20,
      schedule_variance: 0,
      blocked_by: ['proj-008'],
      blockers: [],
      key_risks: ['Politisk förankring och mandatperiodsgränser', 'Resurskonkurrens med pågående IT-projekt', 'Förändringstakt i organisationen'],
      expected_benefits: 'Ökad medborgarnytta, effektivare handläggning, stärkt konkurrenskraft i digital statsförvaltning.',
      objectives: ['goal-003', 'goal-002'],
    },
    {
      id: 'proj-008', entityType: 'WorkPackage',
      name: 'Integration Platform',
      description: 'Bygger en gemensam integrationsplattform (API-gateway + händelsebuss) som möjliggör snabba och standardiserade kopplingar mellan Livsmedelsverkets system.',
      status: 'in-progress', phase: 'execution',
      start_date: '2025-03-01', end_date: '2026-12-31',
      budget: '12 000 000 kr', spent: '7 800 000 kr',
      progress: 70, priority: 'high', risk_level: 'low', category: 'architecture',
      project_manager: 'Marcus Nilsson', sponsor: 'IT-direktör', team_size: 7,
      schedule_variance: 12,
      blockers: [],
      key_risks: ['Fas 2 – integration av äldre mainframe-system riskfylld', 'API-versionshantering över tid'],
      expected_benefits: 'Kortare time-to-integrate för nya system, minskad punkt-till-punkt-komplexitet.',
      objectives: ['goal-003'],
    },

    // ========================================================================
    // ARCHITECTURE GAPS (ArchiMate Implementation & Migration)
    // ========================================================================
    { id: 'gap-001', entityType: 'Gap', name: 'Fragmenterad kontrolldata', description: 'Kontrolldata är spritt i 12+ system utan gemensam datamodell eller master data management.', gap_type: 'data', severity: 'high' },
    { id: 'gap-002', entityType: 'Gap', name: 'Manuell riskbedömning', description: 'Riskklassning av livsmedelsföretag sker manuellt utan stöd av datadrivna modeller.', gap_type: 'capability', severity: 'high' },
    { id: 'gap-003', entityType: 'Gap', name: 'Analog fältinspektion', description: 'Inspektörer arbetar med papper och PDF – ingen offline-digital kapacitet i fält.', gap_type: 'process', severity: 'medium' },
    { id: 'gap-004', entityType: 'Gap', name: 'Integrationssilos', description: 'Punkt-till-punkt-integrationer mellan system skapar hög teknologisk skuld och underhållskostnader.', gap_type: 'technology', severity: 'high' },
    { id: 'gap-005', entityType: 'Gap', name: 'Saknad realtidsövervakning', description: 'Ingen realtidsövervakning av livsmedelshändelser, signaler eller systemprestanda.', gap_type: 'capability', severity: 'medium' },
    { id: 'gap-006', entityType: 'Gap', name: 'Otillräcklig säkerhetsarkitektur', description: 'Brister i säkerhetsarkitektur, SOC-kapacitet och incidentresponsförmåga.', gap_type: 'security', severity: 'high' },

    // ========================================================================
    // PLATEAUS (ArchiMate Implementation & Migration)
    // ========================================================================
    { id: 'plateau-current', entityType: 'Plateau', name: 'Nulägesarkitektur 2024', description: 'Befintlig arkitektur med legacy-system, fragmenterade integrationer och manuella processer.', plateau_type: 'current', year: 2024 },
    { id: 'plateau-transition', entityType: 'Plateau', name: 'Transitionsarkitektur 2025-2027', description: 'Pågående modernisering – cloud-migrering, ny integrationsplattform, uppgraderade kernsystem och digital fältkapacitet.', plateau_type: 'transition', year: 2027 },
    { id: 'plateau-target', entityType: 'Plateau', name: 'Målarkitektur 2029', description: 'Digital-first myndighet med enhetlig dataplattform, API-ekonomi, AI-stödd riskanalys och realtidsövervakning.', plateau_type: 'target', year: 2029 },
  ],

  // ========================================================================
  // RELATIONSHIPS
  // ========================================================================
  relationships: [
    // --- Goals -> Drivers (realization) ---
    { id: 'r-001', source: 'goal-001', target: 'driver-001', type: 'realization' },
    { id: 'r-002', source: 'goal-001', target: 'driver-002', type: 'realization' },
    { id: 'r-003', source: 'goal-002', target: 'driver-004', type: 'realization' },
    { id: 'r-004', source: 'goal-003', target: 'driver-003', type: 'realization' },
    { id: 'r-005', source: 'goal-004', target: 'driver-001', type: 'realization' },
    { id: 'r-006', source: 'goal-005', target: 'driver-002', type: 'realization' },
    { id: 'r-007', source: 'goal-006', target: 'driver-002', type: 'realization' },
    { id: 'r-008', source: 'goal-003', target: 'driver-005', type: 'realization' },

    // --- Principles -> Goals (influence) ---
    { id: 'r-009',  source: 'principle-001', target: 'goal-003', type: 'influence' },
    { id: 'r-010',  source: 'principle-002', target: 'goal-001', type: 'influence' },
    { id: 'r-011',  source: 'principle-003', target: 'goal-006', type: 'influence' },
    { id: 'r-012',  source: 'principle-004', target: 'goal-003', type: 'influence' },
    { id: 'r-013',  source: 'principle-005', target: 'goal-004', type: 'influence' },
    { id: 'r-014',  source: 'principle-005', target: 'driver-005', type: 'realization' },
    { id: 'r-015',  source: 'principle-002', target: 'goal-002', type: 'influence' },
    { id: 'r-016',  source: 'principle-001', target: 'goal-005', type: 'influence' },

    // --- Cap L0 -> Goals ---
    { id: 'r-020', source: 'cap-l0-001', target: 'goal-001', type: 'realization' },
    { id: 'r-021', source: 'cap-l0-002', target: 'goal-001', type: 'realization' },
    { id: 'r-022', source: 'cap-l0-003', target: 'goal-005', type: 'realization' },
    { id: 'r-023', source: 'cap-l0-004', target: 'goal-002', type: 'realization' },
    { id: 'r-024', source: 'cap-l0-005', target: 'goal-004', type: 'realization' },
    { id: 'r-025', source: 'cap-l0-006', target: 'goal-006', type: 'realization' },
    { id: 'r-026', source: 'cap-l0-007', target: 'goal-003', type: 'realization' },

    // --- Cap L1 -> Cap L0 (composition) ---
    { id: 'r-030', source: 'cap-l0-001', target: 'cap-l1-001', type: 'composition' },
    { id: 'r-031', source: 'cap-l0-001', target: 'cap-l1-002', type: 'composition' },
    { id: 'r-032', source: 'cap-l0-001', target: 'cap-l1-003', type: 'composition' },
    { id: 'r-033', source: 'cap-l0-001', target: 'cap-l1-004', type: 'composition' },
    { id: 'r-034', source: 'cap-l0-001', target: 'cap-l1-005', type: 'composition' },
    { id: 'r-035', source: 'cap-l0-005', target: 'cap-l1-006', type: 'composition' },
    { id: 'r-036', source: 'cap-l0-003', target: 'cap-l1-007', type: 'composition' },
    { id: 'r-037', source: 'cap-l0-002', target: 'cap-l1-008', type: 'composition' },
    { id: 'r-038', source: 'cap-l0-004', target: 'cap-l1-009', type: 'composition' },
    { id: 'r-039', source: 'cap-l0-001', target: 'cap-l1-010', type: 'composition' },
    { id: 'r-040', source: 'cap-l0-006', target: 'cap-l1-011', type: 'composition' },
    { id: 'r-041', source: 'cap-l0-007', target: 'cap-l1-012', type: 'composition' },
    { id: 'r-042', source: 'cap-l0-007', target: 'cap-l1-013', type: 'composition' },
    { id: 'r-043', source: 'cap-l0-007', target: 'cap-l1-014', type: 'composition' },
    { id: 'r-044', source: 'cap-l0-006', target: 'cap-l1-015', type: 'composition' },
    { id: 'r-045', source: 'cap-l0-006', target: 'cap-l1-016', type: 'composition' },

    // --- Cap L2 -> Cap L1 (composition) ---
    { id: 'r-050', source: 'cap-l1-001', target: 'cap-l2-001', type: 'composition' },
    { id: 'r-051', source: 'cap-l1-002', target: 'cap-l2-002', type: 'composition' },
    { id: 'r-052', source: 'cap-l1-002', target: 'cap-l2-003', type: 'composition' },
    { id: 'r-053', source: 'cap-l1-004', target: 'cap-l2-004', type: 'composition' },
    { id: 'r-054', source: 'cap-l1-006', target: 'cap-l2-005', type: 'composition' },
    { id: 'r-055', source: 'cap-l1-006', target: 'cap-l2-006', type: 'composition' },
    { id: 'r-056', source: 'cap-l1-005', target: 'cap-l2-007', type: 'composition' },
    { id: 'r-057', source: 'cap-l1-005', target: 'cap-l2-008', type: 'composition' },
    { id: 'r-058', source: 'cap-l1-008', target: 'cap-l2-009', type: 'composition' },
    { id: 'r-059', source: 'cap-l1-011', target: 'cap-l2-010', type: 'composition' },
    { id: 'r-060', source: 'cap-l1-009', target: 'cap-l2-011', type: 'composition' },
    { id: 'r-061', source: 'cap-l1-007', target: 'cap-l2-012', type: 'composition' },

    // --- Process L2 -> Process L1 (composition) ---
    { id: 'r-070', source: 'proc-l1-001', target: 'proc-l2-001', type: 'composition' },
    { id: 'r-071', source: 'proc-l1-001', target: 'proc-l2-002', type: 'composition' },
    { id: 'r-072', source: 'proc-l1-001', target: 'proc-l2-003', type: 'composition' },
    { id: 'r-073', source: 'proc-l1-001', target: 'proc-l2-004', type: 'composition' },
    { id: 'r-074', source: 'proc-l1-002', target: 'proc-l2-005', type: 'composition' },
    { id: 'r-075', source: 'proc-l1-002', target: 'proc-l2-006', type: 'composition' },
    { id: 'r-076', source: 'proc-l1-002', target: 'proc-l2-007', type: 'composition' },
    { id: 'r-077', source: 'proc-l1-003', target: 'proc-l2-008', type: 'composition' },
    { id: 'r-078', source: 'proc-l1-003', target: 'proc-l2-009', type: 'composition' },
    { id: 'r-079', source: 'proc-l1-004', target: 'proc-l2-010', type: 'composition' },
    { id: 'r-080', source: 'proc-l1-004', target: 'proc-l2-011', type: 'composition' },
    { id: 'r-081', source: 'proc-l1-004', target: 'proc-l2-012', type: 'composition' },
    { id: 'r-082', source: 'proc-l1-005', target: 'proc-l2-013', type: 'composition' },
    { id: 'r-083', source: 'proc-l1-005', target: 'proc-l2-014', type: 'composition' },
    { id: 'r-084', source: 'proc-l1-005', target: 'proc-l2-015', type: 'composition' },
    { id: 'r-085', source: 'proc-l1-006', target: 'proc-l2-016', type: 'composition' },
    { id: 'r-086', source: 'proc-l1-006', target: 'proc-l2-017', type: 'composition' },
    { id: 'r-087', source: 'proc-l1-007', target: 'proc-l2-018', type: 'composition' },
    { id: 'r-088', source: 'proc-l1-008', target: 'proc-l2-019', type: 'composition' },
    { id: 'r-089', source: 'proc-l1-008', target: 'proc-l2-020', type: 'composition' },

    // --- Process L3 -> Process L2 (composition) ---
    { id: 'r-090', source: 'proc-l2-001', target: 'proc-l3-001', type: 'composition' },
    { id: 'r-091', source: 'proc-l2-001', target: 'proc-l3-002', type: 'composition' },
    { id: 'r-092', source: 'proc-l2-002', target: 'proc-l3-003', type: 'composition' },
    { id: 'r-093', source: 'proc-l2-002', target: 'proc-l3-004', type: 'composition' },
    { id: 'r-094', source: 'proc-l2-002', target: 'proc-l3-005', type: 'composition' },
    { id: 'r-095', source: 'proc-l2-002', target: 'proc-l3-006', type: 'composition' },
    { id: 'r-096', source: 'proc-l2-003', target: 'proc-l3-007', type: 'composition' },
    { id: 'r-097', source: 'proc-l2-003', target: 'proc-l3-008', type: 'composition' },
    { id: 'r-098', source: 'proc-l2-013', target: 'proc-l3-009', type: 'composition' },
    { id: 'r-099', source: 'proc-l2-014', target: 'proc-l3-010', type: 'composition' },
    { id: 'r-100', source: 'proc-l2-014', target: 'proc-l3-011', type: 'composition' },
    { id: 'r-101', source: 'proc-l2-015', target: 'proc-l3-012', type: 'composition' },

    // --- Processes -> Capabilities (realization) ---
    { id: 'r-110', source: 'proc-l1-001', target: 'cap-l1-002', type: 'realization' },
    { id: 'r-111', source: 'proc-l1-002', target: 'cap-l1-003', type: 'realization' },
    { id: 'r-112', source: 'proc-l1-003', target: 'cap-l1-001', type: 'realization' },
    { id: 'r-113', source: 'proc-l1-004', target: 'cap-l1-006', type: 'realization' },
    { id: 'r-114', source: 'proc-l1-005', target: 'cap-l1-004', type: 'realization' },
    { id: 'r-115', source: 'proc-l1-006', target: 'cap-l1-005', type: 'realization' },
    { id: 'r-116', source: 'proc-l1-007', target: 'cap-l1-008', type: 'realization' },
    { id: 'r-117', source: 'proc-l1-008', target: 'cap-l1-009', type: 'realization' },
    { id: 'r-118', source: 'proc-l1-009', target: 'cap-l1-010', type: 'realization' },
    { id: 'r-119', source: 'proc-l1-010', target: 'cap-l1-011', type: 'realization' },
    { id: 'r-120', source: 'proc-l1-005', target: 'cap-l1-015', type: 'realization' },
    { id: 'r-121', source: 'proc-l1-005', target: 'cap-l1-016', type: 'realization' },
    { id: 'r-122', source: 'proc-l1-003', target: 'cap-l2-001', type: 'realization' },

    // --- Organizations -> Processes (assignment) ---
    { id: 'r-130', source: 'org-003', target: 'proc-l1-001', type: 'assignment' },
    { id: 'r-131', source: 'org-003', target: 'proc-l1-002', type: 'assignment' },
    { id: 'r-132', source: 'org-002', target: 'proc-l1-003', type: 'assignment' },
    { id: 'r-133', source: 'org-004', target: 'proc-l1-004', type: 'assignment' },
    { id: 'r-134', source: 'org-005', target: 'proc-l1-005', type: 'assignment' },
    { id: 'r-135', source: 'org-003', target: 'proc-l1-006', type: 'assignment' },
    { id: 'r-136', source: 'org-003', target: 'proc-l1-007', type: 'assignment' },
    { id: 'r-137', source: 'org-006', target: 'proc-l1-008', type: 'assignment' },
    { id: 'r-138', source: 'org-002', target: 'proc-l1-009', type: 'assignment' },
    { id: 'r-139', source: 'org-002', target: 'proc-l1-010', type: 'assignment' },
    { id: 'r-140', source: 'org-001', target: 'proc-l1-009', type: 'assignment' },
    { id: 'r-141', source: 'org-007', target: 'cap-l1-012', type: 'realization' },
    { id: 'r-142', source: 'org-009', target: 'cap-l1-013', type: 'realization' },
    { id: 'r-143', source: 'org-008', target: 'cap-l1-014', type: 'realization' },
    // Org hierarchy
    { id: 'r-144', source: 'org-001', target: 'org-002', type: 'composition' },
    { id: 'r-145', source: 'org-001', target: 'org-003', type: 'composition' },
    { id: 'r-146', source: 'org-001', target: 'org-004', type: 'composition' },
    { id: 'r-147', source: 'org-001', target: 'org-005', type: 'composition' },
    { id: 'r-148', source: 'org-001', target: 'org-006', type: 'composition' },
    { id: 'r-149', source: 'org-001', target: 'org-007', type: 'composition' },
    { id: 'r-150', source: 'org-001', target: 'org-008', type: 'composition' },
    { id: 'r-151', source: 'org-001', target: 'org-009', type: 'composition' },

    // --- Roles -> Processes (assignment) ---
    { id: 'r-160', source: 'role-001', target: 'proc-l1-001', type: 'assignment' },
    { id: 'r-161', source: 'role-002', target: 'proc-l1-003', type: 'assignment' },
    { id: 'r-162', source: 'role-003', target: 'proc-l1-005', type: 'assignment' },
    { id: 'r-163', source: 'role-004', target: 'proc-l1-004', type: 'assignment' },
    { id: 'r-164', source: 'role-005', target: 'proc-l1-002', type: 'assignment' },
    { id: 'r-165', source: 'role-006', target: 'proc-l1-006', type: 'assignment' },
    { id: 'r-166', source: 'role-007', target: 'proc-l1-008', type: 'assignment' },
    { id: 'r-167', source: 'role-008', target: 'proc-l1-010', type: 'assignment' },
    { id: 'r-168', source: 'role-009', target: 'cap-l1-012', type: 'assignment' },
    { id: 'r-169', source: 'role-010', target: 'cap-l1-012', type: 'assignment' },
    // Roles belong to orgs
    { id: 'r-170', source: 'org-003', target: 'role-001', type: 'composition' },
    { id: 'r-171', source: 'org-002', target: 'role-002', type: 'composition' },
    { id: 'r-172', source: 'org-005', target: 'role-003', type: 'composition' },
    { id: 'r-173', source: 'org-004', target: 'role-004', type: 'composition' },
    { id: 'r-174', source: 'org-003', target: 'role-005', type: 'composition' },
    { id: 'r-175', source: 'org-003', target: 'role-006', type: 'composition' },
    { id: 'r-176', source: 'org-006', target: 'role-007', type: 'composition' },
    { id: 'r-177', source: 'org-002', target: 'role-008', type: 'composition' },
    { id: 'r-178', source: 'org-007', target: 'role-009', type: 'composition' },
    { id: 'r-179', source: 'org-007', target: 'role-010', type: 'composition' },

    // --- Business Objects -> Processes (access: processes create/use business objects) ---
    { id: 'r-200', source: 'proc-l2-002', target: 'bobj-001', type: 'access' },  // Platsbesök skapar Inspektionsrapport
    { id: 'r-201', source: 'proc-l3-006', target: 'bobj-002', type: 'access' },  // Ta livsmedelprov skapar Livsmedelsprov
    { id: 'r-202', source: 'proc-l2-009', target: 'bobj-003', type: 'access' },  // Värdera risk skapar Riskvärderingsrapport
    { id: 'r-203', source: 'proc-l2-007', target: 'bobj-004', type: 'access' },  // Fatta tillståndsbeslut skapar Myndighetsbeslut
    { id: 'r-204', source: 'proc-l2-004', target: 'bobj-004', type: 'access' },  // Fatta åtgärdsbeslut skapar Myndighetsbeslut
    { id: 'r-205', source: 'proc-l2-005', target: 'bobj-005', type: 'access' },  // Mottaga ansökan använder Tillståndsansökan
    { id: 'r-206', source: 'proc-l2-012', target: 'bobj-006', type: 'access' },  // Rapportera RASFF skapar RASFF-anmälan
    { id: 'r-207', source: 'proc-l1-004', target: 'bobj-007', type: 'access' },  // Utbrottsutredning skapar Utbrottsrapport
    { id: 'r-208', source: 'proc-l2-017', target: 'bobj-008', type: 'access' },  // Utfärda exportcertifikat skapar Exportcertifikat
    { id: 'r-209', source: 'proc-l2-016', target: 'bobj-009', type: 'access' },  // Gränskontroll använder Importdeklaration
    { id: 'r-210', source: 'proc-l2-015', target: 'bobj-010', type: 'access' },  // Rapportera resultat skapar Laboratorierapport
    { id: 'r-211', source: 'proc-l3-002', target: 'bobj-011', type: 'access' },  // Riskklassa företag skapar Riskprofil
    { id: 'r-212', source: 'proc-l2-003', target: 'bobj-012', type: 'access' },  // Dokumentera avvikelse: skapar Åtgärdsplan
    { id: 'r-213', source: 'proc-l2-019', target: 'bobj-013', type: 'access' },  // Publicera kostråd skapar Kostråd
    { id: 'r-214', source: 'proc-l1-009', target: 'bobj-014', type: 'access' },  // Regelgivning skapar Föreskrift
    { id: 'r-215', source: 'proc-l2-018', target: 'bobj-015', type: 'access' },  // Inspektera vattenverk använder Dricksvattenprov
    { id: 'r-216', source: 'proc-l3-009', target: 'bobj-015', type: 'access' },  // Skicka provförpackning använder Dricksvattenprov
    { id: 'r-217', source: 'proc-l1-010', target: 'bobj-016', type: 'access' },  // Forskning skapar Zoonosrapport
    { id: 'r-218', source: 'proc-l2-008', target: 'bobj-017', type: 'access' },  // Identifiera fara skapar Vetenskapligt yttrande
    { id: 'r-219', source: 'proc-l2-020', target: 'bobj-018', type: 'access' },  // Besvara konsumentfrågor skapar Klagomålsärende
    { id: 'r-220', source: 'proc-l2-006', target: 'bobj-019', type: 'access' },  // Granska ansökan använder Egenkontrollprogram
    { id: 'r-221', source: 'proc-l1-004', target: 'bobj-020', type: 'access' },  // Utbrottsutredning skapar Återkallelsemeddelande

    // --- Additional BusinessObjects -> Processes (access) ---
    { id: 'r-800', source: 'proc-l2-001', target: 'bobj-021', type: 'access' },  // Planera kontroll skapar Kontrollplan
    { id: 'r-801', source: 'proc-l3-003', target: 'bobj-022', type: 'access' },  // Genomföra inspektion skapar Avvikelserapport
    { id: 'r-802', source: 'proc-l2-004', target: 'bobj-023', type: 'access' },  // Fatta åtgärdsbeslut skapar Föreläggande
    { id: 'r-803', source: 'proc-l2-004', target: 'bobj-024', type: 'access' },  // Fatta åtgärdsbeslut skapar Förbudsföreläggande
    { id: 'r-804', source: 'proc-l2-004', target: 'bobj-025', type: 'access' },  // Fatta åtgärdsbeslut skapar Sanktionsavgiftsbeslut
    { id: 'r-805', source: 'proc-l2-003', target: 'bobj-026', type: 'access' },  // Dokumentera avvikelse skapar Uppföljningsrapport
    { id: 'r-806', source: 'proc-l2-001', target: 'bobj-027', type: 'access' },  // Riskbasera planering skapar Kontrollfrekvensplan
    { id: 'r-807', source: 'proc-l2-003', target: 'bobj-028', type: 'access' },  // Dokumentera revision skapar Revisionsdokument
    { id: 'r-808', source: 'proc-l3-004', target: 'bobj-029', type: 'access' },  // Inspektera med checklista skapar Inspektionschecklista
    { id: 'r-809', source: 'proc-l2-003', target: 'bobj-030', type: 'access' },  // Dokumentera avvikelse skapar Varningsskrivelse
    { id: 'r-810', source: 'proc-l1-001', target: 'bobj-031', type: 'access' },  // Kontroll skapar Informationsbrev
    { id: 'r-811', source: 'proc-l1-009', target: 'bobj-032', type: 'access' },  // Regelgivning skapar Yttrande till domstol
    { id: 'r-812', source: 'proc-l2-004', target: 'bobj-033', type: 'access' },  // Fatta beslut skapar Polisanmälan
    { id: 'r-813', source: 'proc-l1-001', target: 'bobj-034', type: 'access' },  // Kontroll skapar NCP-kontrollrapport
    { id: 'r-814', source: 'proc-l1-001', target: 'bobj-035', type: 'access' },  // Kontroll skapar Kontrollstatistik
    { id: 'r-815', source: 'proc-l2-005', target: 'bobj-036', type: 'access' },  // Mottaga registrering skapar Registreringsbevis
    { id: 'r-816', source: 'proc-l2-007', target: 'bobj-037', type: 'access' },  // Fatta tillståndsbeslut skapar Godkännandebevis
    { id: 'r-817', source: 'proc-l2-006', target: 'bobj-038', type: 'access' },  // Granska ansökan : HACCP-plan
    { id: 'r-818', source: 'proc-l2-006', target: 'bobj-039', type: 'access' },  // Granska ansökan : Flödesschema
    { id: 'r-819', source: 'proc-l2-002', target: 'bobj-040', type: 'access' },  // Platsbesök kontrollerar Rengöringsprotokoll
    { id: 'r-820', source: 'proc-l2-002', target: 'bobj-041', type: 'access' },  // Platsbesök kontrollerar Temperaturlogg
    { id: 'r-821', source: 'proc-l2-003', target: 'bobj-042', type: 'access' },  // Dokumentera avvikelse - Spårbarhetsdokumentation
    { id: 'r-822', source: 'proc-l2-006', target: 'bobj-043', type: 'access' },  // Granska ansökan använder Leverantörsintyg
    { id: 'r-823', source: 'proc-l2-002', target: 'bobj-044', type: 'access' },  // Platsbesök kontrollerar Skadedjursprotokoll
    { id: 'r-824', source: 'proc-l2-002', target: 'bobj-045', type: 'access' },  // Platsbesök kontrollerar Vattenanalys
    { id: 'r-825', source: 'proc-l2-006', target: 'bobj-046', type: 'access' },  // Granska ansökan: Novel food
    { id: 'r-826', source: 'proc-l1-002', target: 'bobj-047', type: 'access' },  // Tillstånd: Anrikningsanmälan
    { id: 'r-827', source: 'proc-l1-002', target: 'bobj-049', type: 'access' },  // Tillstånd: Specialkostanmälan
    { id: 'r-828', source: 'proc-l2-005', target: 'bobj-050', type: 'access' },  // Mottaga ansökan: Verksamhetsbeskrivning
    { id: 'r-829', source: 'proc-l2-013', target: 'bobj-051', type: 'access' },  // Ta emot prov: Analysbeställning
    { id: 'r-830', source: 'proc-l3-010', target: 'bobj-052', type: 'access' },  // Förbereda analys: Analysprotokoll
    { id: 'r-831', source: 'proc-l1-005', target: 'bobj-053', type: 'access' },  // Laboratorium: Kalibreringscertifikat
    { id: 'r-832', source: 'proc-l1-005', target: 'bobj-054', type: 'access' },  // Laboratorium: Metodvalidering
    { id: 'r-833', source: 'proc-l1-005', target: 'bobj-055', type: 'access' },  // Laboratorium: Ackrediteringscertifikat
    { id: 'r-834', source: 'proc-l1-005', target: 'bobj-056', type: 'access' },  // Laboratorium: Ringprovsresultat
    { id: 'r-835', source: 'proc-l2-013', target: 'bobj-057', type: 'access' },  // Provtagning: Provtagningsplan
    { id: 'r-836', source: 'proc-l3-006', target: 'bobj-058', type: 'access' },  // Ta prov: Provtagningsprotokoll
    { id: 'r-837', source: 'proc-l1-003', target: 'bobj-059', type: 'access' },  // Riskbedömning: Gränsvärdesunderlag
    { id: 'r-838', source: 'proc-l2-014', target: 'bobj-060', type: 'access' },  // Analysera prov: Screening-rapport
    { id: 'r-839', source: 'proc-l2-014', target: 'bobj-061', type: 'access' },  // Analysera prov: Kemirapport
    { id: 'r-840', source: 'proc-l2-014', target: 'bobj-062', type: 'access' },  // Analysera prov: Mikrobiologirapport
    { id: 'r-841', source: 'proc-l2-014', target: 'bobj-063', type: 'access' },  // Analysera prov: Allergenanalys
    { id: 'r-842', source: 'proc-l2-013', target: 'bobj-064', type: 'access' },  // Provta: Resthaltsrapport
    { id: 'r-843', source: 'proc-l1-005', target: 'bobj-065', type: 'access' },  // Laboratorium: Statistisk analysrapport
    { id: 'r-844', source: 'proc-l2-017', target: 'bobj-066', type: 'access' },  // Utfärda certifikat: Hälsocertifikat
    { id: 'r-845', source: 'proc-l2-016', target: 'bobj-067', type: 'access' },  // Gränskontroll: Sändningsdokumentation
    { id: 'r-846', source: 'proc-l2-016', target: 'bobj-068', type: 'access' },  // Gränskontroll: Gränskontrollbeslut
    { id: 'r-847', source: 'proc-l1-006', target: 'bobj-069', type: 'access' },  // Import/Export: Importkontrollplan
    { id: 'r-848', source: 'proc-l2-016', target: 'bobj-070', type: 'access' },  // Gränskontroll: Frigivningsbeslut
    { id: 'r-849', source: 'proc-l2-016', target: 'bobj-071', type: 'access' },  // Gränskontroll: Stoppbeslut
    { id: 'r-850', source: 'proc-l1-006', target: 'bobj-072', type: 'access' },  // Import/Export: Tredjelandslista
    { id: 'r-851', source: 'proc-l2-016', target: 'bobj-073', type: 'access' },  // Gränskontroll: TRACES-posting
    { id: 'r-852', source: 'proc-l2-016', target: 'bobj-074', type: 'access' },  // Gränskontroll: Ursprungsintyg
    { id: 'r-853', source: 'proc-l1-006', target: 'bobj-075', type: 'access' },  // Import/Export: Importörregistrering
    { id: 'r-854', source: 'proc-l2-017', target: 'bobj-076', type: 'access' },  // Export: Export-direktiv Sverige
    { id: 'r-855', source: 'proc-l1-006', target: 'bobj-077', type: 'access' },  // Import/Export: Gränskontrollrapport EU
    { id: 'r-856', source: 'proc-l2-017', target: 'bobj-078', type: 'access' },  // Export: Djurhälsointyg
    { id: 'r-857', source: 'proc-l1-004', target: 'bobj-079', type: 'access' },  // Utbrott/kris: Krisledningsplan
    { id: 'r-858', source: 'proc-l2-010', target: 'bobj-080', type: 'access' },  // Identifiera utbrott: Incidentrapport
    { id: 'r-859', source: 'proc-l2-011', target: 'bobj-081', type: 'access' },  // Utreda smittkälla: Smittspårningsrapport
    { id: 'r-860', source: 'proc-l1-008', target: 'bobj-082', type: 'access' },  // Kommunikation: Pressmeddelande
    { id: 'r-861', source: 'proc-l1-008', target: 'bobj-083', type: 'access' },  // Kommunikation: Konsumentvarning
    { id: 'r-862', source: 'proc-l2-011', target: 'bobj-084', type: 'access' },  // Utreda smittkälla: Epidemiologisk kurva
    { id: 'r-863', source: 'proc-l2-012', target: 'bobj-085', type: 'access' },  // RASFF/kris-åtgärd: Åtgärdsbeslut kris
    { id: 'r-864', source: 'proc-l1-004', target: 'bobj-086', type: 'access' },  // Utbrott: Slutrapport
    { id: 'r-865', source: 'proc-l2-012', target: 'bobj-087', type: 'access' },  // RASFF: EWRS-notifiering
    { id: 'r-866', source: 'proc-l1-004', target: 'bobj-088', type: 'access' },  // Utbrott: Krisutvärdering
    { id: 'r-867', source: 'proc-l1-004', target: 'bobj-089', type: 'access' },  // Kris: Beredskapslista
    { id: 'r-868', source: 'proc-l1-004', target: 'bobj-090', type: 'access' },  // Kris: Övningsrapport
    { id: 'r-869', source: 'proc-l1-007', target: 'bobj-091', type: 'access' },  // Dricksvatten: Dricksvattenutredning
    { id: 'r-870', source: 'proc-l1-007', target: 'bobj-092', type: 'access' },  // Dricksvatten: Vattenverksregister
    { id: 'r-871', source: 'proc-l1-007', target: 'bobj-093', type: 'access' },  // Dricksvatten: Direktivrapport
    { id: 'r-872', source: 'proc-l2-018', target: 'bobj-094', type: 'access' },  // Inspektera vattenverk: Analysfrekvensplan
    { id: 'r-873', source: 'proc-l2-018', target: 'bobj-095', type: 'access' },  // Inspektera vattenverk: Åtgärdsgräns
    { id: 'r-874', source: 'proc-l1-007', target: 'bobj-096', type: 'access' },  // Dricksvatten: Råvattenbedömning
    { id: 'r-875', source: 'proc-l2-018', target: 'bobj-097', type: 'access' },  // Vattenverk: Kontrollprogram
    { id: 'r-876', source: 'proc-l1-007', target: 'bobj-098', type: 'access' },  // Dricksvatten: Vattenkvalitetsintyg
    { id: 'r-877', source: 'proc-l2-020', target: 'bobj-099', type: 'access' },  // Besvara frågor: Näringsvärdesdeklaration
    { id: 'r-878', source: 'proc-l1-001', target: 'bobj-100', type: 'access' },  // Kontroll: Märkningskontrollrapport
    { id: 'r-879', source: 'proc-l1-008', target: 'bobj-101', type: 'access' },  // Kommunikation: Hälsopåståendebedömning
    { id: 'r-880', source: 'proc-l1-010', target: 'bobj-102', type: 'access' },  // Forskning: Matvanneundersökning
    { id: 'r-881', source: 'proc-l1-010', target: 'bobj-103', type: 'access' },  // Forskning: Näringsstudie
    { id: 'r-882', source: 'proc-l1-010', target: 'bobj-104', type: 'access' },  // Forskning: Folkhälsorapport
    { id: 'r-883', source: 'proc-l1-008', target: 'bobj-105', type: 'access' },  // Kommunikation: Kommunikationsplan
    { id: 'r-884', source: 'proc-l1-008', target: 'bobj-106', type: 'access' },  // Kommunikation: Kampanjmaterial
    { id: 'r-885', source: 'proc-l2-020', target: 'bobj-107', type: 'access' },  // Besvara frågor: FAQ-dokument
    { id: 'r-886', source: 'proc-l1-008', target: 'bobj-108', type: 'access' },  // Kommunikation: Årsrapport
    { id: 'r-887', source: 'proc-l1-008', target: 'bobj-109', type: 'access' },  // Kommunikation: Allergendatabas
    { id: 'r-888', source: 'proc-l2-019', target: 'bobj-110', type: 'access' },  // Publicera råd: Webbinnehåll
    { id: 'r-889', source: 'proc-l1-009', target: 'bobj-111', type: 'access' },  // Regelgivning: Remissvar
    { id: 'r-890', source: 'proc-l1-009', target: 'bobj-112', type: 'access' },  // Regelgivning: Vägledningsdokument
    { id: 'r-891', source: 'proc-l1-009', target: 'bobj-113', type: 'access' },  // Regelgivning: Tolkningsbesked
    { id: 'r-892', source: 'proc-l1-009', target: 'bobj-114', type: 'access' },  // Regelgivning: Konsekvensutredning
    { id: 'r-893', source: 'proc-l1-009', target: 'bobj-115', type: 'access' },  // Regelgivning: EU-förordningstexter
    { id: 'r-894', source: 'proc-l1-009', target: 'bobj-116', type: 'access' },  // Regelgivning: Rättsutredning
    { id: 'r-895', source: 'proc-l1-009', target: 'bobj-117', type: 'access' },  // Regelgivning: Överklagandebeslut
    { id: 'r-896', source: 'proc-l1-006', target: 'bobj-118', type: 'access' },  // Import/Export: Internationellt avtal
    { id: 'r-897', source: 'proc-l1-001', target: 'bobj-119', type: 'access' },  // Kontroll: EU-revision-rapport
    { id: 'r-898', source: 'cap-l1-013', target: 'bobj-120', type: 'access' },  // Ekonomistyrning: Regleringsbrev
    { id: 'r-899', source: 'proc-l1-010', target: 'bobj-121', type: 'access' },  // Forskning: Övervakningsprogram
    { id: 'r-900', source: 'proc-l1-010', target: 'bobj-122', type: 'access' },  // Forskning: Övervakningsresultat
    { id: 'r-901', source: 'proc-l1-010', target: 'bobj-123', type: 'access' },  // Forskning: Trendanalysrapport
    { id: 'r-902', source: 'proc-l2-014', target: 'bobj-124', type: 'access' },  // Analyse: Kontaminantrapport
    { id: 'r-903', source: 'proc-l2-013', target: 'bobj-125', type: 'access' },  // Provta: Bekämpningsmedelsrapport
    { id: 'r-904', source: 'proc-l1-010', target: 'bobj-126', type: 'access' },  // Forskning: AMR-rapport
    { id: 'r-905', source: 'proc-l1-010', target: 'bobj-127', type: 'access' },  // Forskning: Nationell EFSA-rapport
    { id: 'r-906', source: 'proc-l1-001', target: 'bobj-128', type: 'access' },  // Kontroll: Livsmedelsstatistik
    { id: 'r-907', source: 'proc-l1-003', target: 'bobj-129', type: 'access' },  // Riskbedömning: Riskprofil-ämne
    { id: 'r-908', source: 'proc-l1-010', target: 'bobj-130', type: 'access' },  // Forskning: Djursjukdomsrapport

    // --- Additional BusinessObjects -> Apps ---
    { id: 'r-910', source: 'app-001', target: 'bobj-022', type: 'access' },  // eKontroll: Avvikelserapport
    { id: 'r-911', source: 'app-001', target: 'bobj-023', type: 'access' },  // eKontroll: Föreläggande
    { id: 'r-912', source: 'app-001', target: 'bobj-025', type: 'access' },  // eKontroll: Sanktionsavgift
    { id: 'r-913', source: 'app-008', target: 'bobj-025', type: 'access' },  // Ärendehantering: Sanktionsavgift
    { id: 'r-914', source: 'app-001', target: 'bobj-035', type: 'access' },  // eKontroll: Kontrollstatistik
    { id: 'r-915', source: 'app-035', target: 'bobj-036', type: 'access' },  // Ärendehantering: Registreringsbevis
    { id: 'r-916', source: 'app-035', target: 'bobj-037', type: 'access' },  // Ärendehantering: Godkännandebevis
    { id: 'r-917', source: 'app-024', target: 'bobj-052', type: 'access' },  // LIMS: Analysprotokoll
    { id: 'r-918', source: 'app-024', target: 'bobj-057', type: 'access' },  // LIMS: Provtagningsplan
    { id: 'r-919', source: 'app-024', target: 'bobj-062', type: 'access' },  // LIMS: Mikrobiologirapport
    { id: 'r-920', source: 'app-024', target: 'bobj-063', type: 'access' },  // LIMS: Allergenanalysrapport
    { id: 'r-921', source: 'app-024', target: 'bobj-064', type: 'access' },  // LIMS: Resthaltsrapport
    { id: 'r-922', source: 'app-039', target: 'bobj-067', type: 'access' },  // Import/Export system: Sändningsdokumentation
    { id: 'r-923', source: 'app-039', target: 'bobj-073', type: 'access' },  // Import/Export system: TRACES
    { id: 'r-924', source: 'app-017', target: 'bobj-080', type: 'access' },  // Outbreak mgmt: Incidentrapport
    { id: 'r-925', source: 'app-017', target: 'bobj-081', type: 'access' },  // Outbreak mgmt: Smittspårningsrapport
    { id: 'r-926', source: 'app-049', target: 'bobj-083', type: 'access' },  // Webbplats: Konsumentvarning
    { id: 'r-927', source: 'app-049', target: 'bobj-082', type: 'access' },  // Webbplats: Pressmeddelande
    { id: 'r-928', source: 'app-045', target: 'bobj-097', type: 'access' },  // Vattenapp: Kontrollprogram-vatten
    { id: 'r-929', source: 'app-052', target: 'bobj-110', type: 'access' },  // CMS: Webbinnehåll
    { id: 'r-930', source: 'app-052', target: 'bobj-112', type: 'access' },  // CMS: Vägledningsdokument
    { id: 'r-931', source: 'app-056', target: 'bobj-121', type: 'access' },  // Forskning: Övervakningsprogram
    { id: 'r-932', source: 'app-056', target: 'bobj-128', type: 'access' },  // Forskning: Livsmedelsstatistik
    { id: 'r-933', source: 'app-004', target: 'bobj-027', type: 'access' },  // Riskklassificering: Kontrollfrekvensplan
    { id: 'r-934', source: 'app-003', target: 'bobj-028', type: 'access' },  // Revision: Revisionsdokument
    { id: 'r-935', source: 'app-016', target: 'bobj-087', type: 'access' },  // RASFF: EWRS-notifiering
    { id: 'r-936', source: 'app-016', target: 'bobj-085', type: 'access' },  // RASFF: Åtgärdsbeslut kris

    // --- Additional BusinessObjects -> Roles ---
    { id: 'r-940', source: 'role-001', target: 'bobj-022', type: 'access' },  // Inspektör: Avvikelserapport
    { id: 'r-941', source: 'role-001', target: 'bobj-023', type: 'access' },  // Inspektör: Föreläggande
    { id: 'r-942', source: 'role-001', target: 'bobj-029', type: 'access' },  // Inspektör: Checklista
    { id: 'r-943', source: 'role-005', target: 'bobj-036', type: 'access' },  // Tillståndshandläggare: Registreringsbevis
    { id: 'r-944', source: 'role-005', target: 'bobj-037', type: 'access' },  // Tillståndshandläggare: Godkännandebevis
    { id: 'r-945', source: 'role-003', target: 'bobj-052', type: 'access' },  // Analytiker: Analysprotokoll
    { id: 'r-946', source: 'role-003', target: 'bobj-062', type: 'access' },  // Analytiker: Mikrobiologirapport
    { id: 'r-947', source: 'role-003', target: 'bobj-063', type: 'access' },  // Analytiker: Allergenanalys
    { id: 'r-948', source: 'role-004', target: 'bobj-081', type: 'access' },  // Utbrottsutredare: Smittspårningsrapport
    { id: 'r-949', source: 'role-004', target: 'bobj-084', type: 'access' },  // Utbrottsutredare: Epidemiologisk kurva
    { id: 'r-950', source: 'role-006', target: 'bobj-066', type: 'access' },  // Import/Export: Hälsocertifikat
    { id: 'r-951', source: 'role-006', target: 'bobj-078', type: 'access' },  // Import/Export: Djurhälsointyg
    { id: 'r-952', source: 'role-007', target: 'bobj-105', type: 'access' },  // Kommunikatör: Kommunikationsplan
    { id: 'r-953', source: 'role-007', target: 'bobj-106', type: 'access' },  // Kommunikatör: Kampanjmaterial
    { id: 'r-954', source: 'role-008', target: 'bobj-102', type: 'access' },  // Forskare: Matvanneundersökning
    { id: 'r-955', source: 'role-008', target: 'bobj-121', type: 'access' },  // Forskare: Övervakningsprogram
    { id: 'r-956', source: 'role-002', target: 'bobj-059', type: 'access' },  // Riskbedömare: Gränsvärdesunderlag
    { id: 'r-957', source: 'role-002', target: 'bobj-129', type: 'access' },  // Riskbedömare: Riskprofil-ämne

    // --- BusinessObjects -> BusinessObjects (composition / flow) ---
    { id: 'r-960', source: 'bobj-011', target: 'bobj-021', type: 'influence' },  // Riskprofil styr Kontrollplan
    { id: 'r-961', source: 'bobj-022', target: 'bobj-023', type: 'influence' },  // Avvikelserapport leder till Föreläggande
    { id: 'r-962', source: 'bobj-023', target: 'bobj-012', type: 'influence' },  // Föreläggande leder till Åtgärdsplan
    { id: 'r-963', source: 'bobj-012', target: 'bobj-026', type: 'influence' },  // Åtgärdsplan → Uppföljningsrapport
    { id: 'r-964', source: 'bobj-038', target: 'bobj-019', type: 'composition' },  // HACCP-plan ingår i Egenkontrollprogram
    { id: 'r-965', source: 'bobj-058', target: 'bobj-002', type: 'composition' },  // Provtagningsprotokoll dokumenterar Livsmedelsprov
    { id: 'r-966', source: 'bobj-010', target: 'bobj-003', type: 'influence' },  // Laboratorierapport informerar Riskvärdering
    { id: 'r-967', source: 'bobj-003', target: 'bobj-017', type: 'composition' },  // Riskvärdering ingår i Vetenskapligt yttrande
    { id: 'r-968', source: 'bobj-062', target: 'bobj-006', type: 'influence' },  // Mikrobiologirapport utlöser RASFF
    { id: 'r-969', source: 'bobj-006', target: 'bobj-087', type: 'flow' },       // RASFF genererar EWRS-notifiering
    { id: 'r-970', source: 'bobj-007', target: 'bobj-086', type: 'composition' },  // Utbrottsrapport ingår i Slutrapport-utbrott
    { id: 'r-971', source: 'bobj-014', target: 'bobj-112', type: 'influence' },  // Föreskrift implementeras i Vägledning
    { id: 'r-972', source: 'bobj-057', target: 'bobj-021', type: 'influence' },  // Provtagningsplan styr Kontrollplan
    { id: 'r-973', source: 'bobj-064', target: 'bobj-125', type: 'composition' },  // Resthaltsrapport ingår i Bekämpningsmedelsrapport
    { id: 'r-974', source: 'bobj-128', target: 'bobj-108', type: 'composition' },  // Statistik ingår i Årsrapport
    { id: 'r-975', source: 'bobj-016', target: 'bobj-127', type: 'composition' },  // Zoonosrapport ingår i EFSA-rapport

    // --- Additional BusinessObjects -> Capabilities ---
    { id: 'r-980', source: 'cap-l1-001', target: 'bobj-003', type: 'access' },  // Riskbedömning kap: Riskvärdering
    { id: 'r-981', source: 'cap-l1-007', target: 'bobj-121', type: 'access' },  // Zoonoser kap: Övervakningsprogram
    { id: 'r-982', source: 'cap-l1-009', target: 'bobj-113', type: 'access' },  // Information kap: Tolkningsbesked
    { id: 'r-983', source: 'cap-l1-010', target: 'bobj-114', type: 'access' },  // Regelgivning kap: Konsekvensutredning
    { id: 'r-984', source: 'cap-l2-005', target: 'bobj-125', type: 'access' },  // Pesticider kap: Bekämpningsmedelsrapport
    { id: 'r-985', source: 'cap-l2-009', target: 'bobj-092', type: 'access' },  // Vatten kap: Vattenverksregister
    { id: 'r-986', source: 'cap-l1-016', target: 'bobj-124', type: 'access' },  // Kontaminanter: Kontaminantrapport
    { id: 'r-987', source: 'cap-l2-012', target: 'bobj-126', type: 'access' },  // AMR kap: AMR-rapport

    // --- Apps -> Business Objects (apps manage business objects) ---
    { id: 'r-230', source: 'app-001', target: 'bobj-001', type: 'access' },  // eKontroll hanterar Inspektionsrapporter
    { id: 'r-231', source: 'app-005', target: 'bobj-001', type: 'access' },  // Mobil kontrollapp skapar Inspektionsrapporter
    { id: 'r-232', source: 'app-024', target: 'bobj-010', type: 'access' }, // LIMS hanterar Laboratorier
    { id: 'r-233', source: 'app-016', target: 'bobj-006', type: 'access' }, // RASFF hanterar RASFF-anmälningar
    { id: 'r-234', source: 'app-035', target: 'bobj-005', type: 'access' }, // Ärendehantering hanterar Tillståndsansökningar
    { id: 'r-235', source: 'app-041', target: 'bobj-008', type: 'access' }, // Exportcertifikat app hanterar Exportcertifikat
    { id: 'r-236', source: 'app-017', target: 'bobj-007', type: 'access' }, // Utbrottshantering hanterar Utbrottsrapporter
    { id: 'r-237', source: 'app-020', target: 'bobj-020', type: 'access' }, // Återkallelsesystem hanterar Återkallelsemeddelanden
    { id: 'r-238', source: 'app-004', target: 'bobj-011', type: 'access' }, // Riskklassificering skapar Riskprofiler
    { id: 'r-239', source: 'app-049', target: 'bobj-013', type: 'access' }, // Webbplats publicerar Kostråd
    { id: 'r-240', source: 'app-049', target: 'bobj-020', type: 'access' }, // Webbplats publicerar Återkallelsemeddelanden
    { id: 'r-241', source: 'app-052', target: 'bobj-014', type: 'access' }, // CMS publicerar Föreskrifter

    // --- Business Objects -> Roles (roles produce/consume business objects) ---
    { id: 'r-250', source: 'role-001', target: 'bobj-001', type: 'access' },  // Inspektör skapar Inspektionsrapport
    { id: 'r-251', source: 'role-001', target: 'bobj-002', type: 'access' },  // Inspektör tar Livsmedelsprov
    { id: 'r-252', source: 'role-001', target: 'bobj-011', type: 'access' },  // Inspektör skapar Riskprofil
    { id: 'r-253', source: 'role-002', target: 'bobj-003', type: 'access' },  // Riskbedömare skapar Riskvärderingsrapport
    { id: 'r-254', source: 'role-002', target: 'bobj-017', type: 'access' },  // Riskbedömare skapar Vetenskapligt yttrande
    { id: 'r-255', source: 'role-003', target: 'bobj-010', type: 'access' },  // Analytiker skapar Laboratorierapport
    { id: 'r-256', source: 'role-004', target: 'bobj-007', type: 'access' },  // Utbrottsutredare skapar Utbrottsrapport
    { id: 'r-257', source: 'role-004', target: 'bobj-006', type: 'access' },  // Utbrottsutredare skapar RASFF-anmälan
    { id: 'r-258', source: 'role-005', target: 'bobj-004', type: 'access' },  // Tillståndshandläggare skapar Myndighetsbeslut
    { id: 'r-259', source: 'role-006', target: 'bobj-008', type: 'access' },  // Import/Export hanterar Exportcertifikat
    { id: 'r-260', source: 'role-006', target: 'bobj-009', type: 'access' },  // Import/Export granskar Importdeklaration
    { id: 'r-261', source: 'role-007', target: 'bobj-013', type: 'access' },  // Kommunikatör publicerar Kostråd
    { id: 'r-262', source: 'role-008', target: 'bobj-016', type: 'access' },  // Forskare skapar Zoonosrapport

    // --- Applications -> Processes (serving) ---
    { id: 'r-300', source: 'app-001', target: 'proc-l1-001', type: 'serving' },
    { id: 'r-301', source: 'app-002', target: 'proc-l1-001', type: 'serving' },
    { id: 'r-302', source: 'app-003', target: 'proc-l2-003', type: 'serving' },
    { id: 'r-303', source: 'app-004', target: 'proc-l2-001', type: 'serving' },
    { id: 'r-304', source: 'app-005', target: 'proc-l2-002', type: 'serving' },
    { id: 'r-305', source: 'app-006', target: 'proc-l2-001', type: 'serving' },
    { id: 'r-306', source: 'app-007', target: 'proc-l1-001', type: 'serving' },
    { id: 'r-307', source: 'app-008', target: 'proc-l2-004', type: 'serving' },
    { id: 'r-308', source: 'app-009', target: 'proc-l1-001', type: 'serving' },
    { id: 'r-309', source: 'app-010', target: 'proc-l1-001', type: 'serving' },
    { id: 'r-310', source: 'app-011', target: 'proc-l3-003', type: 'serving' },
    { id: 'r-311', source: 'app-012', target: 'proc-l1-002', type: 'serving' },
    { id: 'r-312', source: 'app-013', target: 'proc-l2-015', type: 'serving' },
    { id: 'r-313', source: 'app-014', target: 'proc-l1-001', type: 'serving' },
    { id: 'r-314', source: 'app-015', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-315', source: 'app-016', target: 'proc-l2-012', type: 'serving' },
    { id: 'r-316', source: 'app-017', target: 'proc-l1-004', type: 'serving' },
    { id: 'r-317', source: 'app-018', target: 'proc-l2-011', type: 'serving' },
    { id: 'r-318', source: 'app-019', target: 'proc-l1-004', type: 'serving' },
    { id: 'r-319', source: 'app-020', target: 'proc-l1-004', type: 'serving' },
    { id: 'r-320', source: 'app-021', target: 'proc-l2-010', type: 'serving' },
    { id: 'r-321', source: 'app-022', target: 'proc-l2-011', type: 'serving' },
    { id: 'r-322', source: 'app-023', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-323', source: 'app-024', target: 'proc-l1-005', type: 'serving' },
    { id: 'r-324', source: 'app-025', target: 'proc-l2-013', type: 'serving' },
    { id: 'r-325', source: 'app-026', target: 'proc-l3-010', type: 'serving' },
    { id: 'r-326', source: 'app-027', target: 'proc-l3-011', type: 'serving' },
    { id: 'r-327', source: 'app-028', target: 'proc-l2-014', type: 'serving' },
    { id: 'r-328', source: 'app-029', target: 'proc-l2-014', type: 'serving' },
    { id: 'r-329', source: 'app-030', target: 'proc-l2-013', type: 'serving' },
    { id: 'r-330', source: 'app-031', target: 'proc-l2-015', type: 'serving' },
    { id: 'r-331', source: 'app-032', target: 'proc-l2-014', type: 'serving' },
    { id: 'r-332', source: 'app-033', target: 'proc-l3-012', type: 'serving' },
    { id: 'r-333', source: 'app-034', target: 'proc-l1-002', type: 'serving' },
    { id: 'r-334', source: 'app-035', target: 'proc-l2-005', type: 'serving' },
    { id: 'r-335', source: 'app-035', target: 'proc-l2-006', type: 'serving' },
    { id: 'r-336', source: 'app-035', target: 'proc-l2-007', type: 'serving' },
    { id: 'r-337', source: 'app-036', target: 'proc-l1-002', type: 'serving' },
    { id: 'r-338', source: 'app-037', target: 'proc-l2-006', type: 'serving' },
    { id: 'r-339', source: 'app-038', target: 'proc-l2-007', type: 'serving' },
    { id: 'r-340', source: 'app-039', target: 'proc-l1-006', type: 'serving' },
    { id: 'r-341', source: 'app-040', target: 'proc-l2-016', type: 'serving' },
    { id: 'r-342', source: 'app-041', target: 'proc-l2-017', type: 'serving' },
    { id: 'r-343', source: 'app-042', target: 'proc-l1-006', type: 'serving' },
    { id: 'r-344', source: 'app-043', target: 'proc-l2-017', type: 'serving' },
    { id: 'r-345', source: 'app-044', target: 'proc-l1-006', type: 'serving' },
    { id: 'r-346', source: 'app-045', target: 'proc-l1-007', type: 'serving' },
    { id: 'r-347', source: 'app-046', target: 'proc-l2-018', type: 'serving' },
    { id: 'r-348', source: 'app-047', target: 'proc-l1-007', type: 'serving' },
    { id: 'r-349', source: 'app-048', target: 'proc-l1-007', type: 'serving' },
    { id: 'r-350', source: 'app-049', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-351', source: 'app-050', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-352', source: 'app-051', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-353', source: 'app-052', target: 'proc-l2-019', type: 'serving' },
    { id: 'r-354', source: 'app-053', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-355', source: 'app-054', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-356', source: 'app-055', target: 'proc-l1-008', type: 'serving' },
    { id: 'r-357', source: 'app-056', target: 'proc-l1-010', type: 'serving' },
    { id: 'r-358', source: 'app-057', target: 'proc-l1-010', type: 'serving' },
    { id: 'r-359', source: 'app-058', target: 'proc-l1-010', type: 'serving' },
    { id: 'r-360', source: 'app-059', target: 'proc-l1-005', type: 'serving' },
    { id: 'r-361', source: 'app-060', target: 'proc-l1-010', type: 'serving' },
    { id: 'r-362', source: 'app-061', target: 'cap-l1-013', type: 'serving' },
    { id: 'r-363', source: 'app-062', target: 'cap-l1-014', type: 'serving' },
    { id: 'r-364', source: 'app-063', target: 'cap-l1-014', type: 'serving' },
    { id: 'r-365', source: 'app-064', target: 'proc-l1-001', type: 'serving' },
    { id: 'r-366', source: 'app-065', target: 'cap-l1-012', type: 'serving' },
    { id: 'r-367', source: 'app-066', target: 'proc-l1-004', type: 'serving' },
    { id: 'r-368', source: 'app-067', target: 'cap-l1-013', type: 'serving' },
    { id: 'r-369', source: 'app-068', target: 'cap-l1-014', type: 'serving' },
    { id: 'r-370', source: 'app-069', target: 'cap-l1-014', type: 'serving' },
    { id: 'r-371', source: 'app-070', target: 'cap-l1-012', type: 'serving' },
    { id: 'r-372', source: 'app-071', target: 'cap-l1-012', type: 'serving' },
    { id: 'r-373', source: 'app-072', target: 'cap-l1-012', type: 'serving' },

    // --- Applications -> Data Objects (access) ---
    { id: 'r-400', source: 'app-001', target: 'data-002', type: 'access' },
    { id: 'r-401', source: 'app-002', target: 'data-001', type: 'access' },
    { id: 'r-402', source: 'app-003', target: 'data-005', type: 'access' },
    { id: 'r-403', source: 'app-004', target: 'data-001', type: 'access' },
    { id: 'r-404', source: 'app-005', target: 'data-002', type: 'access' },
    { id: 'r-405', source: 'app-009', target: 'data-009', type: 'access' },
    { id: 'r-406', source: 'app-016', target: 'data-007', type: 'access' },
    { id: 'r-407', source: 'app-017', target: 'data-007', type: 'access' },
    { id: 'r-408', source: 'app-018', target: 'data-007', type: 'access' },
    { id: 'r-409', source: 'app-022', target: 'data-008', type: 'access' },
    { id: 'r-410', source: 'app-024', target: 'data-003', type: 'access' },
    { id: 'r-411', source: 'app-024', target: 'data-006', type: 'access' },
    { id: 'r-412', source: 'app-026', target: 'data-003', type: 'access' },
    { id: 'r-413', source: 'app-027', target: 'data-003', type: 'access' },
    { id: 'r-414', source: 'app-034', target: 'data-004', type: 'access' },
    { id: 'r-415', source: 'app-035', target: 'data-004', type: 'access' },
    { id: 'r-416', source: 'app-039', target: 'data-008', type: 'access' },
    { id: 'r-417', source: 'app-040', target: 'data-008', type: 'access' },
    { id: 'r-418', source: 'app-045', target: 'data-010', type: 'access' },
    { id: 'r-419', source: 'app-046', target: 'data-010', type: 'access' },
    { id: 'r-420', source: 'app-047', target: 'data-010', type: 'access' },
    { id: 'r-421', source: 'app-056', target: 'data-011', type: 'access' },
    { id: 'r-422', source: 'app-057', target: 'data-012', type: 'access' },
    { id: 'r-423', source: 'app-055', target: 'data-012', type: 'access' },
    { id: 'r-424', source: 'app-059', target: 'data-006', type: 'access' },

    // --- Technology -> Applications (assignment / realization) ---
    { id: 'r-500', source: 'tech-001', target: 'app-001', type: 'assignment' },
    { id: 'r-501', source: 'tech-001', target: 'app-005', type: 'assignment' },
    { id: 'r-502', source: 'tech-001', target: 'app-016', type: 'assignment' },
    { id: 'r-503', source: 'tech-001', target: 'app-034', type: 'assignment' },
    { id: 'r-504', source: 'tech-001', target: 'app-049', type: 'assignment' },
    { id: 'r-505', source: 'tech-001', target: 'app-050', type: 'assignment' },
    { id: 'r-506', source: 'tech-001', target: 'app-055', type: 'assignment' },
    { id: 'r-507', source: 'tech-001', target: 'app-064', type: 'assignment' },
    { id: 'r-508', source: 'tech-001', target: 'app-065', type: 'assignment' },
    { id: 'r-509', source: 'tech-001', target: 'app-066', type: 'assignment' },
    { id: 'r-510', source: 'tech-002', target: 'app-002', type: 'assignment' },
    { id: 'r-511', source: 'tech-002', target: 'app-024', type: 'assignment' },
    { id: 'r-512', source: 'tech-002', target: 'app-035', type: 'assignment' },
    { id: 'r-513', source: 'tech-002', target: 'app-061', type: 'assignment' },
    { id: 'r-514', source: 'tech-002', target: 'app-062', type: 'assignment' },
    { id: 'r-515', source: 'tech-003', target: 'app-001', type: 'realization' },
    { id: 'r-516', source: 'tech-003', target: 'app-024', type: 'realization' },
    { id: 'r-517', source: 'tech-003', target: 'app-061', type: 'realization' },
    { id: 'r-518', source: 'tech-004', target: 'app-002', type: 'realization' },
    { id: 'r-519', source: 'tech-004', target: 'app-045', type: 'realization' },
    { id: 'r-520', source: 'tech-005', target: 'app-001', type: 'realization' },
    { id: 'r-521', source: 'tech-005', target: 'app-034', type: 'realization' },
    { id: 'r-522', source: 'tech-006', target: 'app-071', type: 'realization' },
    { id: 'r-523', source: 'tech-006', target: 'app-072', type: 'realization' },
    { id: 'r-524', source: 'tech-007', target: 'tech-002', type: 'assignment' },
    { id: 'r-525', source: 'tech-008', target: 'tech-001', type: 'assignment' },
    { id: 'r-526', source: 'tech-009', target: 'tech-001', type: 'serving' },
    { id: 'r-527', source: 'tech-009', target: 'tech-002', type: 'serving' },
    { id: 'r-528', source: 'tech-010', target: 'tech-002', type: 'serving' },

    // --- Application data flows ---
    { id: 'r-600', source: 'app-001', target: 'app-071', type: 'flow' },
    { id: 'r-601', source: 'app-002', target: 'app-001', type: 'flow' },
    { id: 'r-602', source: 'app-003', target: 'app-001', type: 'flow' },
    { id: 'r-603', source: 'app-005', target: 'app-001', type: 'flow' },
    { id: 'r-604', source: 'app-024', target: 'app-001', type: 'flow' },
    { id: 'r-605', source: 'app-016', target: 'app-017', type: 'flow' },
    { id: 'r-606', source: 'app-017', target: 'app-023', type: 'flow' },
    { id: 'r-607', source: 'app-034', target: 'app-035', type: 'flow' },
    { id: 'r-608', source: 'app-035', target: 'app-002', type: 'flow' },
    { id: 'r-609', source: 'app-039', target: 'app-040', type: 'flow' },
    { id: 'r-610', source: 'app-049', target: 'app-052', type: 'flow' },
    { id: 'r-611', source: 'app-071', target: 'app-039', type: 'flow' },
    { id: 'r-612', source: 'app-071', target: 'app-016', type: 'flow' },
    { id: 'r-613', source: 'app-071', target: 'app-061', type: 'flow' },
    { id: 'r-614', source: 'app-071', target: 'app-062', type: 'flow' },
    { id: 'r-615', source: 'app-025', target: 'app-024', type: 'flow' },
    { id: 'r-616', source: 'app-028', target: 'app-026', type: 'flow' },
    { id: 'r-617', source: 'app-029', target: 'app-024', type: 'flow' },
    { id: 'r-618', source: 'app-033', target: 'app-024', type: 'flow' },
    { id: 'r-619', source: 'app-072', target: 'app-055', type: 'flow' },
    { id: 'r-620', source: 'app-060', target: 'app-049', type: 'flow' },

    // --- Projects -> Applications / Capabilities (realization) ---
    { id: 'r-700', source: 'proj-001', target: 'app-001', type: 'realization' },
    { id: 'r-701', source: 'proj-001', target: 'app-003', type: 'realization' },
    { id: 'r-701b', source: 'proj-001', target: 'proc-l1-002', type: 'influence' },
    { id: 'r-701c', source: 'proj-001', target: 'cap-l1-002', type: 'realization' },
    { id: 'r-702', source: 'proj-002', target: 'app-005', type: 'realization' },
    { id: 'r-703', source: 'proj-002', target: 'app-050', type: 'realization' },
    { id: 'r-703b', source: 'proj-002', target: 'cap-l1-002', type: 'influence' },
    { id: 'r-703c', source: 'proj-002', target: 'role-004', type: 'influence' },
    { id: 'r-704', source: 'proj-003', target: 'app-004', type: 'realization' },
    { id: 'r-705', source: 'proj-003', target: 'cap-l2-001', type: 'realization' },
    { id: 'r-705b', source: 'proj-003', target: 'cap-l1-001', type: 'realization' },
    { id: 'r-705c', source: 'proj-003', target: 'proc-l1-001', type: 'influence' },
    { id: 'r-706', source: 'proj-004', target: 'app-024', type: 'realization' },
    { id: 'r-707', source: 'proj-004', target: 'app-025', type: 'realization' },
    { id: 'r-707b', source: 'proj-004', target: 'cap-l1-004', type: 'realization' },
    { id: 'r-707c', source: 'proj-004', target: 'proc-l1-003', type: 'influence' },
    { id: 'r-708', source: 'proj-005', target: 'tech-001', type: 'realization' },
    { id: 'r-709', source: 'proj-005', target: 'tech-006', type: 'realization' },
    { id: 'r-709b', source: 'proj-005', target: 'cap-l1-012', type: 'realization' },
    { id: 'r-710', source: 'proj-006', target: 'cap-l0-007', type: 'influence' },
    { id: 'r-711', source: 'proj-006', target: 'principle-005', type: 'realization' },
    { id: 'r-711b', source: 'proj-006', target: 'cap-l1-006', type: 'realization' },
    { id: 'r-711c', source: 'proj-006', target: 'tech-001', type: 'influence' },
    { id: 'r-712', source: 'proj-007', target: 'principle-004', type: 'realization' },
    { id: 'r-713', source: 'proj-007', target: 'goal-003', type: 'influence' },
    { id: 'r-713b', source: 'proj-007', target: 'driver-003', type: 'realization' },
    { id: 'r-713c', source: 'proj-007', target: 'cap-l0-007', type: 'realization' },
    { id: 'r-714', source: 'proj-008', target: 'app-071', type: 'realization' },
    { id: 'r-715', source: 'proj-008', target: 'app-072', type: 'realization' },
    { id: 'r-715b', source: 'proj-008', target: 'cap-l1-012', type: 'realization' },
    { id: 'r-715c', source: 'proj-008', target: 'app-001', type: 'serving' },
    { id: 'r-715d', source: 'proj-008', target: 'app-003', type: 'serving' },

    // --- Project-to-project dependencies (flow = upstream/downstream) ---
    { id: 'r-720', source: 'proj-001', target: 'proj-002', type: 'flow' },
    { id: 'r-721', source: 'proj-008', target: 'proj-007', type: 'flow' },
    { id: 'r-722', source: 'proj-005', target: 'proj-006', type: 'association' },
    { id: 'r-723', source: 'proj-004', target: 'proj-003', type: 'flow' },

    // --- Project → Goal (realization = project directly realizes strategic goal) ---
    { id: 'r-730', source: 'proj-001', target: 'goal-003', type: 'realization' },
    { id: 'r-731', source: 'proj-002', target: 'goal-003', type: 'realization' },
    { id: 'r-732', source: 'proj-003', target: 'goal-001', type: 'realization' },
    { id: 'r-733', source: 'proj-003', target: 'goal-003', type: 'realization' },
    { id: 'r-734', source: 'proj-004', target: 'goal-001', type: 'realization' },
    { id: 'r-735', source: 'proj-005', target: 'goal-003', type: 'realization' },
    { id: 'r-736', source: 'proj-006', target: 'goal-004', type: 'realization' },
    { id: 'r-737', source: 'proj-006', target: 'driver-005', type: 'realization' },
    { id: 'r-738', source: 'proj-007', target: 'goal-003', type: 'realization' },
    { id: 'r-739', source: 'proj-007', target: 'goal-002', type: 'realization' },
    { id: 'r-740', source: 'proj-007', target: 'driver-003', type: 'realization' },
    { id: 'r-741', source: 'proj-008', target: 'goal-003', type: 'realization' },

    // --- Project → Gap (realization = project closes architectural gap) ---
    { id: 'r-750', source: 'proj-001', target: 'gap-001', type: 'realization' },
    { id: 'r-751', source: 'proj-002', target: 'gap-003', type: 'realization' },
    { id: 'r-752', source: 'proj-003', target: 'gap-002', type: 'realization' },
    { id: 'r-753', source: 'proj-004', target: 'gap-001', type: 'association' },
    { id: 'r-754', source: 'proj-005', target: 'gap-004', type: 'realization' },
    { id: 'r-755', source: 'proj-006', target: 'gap-006', type: 'realization' },
    { id: 'r-756', source: 'proj-007', target: 'gap-001', type: 'realization' },
    { id: 'r-757', source: 'proj-007', target: 'gap-005', type: 'realization' },
    { id: 'r-758', source: 'proj-008', target: 'gap-004', type: 'realization' },

    // --- Plateau associations ---
    { id: 'r-760', source: 'plateau-current', target: 'gap-001', type: 'association' },
    { id: 'r-761', source: 'plateau-current', target: 'gap-002', type: 'association' },
    { id: 'r-762', source: 'plateau-current', target: 'gap-003', type: 'association' },
    { id: 'r-763', source: 'plateau-current', target: 'gap-004', type: 'association' },
    { id: 'r-764', source: 'plateau-target',  target: 'proj-007', type: 'realization' },
    { id: 'r-765', source: 'plateau-transition', target: 'proj-005', type: 'realization' },
    { id: 'r-766', source: 'plateau-transition', target: 'proj-008', type: 'realization' },
  ],

  resourceAllocations: [
    // eKontroll 2.0 (proj-001) 2025-01 → 2026-12
    { id: 'alloc-001', project_id: 'proj-001', resource_id: 'res-001', role: 'Projektledare',        start_month: '2025-01', end_month: '2026-12', allocation_percent: 80 },
    { id: 'alloc-002', project_id: 'proj-001', resource_id: 'res-007', role: 'UX-designer',           start_month: '2025-01', end_month: '2026-06', allocation_percent: 70 },
    { id: 'alloc-003', project_id: 'proj-001', resource_id: 'res-008', role: 'Backend-utvecklare',    start_month: '2025-01', end_month: '2026-12', allocation_percent: 100 },

    // Mobil-först (proj-002) 2026-06 → 2027-12
    { id: 'alloc-004', project_id: 'proj-002', resource_id: 'res-002', role: 'Projektledare',        start_month: '2026-06', end_month: '2027-12', allocation_percent: 80 },
    { id: 'alloc-005', project_id: 'proj-002', resource_id: 'res-007', role: 'UX/Mobildesigner',     start_month: '2026-09', end_month: '2027-12', allocation_percent: 90 },
    { id: 'alloc-006', project_id: 'proj-002', resource_id: 'res-008', role: 'Mobil-utvecklare',     start_month: '2026-09', end_month: '2027-12', allocation_percent: 80 },

    // AI Risk-analys (proj-003) 2026-09 → 2028-12
    { id: 'alloc-007', project_id: 'proj-003', resource_id: 'res-004', role: 'AI/ML-arkitekt',       start_month: '2026-09', end_month: '2028-12', allocation_percent: 100 },
    { id: 'alloc-008', project_id: 'proj-003', resource_id: 'res-002', role: 'Tekn. projektledare',  start_month: '2026-09', end_month: '2028-06', allocation_percent: 50 },

    // LIMS-uppgradering (proj-004) 2025-06 → 2026-06
    { id: 'alloc-009', project_id: 'proj-004', resource_id: 'res-001', role: 'Projektledare',        start_month: '2025-06', end_month: '2026-06', allocation_percent: 60 },
    { id: 'alloc-010', project_id: 'proj-004', resource_id: 'res-008', role: 'Systemintegratör',     start_month: '2025-09', end_month: '2026-06', allocation_percent: 60 },

    // Cloud-migrering (proj-005) 2024-03 → 2027-12
    { id: 'alloc-011', project_id: 'proj-005', resource_id: 'res-003', role: 'Cloud-arkitekt',       start_month: '2024-03', end_month: '2027-12', allocation_percent: 100 },
    { id: 'alloc-012', project_id: 'proj-005', resource_id: 'res-008', role: 'Infrastrukturutvecklare', start_month: '2025-01', end_month: '2026-06', allocation_percent: 40 },

    // Cybersäkerhet 2025 (proj-006) 2025-01 → 2026-06
    { id: 'alloc-013', project_id: 'proj-006', resource_id: 'res-005', role: 'Säkerhetsarkitekt',    start_month: '2025-01', end_month: '2026-06', allocation_percent: 100 },
    { id: 'alloc-014', project_id: 'proj-006', resource_id: 'res-003', role: 'Säkerhetsrådgivare',   start_month: '2025-01', end_month: '2025-12', allocation_percent: 30 },

    // Digital Först-strategi (proj-007) 2026-01 → 2029-12
    { id: 'alloc-015', project_id: 'proj-007', resource_id: 'res-006', role: 'Programledare',        start_month: '2026-01', end_month: '2029-12', allocation_percent: 100 },
    { id: 'alloc-016', project_id: 'proj-007', resource_id: 'res-004', role: 'Dataarkitekt',         start_month: '2027-01', end_month: '2029-12', allocation_percent: 60 },

    // Integration Platform (proj-008) 2025-03 → 2026-12
    { id: 'alloc-017', project_id: 'proj-008', resource_id: 'res-003', role: 'Integrationsarkitekt', start_month: '2025-03', end_month: '2026-12', allocation_percent: 70 },
    { id: 'alloc-018', project_id: 'proj-008', resource_id: 'res-002', role: 'Tekn. projektledare',  start_month: '2025-03', end_month: '2026-12', allocation_percent: 60 },
  ]
};

export default sampleData;
