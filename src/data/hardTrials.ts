import type {HardDecisionTrial, SketchChallenge} from '../types';

/**
 * High-difficulty nuanced tactical decisions where distractors reflect
 * common real-world misconceptions (not trivially absurd choices).
 */
export const HARD_DECISION_TRIALS: HardDecisionTrial[] = [
  {
    id: 'hd-01-backfeed-cord',
    category: 'blackout',
    scene: 'home-blackout-cutaway',
    title: {
      en: 'Generator Backfeed & Dryer Outlet Trap',
      es: 'Retorno Eléctrico y Toma de Secadora',
    },
    situation: {
      en: 'Hour 14 of a winter blackout. A neighbor suggests linking a 240V generator directly into your laundry dryer wall socket using a double-male cord to power the house.',
      es: 'Hora 14 de apagón invernal. Un vecino propone conectar el generador de 230V directamente al enchufe de pared de la secadora con un cable macho-macho para dar luz a toda la casa.',
    },
    prompt: {
      en: 'What is the ONLY electrically safe emergency connection protocol?',
      es: '¿Cuál es el ÚNICO protocolo eléctrico seguro para alimentar cargas críticas?',
    },
    initialVisual: {nightModeDefault: true, flashlightTarget: {x: 172, y: 318}},
    hotspots: [
      {id: 'breaker', x: 172, y: 318, label: {en: 'Panel + Interlock / Transfer Switch', es: 'Cuadro + Conmutador Transferencia'}, role: 'utility'},
      {id: 'fridge', x: 356, y: 330, label: {en: 'Dryer Wall Socket Backfeed', es: 'Inyectar en Enchufe Pared'}, role: 'utility'},
      {id: 'ext-gen', x: 705, y: 362, label: {en: 'Heavy Cord Direct to Essential Loads', es: 'Cable Exterior Directo a Cargas'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-interlock',
        hotspotId: 'ext-gen',
        label: {
          en: 'Refuse double-male cords; run heavy-gauge outdoor cord from generator >6m directly to fridge/charger or use an approved transfer switch',
          es: 'Rechazar cables macho-macho; usar alargadera exterior directa desde >6m o conmutador de transferencia homologado',
        },
        isOptimal: true,
        rationale: {
          en: 'Backfeeding through a wall outlet energizes utility lines up to transformer voltage—electrocution hazard for line crews—and leaves live exposed male prongs.',
          es: 'Inyectar por un enchufe energiza la línea exterior hasta miles de voltios en transformadores (mortal para operarios) y deja clavijas con tensión expuestas.',
        },
        visualEffect: {safeRouteId: 'ext-gen', flashlightTarget: {x: 705, y: 362}},
      },
      {
        id: 'opt-dryer-main-on',
        hotspotId: 'fridge',
        label: {
          en: 'Connect to the dryer outlet after unplugging other heavy appliances so voltage stays balanced',
          es: 'Conectar a la toma de fuerza tras desenchufar otros aparatos grandes para equilibrar la fase',
        },
        isOptimal: false,
        rationale: {
          en: 'Without physical mechanical isolation from the street grid, current backfeeds onto distribution lines and can ignite wiring.',
          es: 'Sin aislamiento físico de la red exterior, la corriente retorna a la calle y puede causar incendios o electrocutar técnicos.',
        },
        visualEffect: {hazardZoneId: 'gas', flashlightTarget: {x: 356, y: 330}},
      },
      {
        id: 'opt-breaker-tape',
        hotspotId: 'breaker',
        label: {
          en: 'Flip the main breaker OFF, tape it down, and use a double-male cord temporarily during daylight',
          es: 'Bajar el interruptor general, precintarlo con cinta y usar el cable macho-macho solo de día',
        },
        isOptimal: false,
        rationale: {
          en: 'A taped breaker is not an approved mechanical interlock: one accidental reset or live male prong contact causes lethal electrocution or fire.',
          es: 'Un térmico precintado no equivale a un enclavamiento mecánico; un fallo o contacto con la clavija macho provoca electrocución mortal.',
        },
        visualEffect: {hazardZoneId: 'win', flashlightTarget: {x: 172, y: 318}},
      },
      {
        id: 'opt-gfci-strip',
        label: {
          en: 'Plug the double-male cord through a surge-protected power strip first to block backfeed',
          es: 'Conectar el cable macho-macho pasando primero por una regleta con protector de picos',
        },
        isOptimal: false,
        rationale: {
          en: 'Surge strips clamp transient overvoltage spikes; they do not block 50/60 Hz backfeed current.',
          es: 'Una regleta limita picos transitorios, no bloquea el retorno de corriente alterna hacia la red.',
        },
        visualEffect: {hazardZoneId: 'win'},
      },
    ],
  },
  {
    id: 'hd-02-hypothermia-afterdrop',
    category: 'wilderness',
    scene: 'first-aid-triage',
    title: {
      en: 'Moderate Hypothermia & Afterdrop Protocol',
      es: 'Hipotermia Moderada y Riesgo de Afterdrop',
    },
    situation: {
      en: 'A hiker pulled from freezing rain is shivering violently, slurring speech, and has pale cold hands and feet (core ~33.5°C).',
      es: 'Un excursionista rescatado bajo lluvia gélida tiembla intensamente, arrastra las palabras y tiene manos y pies helados (~33,5°C centrales).',
    },
    prompt: {
      en: 'How must you rewarm the casualty without triggering lethal cardiac afterdrop?',
      es: '¿Cómo debes recalentarlo sin provocar un colapso cardíaco por "afterdrop"?',
    },
    initialVisual: {},
    hotspots: [
      {id: 'head', x: 215, y: 225, label: {en: 'Give Hot Coffee / Alcohol', es: 'Dar Café Caliente / Alcohol'}, role: 'utility'},
      {id: 'core', x: 335, y: 225, label: {en: 'Dry Layer + Core Torso Rewarm', es: 'Secar + Calor Central en Tronco'}, role: 'utility'},
      {id: 'tq', x: 490, y: 205, label: {en: 'Rub & Immerse Hands/Legs Hot', es: 'Frotar y Calentar Extremidades'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-core-rewarm',
        hotspotId: 'core',
        label: {
          en: 'Move out of wind, replace wet clothes with dry insulation, handle gently, and apply warm packs ONLY to chest, neck, armpits, and groin',
          es: 'Aislar del viento/suelo, cambiar ropa húmeda por seca, mover con suavidad y aplicar calor SOLO en tórax, cuello, axilas e ingles',
        },
        isOptimal: true,
        rationale: {
          en: 'Warming the core prevents cold peripheral blood from rushing back to the heart (afterdrop) while preventing ventricular fibrillation from rough handling.',
          es: 'Calentar el tronco evita que la sangre fría de extremidades retorne bruscamente al corazón (afterdrop) y evita arritmias.',
        },
        visualEffect: {activeZoneId: 'core', safeRouteId: 'core'},
      },
      {
        id: 'opt-rub-limbs',
        hotspotId: 'tq',
        label: {
          en: 'Vigorously rub arms and legs and place feet near a hot fire to restore circulation fast',
          es: 'Frotar con fuerza brazos y piernas y acercar los pies al fuego para reactivar la circulación',
        },
        isOptimal: false,
        rationale: {
          en: 'Rubbing damages cold tissue and dilates peripheral vessels, forcing ice-cold blood straight into the heart ("afterdrop" collapse).',
          es: 'Frotar daña tejidos y dilata vasos periféricos, enviando sangre helada al corazón y provocando paro por afterdrop.',
        },
        visualEffect: {hazardZoneId: 'tq'},
      },
      {
        id: 'opt-jog',
        label: {
          en: 'Keep the casualty walking briskly uphill to generate internal muscular heat',
          es: 'Hacer que camine rápido cuesta arriba para generar calor muscular interno',
        },
        isOptimal: false,
        rationale: {
          en: 'Once speech slurs and coordination drops, vigorous movement accelerates core cooling and risks lethal arrhythmia.',
          es: 'Cuando ya hay disartria o confusión, el esfuerzo físico acelera el colapso cardíaco y agrava el enfriamiento central.',
        },
        visualEffect: {hazardZoneId: 'tq'},
      },
      {
        id: 'opt-hot-bath',
        hotspotId: 'head',
        label: {
          en: 'Give warm spiced wine or strong coffee immediately and immerse in very hot water',
          es: 'Dar bebida alcohólica caliente o café fuerte y sumergir en agua muy caliente',
        },
        isOptimal: false,
        rationale: {
          en: 'Alcohol causes peripheral vasodilation (rapid heat loss); sudden hot immersion drops blood pressure fatally.',
          es: 'El alcohol provoca vasodilatación y pérdida de calor; el baño muy caliente desploma la tensión arterial.',
        },
        visualEffect: {hazardZoneId: 'head'},
      },
    ],
  },
  {
    id: 'hd-03-quake-gas-criteria',
    category: 'disaster',
    scene: 'home-blackout-cutaway',
    title: {
      en: 'Post-Quake Gas Valve Criteria',
      es: 'Criterio de Cierre de Gas Tras Sismo',
    },
    situation: {
      en: 'A moderate M5.4 earthquake shakes your neighborhood. Shaking stops cleanly; walls show hairline plaster cracks, power is out, and you smell NO gas and hear NO hissing.',
      es: 'Un sismo moderado M5,4 sacude el barrio. Cesa la sacudida: hay microfisuras en pintura, se fue la luz, pero NO hueles a gas ni oyes silbidos.',
    },
    prompt: {
      en: 'According to civil protection standards, what should you do with the main gas valve?',
      es: 'Según los estándares de protección civil, ¿qué debes hacer con la llave general de gas?',
    },
    initialVisual: {nightModeDefault: true, flashlightTarget: {x: 245, y: 345}},
    hotspots: [
      {id: 'gas', x: 245, y: 345, label: {en: 'Inspect Gas Valve & Meter', es: 'Inspeccionar Llave y Contador'}, role: 'utility'},
      {id: 'breaker', x: 172, y: 318, label: {en: 'Test Wall Light Switches', es: 'Probar Interruptores'}, role: 'utility'},
      {id: 'ext-gen', x: 705, y: 362, label: {en: 'Evacuate Block Immediately', es: 'Evacuar Edificio'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-inspect-first',
        hotspotId: 'gas',
        label: {
          en: 'Do NOT shut gas off unless you smell gas, hear hissing, or see the meter dial spinning rapidly—if you shut it off, only the utility may restore it',
          es: 'NO cerrar el gas salvo olor, silbido o giro rápido del contador; si lo cierras sin fuga, solo la compañía podrá rearmarlo',
        },
        isOptimal: true,
        rationale: {
          en: 'Unnecessary mass shutoffs overwhelm utility crews for days while leaving families without heating/hot water; shut off ONLY on leak signs.',
          es: 'Cerrar el gas por rutina sin indicios de fuga colapsa a los técnicos durante días y bloquea calderas; cierra solo ante olor, silbido o giro anómalo.',
        },
        visualEffect: {safeRouteId: 'breaker', flashlightTarget: {x: 245, y: 345}},
      },
      {
        id: 'opt-always-shut',
        label: {
          en: 'Always shut the main gas valve after every felt earthquake as mandatory precaution and reopen it 10 minutes later',
          es: 'Cerrar siempre la llave general tras cualquier sismo sentido y volver a abrirla a los 10 minutos',
        },
        isOptimal: false,
        rationale: {
          en: 'Reopening a gas main yourself risks unlit pilot leaks and explosions; shutoff is reserved for actual suspected leaks.',
          es: 'Reabrir la llave general uno mismo sin purga ni técnicos conlleva riesgo de fuga en pilotos apagados y explosión.',
        },
        visualEffect: {hazardZoneId: 'gas'},
      },
      {
        id: 'opt-lighter-check',
        hotspotId: 'breaker',
        label: {
          en: 'Flip kitchen ceiling lights ON to inspect meter dials closely in the dark',
          es: 'Encender la luz del techo o usar mechero para leer el contador de gas a oscuras',
        },
        isOptimal: false,
        rationale: {
          en: 'Never switch electrical circuits or strike flames near gas pipes if structural stress occurred; use a battery LED flashlight.',
          es: 'Jamás acciones interruptores ni llamas cerca de tuberías tras un sismo; usa únicamente linterna LED.',
        },
        visualEffect: {hazardZoneId: 'gas'},
      },
      {
        id: 'opt-water-shut',
        hotspotId: 'ext-gen',
        label: {
          en: 'Shut the main water valve immediately so the gas boiler shuts down automatically',
          es: 'Cerrar primero la llave general del agua para que la caldera de gas se apague sola',
        },
        isOptimal: false,
        rationale: {
          en: 'Cutting water neither stops gas line leaks nor preserves emergency trapped tap water.',
          es: 'Cortar el agua no detiene fugas en la red de gas y te impide recoger agua limpia residual.',
        },
        visualEffect: {hazardZoneId: 'win'},
      },
    ],
  },
  {
    id: 'hd-04-wildfire-car-smoke',
    category: 'disaster',
    scene: 'road-vehicle-storm',
    title: {
      en: 'Wildfire Smoke Entrapment in Vehicle',
      es: 'Atrapamiento por Humo de Incendio en Vehículo',
    },
    situation: {
      en: 'Thick wildfire smoke drops highway visibility below 5 meters; burning embers cross the shoulder ahead.',
      es: 'Humo denso de incendio forestal reduce la visibilidad a menos de 5 metros y caen pavesas cerca de la calzada.',
    },
    prompt: {
      en: 'Which action preserves survival if you cannot safely outdrive the smoke wall?',
      es: '¿Qué secuencia protege tu vida si no puedes salir con seguridad del frente de humo?',
    },
    initialVisual: {},
    hotspots: [
      {id: 'car', x: 325, y: 270, label: {en: 'Cleared Turnout · Inside Cabin', es: 'Zona Despejada · Dentro del Coche'}, role: 'utility'},
      {id: 'embankment', x: 675, y: 190, label: {en: 'Run Up Vegetated Slope', es: 'Subir Talud con Matorral'}, role: 'utility'},
      {id: 'tri', x: 115, y: 286, label: {en: 'Push Through Blind at 60 km/h', es: 'Seguir a Ciegas a 60 km/h'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-recirculate',
        hotspotId: 'car',
        label: {
          en: 'Pull onto wide paved clearing away from brush, close windows/vents, set AC to RECIRCULATE, keep lights ON, and stay low inside',
          es: 'Apartar a explanada asfaltada lejos de vegetación, cerrar ventanillas, activar aire en RECIRCULACIÓN, luces encendidas y agacharse',
        },
        isOptimal: true,
        rationale: {
          en: 'Vehicle cabins shield against radiant heat better than fleeing on foot into brush; recirculate prevents drawing toxic smoke inside.',
          es: 'El habitáculo protege del calor radiante mucho más que huir a pie; recircular evita aspirar humo tóxico del exterior.',
        },
        visualEffect: {safeRouteId: 'car'},
      },
      {
        id: 'opt-fresh-air',
        label: {
          en: 'Set car ventilation to maximum FRESH AIR intake so positive pressure pushes smoke out',
          es: 'Poner la ventilación al máximo en TOMA EXTERIOR para crear sobrepresión y expulsar el humo',
        },
        isOptimal: false,
        rationale: {
          en: 'Fresh air intake actively pumps superheated toxic smoke and CO directly into the passenger compartment.',
          es: 'La toma exterior bombea humo ardiente y monóxido directamente dentro de la cabina.',
        },
        visualEffect: {hazardZoneId: 'car'},
      },
      {
        id: 'opt-flee-foot',
        hotspotId: 'embankment',
        label: {
          en: 'Abandon the car before flames arrive and sprint uphill through scrub vegetation',
          es: 'Abandonar el coche y correr ladera arriba entre el matorral para superar la nube de humo',
        },
        isOptimal: false,
        rationale: {
          en: 'Wildfires move dramatically faster uphill through brush than humans can run, and radiant heat is lethal without shelter.',
          es: 'El fuego asciende laderas mucho más rápido que una persona corriendo; abandonar el vehículo entre matorral suele ser fatal.',
        },
        visualEffect: {hazardZoneId: 'embankment'},
      },
      {
        id: 'opt-high-speed',
        hotspotId: 'tri',
        label: {
          en: 'Turn on high beams and accelerate quickly to clear the smoke stretch in seconds',
          es: 'Poner luces largas y acelerar fuerte para cruzar la cortina de humo en segundos',
        },
        isOptimal: false,
        rationale: {
          en: 'High beams reflect off dense smoke causing whiteout; blind acceleration risks head-on collisions or leaving the road.',
          es: 'Las luces largas rebotan en el humo y ciegan aún más; acelerar a ciegas provoca colisiones múltiples o salidas de vía.',
        },
        visualEffect: {hazardZoneId: 'cable'},
      },
    ],
  },
  {
    id: 'hd-05-hurricane-glass-myth',
    category: 'disaster',
    scene: 'home-blackout-cutaway',
    title: {
      en: 'Severe Windstorm Window & Shelter Protocol',
      es: 'Temporal Severo: Mito de Ventanas y Refugio',
    },
    situation: {
      en: 'Category-scale hurricane gusts (160 km/h) threaten your two-story house with large exterior windows.',
      es: 'Rachas ciclónicas de 160 km/h golpean tu vivienda de dos plantas con grandes ventanales exteriores.',
    },
    prompt: {
      en: 'Which structural preparation actually reduces fatal glass and debris injury?',
      es: '¿Qué medida reduce realmente el riesgo mortal por rotura de cristales e impacto?',
    },
    initialVisual: {flashlightTarget: {x: 360, y: 210}},
    hotspots: [
      {id: 'win', x: 171, y: 201, label: {en: 'Tape X Across Window Glass', es: 'Poner Cinta en X en Ventanas'}, role: 'utility'},
      {id: 'breaker', x: 365, y: 210, label: {en: 'Interior Windowless Core Room', es: 'Estancia Interior Sin Ventanas'}, role: 'utility'},
      {id: 'ext-gen', x: 585, y: 340, label: {en: 'Crack Leeward Windows Open', es: 'Abrir Ventanas Sotavento'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-core-room',
        hotspotId: 'breaker',
        label: {
          en: 'Close shutters/interior doors and shelter inside a ground-floor windowless interior bathroom/hallway with mattress/helmet cover',
          es: 'Cerrar contraventanas y puertas interiores y refugiarse en pasillo o baño interior en planta baja bajo protección',
        },
        isOptimal: true,
        rationale: {
          en: 'Multiple interior walls buffer flying debris and prevent roof uplift caused by open windward breaches.',
          es: 'Las paredes interiores frenan proyectiles y mantener el edificio cerrado evita sobrepresión interna que levante el tejado.',
        },
        visualEffect: {safeRouteId: 'breaker'},
      },
      {
        id: 'opt-tape-x',
        hotspotId: 'win',
        label: {
          en: 'Apply wide duct tape in large "X" patterns across glass panes so they stay intact if struck',
          es: 'Pegar cinta americana en "X" sobre los cristales para evitar que se fragmenten si impacta algo',
        },
        isOptimal: false,
        rationale: {
          en: 'Taping windows is a dangerous myth: it wastes time and binds broken glass into giant guillotine shards instead of small fragments.',
          es: 'Es un mito peligroso: la cinta no refuerza el vidrio y convierte el cristal roto en láminas pesadas cortantes.',
        },
        visualEffect: {hazardZoneId: 'win'},
      },
      {
        id: 'opt-crack-windows',
        hotspotId: 'ext-gen',
        label: {
          en: 'Crack windows open on the opposite side to equalize barometric pressure and prevent roof blowout',
          es: 'Dejar rendijas abiertas en ventanas opuestas para igualar la presión y que no vuele el tejado',
        },
        isOptimal: false,
        rationale: {
          en: 'Opening windows allows pressurized wind inside, creating upward lift that tears roofs off faster.',
          es: 'Abrir ventanas introduce viento a presión dentro de la vivienda y multiplica la fuerza que arranca cubiertas.',
        },
        visualEffect: {hazardZoneId: 'win'},
      },
      {
        id: 'opt-attic',
        label: {
          en: 'Move upstairs into the attic space with an axe in case floodwaters rise',
          es: 'Subir directamente al desván bajo el tejado para evitar posibles inundaciones',
        },
        isOptimal: false,
        rationale: {
          en: 'During extreme windstorms before flooding, upper roofs are the first structural elements to fail; never enter an unvented attic without escape.',
          es: 'Durante viento extremo, la cubierta superior es la más vulnerable al colapso; refúgiate primero en núcleo interior bajo.',
        },
        visualEffect: {hazardZoneId: 'win'},
      },
    ],
  },
  {
    id: 'hd-06-water-virus-gap',
    category: 'wilderness',
    scene: 'water-purification',
    title: {
      en: 'Post-Flood Water Pathogen Blind Spot',
      es: 'Punto Ciego de Virus en Agua Post-Inundación',
    },
    situation: {
      en: 'Floodwaters mixed agricultural runoff and urban sewage into a local stream. You only have a 0.1-micron hollow-fiber hiking filter and fuel stove.',
      es: 'La crecida mezcló aguas residuales urbanas en el arroyo. Solo tienes un filtro portátil de fibra hueca de 0,1 micras y un hornillo con gas.',
    },
    prompt: {
      en: 'Why is filtering alone through a 0.1-micron hiking filter NOT enough here?',
      es: '¿Por qué filtrar solo con 0,1 micras NO basta en este escenario?',
    },
    initialVisual: {},
    hotspots: [
      {id: 'source', x: 127, y: 215, label: {en: 'Decant Silt Only', es: 'Solo Decantar Sedimentos'}, role: 'utility'},
      {id: 'filter', x: 375, y: 215, label: {en: '0.1µm / Charcoal Filter Alone', es: 'Solo Filtro 0,1µm / Carbón'}, role: 'utility'},
      {id: 'boil', x: 635, y: 225, label: {en: 'Filter + 1 Min Rolling Boil', es: 'Filtrar + Hervir 1 Minuto'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-virus-boil',
        hotspotId: 'boil',
        label: {
          en: '0.1-micron pores block bacteria & protozoa, NOT enteric viruses (~0.02–0.08 µm); decant/filter turbidity then boil 1 min (or dose chlorine)',
          es: 'Los poros de 0,1 micras frenan bacterias y protozoos, NO virus (~0,02–0,08 µm); tras filtrar turbidez debes hervir 1 min o clorar',
        },
        isOptimal: true,
        rationale: {
          en: 'Most backcountry hollow-fiber filters are microfilters (0.1 µm), not virus purifiers (0.02 µm). Sewage-impacted water always requires thermal or chemical disinfection.',
          es: 'Los filtros de 0,1 µm no retienen virus fecales. Ante posible contaminación humana/ganadera es obligatorio hervir o desinfectar químicamente.',
        },
        visualEffect: {safeRouteId: 'boil'},
      },
      {
        id: 'opt-double-pass',
        hotspotId: 'filter',
        label: {
          en: 'Run the water twice through the 0.1-micron filter and once through activated charcoal to trap all biological hazards',
          es: 'Pasar el agua dos veces por el filtro de 0,1 micras y una por carbón activo para eliminar todo riesgo biológico',
        },
        isOptimal: false,
        rationale: {
          en: 'Passing smaller viruses twice through a 0.1-micron pore still lets viruses pass straight through; charcoal improves taste/chemicals, not viral sterility.',
          es: 'Pasar dos veces por el mismo poro de 0,1 micras sigue dejando pasar virus; el carbón mejora sabor y químicos, no esteriliza virus.',
        },
        visualEffect: {hazardZoneId: 'source'},
      },
      {
        id: 'opt-solar-1h',
        hotspotId: 'source',
        label: {
          en: 'Leave clear filtered water in a dark metal canteen in the sun for 45 minutes',
          es: 'Dejar el agua filtrada dentro de una cantimplora metálica oscura al sol 45 minutos',
        },
        isOptimal: false,
        rationale: {
          en: 'SODIS requires clear PET plastic bottles exposed to full UV-A sun for 6+ hours—opaque metal canteens block UV completely.',
          es: 'El método SODIS exige botellas PET transparentes al sol 6+ horas; las cantimploras metálicas bloquean los rayos UV.',
        },
        visualEffect: {hazardZoneId: 'source'},
      },
      {
        id: 'opt-freeze',
        label: {
          en: 'Freeze the filtered water overnight if frost occurs to kill remaining pathogens',
          es: 'Congelar el agua filtrada durante la noche si hiela para matar los patógenos restantes',
        },
        isOptimal: false,
        rationale: {
          en: 'Freezing preserves many dormant bacteria and viruses rather than destroying them.',
          es: 'La congelación conserva gran parte de bacterias y virus latentes sin inactivarlos.',
        },
        visualEffect: {hazardZoneId: 'source'},
      },
    ],
  },
  {
    id: 'hd-07-swiftwater-rope',
    category: 'wilderness',
    scene: 'topo-evacuation-map',
    title: {
      en: 'Swiftwater Crossing & Waist-Rope Hazard',
      es: 'Vadeo de Corriente y Peligro de Cuerda a la Cintura',
    },
    situation: {
      en: 'Forced to cross a knee-deep fast mountain stream during retreat, a partner offers to tie a static rope tightly around your waist anchored to a tree.',
      es: 'Obligados a vadear un arroyo rápido hasta la rodilla, un compañero propone atarte una cuerda fija a la cintura anclada a un árbol.',
    },
    prompt: {
      en: 'Why do swiftwater rescue protocols forbid tying a fixed rope around a wader’s waist?',
      es: '¿Por qué los protocolos de rescate acuático prohíben atar una cuerda fija a la cintura al vadear?',
    },
    initialVisual: {waterLevelPct: 70},
    hotspots: [
      {id: 'bridge', x: 380, y: 215, label: {en: 'Cross With Fixed Waist Rope', es: 'Cruzar Atado por la Cintura'}, role: 'utility'},
      {id: 'ridge', x: 690, y: 62, label: {en: 'Find Wide Shallow / High Detour', es: 'Buscar Zona Ancha / Desvío Alto'}, role: 'utility'},
      {id: 'valley', x: 435, y: 340, label: {en: 'Cross Narrow Deep Gorge', es: 'Cruzar Garganta Estrecha'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-no-waist-rope',
        hotspotId: 'ridge',
        label: {
          en: 'Refuse fixed waist tie-in (water pressure pins a tethered swimmer underwater). Seek wider, shallower braids or detour high; unbuckle pack belt if crossing',
          es: 'Rechazar atarse a la cintura (la corriente hunde al nadador tensado). Buscar tramo ancho y somero o desvío alto y soltar cinturón de mochila',
        },
        isOptimal: true,
        rationale: {
          en: 'A taut anchored waist tether acts like a boat anchor in current, forcing the victim’s head beneath the surface.',
          es: 'Una cuerda tensa anclada a la cintura actúa como un ancla bajo la corriente y hunde la cabeza bajo el agua sin poder liberarse.',
        },
        visualEffect: {safeRouteId: 'ridge'},
      },
      {
        id: 'opt-waist-bowline',
        hotspotId: 'bridge',
        label: {
          en: 'Tie a non-slip Bowline around the waist so you cannot lose the rope if swept off your feet',
          es: 'Hacer un as de guía no corredizo en la cintura para no soltar la cuerda si pierdes pie',
        },
        isOptimal: false,
        rationale: {
          en: 'A non-slip knot around the waist makes self-release impossible while river hydraulics plane your body underwater.',
          es: 'Un nudo fijo en la cintura impide soltarse mientras la fuerza hidráulica te mantiene sumergido.',
        },
        visualEffect: {hazardZoneId: 'bridge'},
      },
      {
        id: 'opt-narrow-deep',
        hotspotId: 'valley',
        label: {
          en: 'Choose the narrowest constriction in the channel so crossing time is shortest',
          es: 'Elegir el estrechamiento más angosto del cauce para tardar menos segundos en cruzar',
        },
        isOptimal: false,
        rationale: {
          en: 'Narrow constrictions accelerate water velocity and depth exponentially; wide braided shallows are far slower and safer.',
          es: 'Los estrechamientos aceleran la velocidad y profundidad del agua; los tramos anchos tienen menor fuerza.',
        },
        visualEffect: {hazardZoneId: 'valley'},
      },
      {
        id: 'opt-lock-pack',
        label: {
          en: 'Tighten your backpack waist belt securely so gear keeps your hips buoyant',
          es: 'Ajustar al máximo el cinturón lumbar de la mochila para que dé flotabilidad',
        },
        isOptimal: false,
        rationale: {
          en: 'A buckled heavy pack flips a fallen swimmer face-down and traps them; always unclip chest and hip straps before crossing water.',
          es: 'Una mochila atada gira al nadador boca abajo o lo atrapa bajo agua; siempre desabrocha pecho y cintura al vadear.',
        },
        visualEffect: {hazardZoneId: 'bridge'},
      },
    ],
  },
  {
    id: 'hd-08-gas-spark-avoid',
    category: 'urban',
    scene: 'home-blackout-cutaway',
    title: {
      en: 'Indoor Natural Gas Leak — Zero-Ignition Rule',
      es: 'Fuga de Gas Interior — Regla Cero Chispas',
    },
    situation: {
      en: 'Returning home at dusk, you open the front door and immediately smell strong mercaptan (rotten-egg gas odor) inside the dark hallway.',
      es: 'Al volver a casa al anochecer abres la puerta y percibes un fuerte olor a gas (mercaptano) en el recibidor oscuro.',
    },
    prompt: {
      en: 'Which immediate action avoids triggering an ignition spark inside the explosive envelope?',
      es: '¿Qué secuencia evita generar la chispa que detonaría la mezcla de gas y aire?',
    },
    initialVisual: {nightModeDefault: true, hazardZoneId: 'gas'},
    hotspots: [
      {id: 'breaker', x: 172, y: 318, label: {en: 'Touch Breaker / Light Switch', es: 'Tocar Cuadro o Interruptor'}, role: 'utility'},
      {id: 'gas', x: 245, y: 345, label: {en: 'Turn On Kitchen Extractor Fan', es: 'Encender Extractor Cocina'}, role: 'utility'},
      {id: 'ext-gen', x: 705, y: 362, label: {en: 'Leave Switches Alone · Evacuate & Call Outdoors', es: 'No Tocar Interruptores · Evacuar y Llamar Fuera'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-no-switches',
        hotspotId: 'ext-gen',
        label: {
          en: 'Do NOT touch any light switch, breaker, fan, or phone inside; leave door open as you exit immediately and call 112 from well outside',
          es: 'NO tocar interruptores, térmicos, extractor ni móvil dentro; salir de inmediato dejando la puerta abierta y llamar al 112 desde lejos fuera',
        },
        isOptimal: true,
        rationale: {
          en: 'Switching ANY electrical circuit ON or OFF creates a tiny internal contact arc capable of igniting an explosive gas-air mixture.',
          es: 'Tanto encender como apagar un interruptor o extractor genera una microchispa capaz de detonar gas acumulado.',
        },
        visualEffect: {safeRouteId: 'ext-gen', flashlightTarget: {x: 585, y: 340}},
      },
      {
        id: 'opt-turn-off-breaker',
        hotspotId: 'breaker',
        label: {
          en: 'Sprint straight to the indoor breaker box and flip the main breaker OFF to prevent sparks',
          es: 'Entrar rápido al cuadro eléctrico interior y bajar el diferencial general para evitar chispas',
        },
        isOptimal: false,
        rationale: {
          en: 'Opening/tripping loaded breakers under power creates an arc right inside the gas-filled room.',
          es: 'Bajar el interruptor general bajo carga produce un arco eléctrico justo dentro del recinto con gas.',
        },
        visualEffect: {hazardZoneId: 'gas', flashlightTarget: {x: 172, y: 318}},
      },
      {
        id: 'opt-extractor',
        hotspotId: 'gas',
        label: {
          en: 'Switch on the kitchen range hood extractor fan at max speed to vent gas out the duct',
          es: 'Encender la campana extractora de la cocina al máximo para evacuar el gas por el conducto',
        },
        isOptimal: false,
        rationale: {
          en: 'Brush motors and relays inside extractor fans are classic ignition sources in residential gas explosions.',
          es: 'Los motores y relés de campanas extractoras son una causa frecuente de explosión doméstica por gas.',
        },
        visualEffect: {hazardZoneId: 'gas'},
      },
      {
        id: 'opt-call-hallway',
        label: {
          en: 'Stand in the hallway inside and call the gas company immediately while checking stove knobs',
          es: 'Quedarse en el pasillo llamando por móvil a la compañía mientras revisas los mandos',
        },
        isOptimal: false,
        rationale: {
          en: 'Never remain inside a suspected gas accumulation zone; evacuate first before dialing.',
          es: 'Nunca permanezcas en el interior ni uses dispositivos dentro de la zona con olor intenso; evacua primero.',
        },
        visualEffect: {hazardZoneId: 'gas'},
      },
    ],
  },
  {
    id: 'hd-09-impaled-object',
    category: 'urban',
    scene: 'first-aid-triage',
    title: {
      en: 'Penetrating Glass / Impaled Object Triage',
      es: 'Triaje ante Objeto Clavado (Vidrio / Hierro)',
    },
    situation: {
      en: 'Following storm window failure, a 12 cm shard of glass remains deeply embedded in a casualty’s upper thigh with moderate oozing around the entry.',
      es: 'Tras estallar una ventana por el temporal, un fragmento de vidrio de 12 cm sigue clavado profundamente en el muslo con sangrado moderado alrededor.',
    },
    prompt: {
      en: 'What is the correct pre-hospital trauma handling?',
      es: '¿Cuál es el manejo prehospitalario correcto hasta la llegada de sanitarios?',
    },
    initialVisual: {},
    hotspots: [
      {id: 'head', x: 215, y: 225, label: {en: 'Pull Shard Out & Press Wound', es: 'Extraer Vidrio y Presionar'}, role: 'utility'},
      {id: 'core', x: 335, y: 225, label: {en: 'Leave In Place · Bulky Pad Stabilization', es: 'No Extraer · Inmovilizar con Apósitos'}, role: 'utility'},
      {id: 'tq', x: 490, y: 205, label: {en: 'Bend Shard Flush With Skin', es: 'Doblar/Partir al Ras'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-stabilize',
        hotspotId: 'core',
        label: {
          en: 'Leave the object impaled (it acts as a plug); build bulky gauze rings around its base and bandage to immobilize until EMS arrives',
          es: 'NO extraer el objeto (hace efecto tapón); rodearlo con rollos de gasa abultados para inmovilizarlo sin presionar sobre el vidrio',
        },
        isOptimal: true,
        rationale: {
          en: 'Removing a deeply embedded shard can unleash catastrophic arterial hemorrhage if it was tamponading a cut vessel.',
          es: 'Retirar un objeto clavado puede liberar una hemorragia arterial masiva si estaba taponando el vaso seccionado.',
        },
        visualEffect: {safeRouteId: 'core'},
      },
      {
        id: 'opt-pull-clean',
        hotspotId: 'head',
        label: {
          en: 'Pull the shard cleanly straight out along the entry angle so you can pack direct pressure into the wound',
          es: 'Extraer el cristal de un tirón recto siguiendo el ángulo de entrada para poder presionar la herida',
        },
        isOptimal: false,
        rationale: {
          en: 'Field removal tears adjacent vessels and eliminates natural internal tamponade; only remove if it blocks the airway during CPR.',
          es: 'Extraerlo fuera de quirófano desgarra tejidos y suelta el tapón natural; solo se retira si obstruye vía aérea.',
        },
        visualEffect: {hazardZoneId: 'tq'},
      },
      {
        id: 'opt-snap-flush',
        hotspotId: 'tq',
        label: {
          en: 'Snap off the protruding end flush with the leg so transport splints fit over it easily',
          es: 'Partir la parte sobrante al ras de la piel para poder vendar encima con comodidad',
        },
        isOptimal: false,
        rationale: {
          en: 'Breaking or bending the object twists the buried tip internally, worsening vascular and nerve lacerations.',
          es: 'Doblar o partir el objeto mueve la punta interna y agrava lesiones vasculares o nerviosas.',
        },
        visualEffect: {hazardZoneId: 'tq'},
      },
      {
        id: 'opt-elevate-ice',
        label: {
          en: 'Pack ice directly over the shard to constrict bleeding vessels before moving the victim',
          es: 'Aplicar hielo directamente encima del objeto para contraer los vasos antes de moverlo',
        },
        isOptimal: false,
        rationale: {
          en: 'Weight on the protruding object drives it deeper; immobilization + monitoring shock/tourniquet readiness is vital.',
          es: 'Aplicar peso encima hunde más el fragmento; estabiliza lateralmente y controla signos de shock.',
        },
        visualEffect: {hazardZoneId: 'tq'},
      },
    ],
  },
  {
    id: 'hd-10-cold-blackout-microclimate',
    category: 'blackout',
    scene: 'home-blackout-cutaway',
    title: {
      en: 'Sub-Zero Blackout Thermal Microclimate',
      es: 'Microclima Térmico en Apagón Bajo Cero',
    },
    situation: {
      en: 'Outside temperature drops to -8°C during a multi-day power & gas outage. Inside your apartment, radiators are cold.',
      es: 'La temperatura exterior cae a -8°C durante un corte prolongado de luz y gas. Los radiadores están fríos.',
    },
    prompt: {
      en: 'What strategy preserves human core heat indoors for 72 hours without CO poisoning?',
      es: '¿Qué estrategia conserva mejor el calor corporal 72 horas sin riesgo de intoxicación por CO?',
    },
    initialVisual: {nightModeDefault: true, flashlightTarget: {x: 365, y: 210}},
    hotspots: [
      {id: 'breaker', x: 365, y: 210, label: {en: 'Seal 1 Inner Room + Tent Bed', es: 'Sellar 1 Estancia Interior + Tienda'}, role: 'utility'},
      {id: 'win', x: 171, y: 201, label: {en: 'Burn Charcoal / Stove Inside', es: 'Brasero / Hornillo en Salón'}, role: 'utility'},
      {id: 'fridge', x: 356, y: 330, label: {en: 'Heat With Open Gas Oven', es: 'Calentar Con Horno Abierto'}, role: 'utility'},
    ],
    options: [
      {
        id: 'opt-micro-room',
        hotspotId: 'breaker',
        label: {
          en: 'Consolidate everyone into one small interior room, hang blankets over windows/doors, pitch an indoor tent or blanket fort off the floor, and wear dry layered wool/fleece',
          es: 'Concentrar a todos en 1 habitación interior pequeña, tapar rendijas/ventanas, montar tienda o cabaña elevada del suelo y vestir por capas secas',
        },
        isOptimal: true,
        rationale: {
          en: 'A small insulated micro-enclosure traps body heat (~100W per person) safely while floor elevation stops conductive heat loss.',
          es: 'Reducir el volumen de aire permite aprovechar el calor corporal (~100W por persona) de forma segura y aislarse del suelo frío.',
        },
        visualEffect: {safeRouteId: 'breaker', flashlightTarget: {x: 365, y: 210}},
      },
      {
        id: 'opt-gas-oven',
        hotspotId: 'fridge',
        label: {
          en: 'Leave a propane camp stove or gas oven door open on low flame inside the closed kitchen to hold 16°C',
          es: 'Encender el hornillo portátil de camping u horno con puerta abierta a fuego mínimo para mantener 16°C',
        },
        isOptimal: false,
        rationale: {
          en: 'Unvented combustion stoves and open ovens rapidly produce lethal CO and deplete indoor oxygen.',
          es: 'Los hornillos portátiles y hornos abiertos en recintos cerrados acumulan CO mortal silenciosamente.',
        },
        visualEffect: {hazardZoneId: 'gas'},
      },
      {
        id: 'opt-clay-candles',
        hotspotId: 'win',
        label: {
          en: 'Build a terracotta flowerpot heater over 12 tealight candles beside sleeping bags',
          es: 'Colocar macetas de barro invertidas sobre 12 velas junto a los sacos de dormir',
        },
        isOptimal: false,
        rationale: {
          en: 'Tealights emit negligible total heat (~30W each) while clustered wax pools frequently flash-ignite beside bedding.',
          es: 'Las velas aportan calor mínimo mientras la cera agrupada junto a mantas genera riesgo grave de incendio.',
        },
        visualEffect: {hazardZoneId: 'win'},
      },
      {
        id: 'opt-circulate-rooms',
        label: {
          en: 'Leave all interior doors open so air circulates evenly and prevents condensation dampness',
          es: 'Dejar todas las puertas interiores abiertas para que circule el aire y no haya condensación',
        },
        isOptimal: false,
        rationale: {
          en: 'Connecting cold exterior rooms drains heat from sleeping quarters rapidly; isolate unused rooms.',
          es: 'Comunicar habitaciones frías con fachadas disipa el calor acumulado; aísla una sola estancia.',
        },
        visualEffect: {hazardZoneId: 'win'},
      },
    ],
  },
];

/**
 * Upgraded 4-hotspot high-difficulty visual map & diagram challenges.
 */
export const HARD_VISUAL_TRIALS: SketchChallenge[] = [
  {
    id: 'hv-01-shelter-cold-sink',
    category: 'wilderness',
    scene: 'wilderness-shelter',
    title: {
      en: 'Thermal Camp Micro-Siting (4 Zones)',
      es: 'Micro-Ubicación Térmica de Campamento (4 Zonas)',
    },
    prompt: {
      en: 'Night temperatures drop below freezing with gusty wind from the left. Click the ONLY zone combining wind protection AND avoidance of pooling cold air.',
      es: 'La temperatura cae bajo cero con viento desde la izquierda. Pulsa la ÚNICA zona protegida del viento Y libre de bolsas de aire frío.',
    },
    initialVisual: {windAngleDeg: 0},
    hotspots: [
      {id: 'snag', x: 185, y: 128, label: {en: 'Upper Canopy Ridge', es: 'Cresta Arbolada Superior'}, role: 'utility'},
      {id: 'bench', x: 390, y: 215, label: {en: 'Mid-Slope Leeward Bench', es: 'Terraza Media a Sotavento'}, role: 'utility'},
      {id: 'trench', x: 288, y: 255, label: {en: 'Exposed Windward Shoulder', es: 'Ladera Expuesta Barlovento'}, role: 'utility'},
      {id: 'valley-sink', x: 705, y: 365, label: {en: 'Flat Valley Floor Hollow', es: 'Hondonada Plana del Fondo'}, role: 'utility'},
    ],
    correctHotspotId: 'bench',
    explanation: {
      en: 'Cold dense air drains downhill into valley floors ("cold air sinks"), while upper ridges catch full wind and deadfall snags. Mid-slope leeward benches stay warmest.',
      es: 'El aire frío y denso se acumula en las hondonadas del fondo y las crestas sufren viento y ramas muertas. La terraza media a sotavento es la más cálida.',
    },
  },
  {
    id: 'hv-02-topo-smoke-flood',
    category: 'disaster',
    scene: 'topo-evacuation-map',
    title: {
      en: 'Dual Threat: Wildfire Plume + Flash Flood',
      es: 'Doble Amenaza: Humo de Incendio + Riada',
    },
    prompt: {
      en: 'Wildfire smoke blows SE across the NW slope while torrential runoff swells the river channel. Click the ONLY viable muster point.',
      es: 'El humo avanza hacia el SE mientras la crecida desborda el río. Pulsa el ÚNICO punto de encuentro viable.',
    },
    initialVisual: {waterLevelPct: 85, windAngleDeg: 35},
    hotspots: [
      {id: 'bridge', x: 380, y: 215, label: {en: 'Central Crossing Bridge', es: 'Puente Central de Cruce'}, role: 'utility'},
      {id: 'valley', x: 435, y: 340, label: {en: 'SE Low Valley Road', es: 'Carretera Baja SE'}, role: 'utility'},
      {id: 'smoke-origin', x: 145, y: 95, label: {en: 'NW Timber Spur', es: 'Espolón Forestal NO'}, role: 'utility'},
      {id: 'ridge', x: 690, y: 62, label: {en: 'NE +80m High Pad', es: 'Explanada Alta +80m NE'}, role: 'utility'},
    ],
    correctHotspotId: 'ridge',
    explanation: {
      en: 'The NE +80m pad sits above the flood basin AND upwind/perpendicular to the SE smoke vector; both valley roads and bridges are compromised.',
      es: 'La cota NE +80m queda por encima de la llanura inundable y fuera del eje de humo hacia el SE.',
    },
  },
  {
    id: 'hv-03-blackout-structural-core',
    category: 'blackout',
    scene: 'home-blackout-cutaway',
    title: {
      en: 'Night Quake + Blackout Safe Core',
      es: 'Sismo Nocturno + Apagón: Núcleo Seguro',
    },
    prompt: {
      en: 'Total blackout strikes simultaneously with a violent tremor. Click the safest interior point on the cutaway while shaking lasts.',
      es: 'Un apagón total coincide con un sismo fuerte. Pulsa el punto interior más seguro del corte mientras dura la sacudida.',
    },
    initialVisual: {nightModeDefault: true, flashlightTarget: {x: 400, y: 230}},
    hotspots: [
      {id: 'win', x: 171, y: 201, label: {en: 'Bedroom Exterior Window', es: 'Ventana Dormitorio'}, role: 'utility'},
      {id: 'core-beam', x: 366, y: 210, label: {en: 'Interior Load-Bearing Hallway', es: 'Pasillo Interior Carga'}, role: 'utility'},
      {id: 'fridge', x: 356, y: 330, label: {en: 'Beside Unanchored Fridge', es: 'Junto a Nevera Alta'}, role: 'utility'},
      {id: 'ext-door', x: 585, y: 340, label: {en: 'Exterior Doorway / Porch', es: 'Umbral Salida Exterior'}, role: 'utility'},
    ],
    correctHotspotId: 'core-beam',
    explanation: {
      en: 'Shelter beside an interior structural wall/core away from exploding window glass, toppling tall appliances, and falling exterior eaves.',
      es: 'Protégete junto al muro/pilar estructural interior lejos de ventanas con vidrio, electrodomésticos altos y caídas de alero exterior.',
    },
  },
  {
    id: 'hv-04-road-step-potential',
    category: 'urban',
    scene: 'road-vehicle-storm',
    title: {
      en: 'Wet Asphalt Downed Power Line Triage',
      es: 'Línea Eléctrica Caída en Calzada Mojada',
    },
    prompt: {
      en: 'A snapped 15kV distribution wire touches wet pavement near your stalled car (no fire). Click where occupants must wait.',
      es: 'Un cable de media tensión cae sobre asfalto mojado junto a tu coche parado (sin incendio). Pulsa dónde deben permanecer los ocupantes.',
    },
    initialVisual: {hazardZoneId: 'cable'},
    hotspots: [
      {id: 'car', x: 325, y: 270, label: {en: 'Remain Seated Inside Cabin', es: 'Dentro del Habitáculo'}, role: 'utility'},
      {id: 'tri', x: 115, y: 286, label: {en: 'Place Triangle 50m Behind', es: 'Colocar Triángulo a 50m'}, role: 'utility'},
      {id: 'wire', x: 535, y: 345, label: {en: 'Inspect Cable With Wood Stick', es: 'Apartar Cable con Palo'}, role: 'utility'},
      {id: 'shoulder-walk', x: 440, y: 292, label: {en: 'Walk Briskly Toward Fence', es: 'Caminar Hacia el Talud'}, role: 'utility'},
    ],
    correctHotspotId: 'car',
    explanation: {
      en: 'Wet pavement spreads lethal step-potential voltage rings outward >10m. Walking risks electrocution; stay inside the metal shell until utility cuts power.',
      es: 'El asfalto mojado propaga anillos de tensión de paso letales a más de 10 metros. Quédate dentro del coche salvo fuego inminente.',
    },
  },
  {
    id: 'hv-05-knot-working-end',
    category: 'wilderness',
    scene: 'critical-knots',
    title: {
      en: 'Rigging Control: Active Tying End',
      es: 'Control de Amarre: Extremo Activo',
    },
    prompt: {
      en: 'When tying a Bowline under time pressure, which color-coded segment passes through the rabbit hole ("bight") and wraps around the standing part?',
      es: 'Al confeccionar un As de Guía bajo presión, ¿qué segmento codificado atraviesa el seno y rodea el firme?',
    },
    initialVisual: {knotStep: 2},
    hotspots: [
      {id: 'standing', x: 155, y: 230, label: {en: 'Left Main Line', es: 'Línea Principal Izquierda'}, role: 'utility'},
      {id: 'bight', x: 315, y: 230, label: {en: 'Central Overhand Loop', es: 'Lazo Central'}, role: 'utility'},
      {id: 'working', x: 510, y: 165, label: {en: 'Free End Around Anchor', es: 'Extremo Libre Tras Anclaje'}, role: 'utility'},
      {id: 'anchor', x: 597, y: 215, label: {en: 'Fixed Anchor Post', es: 'Poste de Anclaje'}, role: 'utility'},
    ],
    correctHotspotId: 'working',
    explanation: {
      en: 'The free Working End loops around the anchor, comes up through the central bight, passes behind the Standing Part, and goes back down the bight.',
      es: 'El chicote o extremo libre rodea el anclaje, entra por el seno central, rodea por detrás al firme y vuelve a bajar por el mismo seno.',
    },
  },
  {
    id: 'hv-06-kit-offline-continuity',
    category: 'blackout',
    scene: 'kit-72h-pack',
    title: {
      en: 'Grid-Down Communications & Comms Autonomy Block',
      es: 'Bloque de Comunicaciones e Información Sin Red',
    },
    prompt: {
      en: 'ATMs, fiber internet, and mobile towers are offline. Click the modular pack compartment ensuring official civil defense alerts.',
      es: 'Cajeros, fibra óptica y torres móviles están caídos. Pulsa el compartimento de la mochila que garantiza recibir avisos oficiales.',
    },
    initialVisual: {},
    hotspots: [
      {id: 'water', x: 305, y: 120, label: {en: 'Hydration & Filter', es: 'Hidratación y Filtro'}, role: 'utility'},
      {id: 'power', x: 495, y: 120, label: {en: 'Dynamo Radio & Optics', es: 'Radio Dinamo y Luz'}, role: 'utility'},
      {id: 'medical', x: 305, y: 242, label: {en: 'Trauma & Meds', es: 'Botiquín y Medicación'}, role: 'utility'},
      {id: 'docs', x: 305, y: 355, label: {en: 'Cash & Laminated IDs', es: 'Efectivo y Copias DNI'}, role: 'utility'},
    ],
    correctHotspotId: 'power',
    explanation: {
      en: 'A dynamo/solar FM-AM radio receives emergency civil defense bulletins completely independent of local electrical grids or cell towers.',
      es: 'Una radio AM/FM con dinamo y placa solar recibe boletines oficiales de protección civil aunque caigan luz, fibra y telefonía.',
    },
  },
];
