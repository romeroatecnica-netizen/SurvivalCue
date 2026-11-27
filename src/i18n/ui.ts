import type {LangCode} from '../config/seo';
import type {BadgeDefinition, CategoryId} from '../types';

export interface UiStrings {
  brandName: string;
  heroTitle: string;
  heroSubtitle: string;
  nav: {
    missions: string;
    academy: string;
    visualDrill: string;
    challenge: string;
    clinic: string;
    profile: string;
  };
  categories: Record<CategoryId | 'all', string>;
  meters: {
    selfProtection: string;
    resources: string;
    orientation: string;
  };
  layers: {
    hazards: string;
    routes: string;
    gridCompass: string;
    labels: string;
    nightMode: string;
    zoomIn: string;
    zoomOut: string;
    resetView: string;
  };
  controls: {
    startMission: string;
    resumeMission: string;
    nextStage: string;
    finishMission: string;
    retryMission: string;
    backToCatalog: string;
    timedMode: string;
    studyMode: string;
    secondsLeft: string;
    clickSketchHint: string;
    optimalChoice: string;
    suboptimalChoice: string;
    stageProgress: string;
    xpReward: string;
    completedLabel: string;
    difficulty: string;
    minutesShort: string;
    filterByCategory: string;
    openLesson: string;
    markMastered: string;
    lessonMastered: string;
    checkAnswer: string;
    nextChallenge: string;
    challengeSolved: string;
    challengeWrong: string;
    startClinicDrill: string;
    clearMistake: string;
    noMistakesYet: string;
    weakestCategoryLabel: string;
  };
  profile: {
    title: string;
    activeProfile: string;
    rank: string;
    xp: string;
    streak: string;
    days: string;
    globalMastery: string;
    categoryMastery: string;
    badgesTitle: string;
    historyTitle: string;
    createProfilePlaceholder: string;
    createProfileBtn: string;
    renameProfileBtn: string;
    deleteProfileBtn: string;
    exportJson: string;
    importJson: string;
    importSuccess: string;
    importError: string;
    resetWarning: string;
    missionsCompletedCount: string;
    lessonsCompletedCount: string;
    challengesCompletedCount: string;
  };
  ranks: [string, string, string, string, string];
  gear: {
    sectionTitle: string;
    sectionSubtitle: string;
    disclosure: string;
    ctaLabel: string;
    items: Array<{
      id: string;
      category: CategoryId;
      title: string;
      spec: string;
      reason: string;
      url: string;
    }>;
  };
  editorial: {
    title: string;
    lead: string;
    pillars: Array<{title: string; body: string}>;
    faqTitle: string;
    faqs: Array<{q: string; a: string}>;
  };
  footer: {
    disclaimerTitle: string;
    disclaimerBody: string;
    canonicalNotice: string;
  };
  challenge: {
    title: string;
    subtitle: string;
    incomingBannerTitle: string;
    challengerLabel: string;
    targetScoreLabel: string;
    targetTimeLabel: string;
    seedLabel: string;
    trialCountLabel: string;
    paceLabel: string;
    paceHard: string;
    paceStandard: string;
    rotateSeedBtn: string;
    acceptChallengeBtn: string;
    startSoloBtn: string;
    copyLinkBtn: string;
    copiedFeedback: string;
    shareNativeBtn: string;
    sharePromptLabel: string;
    trialLabel: string;
    timeoutNotice: string;
    nextTrialBtn: string;
    finishGauntletBtn: string;
    duelVictory: string;
    duelTie: string;
    duelDefeat: string;
    yourScore: string;
    yourTime: string;
    xpEarned: string;
    rematchBtn: string;
    rematchNote: string;
    dismissIncomingBtn: string;
    previewListLabel: string;
  };
  adLabel: string;
}

const EN_UI: UiStrings = {
  brandName: 'SurvivalCue',
  heroTitle: 'Interactive Emergency, Blackout & Survival Simulator',
  heroSubtitle:
    'Train multi-stage civil protection, 72-hour power outages, natural disasters, urban hazards, and wilderness survival directly on reactive vector maps and cross-sections.',
  nav: {
    missions: 'Missions',
    academy: 'Academy',
    visualDrill: 'Visual Drill',
    challenge: 'Challenge',
    clinic: 'Clinic',
    profile: 'Progress',
  },
  categories: {
    all: 'All Sectors',
    blackout: 'Blackouts & Grid',
    disaster: 'Natural Disasters',
    urban: 'Urban & Road',
    wilderness: 'Wilderness Survival',
  },
  meters: {
    selfProtection: 'Self-Protection',
    resources: 'Resources & Power',
    orientation: 'Orientation & Control',
  },
  layers: {
    hazards: 'Hazard Layer',
    routes: 'Routes & Vectors',
    gridCompass: 'Grid & Compass',
    labels: 'Tech Labels',
    nightMode: 'Blackout Night Mode',
    zoomIn: 'Inspect 1.35×',
    zoomOut: 'Standard 1×',
    resetView: 'Reset View',
  },
  controls: {
    startMission: 'Start Mission',
    resumeMission: 'Replay Mission',
    nextStage: 'Next Phase',
    finishMission: 'View Debrief',
    retryMission: 'Retry Scenario',
    backToCatalog: 'All Missions',
    timedMode: '45s Drill Timer',
    studyMode: 'Untimed Study',
    secondsLeft: 's left',
    clickSketchHint: 'Click a hotspot directly on the diagram or choose an action card below.',
    optimalChoice: 'Optimal Protocol',
    suboptimalChoice: 'Suboptimal / Risk Detected',
    stageProgress: 'Phase',
    xpReward: 'XP',
    completedLabel: 'Completed',
    difficulty: 'Level',
    minutesShort: 'min',
    filterByCategory: 'Sector Filter',
    openLesson: 'Open Interactive Sketch',
    markMastered: 'Verify Micro-Challenge',
    lessonMastered: 'Mastered',
    checkAnswer: 'Verify Action',
    nextChallenge: 'Next Visual Challenge',
    challengeSolved: 'Target Identified Correctly',
    challengeWrong: 'Incorrect Zone — Review Tactical Rationale',
    startClinicDrill: 'Launch Targeted Drill',
    clearMistake: 'Mark Reviewed',
    noMistakesYet: 'Zero unresolved errors recorded. Complete missions or target your lowest-mastery sector below.',
    weakestCategoryLabel: 'Lowest Mastery Sector',
  },
  profile: {
    title: 'Local Readiness Profile & Telemetry',
    activeProfile: 'Active Profile',
    rank: 'Readiness Rank',
    xp: 'Total XP',
    streak: 'Daily Streak',
    days: 'days',
    globalMastery: 'Global Readiness Mastery',
    categoryMastery: 'Sector Mastery Breakdown',
    badgesTitle: 'Earned Field Badges',
    historyTitle: 'Completed Operations & Lessons',
    createProfilePlaceholder: 'New profile name...',
    createProfileBtn: 'Create Profile',
    renameProfileBtn: 'Rename',
    deleteProfileBtn: 'Delete',
    exportJson: 'Export JSON Backup',
    importJson: 'Import JSON Backup',
    importSuccess: 'Progress backup restored successfully.',
    importError: 'Invalid JSON backup file. No data was modified.',
    resetWarning: '100% browser-local storage. No account or external API required.',
    missionsCompletedCount: 'Missions',
    lessonsCompletedCount: 'Lessons',
    challengesCompletedCount: 'Visual Drills',
  },
  ranks: ['Novice', 'Preventive', 'Field Operative', 'Tactical Coordinator', 'Resilience Commander'],
  gear: {
    sectionTitle: '72-Hour Readiness Kit Reference',
    sectionSubtitle: 'Contextual baseline equipment aligned with civil protection checklists.',
    disclosure: 'Sponsored / affiliate reference links open safely in a new tab.',
    ctaLabel: 'Inspect Spec',
    items: [
      {
        id: 'gear-radio',
        category: 'blackout',
        title: 'NOAA / FM Hand-Crank & Solar Emergency Radio',
        spec: 'Dynamo + 2000mAh USB powerbank + SOS beacon',
        reason: 'Maintains civil defense bulletins when cellular towers lose backup power.',
        url: 'https://www.amazon.com/s?k=emergency+hand+crank+solar+weather+radio',
      },
      {
        id: 'gear-headlamp',
        category: 'blackout',
        title: 'IPX6 Dual-Beam LED Headlamp (Red Night Mode)',
        spec: '350 lm + 18650/AAA dual-fuel + red low-signature beam',
        reason: 'Keeps both hands free for circuit breakers, stairs, and first aid in total darkness.',
        url: 'https://www.amazon.com/s?k=waterproof+led+headlamp+red+light+mode',
      },
      {
        id: 'gear-filter',
        category: 'wilderness',
        title: '0.1-Micron Hollow-Fiber Water Filter System',
        spec: 'Gravity/squeeze capable · 99.9999% bacteria & protozoa removal',
        reason: 'Produces safe drinking water from turbid sources when boiling fuel is scarce.',
        url: 'https://www.amazon.com/s?k=hollow+fiber+water+filter+emergency',
      },
      {
        id: 'gear-ifak',
        category: 'urban',
        title: 'Compact Trauma & First Aid Kit (IFAK)',
        spec: 'CAT-style tourniquet, compression bandage, shears, nitrile gloves',
        reason: 'Controls severe hemorrhage and lacerations during seismic debris or road collisions.',
        url: 'https://www.amazon.com/s?k=trauma+first+aid+kit+ifak+tourniquet',
      },
      {
        id: 'gear-power',
        category: 'disaster',
        title: 'LiFePO4 Portable Power Station (300–500Wh)',
        spec: 'Pure sine-wave AC + USB-C PD + solar MPPT input',
        reason: 'Powers CPAP/medical devices, comms, and freezer cycles safely indoors without CO risk.',
        url: 'https://www.amazon.com/s?k=lifepo4+portable+power+station+solar',
      },
      {
        id: 'gear-manual',
        category: 'wilderness',
        title: 'Waterproof Pocket Civil Protection & Knot Field Guide',
        spec: 'Tear-resistant synthetic pages · zero battery dependency',
        reason: 'Preserves triage, water dosing, and rigging diagrams when screens fail.',
        url: 'https://www.amazon.com/s?k=waterproof+survival+pocket+field+guide',
      },
    ],
  },
  editorial: {
    title: 'Why Visual Simulation Builds Real Emergency Muscle Memory',
    lead: 'In blackouts, earthquakes, flash floods, and off-grid incidents, cognitive tunnel vision degrades checklist recall within seconds. Interactive vector staging links spatial landmarks—breaker panels, gas shutoffs, flood contours, wind vectors, and thermal shelter layers—directly to rapid decision sequencing.',
    pillars: [
      {
        title: 'Grid Continuity & 72-Hour Blackout Protocols',
        body: 'Prevent carbon monoxide poisoning from indoor generators, isolate sensitive electronics against restoration surges, preserve refrigerator cold mass for 24–48 hours, and establish offline family muster plans.',
      },
      {
        title: 'Natural Disaster Spatial Triage',
        body: 'Practice immediate Drop-Cover-Hold structural selection, post-quake gas leak isolation, avoiding floodwater conduits in vehicles, and tracking uphill cross-wind escape corridors in wildland-urban interface fires.',
      },
      {
        title: 'Field Craft, Water Safety & Rescue Signaling',
        body: 'Master the Rule of Threes (air, shelter, water, food), multi-stage sedimentation plus rolling-boil disinfection, tensioned knots (Bowline, Figure-8, Clove Hitch), and ground-to-air distress geometry.',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'How is my training progress stored?',
        a: 'All profiles, XP, daily streaks, badges, and mistake logs are saved locally in your browser via localStorage. You can export or restore a portable .json file anytime.',
      },
      {
        q: 'Does SurvivalCue work without an internet connection or API key?',
        a: 'Yes. Every SVG diagram, branching scenario, illustrated lesson, and visual drill runs deterministically on your device with zero external AI API calls.',
      },
      {
        q: 'How do interactive SVG hotspots work during missions?',
        a: 'Each phase displays clickable tactical zones directly inside the cross-section or topographic map. Clicking a zone highlights routes, hazard radii, or blackout flashlight beams while advancing your telemetry.',
      },
    ],
  },
  footer: {
    disclaimerTitle: 'Educational Preparedness Disclaimer',
    disclaimerBody:
      'SurvivalCue is an educational simulation tool designed to reinforce civil protection awareness and general preparedness concepts. It does not replace certified medical, firefighting, or official emergency management training. In a real emergency, call your local emergency number (112, 911, or regional dispatch) and obey civil defense authorities.',
    canonicalNotice: 'Canonical Edition · 100% Client-Side Static Simulator',
  },
  challenge: {
    title: 'Head-to-Head Link Challenge Arena',
    subtitle:
      'Play a timed gauntlet of rotating tactical dilemmas and SVG map spotters, then send a unique challenge link so friends face the exact same trials and try to beat your score.',
    incomingBannerTitle: 'Incoming Challenge Received',
    challengerLabel: 'Challenger',
    targetScoreLabel: 'Score to Beat',
    targetTimeLabel: 'Time to Beat',
    seedLabel: 'Challenge Seed',
    trialCountLabel: 'Trials',
    paceLabel: 'Per-Trial Timer',
    paceHard: '25s Hard',
    paceStandard: '35s Standard',
    rotateSeedBtn: 'New Changing Trials',
    acceptChallengeBtn: 'Accept & Start Challenge',
    startSoloBtn: 'Play & Set Benchmark Score',
    copyLinkBtn: 'Copy Challenge Link',
    copiedFeedback: 'Link copied!',
    shareNativeBtn: 'Share',
    sharePromptLabel: 'Direct Share Link (same seed & shuffled options)',
    trialLabel: 'Trial',
    timeoutNotice: 'Time expired — 0 pts recorded for this trial.',
    nextTrialBtn: 'Next Trial',
    finishGauntletBtn: 'Finish & Generate Share Link',
    duelVictory: 'Victory — You beat the challenger!',
    duelTie: 'Exact Tie — Identical score and pace!',
    duelDefeat: 'Challenger holds the lead — Send a fresh rematch!',
    yourScore: 'Your Score',
    yourTime: 'Elapsed Time',
    xpEarned: 'XP Earned',
    rematchBtn: 'New Rotating Rematch Link',
    rematchNote: 'Generates a fresh seed with different scenarios & visual tests.',
    dismissIncomingBtn: 'Create Custom Challenge Instead',
    previewListLabel: 'Seeded Trial Preview',
  },
  adLabel: 'Sponsored Placement',
};

const ES_UI: UiStrings = {
  brandName: 'SurvivalCue',
  heroTitle: 'Simulador Interactivo de Emergencias, Apagones, Catástrofes y Supervivencia',
  heroSubtitle:
    'Entrena continuidad ante apagones de 72h, terremotos, inundaciones, incendios, emergencias en ruta y supervivencia en entorno natural sobre croquis y mapas SVG reactivos.',
  nav: {
    missions: 'Misiones',
    academy: 'Academia',
    visualDrill: 'Reto Visual',
    challenge: 'Retos',
    clinic: 'Clínica',
    profile: 'Progreso',
  },
  categories: {
    all: 'Todas las áreas',
    blackout: 'Apagones y Suministros',
    disaster: 'Catástrofes Naturales',
    urban: 'Emergencias y Ruta',
    wilderness: 'Supervivencia Típica',
  },
  meters: {
    selfProtection: 'Autoprotección',
    resources: 'Recursos y Energía',
    orientation: 'Orientación y Control',
  },
  layers: {
    hazards: 'Capa de Peligro',
    routes: 'Rutas y Vectores',
    gridCompass: 'Cotas y Brújula',
    labels: 'Etiquetas Técnicas',
    nightMode: 'Modo Apagón Nocturno',
    zoomIn: 'Ampliar 1.35×',
    zoomOut: 'Vista 1×',
    resetView: 'Restablecer',
  },
  controls: {
    startMission: 'Iniciar Misión',
    resumeMission: 'Repetir Misión',
    nextStage: 'Siguiente Fase',
    finishMission: 'Ver Informe Final',
    retryMission: 'Reintentar Escenario',
    backToCatalog: 'Todas las Misiones',
    timedMode: 'Contrarreloj 45s',
    studyMode: 'Modo Estudio',
    secondsLeft: 's restantes',
    clickSketchHint: 'Pulsa directamente sobre un punto del croquis/mapa o elige una tarjeta de decisión.',
    optimalChoice: 'Protocolo Óptimo',
    suboptimalChoice: 'Riesgo / Decisión Mejorable',
    stageProgress: 'Fase',
    xpReward: 'XP',
    completedLabel: 'Completada',
    difficulty: 'Nivel',
    minutesShort: 'min',
    filterByCategory: 'Filtrar por Área',
    openLesson: 'Abrir Croquis Interactivo',
    markMastered: 'Validar Micro-Reto',
    lessonMastered: 'Dominada',
    checkAnswer: 'Comprobar Acción',
    nextChallenge: 'Siguiente Reto Visual',
    challengeSolved: 'Zona Identificada Correctamente',
    challengeWrong: 'Zona Incorrecta — Revisa el Criterio Técnico',
    startClinicDrill: 'Iniciar Entrenamiento Dirigido',
    clearMistake: 'Marcar Repasado',
    noMistakesYet: 'No hay fallos pendientes. Completa misiones o entrena tu área con menor dominio.',
    weakestCategoryLabel: 'Área con Menor Dominio',
  },
  profile: {
    title: 'Perfil Activo y Progreso Local',
    activeProfile: 'Perfil Activo',
    rank: 'Rango de Preparación',
    xp: 'XP Acumulado',
    streak: 'Racha Diaria',
    days: 'días',
    globalMastery: 'Dominio Global',
    categoryMastery: 'Progreso por Área Operativa',
    badgesTitle: 'Insignias Desbloqueadas',
    historyTitle: 'Historial de Misiones y Lecciones',
    createProfilePlaceholder: 'Nombre del nuevo perfil...',
    createProfileBtn: 'Crear Perfil',
    renameProfileBtn: 'Renombrar',
    deleteProfileBtn: 'Eliminar',
    exportJson: 'Exportar JSON',
    importJson: 'Importar JSON',
    importSuccess: 'Copia de progreso restaurada correctamente.',
    importError: 'Archivo JSON no válido. No se han modificado los datos.',
    resetWarning: 'Guardado 100 % local en tu navegador. Sin servidor ni claves de API.',
    missionsCompletedCount: 'Misiones',
    lessonsCompletedCount: 'Lecciones',
    challengesCompletedCount: 'Retos Visuales',
  },
  ranks: ['Novato', 'Preventivo', 'Operativo', 'Coordinador de Campo', 'Comandante de Resiliencia'],
  gear: {
    sectionTitle: 'Equipamiento de Referencia para Kit 72h',
    sectionSubtitle: 'Material básico alineado con guías de protección civil para apagones y evacuación.',
    disclosure: 'Enlaces patrocinados / afiliación en pestaña nueva con rel="sponsored nofollow noopener".',
    ctaLabel: 'Ver Especificación',
    items: [
      {
        id: 'gear-radio',
        category: 'blackout',
        title: 'Radio de Emergencia Manivela + Panel Solar',
        spec: 'Dinamo + batería USB 2000mAh + alerta FM/AM + baliza SOS',
        reason: 'Mantiene recepción de avisos oficiales cuando caen las antenas de telefonía.',
        url: 'https://www.amazon.es/s?k=radio+emergencia+manivela+solar',
      },
      {
        id: 'gear-headlamp',
        category: 'blackout',
        title: 'Linterna Frontal LED IPX6 con Luz Roja Nocturna',
        spec: '350 lm + doble alimentación + haz rojo de bajo consumo',
        reason: 'Deja las manos libres para manipular cuadros eléctricos, escaleras y botiquín.',
        url: 'https://www.amazon.es/s?k=linterna+frontal+led+luz+roja',
      },
      {
        id: 'gear-filter',
        category: 'wilderness',
        title: 'Filtro de Agua de Fibra Hueca 0,1 Micras',
        spec: 'Filtración mecánica sin químicos · elimina 99,9999 % bacterias y protozoos',
        reason: 'Permite potabilizar agua turbia cuando no hay combustible para hervir.',
        url: 'https://www.amazon.es/s?k=filtro+agua+supervivencia+fibra+hueca',
      },
      {
        id: 'gear-ifak',
        category: 'urban',
        title: 'Botiquín Táctico y Control de Hemorragias (IFAK)',
        spec: 'Torniquete homologado, vendaje compresivo, tijeras y guantes de nitrilo',
        reason: 'Respuesta inmediata ante cortes profundos por cristales, sismos o accidentes viales.',
        url: 'https://www.amazon.es/s?k=botiquin+emergencias+ifak+torniquete',
      },
      {
        id: 'gear-power',
        category: 'disaster',
        title: 'Estación de Energía Portátil LiFePO4 (300–500Wh)',
        spec: 'Onda sinusoidal pura + USB-C PD + carga solar MPPT',
        reason: 'Alimenta equipos médicos, comunicaciones y pequeños consumos en interior sin riesgo de CO.',
        url: 'https://www.amazon.es/s?k=estacion+energia+portatil+lifepo4',
      },
      {
        id: 'gear-manual',
        category: 'wilderness',
        title: 'Manual de Bolsillo Impermeable de Supervivencia y Nudos',
        spec: 'Páginas sintéticas resistentes al agua · cero dependencia de batería',
        reason: 'Conserva protocolos de triaje, dosificación de agua y nudos críticos sin pantalla.',
        url: 'https://www.amazon.es/s?k=manual+supervivencia+impermeable',
      },
    ],
  },
  editorial: {
    title: 'Por qué la simulación visual entrena la respuesta real ante emergencias',
    lead: 'Durante un apagón generalizado, una inundación súbita o un sismo, el estrés agudo reduce la memoria de trabajo en segundos. Asociar decisiones críticas con referencias espaciales claras —cuadro eléctrico, llave de gas, cotas de inundación, dirección del viento y capas de abrigo— consolida reflejos seguros sin depender de memorización abstracta.',
    pillars: [
      {
        title: 'Continuidad ante Apagones de 72 Horas',
        body: 'Evita intoxicaciones por monóxido de carbono al usar generadores o estufas, protege electrodomésticos frente a picos de restablecimiento, conserva la cadena de frío y organiza comunicaciones de baja energía.',
      },
      {
        title: 'Lectura Espacial de Catástrofes Naturales',
        body: 'Entrena la elección de zona estructural segura en terremotos, la evaluación de cauces y ramblas en lluvias torrenciales, y las rutas de escape perpendiculares o a barlovento en incendios forestales.',
      },
      {
        title: 'Supervivencia en Campo, Agua y Señalización',
        body: 'Domina la regla de los tres, la decantación y ebullición segura del agua, el aislamiento térmico del suelo en refugios, nudos portantes y señales internacionales tierra-aire.',
      },
    ],
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿Dónde se guarda mi progreso y mis perfiles?',
        a: 'Todo el progreso (XP, rachas, insignias, misiones superadas y clínica de fallos) se guarda de forma 100 % local en el almacenamiento del navegador (localStorage), con exportación e importación mediante archivo .json.',
      },
      {
        q: '¿Necesita servidor o clave de API para funcionar?',
        a: 'No. SurvivalCue es una aplicación estática autocontenida que ejecuta todas las simulaciones gráficas SVG y lecciones directamente en tu dispositivo.',
      },
      {
        q: '¿Cómo se interactúa con el visor gráfico?',
        a: 'Puedes hacer clic directamente sobre los puntos interactivos (hotspots) del mapa o corte transversal de vivienda, activar o desactivar capas de peligro, rutas, brújula o modo apagón nocturno con linterna.',
      },
    ],
  },
  footer: {
    disclaimerTitle: 'Descargo Educativo y de Seguridad',
    disclaimerBody:
      'SurvivalCue es una herramienta educativa de simulación y autoprotección. No sustituye la formación oficial de protección civil, bomberos ni atención médica profesional. Ante una emergencia real, llama de inmediato a los servicios de emergencia (112, 911 o equivalente local) y sigue las indicaciones de las autoridades.',
    canonicalNotice: 'Edición Canónica · Simulador Estático 100 % Local',
  },
  challenge: {
    title: 'Arena de Retos por Enlace',
    subtitle:
      'Supera una serie contrarreloj de dilemas tácticos avanzados y pruebas visuales sobre croquis SVG, y envía un enlace único para retar a alguien con las mismas pruebas.',
    incomingBannerTitle: 'Has Recibido un Reto Directo',
    challengerLabel: 'Retador',
    targetScoreLabel: 'Puntuación a Batir',
    targetTimeLabel: 'Tiempo a Batir',
    seedLabel: 'Semilla del Reto',
    trialCountLabel: 'Pruebas',
    paceLabel: 'Tiempo por Prueba',
    paceHard: '25s Difícil',
    paceStandard: '35s Estándar',
    rotateSeedBtn: 'Cambiar Pruebas (Nuevo Reto)',
    acceptChallengeBtn: 'Aceptar y Empezar Reto',
    startSoloBtn: 'Jugar y Fijar Marca',
    copyLinkBtn: 'Copiar Enlace de Reto',
    copiedFeedback: '¡Enlace copiado!',
    shareNativeBtn: 'Compartir',
    sharePromptLabel: 'Enlace Directo para Retar (mismas pruebas y orden)',
    trialLabel: 'Prueba',
    timeoutNotice: 'Tiempo agotado — 0 pts en esta prueba.',
    nextTrialBtn: 'Siguiente Prueba',
    finishGauntletBtn: 'Finalizar y Crear Enlace',
    duelVictory: '¡Victoria! Has superado la marca del retador.',
    duelTie: '¡Empate exacto en puntuación y tiempo!',
    duelDefeat: 'El retador conserva la ventaja — ¡envía una revancha nueva!',
    yourScore: 'Tu Puntuación',
    yourTime: 'Tiempo Total',
    xpEarned: 'XP Ganado',
    rematchBtn: 'Nueva Revancha (Pruebas Distintas)',
    rematchNote: 'Genera una nueva semilla con pruebas rotadas para el siguiente duelo.',
    dismissIncomingBtn: 'Configurar otro reto propio',
    previewListLabel: 'Pruebas asignadas a esta semilla',
  },
  adLabel: 'Espacio Publicitario',
};

function makeLocalizedUi(
  overrides: Partial<UiStrings> & {
    nav: UiStrings['nav'];
    categories: UiStrings['categories'];
    meters: UiStrings['meters'];
    layers: UiStrings['layers'];
    ranks: UiStrings['ranks'];
  }
): UiStrings {
  return {
    ...EN_UI,
    ...overrides,
    controls: {...EN_UI.controls, ...(overrides.controls ?? {})},
    profile: {...EN_UI.profile, ...(overrides.profile ?? {})},
    gear: {...EN_UI.gear, ...(overrides.gear ?? {})},
    editorial: {...EN_UI.editorial, ...(overrides.editorial ?? {})},
    footer: {...EN_UI.footer, ...(overrides.footer ?? {})},
    challenge: {...EN_UI.challenge, ...(overrides.challenge ?? {})},
  };
}

export const UI_TRANSLATIONS: Record<LangCode, UiStrings> = {
  en: EN_UI,
  es: ES_UI,
  fr: makeLocalizedUi({
    heroTitle: 'Simulateur Interactif d’Urgence, Panne Électrique et Survie',
    heroSubtitle:
      'Entraînez-vous aux coupures de courant 72h, séismes, inondations, incendies et survie en milieu naturel sur des plans SVG réactifs.',
    nav: {
      missions: 'Missions',
      academy: 'Académie',
      visualDrill: 'Défi Visuel',
      challenge: 'Duels',
      clinic: 'Clinique',
      profile: 'Progrès',
    },
    categories: {
      all: 'Tous secteurs',
      blackout: 'Pannes & Réseau',
      disaster: 'Catastrophes Naturelles',
      urban: 'Urgences & Route',
      wilderness: 'Survie Naturelle',
    },
    meters: {
      selfProtection: 'Autoprotection',
      resources: 'Ressources & Énergie',
      orientation: 'Orientation & Contrôle',
    },
    layers: {
      hazards: 'Couche Dangers',
      routes: 'Routes & Vecteurs',
      gridCompass: 'Grille & Boussole',
      labels: 'Étiquettes Tech',
      nightMode: 'Mode Panne Nocturne',
      zoomIn: 'Zoom 1.35×',
      zoomOut: 'Vue 1×',
      resetView: 'Réinitialiser',
    },
    controls: {
      ...EN_UI.controls,
      startMission: 'Démarrer la mission',
      resumeMission: 'Rejouer',
      nextStage: 'Phase suivante',
      finishMission: 'Voir le bilan',
      backToCatalog: 'Toutes les missions',
      timedMode: 'Chrono 45s',
      studyMode: 'Mode Étude',
      optimalChoice: 'Protocole Optimal',
      suboptimalChoice: 'Risque Détecté',
      openLesson: 'Ouvrir le Schéma',
      lessonMastered: 'Maîtrisée',
      startClinicDrill: 'Lancer l’entraînement ciblé',
    },
    profile: {
      ...EN_UI.profile,
      title: 'Profil Local et Progression',
      activeProfile: 'Profil Actif',
      rank: 'Niveau',
      xp: 'XP Total',
      streak: 'Série Quotidienne',
      days: 'jours',
      globalMastery: 'Maîtrise Globale',
      categoryMastery: 'Progression par Secteur',
      badgesTitle: 'Badges Débloqués',
      exportJson: 'Exporter JSON',
      importJson: 'Importer JSON',
    },
    ranks: ['Novice', 'Préventif', 'Opérateur', 'Coordinateur', 'Commandant'],
    editorial: {
      ...EN_UI.editorial,
      title: 'Pourquoi la simulation visuelle forge de vrais réflexes de crise',
      lead: 'Lors d’une panne électrique prolongée ou d’une catastrophe naturelle, le stress réduit la mémoire immédiate. Associer chaque décision à un repère visuel précis consolide les bons gestes.',
      faqTitle: 'Questions Fréquentes',
    },
    footer: {
      ...EN_UI.footer,
      disclaimerTitle: 'Avertissement Éducatif',
      disclaimerBody:
        'SurvivalCue est un simulateur pédagogique. En cas d’urgence réelle, appelez le 112 ou les secours locaux et suivez les consignes officielles.',
    },
    adLabel: 'Espace Sponsorisé',
  }),
  de: makeLocalizedUi({
    heroTitle: 'Interaktiver Notfall-, Blackout-, Katastrophen- & Überlebenssimulator',
    heroSubtitle:
      'Trainieren Sie 72h-Stromausfälle, Naturkatastrophen, Straßennotfälle und Outdoor-Überleben direkt auf reaktiven Vektorkarten.',
    nav: {
      missions: 'Missionen',
      academy: 'Akademie',
      visualDrill: 'Karten-Drill',
      challenge: 'Duell',
      clinic: 'Fehlerklinik',
      profile: 'Fortschritt',
    },
    categories: {
      all: 'Alle Bereiche',
      blackout: 'Blackout & Strom',
      disaster: 'Naturkatastrophen',
      urban: 'Alltag & Straße',
      wilderness: 'Wildnis-Survival',
    },
    meters: {
      selfProtection: 'Selbstschutz',
      resources: 'Ressourcen & Energie',
      orientation: 'Orientierung',
    },
    layers: {
      hazards: 'Gefahrenzone',
      routes: 'Fluchtwege',
      gridCompass: 'Raster & Kompass',
      labels: 'Beschriftung',
      nightMode: 'Blackout-Nachtmodus',
      zoomIn: 'Zoom 1.35×',
      zoomOut: 'Ansicht 1×',
      resetView: 'Zurücksetzen',
    },
    controls: {
      ...EN_UI.controls,
      startMission: 'Mission starten',
      resumeMission: 'Wiederholen',
      nextStage: 'Nächste Phase',
      finishMission: 'Auswertung',
      backToCatalog: 'Alle Missionen',
      timedMode: '45s Timer',
      studyMode: 'Lernmodus',
      optimalChoice: 'Optimales Protokoll',
      suboptimalChoice: 'Risiko erkannt',
      openLesson: 'Diagramm öffnen',
      lessonMastered: 'Gemeistert',
      startClinicDrill: 'Gezieltes Training starten',
    },
    profile: {
      ...EN_UI.profile,
      title: 'Lokales Profil & Fortschritt',
      activeProfile: 'Aktives Profil',
      rank: 'Rang',
      xp: 'Gesamt-XP',
      streak: 'Tages-Serie',
      days: 'Tage',
      globalMastery: 'Gesamtbeherrschung',
      categoryMastery: 'Fortschritt je Bereich',
      badgesTitle: 'Freigeschaltete Abzeichen',
      exportJson: 'JSON Export',
      importJson: 'JSON Import',
    },
    ranks: ['Einsteiger', 'Vorsorge', 'Einsatzkraft', 'Feldkoordinator', 'Resilienz-Leiter'],
    editorial: {
      ...EN_UI.editorial,
      title: 'Warum visuelle Simulation echte Krisenkompetenz aufbaut',
      lead: 'Bei einem großflächigen Blackout oder Erdbeben schränkt akuter Stress das Arbeitsgedächtnis ein. Reaktive Querschnitte und topografische Karten verankern sichere Handlungsabläufe.',
      faqTitle: 'Häufige Fragen',
    },
    footer: {
      ...EN_UI.footer,
      disclaimerTitle: 'Sicherheitshinweis',
      disclaimerBody:
        'SurvivalCue ist ein Bildungs- und Trainingssimulator. Wählen Sie im realen Notfall sofort 112 oder den örtlichen Notruf.',
    },
    adLabel: 'Anzeige',
  }),
  pt: makeLocalizedUi({
    heroTitle: 'Simulador Interativo de Emergências, Apagões e Sobrevivência',
    heroSubtitle:
      'Treine continuidade em apagões de 72h, catástrofes naturais, emergências urbanas e sobrevivência em campo com diagramas SVG interativos.',
    nav: {
      missions: 'Missões',
      academy: 'Academia',
      visualDrill: 'Desafio Visual',
      challenge: 'Desafios',
      clinic: 'Clínica',
      profile: 'Progresso',
    },
    categories: {
      all: 'Todas as Áreas',
      blackout: 'Apagões e Energia',
      disaster: 'Catástrofes Naturais',
      urban: 'Urbano e Estrada',
      wilderness: 'Sobrevivência',
    },
    meters: {
      selfProtection: 'Autoproteção',
      resources: 'Recursos e Energia',
      orientation: 'Orientação e Controle',
    },
    layers: {
      hazards: 'Camada de Risco',
      routes: 'Rotas e Vetores',
      gridCompass: 'Grade e Bússola',
      labels: 'Rótulos Técnicos',
      nightMode: 'Modo Apagão Noturno',
      zoomIn: 'Ampliar 1.35×',
      zoomOut: 'Vista 1×',
      resetView: 'Redefinir',
    },
    controls: {
      ...EN_UI.controls,
      startMission: 'Iniciar Missão',
      resumeMission: 'Repetir Missão',
      nextStage: 'Próxima Fase',
      finishMission: 'Ver Relatório',
      backToCatalog: 'Todas as Missões',
      timedMode: 'Cronômetro 45s',
      studyMode: 'Modo Estudo',
      optimalChoice: 'Protocolo Ideal',
      suboptimalChoice: 'Risco Detectado',
      openLesson: 'Abrir Diagrama',
      lessonMastered: 'Dominada',
      startClinicDrill: 'Iniciar Treino Direcionado',
    },
    profile: {
      ...EN_UI.profile,
      title: 'Perfil Local e Progresso',
      activeProfile: 'Perfil Ativo',
      rank: 'Patente',
      xp: 'XP Total',
      streak: 'Sequência Diária',
      days: 'dias',
      globalMastery: 'Domínio Global',
      categoryMastery: 'Progresso por Área',
      badgesTitle: 'Insígnias Conquistadas',
      exportJson: 'Exportar JSON',
      importJson: 'Importar JSON',
    },
    ranks: ['Iniciante', 'Preventivo', 'Operacional', 'Coordenador', 'Comandante'],
    footer: {
      ...EN_UI.footer,
      disclaimerTitle: 'Aviso Educativo',
      disclaimerBody:
        'SurvivalCue é uma ferramenta educativa. Em emergências reais, ligue para os serviços de emergência (112, 190/193 ou 911) e siga a Defesa Civil.',
    },
    adLabel: 'Publicidade',
  }),
  ru: makeLocalizedUi({
    heroTitle: 'Интерактивный симулятор ЧС, блэкаутов, катастроф и выживания',
    heroSubtitle:
      'Отрабатывайте действия при 72-часовом отключении электричества, землетрясениях, наводнениях, пожарах и выживании на реактивных SVG-схемах.',
    nav: {
      missions: 'Миссии',
      academy: 'Академия',
      visualDrill: 'Карта-тест',
      challenge: 'Дуэль',
      clinic: 'Разбор ошибок',
      profile: 'Прогресс',
    },
    categories: {
      all: 'Все разделы',
      blackout: 'Блэкаут и сети',
      disaster: 'Стихийные бедствия',
      urban: 'Город и дорога',
      wilderness: 'Выживание в природе',
    },
    meters: {
      selfProtection: 'Самозащита',
      resources: 'Ресурсы и энергия',
      orientation: 'Ориентация и контроль',
    },
    layers: {
      hazards: 'Слой угроз',
      routes: 'Маршруты',
      gridCompass: 'Сетка и компас',
      labels: 'Метки',
      nightMode: 'Ночной блэкаут',
      zoomIn: 'Масштаб 1.35×',
      zoomOut: 'Вид 1×',
      resetView: 'Сброс',
    },
    controls: {
      ...EN_UI.controls,
      startMission: 'Начать миссию',
      nextStage: 'Следующий этап',
      finishMission: 'Итоги',
      backToCatalog: 'Все миссии',
      timedMode: 'Таймер 45с',
      studyMode: 'Без таймера',
      optimalChoice: 'Оптимальный протокол',
      suboptimalChoice: 'Обнаружен риск',
      openLesson: 'Открыть схему',
      lessonMastered: 'Освоено',
    },
    profile: {
      ...EN_UI.profile,
      title: 'Локальный профиль и прогресс',
      activeProfile: 'Активный профиль',
      rank: 'Уровень подготовки',
      xp: 'Всего XP',
      streak: 'Серия дней',
      days: 'дн.',
      globalMastery: 'Общий уровень',
      categoryMastery: 'Прогресс по разделам',
      badgesTitle: 'Значки достижений',
      exportJson: 'Экспорт JSON',
      importJson: 'Импорт JSON',
    },
    ranks: ['Новичок', 'Подготовленный', 'Оперативник', 'Координатор', 'Мастер устойчивости'],
    adLabel: 'Реклама',
  }),
  hi: makeLocalizedUi({
    heroTitle: 'इंटरैक्टिव आपातकाल, ब्लैकआउट, आपदा और उत्तरजीविता सिम्युलेटर',
    heroSubtitle:
      '72-घंटे बिजली गुल, भूकंप, बाढ़, जंगल की आग, सड़क आपातकाल और प्राकृतिक उत्तरजीविता का इंटरैक्टिव SVG मानचित्रों पर अभ्यास करें।',
    nav: {
      missions: 'मिशन',
      academy: 'अकादमी',
      visualDrill: 'दृश्य अभ्यास',
      challenge: 'चुनौती',
      clinic: 'त्रुटि सुधार',
      profile: 'प्रगति',
    },
    categories: {
      all: 'सभी श्रेणियां',
      blackout: 'ब्लैकआउट और ऊर्जा',
      disaster: 'प्राकृतिक आपदाएं',
      urban: 'शहरी और सड़क',
      wilderness: 'जंगल उत्तरजीविता',
    },
    meters: {
      selfProtection: 'आत्मरक्षा',
      resources: 'संसाधन और ऊर्जा',
      orientation: 'दिशा और नियंत्रण',
    },
    layers: {
      hazards: 'खतरा परत',
      routes: 'मार्ग और वेक्टर',
      gridCompass: 'ग्रिड और कम्पास',
      labels: 'तकनीकी लेबल',
      nightMode: 'ब्लैकआउट नाइट मोड',
      zoomIn: 'ज़ूम 1.35×',
      zoomOut: 'सामान्य 1×',
      resetView: 'रीसेट',
    },
    controls: {
      ...EN_UI.controls,
      startMission: 'मिशन शुरू करें',
      nextStage: 'अगला चरण',
      finishMission: 'परिणाम देखें',
      backToCatalog: 'सभी मिशन',
      timedMode: '45s टाइमर',
      studyMode: 'अध्ययन मोड',
    },
    profile: {
      ...EN_UI.profile,
      title: 'स्थानीय प्रोफ़ाइल और प्रगति',
      rank: 'तैयारी स्तर',
      xp: 'कुल XP',
      streak: 'दैनिक स्ट्रीक',
      days: 'दिन',
      exportJson: 'JSON निर्यात',
      importJson: 'JSON आयात',
    },
    ranks: ['नौसिखिया', 'सतर्क', 'फील्ड ऑपरेटिव', 'समन्वयक', 'कमांडर'],
    adLabel: 'प्रायोजित स्थान',
  }),
  ar: makeLocalizedUi({
    heroTitle: 'محاكي الطوارئ وانقطاع الكهرباء والكوارث الطبيعية والبقاء التفاعلي',
    heroSubtitle:
      'تدرّب على استمرارية انقطاع الكهرباء لمدة 72 ساعة، والزلازل، والفيضانات، والحرائق، وطوارئ الطرق، والبقاء في الطبيعة عبر خرائط ومقاطع SVG تفاعلية.',
    nav: {
      missions: 'المهام',
      academy: 'الأكاديمية',
      visualDrill: 'تدريب بصري',
      challenge: 'تحدي',
      clinic: 'تحليل الأخطاء',
      profile: 'التقدم',
    },
    categories: {
      all: 'كل القطاعات',
      blackout: 'انقطاع الكهرباء',
      disaster: 'الكوارث الطبيعية',
      urban: 'الطوارئ والطرق',
      wilderness: 'البقاء في البرية',
    },
    meters: {
      selfProtection: 'الحماية الذاتية',
      resources: 'الموارد والطاقة',
      orientation: 'التوجيه والسيطرة',
    },
    layers: {
      hazards: 'طبقة المخاطر',
      routes: 'المسارات والمتجهات',
      gridCompass: 'الشبكة والبوصلة',
      labels: 'التسميات التقنية',
      nightMode: 'وضع الانقطاع الليلي',
      zoomIn: 'تكبير 1.35×',
      zoomOut: 'عرض 1×',
      resetView: 'إعادة ضبط',
    },
    controls: {
      ...EN_UI.controls,
      startMission: 'بدء المهمة',
      resumeMission: 'إعادة المهمة',
      nextStage: 'المرحلة التالية',
      finishMission: 'عرض التقرير',
      backToCatalog: 'كل المهام',
      timedMode: 'مؤقت 45 ثانية',
      studyMode: 'وضع الدراسة',
      optimalChoice: 'بروتوكول مثالي',
      suboptimalChoice: 'تم رصد خطر',
      openLesson: 'فتح المخطط التفاعلي',
      lessonMastered: 'متقن',
    },
    profile: {
      ...EN_UI.profile,
      title: 'الملف الشخصي والتقدم المحلي',
      activeProfile: 'الملف النشط',
      rank: 'رتبة الجاهزية',
      xp: 'مجموع XP',
      streak: 'السلسلة اليومية',
      days: 'أيام',
      globalMastery: 'الإتقان العام',
      categoryMastery: 'التقدم حسب القطاع',
      badgesTitle: 'الشارات المكتسبة',
      exportJson: 'تصدير JSON',
      importJson: 'استيراد JSON',
    },
    ranks: ['مبتدئ', 'وقائي', 'ميداني', 'منسق عمليات', 'قائد المرونة'],
    footer: {
      ...EN_UI.footer,
      disclaimerTitle: 'تنويه تعليمي للسلامة',
      disclaimerBody:
        'SurvivalCue أداة محاكاة تعليمية. في حالات الطوارئ الحقيقية اتصل فوراً بخدمات الطوارئ المحلية واتبع تعليمات الدفاع المدني.',
    },
    adLabel: 'إعلان',
  }),
  zh: makeLocalizedUi({
    heroTitle: '交互式应急响应、停电应对、自然灾害与野外生存模拟器',
    heroSubtitle:
      '通过响应式矢量剖面图与地形图，演练72小时停电、地震、洪水、山火、道路突发状况及野外生存决策。',
    nav: {
      missions: '任务演练',
      academy: '图解学院',
      visualDrill: '视觉识图',
      challenge: '链接挑战',
      clinic: '错题诊所',
      profile: '本地档案',
    },
    categories: {
      all: '全部领域',
      blackout: '停电与能源',
      disaster: '自然灾害',
      urban: '城市与道路',
      wilderness: '野外生存',
    },
    meters: {
      selfProtection: '自我防护',
      resources: '资源与电力',
      orientation: '定向与控制',
    },
    layers: {
      hazards: '危险图层',
      routes: '路线与矢量',
      gridCompass: '网格与指南针',
      labels: '技术标注',
      nightMode: '停电夜视模式',
      zoomIn: '放大 1.35×',
      zoomOut: '标准 1×',
      resetView: '重置视图',
    },
    controls: {
      ...EN_UI.controls,
      startMission: '开始任务',
      resumeMission: '重玩任务',
      nextStage: '下一阶段',
      finishMission: '查看总结',
      backToCatalog: '返回任务库',
      timedMode: '45秒计时演练',
      studyMode: '无计时学习',
      optimalChoice: '最优规程',
      suboptimalChoice: '存在风险',
      openLesson: '打开交互图解',
      lessonMastered: '已掌握',
    },
    profile: {
      ...EN_UI.profile,
      title: '本地应急档案与进度',
      activeProfile: '当前档案',
      rank: '战备等级',
      xp: '累计 XP',
      streak: '连续天数',
      days: '天',
      globalMastery: '综合掌握度',
      categoryMastery: '四大领域进度',
      badgesTitle: '已解锁徽章',
      exportJson: '导出 JSON',
      importJson: '导入 JSON',
    },
    ranks: ['新手', '预防员', '外勤干员', '现场协调员', '韧性指挥官'],
    adLabel: '赞助位',
  }),
  ja: makeLocalizedUi({
    heroTitle: 'インタラクティブ防災・停電・自然災害・サバイバルシミュレーター',
    heroSubtitle:
      '72時間停電、地震、水害、山火事、道路緊急事態、野外サバイバルをインタラクティブSVG図解と地形図で実践トレーニング。',
    nav: {
      missions: 'ミッション',
      academy: '図解アカデミー',
      visualDrill: '視覚ドリル',
      challenge: '対戦リンク',
      clinic: '弱点対策',
      profile: '進捗管理',
    },
    categories: {
      all: 'すべての分野',
      blackout: '停電・ライフライン',
      disaster: '自然災害',
      urban: '都市・交通緊急',
      wilderness: '野外サバイバル',
    },
    meters: {
      selfProtection: '自己防衛',
      resources: '資源・電力',
      orientation: '状況判断・定位',
    },
    layers: {
      hazards: '危険レイヤー',
      routes: '経路・ベクトル',
      gridCompass: 'グリッド・方位',
      labels: '技術ラベル',
      nightMode: '停電ナイトモード',
      zoomIn: '拡大 1.35×',
      zoomOut: '標準 1×',
      resetView: 'リセット',
    },
    controls: {
      ...EN_UI.controls,
      startMission: 'ミッション開始',
      resumeMission: '再挑戦',
      nextStage: '次のフェーズ',
      finishMission: '結果を見る',
      backToCatalog: 'ミッション一覧',
      timedMode: '45秒タイマー',
      studyMode: '学習モード',
      optimalChoice: '最適プロトコル',
      suboptimalChoice: 'リスク検出',
      openLesson: 'インタラクティブ図解',
      lessonMastered: '習得済み',
    },
    profile: {
      ...EN_UI.profile,
      title: 'ローカル進捗とプロファイル',
      activeProfile: '使用中プロファイル',
      rank: '防災ランク',
      xp: '累計 XP',
      streak: '連続日数',
      days: '日',
      globalMastery: '総合習熟度',
      categoryMastery: '分野別進捗',
      badgesTitle: '獲得バッジ',
      exportJson: 'JSON エクスポート',
      importJson: 'JSON インポート',
    },
    ranks: ['ビギナー', '防災見習い', 'フィールド要員', '現場調整官', 'レジリエンス隊長'],
    adLabel: 'スポンサー枠',
  }),
};

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'badge-blackout-72h',
    iconKey: 'blackout',
    title: {
      en: '72h Blackout Master',
      es: 'Maestro del Apagón 72h',
      fr: 'Maître Blackout 72h',
      de: '72h-Blackout-Meister',
      pt: 'Mestre do Apagão 72h',
      ru: 'Мастер блэкаута 72ч',
      hi: '72घंटे ब्लैकआउट मास्टर',
      ar: 'خبير انقطاع 72 ساعة',
      zh: '72小时停电大师',
      ja: '72時間停電マスター',
    },
    description: {
      en: 'Complete 4 Blackout & Utility Outage missions.',
      es: 'Completa 4 misiones de Apagones y Suministros.',
    },
  },
  {
    id: 'badge-topo-reader',
    iconKey: 'topo',
    title: {
      en: 'Topographic Reader',
      es: 'Lectura Topográfica',
      fr: 'Lecture Topographique',
      de: 'Topografie-Leser',
      pt: 'Leitura Topográfica',
      ru: 'Знаток топографии',
      hi: 'स्थलाकृति पाठक',
      ar: 'قارئ الطبوغرافيا',
      zh: '地形图专家',
      ja: '地形図読解',
    },
    description: {
      en: 'Solve 5 Visual Map & Sketch Challenges.',
      es: 'Resuelve 5 Retos Visuales sobre mapa o croquis.',
    },
  },
  {
    id: 'badge-seismic-calm',
    iconKey: 'seismic',
    title: {
      en: 'Seismic & Disaster Calm',
      es: 'Calma Sísmica',
      fr: 'Calme Sismique',
      de: 'Seismische Ruhe',
      pt: 'Calma Sísmica',
      ru: 'Сейсмостойкость',
      hi: 'भूकंप शांति',
      ar: 'الهدوء الزلزالي',
      zh: '抗震冷静专家',
      ja: '地震冷静対応',
    },
    description: {
      en: 'Complete 4 Natural Disaster missions.',
      es: 'Completa 4 misiones de Catástrofes Naturales.',
    },
  },
  {
    id: 'badge-water-alchemist',
    iconKey: 'water',
    title: {
      en: 'Water & Field Medic',
      es: 'Purificación y Campo',
      fr: 'Maître Eau & Survie',
      de: 'Wasser & Feldmedizin',
      pt: 'Água e Campo',
      ru: 'Вода и полевая помощь',
      hi: 'जल एवं क्षेत्र विशेषज्ञ',
      ar: 'خبير المياه والميدان',
      zh: '净水与野外专家',
      ja: '浄水・野外スキル',
    },
    description: {
      en: 'Complete 4 Wilderness Survival missions.',
      es: 'Completa 4 misiones de Supervivencia Típica.',
    },
  },
  {
    id: 'badge-urban-responder',
    iconKey: 'hazard',
    title: {
      en: 'Urban & Road Responder',
      es: 'Respuesta Urbana y Vial',
      fr: 'Intervenant Urbain',
      de: 'Straßen-Retter',
      pt: 'Resposta Urbana e Viária',
      ru: 'Городской спасатель',
      hi: 'शहरी एवं सड़क रक्षक',
      ar: 'مستجيب حضري',
      zh: '城市道路响应者',
      ja: '都市・道路対応',
    },
    description: {
      en: 'Complete 4 Urban & Road Emergency missions.',
      es: 'Completa 4 misiones de Emergencias Cotidianas y Ruta.',
    },
  },
  {
    id: 'badge-streak-7',
    iconKey: 'streak',
    title: {
      en: '7-Day Readiness Streak',
      es: 'Racha de 7 Días',
      fr: 'Série de 7 Jours',
      de: '7-Tage-Serie',
      pt: 'Sequência de 7 Dias',
      ru: 'Серия 7 дней',
      hi: '7-दिन स्ट्रीक',
      ar: 'سلسلة 7 أيام',
      zh: '7天连续演练',
      ja: '7日連続トレーニング',
    },
    description: {
      en: 'Maintain active daily practice (or reach 600 XP).',
      es: 'Mantén una racha de 7 días activos o alcanza 600 XP.',
    },
  },
  {
    id: 'badge-academy-scholar',
    iconKey: 'knots',
    title: {
      en: 'Illustrated Field Scholar',
      es: 'Académico de Campo',
      fr: 'Érudit de Terrain',
      de: 'Akademie-Meister',
      pt: 'Acadêmico de Campo',
      ru: 'Знаток академии',
      hi: 'अकादमी विद्वान',
      ar: 'باحث الأكاديمية',
      zh: '图解学院学者',
      ja: '図解アカデミー修了',
    },
    description: {
      en: 'Master 7 Illustrated Field Lessons.',
      es: 'Domina 7 Lecciones Ilustradas de la Academia.',
    },
  },
  {
    id: 'badge-perfect-run',
    iconKey: 'perfect',
    title: {
      en: 'Zero-Error Operation',
      es: 'Operación Sin Fallos',
      fr: 'Opération Sans Faute',
      de: 'Fehlerfreier Einsatz',
      pt: 'Operação Sem Falhas',
      ru: 'Безупречная миссия',
      hi: 'त्रुटि-रहित मिशन',
      ar: 'عملية بلا أخطاء',
      zh: '零失误行动',
      ja: 'ミスゼロ達成',
    },
    description: {
      en: 'Score 100% optimal choices in any 3-phase mission.',
      es: 'Consigue 100 % de decisiones óptimas en una misión de 3 fases.',
    },
  },
  {
    id: 'badge-clinic-healer',
    iconKey: 'clinic',
    title: {
      en: 'Mistake Clinic Graduate',
      es: 'Clínica de Fallos Superada',
      fr: 'Diplômé Clinique',
      de: 'Fehlerklinik-Absolvent',
      pt: 'Graduado da Clínica',
      ru: 'Работа над ошибками',
      hi: 'त्रुटि सुधार स्नातक',
      ar: 'متخرج عيادة الأخطاء',
      zh: '错题诊所毕业',
      ja: '弱点克服マスター',
    },
    description: {
      en: 'Complete 12 total missions across sectors.',
      es: 'Completa 12 misiones totales entre todas las áreas.',
    },
  },
  {
    id: 'badge-commander',
    iconKey: 'commander',
    title: {
      en: 'Resilience Commander',
      es: 'Comandante de Resiliencia',
      fr: 'Commandant Résilience',
      de: 'Resilienz-Kommandant',
      pt: 'Comandante de Resiliência',
      ru: 'Командир устойчивости',
      hi: 'लचीलापन कमांडर',
      ar: 'قائد المرونة',
      zh: '韧性指挥官',
      ja: 'レジリエンス総司令',
    },
    description: {
      en: 'Reach 1,200+ XP and master all 4 emergency categories.',
      es: 'Alcanza 1200+ XP y completa misiones en las 4 áreas.',
    },
  },
];
