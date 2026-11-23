import type {SketchChallenge} from '../types';

export const ALL_CHALLENGES: SketchChallenge[] = [
  {
    id: 'chl-01-blackout-gen',
    category: 'blackout',
    scene: 'home-blackout-cutaway',
    title: {en: 'Generator Safe Zone Spotter', es: 'Ubicación Segura de Generador'},
    prompt: {
      en: 'Click directly on the ONLY safe location on the house cutaway to operate a petrol backup generator.',
      es: 'Pulsa directamente sobre la ÚNICA ubicación segura en el croquis para operar un generador de gasolina.',
    },
    initialVisual: {nightModeDefault: true, flashlightTarget: {x: 400, y: 230}},
    hotspots: [
      {id: 'kitchen', x: 356, y: 330, label: {en: 'Kitchen Utility Room', es: 'Cocina Interior'}, role: 'utility'},
      {id: 'under-win', x: 171, y: 201, label: {en: 'Under Bedroom Window', es: 'Bajo Ventana Dormitorio'}, role: 'utility'},
      {id: 'ext-gen', x: 705, y: 362, label: {en: 'Outdoor Canopy >6m Away', es: 'Exterior >6m Ventilado'}, role: 'utility'},
    ],
    correctHotspotId: 'ext-gen',
    explanation: {
      en: 'Combustion generators must operate outdoors at least 6 meters (20 ft) away from windows, doors, and vents to prevent fatal CO accumulation.',
      es: 'Los generadores deben funcionar en exterior abierto al menos a 6 metros de puertas, ventanas y rejillas para evitar intoxicación mortal por CO.',
    },
  },
  {
    id: 'chl-02-blackout-breaker',
    category: 'blackout',
    scene: 'home-blackout-cutaway',
    title: {en: 'Surge Protection Control Point', es: 'Punto de Protección de Picos'},
    prompt: {
      en: 'Click the household point you isolate first to protect sensitive electronics from grid restoration spikes.',
      es: 'Pulsa el punto de la vivienda que debes aislar primero para proteger aparatos frente a picos de tensión.',
    },
    initialVisual: {nightModeDefault: true, flashlightTarget: {x: 172, y: 318}},
    hotspots: [
      {id: 'breaker', x: 172, y: 318, label: {en: 'Main Breaker Panel', es: 'Cuadro Eléctrico'}, role: 'utility'},
      {id: 'gas', x: 245, y: 345, label: {en: 'Gas Shutoff Valve', es: 'Llave de Gas'}, role: 'utility'},
      {id: 'door', x: 585, y: 340, label: {en: 'Patio Door', es: 'Puerta Exterior'}, role: 'utility'},
    ],
    correctHotspotId: 'breaker',
    explanation: {
      en: 'Switch off non-essential heavy breakers at the main panel and leave one light circuit ON as a power-return cue.',
      es: 'Baja los interruptores de gran potencia en el cuadro y deja un circuito de luz piloto.',
    },
  },
  {
    id: 'chl-03-topo-flood',
    category: 'disaster',
    scene: 'topo-evacuation-map',
    title: {en: 'Flash Flood Evacuation Muster', es: 'Punto Seguro ante Riada Súbita'},
    prompt: {
      en: 'Heavy upstream rain floods the valley channel. Click the safe evacuation destination on the topo map.',
      es: 'Lluvias torrenciales inundan el cauce. Pulsa el punto de evacuación seguro en el mapa topográfico.',
    },
    initialVisual: {waterLevelPct: 85},
    hotspots: [
      {id: 'bridge', x: 380, y: 215, label: {en: 'Flooded River Bridge', es: 'Puente Inundado'}, role: 'utility'},
      {id: 'valley', x: 435, y: 340, label: {en: 'Low Valley Road', es: 'Camino Fondo Valle'}, role: 'utility'},
      {id: 'ridge', x: 690, y: 62, label: {en: 'High Ground +80m Pad', es: 'Cota Alta +80m'}, role: 'utility'},
    ],
    correctHotspotId: 'ridge',
    explanation: {
      en: 'Climb perpendicular away from the river channel toward the +80m high-ground muster pad; never cross flooded bridges.',
      es: 'Asciende perpendicularmente lejos del cauce hacia la cota alta (+80m); nunca cruces puentes inundados.',
    },
  },
  {
    id: 'chl-04-seismic-drop',
    category: 'disaster',
    scene: 'seismic-structural-map',
    title: {en: 'Active Earthquake Cover Spotter', es: 'Zona Segura Durante Sacudida Sísmica'},
    prompt: {
      en: 'Violent shaking starts right now! Click the safest place to Drop, Cover & Hold inside the cutaway.',
      es: '¡Empieza un terremoto fuerte ahora! Pulsa el punto más seguro para agacharte y cubrirte en el corte.',
    },
    initialVisual: {},
    hotspots: [
      {id: 'cover', x: 155, y: 348, label: {en: 'Under Sturdy Interior Table', es: 'Bajo Mesa Sólida Interior'}, role: 'utility'},
      {id: 'shaft', x: 375, y: 315, label: {en: 'Elevator Cabin', es: 'Cabina Ascensor'}, role: 'utility'},
      {id: 'facade', x: 485, y: 325, label: {en: 'Outside Under Glass Facade', es: 'Fuera Bajo Fachada'}, role: 'utility'},
    ],
    correctHotspotId: 'cover',
    explanation: {
      en: 'Drop, Cover under a sturdy desk/table away from glass, and Hold On until shaking stops—never use elevators or run under exterior facades.',
      es: 'Agáchate y cúbrete bajo mesa sólida lejos de cristales; nunca uses ascensor ni salgas bajo fachadas durante el temblor.',
    },
  },
  {
    id: 'chl-05-seismic-muster',
    category: 'disaster',
    scene: 'seismic-structural-map',
    title: {en: 'Post-Quake Assembly Zone', es: 'Punto de Encuentro Post-Sismo'},
    prompt: {
      en: 'Shaking has stopped and you exited via the stairs. Click the safe outdoor muster location clear of aftershocks.',
      es: 'Cesó el sismo y bajaste por escaleras. Pulsa el punto exterior seguro libre de caída de fachadas en réplicas.',
    },
    initialVisual: {},
    hotspots: [
      {id: 'facade', x: 485, y: 325, label: {en: 'Sidewalk Beside Building', es: 'Acera Junto al Portal'}, role: 'utility'},
      {id: 'muster', x: 685, y: 335, label: {en: 'Open Park (>1.5×H Clear)', es: 'Parque Abierto (>1.5×H)'}, role: 'utility'},
      {id: 'door', x: 375, y: 315, label: {en: 'Ground Lobby Inside', es: 'Portal Interior'}, role: 'utility'},
    ],
    correctHotspotId: 'muster',
    explanation: {
      en: 'Move into open space further than 1.5× adjacent building height to stay safe during M5+ aftershocks.',
      es: 'Aléjate a un espacio abierto a más de 1,5 veces la altura del edificio frente a posibles réplicas.',
    },
  },
  {
    id: 'chl-06-road-wire',
    category: 'urban',
    scene: 'road-vehicle-storm',
    title: {en: 'Live Wire Vehicle Refuge Spotter', es: 'Refugio Seguro Ante Cable Caído'},
    prompt: {
      en: 'A snapped energized line rests on the road beside your car (no fire). Click the safest place to wait.',
      es: 'Un cable eléctrico con tensión cae junto a tu coche (sin fuego). Pulsa dónde es más seguro esperar.',
    },
    initialVisual: {hazardZoneId: 'cable'},
    hotspots: [
      {id: 'car', x: 325, y: 270, label: {en: 'Inside Vehicle Cabin', es: 'Dentro del Habitáculo'}, role: 'utility'},
      {id: 'wire', x: 535, y: 345, label: {en: 'Step Out Near Wire', es: 'Bajar Junto al Cable'}, role: 'utility'},
      {id: 'tri', x: 115, y: 286, label: {en: 'Walk Back Along Shoulder', es: 'Caminar Por Arcén Mojado'}, role: 'utility'},
    ],
    correctHotspotId: 'car',
    explanation: {
      en: 'Unless the vehicle catches fire, stay inside the Faraday shell and call 112/utility to cut power.',
      es: 'Salvo incendio del coche, permanece dentro de la cabina (jaula de Faraday) y llama al 112.',
    },
  },
  {
    id: 'chl-07-road-wait',
    category: 'urban',
    scene: 'road-vehicle-storm',
    title: {en: 'Highway Breakdown Waiting Zone', es: 'Espera Segura en Avería de Autovía'},
    prompt: {
      en: 'Your car broke down on the shoulder in heavy rain (no power wires). Click where passengers must wait.',
      es: 'Tu coche se averió en el arcén con lluvia (sin cables eléctricos). Pulsa dónde deben esperar los ocupantes.',
    },
    initialVisual: {},
    hotspots: [
      {id: 'car', x: 325, y: 270, label: {en: 'Stay Inside Car on Shoulder', es: 'Sentados Dentro del Coche'}, role: 'utility'},
      {id: 'tri', x: 115, y: 286, label: {en: 'Stand Behind Bumper', es: 'Detrás del Paragolpes'}, role: 'utility'},
      {id: 'embankment', x: 675, y: 190, label: {en: 'Behind Guardrail / Embankment', es: 'Tras Guardarraíl / Talud'}, role: 'utility'},
    ],
    correctHotspotId: 'embankment',
    explanation: {
      en: 'Wear high-visibility vests, exit passenger-side, and wait behind the guardrail or up the embankment away from traffic.',
      es: 'Sal con chaleco reflectante por el lado derecho y espera tras el guardarraíl o sobre el talud.',
    },
  },
  {
    id: 'chl-08-wilderness-shelter',
    category: 'wilderness',
    scene: 'wilderness-shelter',
    title: {en: 'Hidden Camp Hazard Spotter', es: 'Detector de Riesgos en Refugio'},
    prompt: {
      en: 'Click the LETHAL overhead hazard in this forest camp cross-section before pitching your tarp.',
      es: 'Pulsa sobre el peligro MORTAL elevado en este croquis antes de montar tu refugio.',
    },
    initialVisual: {windAngleDeg: 0},
    hotspots: [
      {id: 'snag', x: 185, y: 128, label: {en: 'Dead Leaning Snag (Widowmaker)', es: 'Rama Muerta Inclinada'}, role: 'utility'},
      {id: 'bench', x: 390, y: 215, label: {en: 'Mid-Slope Leeward Bench', es: 'Terraza Media Sotavento'}, role: 'utility'},
      {id: 'trench', x: 288, y: 255, label: {en: 'Uphill Drainage Trench', es: 'Zanja de Drenaje'}, role: 'utility'},
    ],
    correctHotspotId: 'snag',
    explanation: {
      en: 'Dead hanging limbs ("widowmakers") snap unexpectedly in wind and rain—always scan the canopy above any campsite.',
      es: 'Las ramas muertas colgantes caen sin aviso con viento o lluvia; inspecciona siempre arriba antes de acampar.',
    },
  },
  {
    id: 'chl-09-water-sterilize',
    category: 'wilderness',
    scene: 'water-purification',
    title: {en: 'Pathogen Elimination Stage', es: 'Etapa de Inactivación Biológica'},
    prompt: {
      en: 'Click the stage in the schematic that guarantees inactivation of viruses, bacteria, AND protozoa without chemicals.',
      es: 'Pulsa la etapa del esquema que garantiza eliminar virus, bacterias Y protozoos sin químicos.',
    },
    initialVisual: {},
    hotspots: [
      {id: 'source', x: 127, y: 215, label: {en: 'Settling Basin', es: 'Tanque Decantación'}, role: 'utility'},
      {id: 'filter', x: 375, y: 215, label: {en: 'Improvised Sand/Charcoal', es: 'Arena y Carbón Casero'}, role: 'utility'},
      {id: 'boil', x: 635, y: 225, label: {en: '100°C Rolling Boil (1 Min)', es: 'Ebullición 100°C (1 Min)'}, role: 'utility'},
    ],
    correctHotspotId: 'boil',
    explanation: {
      en: 'Sedimentation and improvised charcoal clarify silt, but a 1-minute full rolling boil (3 min >2,000m) kills all biological pathogens.',
      es: 'La decantación y carbón casero aclaran el agua, pero hervir a borbotones 1 minuto elimina todos los patógenos biológicos.',
    },
  },
  {
    id: 'chl-10-rescue-symbol',
    category: 'wilderness',
    scene: 'rescue-signaling',
    title: {en: 'Ground-to-Air Medical Signal', es: 'Señal Tierra-Aire de Ayuda Médica'},
    prompt: {
      en: 'A search helicopter approaches and a hiker has a fractured leg. Click the ground-to-air symbol requesting MEDICAL help.',
      es: 'Se acerca un helicóptero y hay un herido con fractura. Pulsa el símbolo tierra-aire de AYUDA MÉDICA.',
    },
    initialVisual: {},
    hotspots: [
      {id: 'v', x: 125, y: 152, label: {en: 'Symbol V', es: 'Símbolo V'}, role: 'utility'},
      {id: 'x', x: 238, y: 152, label: {en: 'Symbol X', es: 'Símbolo X'}, role: 'utility'},
      {id: 'arrow', x: 350, y: 152, label: {en: 'Symbol →', es: 'Símbolo →'}, role: 'utility'},
    ],
    correctHotspotId: 'x',
    explanation: {
      en: 'International ground-to-air code: X = Require Medical Assistance; V = Require Assistance; → = Proceeding in this direction.',
      es: 'Código internacional tierra-aire: X = Asistencia médica necesaria; V = Ayuda general; → = Dirección de marcha.',
    },
  },
  {
    id: 'chl-11-knots-load',
    category: 'wilderness',
    scene: 'critical-knots',
    title: {en: 'Rope Anatomy Load Bearing Check', es: 'Anatomía de Carga en Cuerda'},
    prompt: {
      en: 'Click the color-coded rope segment carrying the primary tension load ("Standing Part").',
      es: 'Pulsa sobre el tramo de cuerda codificado por color que soporta la carga principal ("Firme").',
    },
    initialVisual: {knotStep: 3},
    hotspots: [
      {id: 'standing', x: 155, y: 230, label: {en: 'Emerald Strand (Left)', es: 'Cabo Esmeralda (Izquierda)'}, role: 'utility'},
      {id: 'bight', x: 315, y: 230, label: {en: 'Amber Loop (Center)', es: 'Lazo Ámbar (Centro)'}, role: 'utility'},
      {id: 'working', x: 510, y: 165, label: {en: 'Blue Working End (Right)', es: 'Chicote Azul (Derecha)'}, role: 'utility'},
    ],
    correctHotspotId: 'standing',
    explanation: {
      en: 'The Standing Part (emerald) carries the main load; the Working End (blue) is the active free tip used to form the knot around the Bight (amber).',
      es: 'El Firme (verde esmeralda) soporta la tensión principal, mientras el Chicote (azul) es el extremo activo con el que se teje el nudo.',
    },
  },
  {
    id: 'chl-12-ifak-tourniquet',
    category: 'urban',
    scene: 'first-aid-triage',
    title: {en: 'Arterial Tourniquet Placement Zone', es: 'Zona de Colocación del Torniquete'},
    prompt: {
      en: 'A victim has life-threatening arterial leg bleeding below the knee. Click the proper trauma intervention zone.',
      es: 'Herida arterial grave bajo la rodilla. Pulsa la zona correcta de intervención en el esquema.',
    },
    initialVisual: {},
    hotspots: [
      {id: 'head', x: 215, y: 225, label: {en: 'Head / Airway', es: 'Cabeza / Vía Aérea'}, role: 'utility'},
      {id: 'core', x: 335, y: 225, label: {en: 'Torso Core', es: 'Tronco Central'}, role: 'utility'},
      {id: 'tq', x: 490, y: 205, label: {en: 'Proximal Thigh (5–7cm Above)', es: 'Muslo Proximal (5–7cm Arriba)'}, role: 'utility'},
    ],
    correctHotspotId: 'tq',
    explanation: {
      en: 'Apply a wide tourniquet 5–7 cm proximal (above) the bleeding site over single-bone muscle—never over the knee joint—and record the time.',
      es: 'Coloca el torniquete ancho 5–7 cm por encima de la herida sobre zona muscular, nunca sobre la articulación, y anota la hora.',
    },
  },
];
