import type {IllustratedLesson} from '../types';

export const ALL_LESSONS: IllustratedLesson[] = [
  {
    id: 'les-01-breaker-surge',
    category: 'blackout',
    scene: 'home-blackout-cutaway',
    title: {
      en: '01. Home Breaker Isolation & Surge Control',
      es: '01. Cuadro Eléctrico y Control de Picos en Apagón',
      fr: '01. Tableau Électrique et Protection Surtension',
      de: '01. Sicherungskasten & Überspannungsschutz',
      pt: '01. Quadro Elétrico e Controle de Picos',
    },
    subtitle: {
      en: 'Protect refrigerators, boilers, and electronics during grid restoration transients.',
      es: 'Protege electrodomésticos, calderas y electrónica frente a picos de restablecimiento.',
    },
    visualPreset: {nightModeDefault: true, safeRouteId: 'breaker', flashlightTarget: {x: 172, y: 318}},
    hotspots: [
      {id: 'breaker', x: 172, y: 318, label: {en: 'Main Breaker Panel', es: 'Cuadro Eléctrico'}, role: 'safe'},
      {id: 'fridge', x: 356, y: 330, label: {en: 'Keep Fridge Closed (~4h/48h)', es: 'Nevera Cerrada (~4h/48h)'}, role: 'utility'},
      {id: 'ext-gen', x: 705, y: 362, label: {en: 'Outdoor Generator >6m', es: 'Generador Exterior >6m'}, role: 'safe'},
    ],
    keyPoints: [
      {en: 'Switch off heavy inductive circuits (HVAC, oven, washer) during a blackout.', es: 'Desconecta circuitos de gran carga (clima, horno, lavadora) durante el apagón.'},
      {en: 'Leave one low-watt lighting circuit ON as a visual cue when grid power returns.', es: 'Deja un circuito de luz piloto encendido para saber cuándo vuelve la red.'},
      {en: 'Wait 3–5 minutes after power stabilizes before reconnecting compressors.', es: 'Espera 3–5 minutos tras volver la luz antes de reconectar compresores.'},
      {en: 'Never run fuel generators indoors, in garages, or under open windows.', es: 'Jamás operes generadores en interiores, garajes ni bajo ventanas abiertas.'},
    ],
    microChallenge: {
      question: {
        en: 'Why keep one low-watt circuit ON while switching heavy appliances OFF?',
        es: '¿Por qué dejar 1 circuito de luz activado tras bajar los de gran potencia?',
      },
      options: [
        {en: 'To drain the grid faster', es: 'Para descargar la línea más rápido'},
        {en: 'It signals restoration while shielding compressors from startup surges', es: 'Avisa del retorno de luz protegiendo compresores frente a picos'},
        {en: 'To charge electric vehicles automatically', es: 'Para cargar coches eléctricos automáticamente'},
      ],
      correctIndex: 1,
      explanation: {
        en: 'One pilot circuit notifies you when power returns while heavy electronics remain shielded from transient voltage spikes.',
        es: 'Un piloto de luz avisa del retorno mientras los aparatos sensibles quedan protegidos.',
      },
    },
  },
  {
    id: 'les-02-kit-72h',
    category: 'blackout',
    scene: 'kit-72h-pack',
    title: {
      en: '02. 72-Hour Modular Emergency Go-Bag Architecture',
      es: '02. Arquitectura de Mochila de Emergencia 72 Horas',
      fr: '02. Sac d’Évacuation Modulaire 72 Heures',
      de: '02. Modularer 72-Stunden-Notfallrucksack',
      pt: '02. Mochila Modular de Emergência 72 Horas',
    },
    subtitle: {
      en: 'Six standardized compartments for immediate grab-and-go evacuation.',
      es: 'Seis bloques estandarizados para evacuación inmediata en menos de 60 segundos.',
    },
    visualPreset: {kitCompartment: 'water'},
    hotspots: [
      {id: 'water', x: 305, y: 120, label: {en: 'Water 3L/day + Filter', es: 'Agua 3L/día + Filtro'}, role: 'safe'},
      {id: 'power', x: 495, y: 120, label: {en: 'Crank Radio + Headlamp', es: 'Radio Dinamo + Frontal'}, role: 'utility'},
      {id: 'medical', x: 305, y: 242, label: {en: 'IFAK + 7-Day Meds', es: 'Botiquín + Medicación 7d'}, role: 'hazard'},
      {id: 'docs', x: 305, y: 355, label: {en: 'Small Cash + Laminated IDs', es: 'Efectivo Pequeño + Copias DNI'}, role: 'utility'},
    ],
    keyPoints: [
      {en: 'Hydration block: 3L per person/day + hollow-fiber filter or purification tablets.', es: 'Bloque hidratación: 3L/persona/día + filtro mecánico o pastillas potabilizadoras.'},
      {en: 'Comms & light: hand-crank/solar FM radio + IPX6 headlamp + spare cells.', es: 'Energía y luz: radio FM dinamo/solar + frontal IPX6 + pilas de repuesto.'},
      {en: 'Documents & cash: waterproof pouch with ID copies, Rx list, small banknotes.', es: 'Documentación y efectivo: funda estanca con copias de DNI, recetas y billetes pequeños.'},
      {en: 'Rotate perishable water, batteries, and meds every 6 months.', es: 'Revisa y rota agua, pilas y medicación cada 6 meses.'},
    ],
    microChallenge: {
      question: {
        en: 'Which cash format works best when ATMs and card terminals fail?',
        es: '¿Qué formato de dinero funciona mejor cuando caen TPV y cajeros?',
      },
      options: [
        {en: 'Small-denomination banknotes and coins', es: 'Billetes pequeños y monedas fraccionadas'},
        {en: 'Single 500-unit banknote only', es: 'Un único billete de valor muy alto'},
        {en: 'Digital NFC card app only', es: 'Solo tarjeta digital NFC en móvil'},
      ],
      correctIndex: 0,
      explanation: {
        en: 'Stores cannot make change when electric registers are down; small denominations buy essentials smoothly.',
        es: 'Sin cajas registradoras eléctricas falta cambio; los billetes pequeños facilitan compras rápidas.',
      },
    },
  },
  {
    id: 'les-03-co-safety',
    category: 'blackout',
    scene: 'home-blackout-cutaway',
    title: {
      en: '03. Carbon Monoxide (CO) & Generator Setback Physics',
      es: '03. Monóxido de Carbono (CO) y Distancia Segura',
    },
    subtitle: {
      en: 'Eliminate silent indoor poisoning from generators, grills, and blocked flues.',
      es: 'Elimina intoxicaciones silenciosas por generadores, braseros o calderas.',
    },
    visualPreset: {nightModeDefault: false, hazardZoneId: 'gas', safeRouteId: 'ext-gen'},
    hotspots: [
      {id: 'ext-gen', x: 705, y: 362, label: {en: 'Safe Exterior >6m Downwind', es: 'Exterior >6m a Sotavento'}, role: 'safe'},
      {id: 'gas', x: 245, y: 345, label: {en: 'Combustion Appliances / Flue', es: 'Aparatos Combustión / Gas'}, role: 'hazard'},
    ],
    keyPoints: [
      {en: 'Carbon monoxide is colorless, odorless, and binds hemoglobin 200× tighter than oxygen.', es: 'El CO es incoloro e inodoro y bloquea el transporte de oxígeno en sangre.'},
      {en: 'Never run generators, camp stoves, or charcoal grills inside homes, basements, or attached garages.', es: 'Nunca uses generadores, hornillos de gas o barbacoas dentro de viviendas o garajes.'},
      {en: 'Position generators >6 meters (20 ft) away with exhaust pointed away from doors/windows.', es: 'Sitúa generadores a >6 metros con el escape apuntando en contra de puertas y ventanas.'},
    ],
    microChallenge: {
      question: {
        en: 'If a CO alarm sounds and occupants feel dizzy, what is the first action?',
        es: 'Si suena el detector de CO y hay mareos, ¿qué se hace primero?',
      },
      options: [
        {en: 'Open one window and take a nap', es: 'Abrir un poco y echarse a dormir'},
        {en: 'Evacuate everyone outdoors into fresh air immediately and call 112', es: 'Evacuar a todos al aire libre de inmediato y llamar al 112'},
        {en: 'Remove battery because no odor is detected', es: 'Quitar la pila porque no huele a nada'},
      ],
      correctIndex: 1,
      explanation: {
        en: 'CO has no smell; fresh air evacuation + 112 dispatch prevents loss of consciousness.',
        es: 'El CO no huele; salir al aire libre y avisar al 112 evita pérdida de conciencia.',
      },
    },
  },
  {
    id: 'les-04-seismic-drop-cover',
    category: 'disaster',
    scene: 'seismic-structural-map',
    title: {
      en: '04. Seismic Drop-Cover-Hold & Collapse Perimeter',
      es: '04. Respuesta Sísmica y Perímetro de Fachada (1,5×H)',
    },
    subtitle: {
      en: 'Distinguish structural core protection from exterior falling glass zones.',
      es: 'Distingue la protección bajo estructura sólida frente al peligro de fachadas exteriores.',
    },
    visualPreset: {safeRouteId: 'muster', hazardZoneId: 'facade'},
    hotspots: [
      {id: 'cover', x: 155, y: 348, label: {en: 'Drop-Cover-Hold Core', es: 'Agacharse-Cubrirse'}, role: 'safe'},
      {id: 'facade', x: 485, y: 325, label: {en: '1.5×H Facade Drop Zone', es: 'Zona Caída Fachada'}, role: 'hazard'},
      {id: 'muster', x: 685, y: 335, label: {en: 'Open Assembly Field', es: 'Zona Abierta Segura'}, role: 'safe'},
    ],
    keyPoints: [
      {en: 'During shaking: Drop, Cover head/neck under sturdy desk or beside interior structural wall, Hold On.', es: 'Durante el sismo: Agáchate, Cúbrete cabeza/cuello bajo mesa sólida o junto a pilar interior y Sujétate.'},
      {en: 'Never run outside under glass facades or enter elevators during shaking.', es: 'Nunca salgas corriendo bajo fachadas acristaladas ni uses ascensores.'},
      {en: 'After shaking stops: wear sturdy shoes, take kit, use stairs, muster >1.5× building height clear.', es: 'Al parar: ponte calzado grueso, baja por escaleras y aléjate >1,5× altura de edificios.'},
    ],
    microChallenge: {
      question: {
        en: 'Why is running straight onto the sidewalk during shaking dangerous?',
        es: '¿Por qué es peligroso salir corriendo a la acera durante la sacudida?',
      },
      options: [
        {en: 'Sidewalks collapse first', es: 'Las aceras siempre se hunden'},
        {en: 'Falling glass, parapets, AC units, and brickwork rain onto the 1.5×H perimeter', es: 'Cae vidrio, cornisas, balcones y ladrillos sobre la acera'},
        {en: 'Because GPS stops working outdoors', es: 'Porque falla el GPS fuera'},
      ],
      correctIndex: 1,
      explanation: {
        en: 'Exterior building walls shed deadly debris onto sidewalks; shelter inside until shaking stops, then exit carefully.',
        es: 'Las fachadas desprenden cristales y cascotes letales; protégete dentro hasta que cese el temblor.',
      },
    },
  },
  {
    id: 'les-05-flash-flood-physics',
    category: 'disaster',
    scene: 'topo-evacuation-map',
    title: {
      en: '05. Flash Flood Hydrodynamics & High-Ground Contours',
      es: '05. Hidrodinámica de Riadas y Lectura Topográfica',
    },
    subtitle: {
      en: 'Read elevation contours and avoid low ravines, bridges, and underground ramps.',
      es: 'Lee curvas de nivel y evita cauces, puentes sumergidos y garajes subterráneos.',
    },
    visualPreset: {waterLevelPct: 80, safeRouteId: 'ridge', hazardZoneId: 'valley'},
    hotspots: [
      {id: 'ridge', x: 690, y: 62, label: {en: 'High Ground +80m', es: 'Cota Alta +80m'}, role: 'safe'},
      {id: 'bridge', x: 380, y: 215, label: {en: 'Submerged Bridge Trap', es: 'Puente Inundado'}, role: 'hazard'},
      {id: 'valley', x: 435, y: 340, label: {en: 'Floodplain Channel', es: 'Cauce / Rambla'}, role: 'hazard'},
    ],
    keyPoints: [
      {en: '15 cm of fast water knocks an adult down; 30 cm floats most passenger cars.', es: '15 cm de agua rápida derriba a una persona; 30 cm hace flotar un turismo.'},
      {en: 'Evacuate perpendicular to flood channels toward rising topographic contour lines.', es: 'Aléjate en perpendicular al cauce subiendo hacia cotas topográficas altas.'},
      {en: 'Never enter underground garages or basements once floodwaters approach.', es: 'Nunca bajes a garajes subterráneos ni sótanos durante una riada.'},
    ],
    microChallenge: {
      question: {
        en: 'How deep does moving floodwater need to be to sweep or float a standard car?',
        es: '¿Qué altura de agua corriente basta para hacer flotar un turismo estándar?',
      },
      options: [
        {en: 'Around 30 cm (1 foot)', es: 'Unos 30 cm'},
        {en: 'At least 1.5 meters', es: 'Al menos 1,5 metros'},
        {en: 'Cars cannot float unless upside down', es: 'Los coches nunca flotan'},
      ],
      correctIndex: 0,
      explanation: {
        en: 'Buoyancy reduces tire traction immediately at ~30 cm; Turn Around Don’t Drown.',
        es: 'Con solo 30 cm el vehículo pierde adherencia por flotabilidad.',
      },
    },
  },
  {
    id: 'les-06-wildfire-vectors',
    category: 'disaster',
    scene: 'topo-evacuation-map',
    title: {
      en: '06. Wildfire Wind Vectors, Slope Chimneys & WUI Escape',
      es: '06. Vectores de Incendio, Pendiente y Evacuación Flanco',
    },
    subtitle: {
      en: 'Predict rapid uphill/downwind spread and choose crosswind escape corridors.',
      es: 'Anticipa la aceleración cuesta arriba y elige salidas transversales al viento.',
    },
    visualPreset: {windAngleDeg: 40, waterLevelPct: 15, safeRouteId: 'ridge'},
    hotspots: [
      {id: 'ridge', x: 690, y: 62, label: {en: 'Crosswind Wide Clearing', es: 'Flanco Transversal Despejado'}, role: 'safe'},
      {id: 'smoke', x: 185, y: 110, label: {en: 'Wind-Driven Smoke Head', es: 'Cabeza del Incendio'}, role: 'hazard'},
    ],
    keyPoints: [
      {en: 'Fire races fastest downwind and upslope through vegetated gullies ("chimneys").', es: 'El fuego avanza mucho más rápido a favor de viento y pendiente arriba por barrancos.'},
      {en: 'Escape laterally (crosswind flank) toward mineral soil, wide paved roads, or burned black zones.', es: 'Escapa por el flanco perpendicular al viento hacia vías anchas o zonas sin combustible.'},
      {en: 'Wear long natural fibers (cotton/wool) — avoid synthetic polyester that melts.', es: 'Viste fibras naturales largas (algodón/lana); evita sintéticos que se funden.'},
    ],
    microChallenge: {
      question: {
        en: 'Which escape direction is safest relative to a wind-driven wildfire front?',
        es: '¿Qué dirección de escape es más segura respecto a un frente impulsado por viento?',
      },
      options: [
        {en: 'Directly downwind ahead of the smoke', es: 'A favor del viento delante del humo'},
        {en: 'Steeply uphill through narrow brush canyons', es: 'Cuesta arriba por barrancos con matorral'},
        {en: 'Crosswind / perpendicular to the fire flank toward cleared areas', es: 'En perpendicular al frente (flanco) hacia zonas despejadas'},
      ],
      correctIndex: 2,
      explanation: {
        en: 'Moving crosswind exits the narrow fire corridor quickly without racing the fastest head.',
        es: 'Moverse en perpendicular sale rápido de la trayectoria principal del frente.',
      },
    },
  },
  {
    id: 'les-07-road-step-potential',
    category: 'urban',
    scene: 'road-vehicle-storm',
    title: {
      en: '07. Downed Power Lines, Faraday Cage & Step Potential',
      es: '07. Cables Caídos, Jaula de Faraday y Tensión de Paso',
    },
    subtitle: {
      en: 'Understand concentric ground voltage rings and zero-stride emergency egress.',
      es: 'Comprende los anillos de voltaje en el suelo y el salto con pies juntos.',
    },
    visualPreset: {hazardZoneId: 'cable', safeRouteId: 'embankment'},
    hotspots: [
      {id: 'car', x: 325, y: 270, label: {en: 'Stay Inside Unless Burning', es: 'Quedarse Dentro Salvo Fuego'}, role: 'safe'},
      {id: 'wire', x: 535, y: 345, label: {en: 'Concentric Voltage Rings >10m', es: 'Anillos Tensión Paso >10m'}, role: 'hazard'},
    ],
    keyPoints: [
      {en: 'Stay inside a vehicle hit by a power line until utility crews de-energize it.', es: 'Permanece dentro del vehículo hasta confirmación oficial de corte eléctrico.'},
      {en: 'Only exit if the car catches fire: jump clear with BOTH feet together without touching metal.', es: 'Solo sal si arde: salta con ambos pies juntos sin tocar el coche.'},
      {en: 'Shuffle or bunny-hop >10m away with feet touching so legs never bridge different voltage rings.', es: 'Aléjate >10m deslizando pies juntos para evitar diferencia de potencial entre piernas.'},
    ],
    microChallenge: {
      question: {
        en: 'Why must you keep both feet together when shuffling away from a burning car under a live wire?',
        es: '¿Por qué debes mantener los pies juntos al alejarte de un coche bajo cable eléctrico?',
      },
      options: [
        {en: 'To avoid bridging concentric ground voltage gradients ("step potential")', es: 'Para evitar tensión de paso entre anillos de distinto voltaje en el suelo'},
        {en: 'To walk faster on wet asphalt', es: 'Para caminar más rápido sobre asfalto mojado'},
        {en: 'To test whether the wire is live', es: 'Para comprobar si el cable tiene corriente'},
      ],
      correctIndex: 0,
      explanation: {
        en: 'Voltage drops rapidly with distance from the fault; separating feet bridges high voltage up one leg and down the other.',
        es: 'El voltaje cae en anillos desde el punto de contacto; separar los pies crea circuito mortal.',
      },
    },
  },
  {
    id: 'les-08-submerged-car-swoc',
    category: 'urban',
    scene: 'road-vehicle-storm',
    title: {
      en: '08. Submerged Vehicle SWOC Protocol (30-Second Window)',
      es: '08. Escape de Vehículo Sumergido (Secuencia SWOC)',
    },
    subtitle: {
      en: 'Seatbelts, Window, Out, Children—why doors lock under water pressure.',
      es: 'Cinturón, Ventanilla, Salir, Niños: por qué la presión bloquea las puertas.',
    },
    visualPreset: {safeRouteId: 'embankment'},
    hotspots: [
      {id: 'car', x: 325, y: 270, label: {en: 'Side Tempered Window Exit', es: 'Salida por Ventanilla Lateral'}, role: 'safe'},
      {id: 'embankment', x: 675, y: 190, label: {en: 'Dry Bank / Ramp', es: 'Orilla o Rampa Seca'}, role: 'safe'},
    ],
    keyPoints: [
      {en: 'S-W-O-C: Seatbelts OFF, Window open/broken, Out immediately, Children out with you.', es: 'SWOC: Cinturón fuera, Ventanilla abierta/rota, Salir rápido, Niños contigo.'},
      {en: 'Do NOT waste the first 30 seconds calling 112—escape the floating car first.', es: 'NO pierdas los primeros 30 segundos llamando al 112: sal del coche primero.'},
      {en: 'Front windshields are laminated; break SIDE tempered windows at a bottom corner.', es: 'El parabrisas es laminado; rompe siempre una ventanilla LATERAL en la esquina.'},
    ],
    microChallenge: {
      question: {
        en: 'Which glass should you break with a window punch if power windows fail?',
        es: '¿Qué cristal debes romper si fallan los elevalunas eléctricos?',
      },
      options: [
        {en: 'The front laminated windshield', es: 'El parabrisas delantero laminado'},
        {en: 'The corner of a side tempered window', es: 'La esquina de una ventanilla lateral templada'},
        {en: 'Wait until the car hits bottom before breaking glass', es: 'Esperar al fondo antes de abrir'},
      ],
      correctIndex: 1,
      explanation: {
        en: 'Tempered side glass shatters cleanly when struck in a corner; laminated windshields hold together.',
        es: 'El vidrio templado lateral estalla al golpear una esquina; el parabrisas laminado resiste.',
      },
    },
  },
  {
    id: 'les-09-hemorrhage-ifak',
    category: 'urban',
    scene: 'first-aid-triage',
    title: {
      en: '09. Life-Threatening Bleed Control & Recovery Airway',
      es: '09. Control de Hemorragia Crítica y Vía Aérea',
    },
    subtitle: {
      en: 'Direct pressure, proximal tourniquet placement, and trauma warmth.',
      es: 'Presión directa, colocación de torniquete proximal y control del shock.',
    },
    visualPreset: {safeRouteId: 'tq'},
    hotspots: [
      {id: 'tq', x: 490, y: 205, label: {en: 'Tourniquet 5–7cm Proximal', es: 'Torniquete 5–7cm Arriba'}, role: 'hazard'},
      {id: 'core', x: 335, y: 225, label: {en: 'Prevent Shock Hypothermia', es: 'Evitar Hipotermia del Shock'}, role: 'utility'},
      {id: 'head', x: 215, y: 225, label: {en: 'Recovery Position (Airway)', es: 'Posición Lateral Seguridad'}, role: 'safe'},
    ],
    keyPoints: [
      {en: 'Apply firm continuous direct pressure on bleeding wounds; stack fresh gauze without peeling soaked pads.', es: 'Aplica presión directa firme continua y apila gasas encima sin retirar las empapadas.'},
      {en: 'For massive arterial limb bleeding, place wide tourniquet 5–7 cm above wound (never over a joint).', es: 'En hemorragia arterial masiva en extremidad, coloca torniquete ancho 5–7 cm por encima (nunca en articulación).'},
      {en: 'Record exact application time and DO NOT loosen pre-hospital tourniquets.', es: 'Anota la hora exacta y NO aflojes el torniquete hasta atención hospitalaria.'},
    ],
    microChallenge: {
      question: {
        en: 'Once a tourniquet stops massive limb bleeding, what should you do until EMS arrives?',
        es: 'Una vez detenido el sangrado con torniquete, ¿qué debes hacer hasta la ambulancia?',
      },
      options: [
        {en: 'Loosen it every 10 minutes to restore pulse', es: 'Aflojarlo cada 10 minutos'},
        {en: 'Record the exact time, keep it visible & locked, and keep the patient warm', es: 'Anotar hora exacta, dejarlo visible sin aflojar y abrigar al herido'},
        {en: 'Give the patient cold water to drink', es: 'Dar agua fría de beber'},
      ],
      correctIndex: 1,
      explanation: {
        en: 'Loosening restarts fatal hemorrhage; keeping the patient warm preserves clotting function.',
        es: 'Aflojarlo reinicia la hemorragia; abrigar al paciente preserva la coagulación.',
      },
    },
  },
  {
    id: 'les-10-shelter-thermoregulation',
    category: 'wilderness',
    scene: 'wilderness-shelter',
    title: {
      en: '10. Shelter Micro-Site, Windbreak & Ground R-Value',
      es: '10. Refugio Natural, Sotavento y Aislamiento del Suelo',
    },
    subtitle: {
      en: 'Eliminate conductive heat loss, cold-air sinks, and overhead deadfall.',
      es: 'Evita pérdida conductiva hacia tierra, bolsas de aire frío y ramas muertas.',
    },
    visualPreset: {windAngleDeg: 0, safeRouteId: 'bench'},
    hotspots: [
      {id: 'bench', x: 390, y: 215, label: {en: 'Leeward Mid-Slope Shelter', es: 'Refugio a Sotavento'}, role: 'safe'},
      {id: 'snag', x: 185, y: 128, label: {en: 'Deadfall Tree Hazard', es: 'Peligro Rama Muerta'}, role: 'hazard'},
      {id: 'sink', x: 705, y: 365, label: {en: 'Valley Cold Air Sink', es: 'Bolsa de Aire Frío'}, role: 'hazard'},
    ],
    keyPoints: [
      {en: 'Site selection: mid-slope leeward shelf clear of dead overhead branches ("widowmakers") and flood gullies.', es: 'Emplazamiento: media ladera a sotavento sin ramas secas encima ni fondos de vaguada.'},
      {en: 'Earth steals heat 25× faster than air: build ≥15cm compressed dry foliage/bough mattress.', es: 'El suelo roba calor 25× más rápido que el aire: crea un colchón seco ≥15 cm.'},
      {en: 'Dig a shallow uphill diversion trench to route rainwater around sleeping floor.', es: 'Cava una zanja de desvío cuesta arriba para evitar escorrentía bajo el refugio.'},
    ],
    microChallenge: {
      question: {
        en: 'Why do emergency foil blankets alone fail on wet cold ground?',
        es: '¿Por qué falla una manta térmica fina si te tumbas directo sobre suelo húmedo?',
      },
      options: [
        {en: 'They reflect radiant heat but conduct cold immediately through thin plastic', es: 'Refleja radiación pero no aísla la conducción por contacto directo con el suelo'},
        {en: 'They attract lightning underground', es: 'Atrae electricidad del subsuelo'},
        {en: 'They dissolve in rain', es: 'Se disuelve con la lluvia'},
      ],
      correctIndex: 0,
      explanation: {
        en: 'Always place dry leaves, pine needles, foam, or backpack under you for conductive insulation.',
        es: 'Intercala siempre materia seca, esterilla o mochila debajo para cortar la conducción.',
      },
    },
  },
  {
    id: 'les-11-water-purification',
    category: 'wilderness',
    scene: 'water-purification',
    title: {
      en: '11. Multi-Stage Water Clarification & Disinfection',
      es: '11. Decantación, Filtrado y Ebullición Segura del Agua',
    },
    subtitle: {
      en: 'Why physical turbidity removal must precede thermal or chemical treatment.',
      es: 'Por qué aclarar la turbidez debe preceder siempre a la ebullición o cloración.',
    },
    visualPreset: {safeRouteId: 'boil'},
    hotspots: [
      {id: 'source', x: 127, y: 215, label: {en: '1. Settle Turbidity', es: '1. Decantar Sedimentos'}, role: 'utility'},
      {id: 'filter', x: 375, y: 215, label: {en: '2. Mechanical Filter', es: '2. Filtro Multicapa'}, role: 'utility'},
      {id: 'boil', x: 635, y: 225, label: {en: '3. Rolling Boil 1 min', es: '3. Hervor 1 minuto'}, role: 'safe'},
    ],
    keyPoints: [
      {en: 'Let muddy water settle and strain through clean cloth before filtering or disinfecting.', es: 'Deja decantar el lodo y prefiltra con tela antes de desinfectar o filtrar.'},
      {en: 'Improvised sand/charcoal filters clarify silt and taste, NOT viruses or tiny bacteria.', es: 'Los filtros caseros de arena/carbón quitan turbidez y olor, NO virus ni bacterias.'},
      {en: 'Bring clarified water to a rolling boil for 1 full minute (3 min above 2,000m elevation).', es: 'Hierve a borbotones 1 minuto completo (3 min por encima de 2.000m).'},
    ],
    microChallenge: {
      question: {
        en: 'Does an improvised bottle filter of gravel, sand, and campfire charcoal make muddy river water safe to drink without boiling?',
        es: '¿Un filtro casero de grava, arena y carbón deja el agua lista para beber sin hervir?',
      },
      options: [
        {en: 'Yes, charcoal kills all viruses', es: 'Sí, el carbón mata todos los virus'},
        {en: 'No — it only clarifies sediment; you must still boil, chemically treat, or use a 0.1µm membrane', es: 'No: solo clarifica; sigue siendo obligatorio hervir o desinfectar'},
        {en: 'Yes, if you freeze it afterward', es: 'Sí, si después se congela'},
      ],
      correctIndex: 1,
      explanation: {
        en: 'Charcoal and sand improve clarity and taste, but microbes pass straight through without boiling or certified 0.1µm hollow-fiber filtration.',
        es: 'Arena y carbón mejoran claridad y sabor, pero los microorganismos pasan si no hierves o usas filtro certificado.',
      },
    },
  },
  {
    id: 'les-12-rescue-signaling',
    category: 'wilderness',
    scene: 'rescue-signaling',
    title: {
      en: '12. Ground-to-Air Symbols, 3× Distress & Solar Azimuth',
      es: '12. Señales Tierra-Aire, Regla 3× y Orientación Solar',
    },
    subtitle: {
      en: 'Universal visual geometry and shadow-stick cardinal alignment.',
      es: 'Geometría visual internacional de rescate y brújula solar de sombra.',
    },
    visualPreset: {safeRouteId: 'tri'},
    hotspots: [
      {id: 'v', x: 125, y: 152, label: {en: 'V = Require Assistance', es: 'V = Necesito Ayuda'}, role: 'hazard'},
      {id: 'x', x: 238, y: 152, label: {en: 'X = Medical Help', es: 'X = Ayuda Médica'}, role: 'hazard'},
      {id: 'tri', x: 130, y: 348, label: {en: '3× Signal Pattern', es: 'Patrón 3× Socorro'}, role: 'safe'},
      {id: 'shadow', x: 605, y: 355, label: {en: 'Shadow t1(W) -> t2(E)', es: 'Sombra t1(O) -> t2(E)'}, role: 'safe'},
    ],
    keyPoints: [
      {en: '3 of anything (3 whistle blasts, 3 mirror flashes, 3 triangle fires) signals distress worldwide.', es: 'Tres impulsos (3 pitidos, 3 destellos, triángulo de 3 puntos) es socorro universal.'},
      {en: 'Ground-to-air symbols: V = require assistance, X = medical assistance, → = proceeding in direction.', es: 'Símbolos tierra-aire: V = ayuda general, X = asistencia médica, → = dirección de marcha.'},
      {en: 'Shadow stick: tip at t1 marks West; tip 20 min later (t2) marks East (line t1→t2 = W→E).', es: 'Palo de sombra: punta en t1 = Oeste; 20 min después en t2 = Este (t1→t2 = O→E).'},
    ],
    microChallenge: {
      question: {
        en: 'In the shadow-stick method, which direction does the line from first mark (t1) to second mark (t2) point?',
        es: 'En el método del palo y sombra, ¿hacia qué punto cardinal apunta la línea de t1 a t2?',
      },
      options: [
        {en: 'East (since sun moves East to West, shadow moves West to East)', es: 'Hacia el Este (el sol va de Este a Oeste y la sombra de Oeste a Este)'},
        {en: 'Always due North', es: 'Siempre al Norte'},
        {en: 'South in winter, North in summer', es: 'Sur en invierno y Norte en verano'},
      ],
      correctIndex: 0,
      explanation: {
        en: 'Sun travels East → West, so the shadow tip always advances West (t1) → East (t2).',
        es: 'El sol va de Este a Oeste, por lo que la sombra avanza de Oeste (t1) a Este (t2).',
      },
    },
  },
  {
    id: 'les-13-critical-knots',
    category: 'wilderness',
    scene: 'critical-knots',
    title: {
      en: '13. Critical Load Knots: Bowline, Figure-8 & Taut-Line',
      es: '13. Nudos Críticos: As de Guía, Ocho y Tensor',
    },
    subtitle: {
      en: 'Color-coded anatomy of Standing Part, Bight, and Working End.',
      es: 'Anatomía por color de Firme, Seno, Chicote y vector de carga.',
    },
    visualPreset: {knotStep: 3},
    hotspots: [
      {id: 'standing', x: 165, y: 230, label: {en: 'Standing Part (Load)', es: 'Firme (Carga)'}, role: 'safe'},
      {id: 'bight', x: 315, y: 230, label: {en: 'Bight / Collar Loop', es: 'Seno / Lazo Fijo'}, role: 'utility'},
      {id: 'working', x: 595, y: 215, label: {en: 'Anchor & Working End', es: 'Anclaje y Chicote'}, role: 'utility'},
    ],
    keyPoints: [
      {en: 'Bowline (As de guía): fixed non-slip loop that breaks open easily by pushing the collar back.', es: 'As de guía: gaza fija que no corre ni se estrangula y se deshace fácil rompiendo el cuello.'},
      {en: 'Figure-8 on a Bight: strong symmetrical fixed loop for anchors with high breaking strength retention.', es: 'Ocho por seno: lazo simétrico muy resistente para anclajes.'},
      {en: 'Taut-Line / Midshipman’s Hitch: sliding friction hitch that locks guyline tension cleanly.', es: 'Nudo tensor (Midshipman): nudo deslizante que bloquea vientos de refugio bajo tensión.'},
    ],
    microChallenge: {
      question: {
        en: 'Why should you NEVER tie a simple running slipknot around a rescue load or waist?',
        es: '¿Por qué NUNCA debes usar un nudo corredizo simple en cargas o rescate?',
      },
      options: [
        {en: 'It tightens continuously and crushes/strangles under tension', es: 'Se estrangula y aprieta sin límite al aplicar tensión'},
        {en: 'It cannot fit around a post', es: 'No rodea un poste'},
        {en: 'It weakens only dry cotton ropes', es: 'Solo falla en algodón seco'},
      ],
      correctIndex: 0,
      explanation: {
        en: 'Always use a fixed non-slip loop like a Bowline (with stopper) or Figure-8.',
        es: 'Usa siempre gaza fija como As de Guía (con remate) o Nudo en Ocho.',
      },
    },
  },
  {
    id: 'les-14-hypothermia-triage',
    category: 'wilderness',
    scene: 'first-aid-triage',
    title: {
      en: '14. Hypothermia Stages & Core-First Rewarming',
      es: '14. Fases de Hipotermia y Recalentamiento Central',
    },
    subtitle: {
      en: 'Prevent cardiac afterdrop and protect numb tissues.',
      es: 'Evita el fenómeno afterdrop cardíaco y protege tejidos fríos.',
    },
    visualPreset: {safeRouteId: 'core'},
    hotspots: [
      {id: 'core', x: 335, y: 225, label: {en: 'Chest / Axilla / Groin Heat', es: 'Calor en Pecho / Axilas / Ingles'}, role: 'safe'},
      {id: 'head', x: 215, y: 225, label: {en: 'Gentle Handling · Airway', es: 'Manejo Suave · Vía Aérea'}, role: 'utility'},
      {id: 'tq', x: 490, y: 205, label: {en: 'Do NOT Rub Limbs', es: 'NO Frotar Extremidades'}, role: 'hazard'},
    ],
    keyPoints: [
      {en: 'Stopped shivering + confusion ("umbles": mumbles, stumbles, fumbles) marks moderate-to-severe hypothermia.', es: 'El cese del temblor con confusión y torpeza indica hipotermia moderada o grave.'},
      {en: 'Handle gently in horizontal position, remove wet clothes, insulate from ground, cover head.', es: 'Manipula suavemente en horizontal, cambia ropa húmeda, aísla del suelo y cubre cabeza.'},
      {en: 'Apply cloth-wrapped warm packs strictly to torso core (chest, armpits, groin)—never rub limbs.', es: 'Aplica calor envuelto en tela al tronco (pecho, axilas, ingles) y jamás frotes brazos o piernas.'},
    ],
    microChallenge: {
      question: {
        en: 'Why is rubbing cold arms and legs dangerous in moderate/severe hypothermia?',
        es: '¿Por qué es peligroso frotar brazos y piernas en hipotermia moderada o grave?',
      },
      options: [
        {en: 'It pushes cold acidotic peripheral blood back to the heart ("afterdrop"), risking arrest', es: 'Devuelve sangre fría periférica al corazón (afterdrop), con riesgo de arritmia'},
        {en: 'It causes immediate fever', es: 'Provoca fiebre inmediata'},
        {en: 'It dries out the skin too quickly', es: 'Seca la piel demasiado rápido'},
      ],
      correctIndex: 0,
      explanation: {
        en: 'Core-first gentle rewarming protects the cold heart from lethal arrhythmias.',
        es: 'Recalentar el tronco primero protege al corazón frío frente a arritmias.',
      },
    },
  },
];
