import React from 'react';
import type {LangCode} from '../../config/seo';
import type {LayerVisibility, SceneTemplateId, VisualStatePatch} from '../../types';

interface SceneArtworksProps {
  scene: SceneTemplateId;
  visual: VisualStatePatch;
  layers: LayerVisibility;
  nightMode: boolean;
  lang: LangCode;
  activeHotspotId?: string | null;
}

export const SceneArtworks: React.FC<SceneArtworksProps> = ({
  scene,
  visual,
  layers,
  nightMode,
  lang,
  activeHotspotId,
}) => {
  const strokeMain = nightMode ? '#94A3B8' : '#334155';
  const strokeMuted = nightMode ? '#475569' : '#CBD5E1';
  const fillSurface = nightMode ? '#111827' : '#FFFFFF';
  const fillAlt = nightMode ? '#1E293B' : '#F1F5F9';
  const textPrimary = nightMode ? '#F8FAFC' : '#0F172A';
  const textMuted = nightMode ? '#94A3B8' : '#64748B';

  const isEs = lang === 'es';
  const activeZone = visual.activeZoneId ?? activeHotspotId ?? '';
  const hazardZone = visual.hazardZoneId ?? '';
  const safeRoute = visual.safeRouteId ?? '';

  switch (scene) {
    case 'home-blackout-cutaway': {
      const gasHazard = hazardZone === 'gas' || activeZone === 'gas';
      const extGenSafe = safeRoute === 'ext-gen' || activeZone === 'ext-gen';
      const breakerSafe = safeRoute === 'breaker' || activeZone === 'breaker';
      return (
        <g>
          {/* Sky & Exterior Ground */}
          <rect x="0" y="385" width="800" height="75" fill={nightMode ? '#0F172A' : '#E2E8F0'} />
          <line x1="0" y1="385" x2="800" y2="385" stroke={strokeMain} strokeWidth="2" />

          {/* House Cutaway Shell */}
          <polygon points="110,145 360,55 610,145" fill={fillAlt} stroke={strokeMain} strokeWidth="2.5" />
          <rect x="130" y="145" width="460" height="240" fill={fillSurface} stroke={strokeMain} strokeWidth="2.5" />
          {/* Second Floor Slab */}
          <line x1="130" y1="265" x2="590" y2="265" stroke={strokeMain} strokeWidth="4" />
          {/* Interior Partition Walls */}
          <line x1="330" y1="145" x2="330" y2="265" stroke={strokeMain} strokeWidth="2" />
          <line x1="295" y1="265" x2="295" y2="385" stroke={strokeMain} strokeWidth="2" />
          <line x1="455" y1="265" x2="455" y2="385" stroke={strokeMain} strokeWidth="2" />

          {/* Room 1 Top-Left: Bedroom & Window */}
          <rect x="148" y="175" width="46" height="52" fill="#BAE6FD" fillOpacity={nightMode ? 0.25 : 0.6} stroke="#0284C7" strokeWidth="1.5" />
          <rect x="210" y="232" width="90" height="28" rx="3" fill={fillAlt} stroke={strokeMuted} strokeWidth="1.5" />

          {/* Room 2 Top-Right: Interior Load-Bearing Hallway */}
          <rect x="360" y="155" width="12" height="108" fill="#047857" fillOpacity="0.22" stroke="#047857" strokeWidth="1.5" />
          {/* Stairwell */}
          <path d="M490,265 L520,240 L520,220 L550,195 L550,175 L580,155" fill="none" stroke={strokeMain} strokeWidth="2" />

          {/* Ground-Left: Utility & Breaker Panel + Gas Shutoff */}
          <rect
            x="150"
            y="290"
            width="44"
            height="58"
            rx="3"
            fill={breakerSafe ? '#D1FAE5' : fillAlt}
            stroke={breakerSafe ? '#047857' : '#1D4ED8'}
            strokeWidth="2"
          />
          <line x1="162" y1="305" x2="182" y2="305" stroke="#1D4ED8" strokeWidth="2" />
          <line x1="162" y1="316" x2="182" y2="316" stroke="#1D4ED8" strokeWidth="2" />
          <line x1="162" y1="327" x2="182" y2="327" stroke="#DC2626" strokeWidth="2" />

          {/* Gas Valve */}
          <circle
            cx="245"
            cy="345"
            r="15"
            fill={gasHazard ? '#FEE2E2' : '#FEF3C7'}
            stroke={gasHazard ? '#DC2626' : '#D97706'}
            strokeWidth="2"
          />
          <line x1="236" y1="345" x2="254" y2="345" stroke={gasHazard ? '#DC2626' : '#D97706'} strokeWidth="3" />

          {/* Ground-Center: Refrigerator Cold Mass */}
          <rect x="330" y="290" width="52" height="90" rx="3" fill={fillAlt} stroke="#0284C7" strokeWidth="2" />
          <line x1="330" y1="325" x2="382" y2="325" stroke="#0284C7" strokeWidth="1.5" />
          <rect x="342" y="302" width="28" height="12" rx="2" fill="#E0F2FE" />

          {/* Ground-Right: Living Area & Exterior Door */}
          <rect x="490" y="338" width="60" height="44" rx="3" fill={fillAlt} stroke={strokeMuted} strokeWidth="1.5" />
          <rect x="582" y="300" width="10" height="85" fill="#047857" fillOpacity="0.3" stroke="#047857" strokeWidth="1.5" />

          {/* Exterior Patio / Generator Zone (>6m away) */}
          <rect
            x="665"
            y="340"
            width="86"
            height="45"
            rx="4"
            fill={extGenSafe ? '#D1FAE5' : fillAlt}
            stroke={extGenSafe ? '#047857' : strokeMuted}
            strokeWidth="2"
          />
          <circle cx="690" cy="362" r="10" fill="none" stroke="#D97706" strokeWidth="2" />
          <path d="M686,362 L694,362 M690,358 L690,366" stroke="#D97706" strokeWidth="2" />

          {/* Hazard Layer */}
          {layers.hazards && (
            <g>
              {/* Window Glass / CO Backdraft Hazard */}
              <circle cx="171" cy="201" r="34" fill="#DC2626" fillOpacity="0.12" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 3" className="svg-hazard-pulse" />
              {gasHazard && (
                <circle cx="245" cy="345" r="42" fill="#DC2626" fillOpacity="0.18" stroke="#DC2626" strokeWidth="2" className="svg-hazard-pulse" />
              )}
              {/* Indoor CO danger zone */}
              <path d="M590,340 Q625,315 585,295" fill="none" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          )}

          {/* Routes & Vectors Layer */}
          {layers.routes && (
            <g>
              <path
                d="M420,220 L480,220 L550,350 L660,362"
                fill="none"
                stroke="#047857"
                strokeWidth="3"
                className="svg-route-flow"
              />
              <polygon points="664,362 654,356 654,368" fill="#047857" />
            </g>
          )}

          {/* Technical Labels */}
          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="148" y="284" fill={textPrimary}>PANEL CB-MAIN</text>
              <text x="220" y="376" fill="#D97706">GAS SHUTOFF</text>
              <text x="325" y="284" fill="#0284C7">{isEs ? 'FRÍO 4°C' : 'COLD MASS'}</text>
              <text x="348" y="176" fill="#047857">{isEs ? 'VIGA SEGURA' : 'CORE BEAM'}</text>
              <text x="655" y="330" fill="#047857">{isEs ? 'EXTERIOR >6m' : 'GEN SETBACK >6m'}</text>
              <text x="140" y="166" fill={textMuted}>{isEs ? 'CRISTALES' : 'GLASS RISK'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'topo-evacuation-map': {
      const windDeg = visual.windAngleDeg ?? 35;
      const waterPct = visual.waterLevelPct ?? 45;
      const riverWidth = 26 + (waterPct / 100) * 44;
      const ridgeSelected = safeRoute === 'ridge' || activeZone === 'ridge';
      const valleyHazard = hazardZone === 'valley' || activeZone === 'valley';
      return (
        <g>
          {/* Base Topographic Terrain */}
          <rect x="0" y="0" width="800" height="460" fill={nightMode ? '#0F172A' : '#F8FAFC'} />
          {/* Elevation Contours (High Ground Top-Right & Bottom-Left) */}
          <path d="M520,0 C550,90 640,140 800,165" fill="none" stroke={strokeMuted} strokeWidth="1.5" />
          <path d="M575,0 C605,70 675,115 800,132" fill="none" stroke={strokeMuted} strokeWidth="1.5" />
          <path d="M640,0 C665,50 715,85 800,98" fill="#047857" fillOpacity="0.08" stroke="#047857" strokeWidth="1.8" />
          <path d="M0,310 C120,295 190,340 245,460" fill="none" stroke={strokeMuted} strokeWidth="1.5" />
          <path d="M0,355 C95,345 145,380 185,460" fill="#047857" fillOpacity="0.07" stroke="#047857" strokeWidth="1.5" />

          {/* Floodplain / Rambla River Channel */}
          <path
            d="M0,180 C180,210 260,150 420,235 C560,310 660,260 800,320"
            fill="none"
            stroke="#0EA5E9"
            strokeOpacity="0.25"
            strokeWidth={riverWidth + 24}
          />
          <path
            d="M0,180 C180,210 260,150 420,235 C560,310 660,260 800,320"
            fill="none"
            stroke="#0284C7"
            strokeWidth={riverWidth}
          />

          {/* Road Network */}
          <path d="M95,410 L265,280 L380,215 L485,150 L685,65" fill="none" stroke={strokeMain} strokeWidth="7" strokeLinecap="round" />
          <path d="M95,410 L265,280 L380,215 L485,150 L685,65" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" strokeDasharray="8 6" />
          {/* Secondary Valley Road */}
          <path d="M265,280 L435,340 L635,385" fill="none" stroke={strokeMain} strokeWidth="5" />

          {/* High Ground Muster Point */}
          <circle
            cx="690"
            cy="62"
            r="26"
            fill={ridgeSelected ? '#D1FAE5' : '#ECFDF5'}
            stroke="#047857"
            strokeWidth="2.5"
          />
          <path d="M690,50 L690,74 M678,62 L702,62" stroke="#047857" strokeWidth="3.5" />

          {/* Blocked Bridge X */}
          <g transform="translate(380,215)">
            <circle cx="0" cy="0" r="16" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
            <path d="M-7,-7 L7,7 M7,-7 L-7,7" stroke="#DC2626" strokeWidth="2.5" />
          </g>

          {/* Wildfire & Wind Smoke Plume */}
          <g transform={`translate(145, 95) rotate(${windDeg})`}>
            <path d="M0,0 L165,-38 L165,38 Z" fill="#D97706" fillOpacity="0.22" stroke="#D97706" strokeWidth="1.5" strokeDasharray="5 3" />
            <circle cx="0" cy="0" r="14" fill="#DC2626" fillOpacity="0.85" />
          </g>

          {/* Hazard Layer */}
          {layers.hazards && (
            <g>
              <circle
                cx="435"
                cy="340"
                r="44"
                fill="#DC2626"
                fillOpacity={valleyHazard ? 0.24 : 0.12}
                stroke="#DC2626"
                strokeWidth="2"
                strokeDasharray="4 3"
                className="svg-hazard-pulse"
              />
              <circle cx="380" cy="215" r="32" fill="#DC2626" fillOpacity="0.14" stroke="#DC2626" strokeWidth="1.5" />
            </g>
          )}

          {/* Safe Perpendicular Route Layer */}
          {layers.routes && (
            <g>
              <path
                d="M110,395 L255,275 L290,170 L460,115 L665,68"
                fill="none"
                stroke="#047857"
                strokeWidth="3.5"
                className="svg-route-flow"
              />
              <polygon points="668,67 655,63 658,75" fill="#047857" />
            </g>
          )}

          {/* Labels */}
          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="625" y="106" fill="#047857">{isEs ? 'COTA ALTA +80m' : 'HIGH GROUND +80m'}</text>
              <text x="342" y="248" fill="#DC2626">{isEs ? 'PUENTE INUNDADO' : 'FLOODED BRIDGE'}</text>
              <text x="392" y="398" fill="#DC2626">{isEs ? 'CAUCE / RAMBLA' : 'FLASH FLOOD BASIN'}</text>
              <text x="80" y="65" fill="#D97706">{isEs ? 'FRENTE HUMO / VIENTO' : 'SMOKE PLUME VECTOR'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'road-vehicle-storm': {
      const cableActive = hazardZone === 'cable' || activeZone === 'cable';
      const embankmentSafe = safeRoute === 'embankment' || activeZone === 'embankment';
      return (
        <g>
          {/* Sky Storm Gradient */}
          <rect x="0" y="0" width="800" height="270" fill={nightMode ? '#0F172A' : '#E2E8F0'} />
          {/* Wind/Rain Shear Lines */}
          <g stroke="#0284C7" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="10 8">
            <line x1="80" y1="30" x2="20" y2="210" />
            <line x1="220" y1="20" x2="160" y2="210" />
            <line x1="380" y1="40" x2="320" y2="220" />
            <line x1="560" y1="25" x2="500" y2="215" />
            <line x1="720" y1="35" x2="660" y2="220" />
          </g>
          {/* Elevated Embankment Right */}
          <polygon points="560,270 675,180 800,180 800,270" fill={embankmentSafe ? '#D1FAE5' : fillAlt} stroke="#047857" strokeWidth="2" />
          {/* Asphalt Road + Shoulder */}
          <rect x="0" y="270" width="800" height="190" fill="#334155" />
          <rect x="0" y="270" width="800" height="42" fill="#475569" />
          <line x1="0" y1="312" x2="800" y2="312" stroke="#F8FAFC" strokeWidth="2.5" />
          <line x1="0" y1="385" x2="800" y2="385" stroke="#FACC15" strokeWidth="3" strokeDasharray="24 18" />

          {/* Stranded Vehicle on Shoulder */}
          <g transform="translate(260,252)">
            <rect x="0" y="18" width="132" height="36" rx="6" fill="#1D4ED8" stroke="#0F172A" strokeWidth="2" />
            <polygon points="22,18 42,0 98,0 116,18" fill="#60A5FA" stroke="#0F172A" strokeWidth="2" />
            <circle cx="28" cy="54" r="12" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
            <circle cx="104" cy="54" r="12" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
            {/* Hazard flashers */}
            <circle cx="4" cy="28" r="5" fill="#F59E0B" className="svg-hazard-pulse" />
            <circle cx="128" cy="28" r="5" fill="#F59E0B" className="svg-hazard-pulse" />
          </g>

          {/* Warning Triangles at 50m / 100m */}
          <g transform="translate(115,286)">
            <polygon points="0,-18 -14,10 14,10" fill="#F59E0B" stroke="#DC2626" strokeWidth="2.5" />
          </g>

          {/* Downed Power Pole & Live Wire Left-Center */}
          <line x1="490" y1="90" x2="545" y2="295" stroke="#64748B" strokeWidth="6" />
          <path d="M545,295 Q575,335 535,355" fill="none" stroke="#DC2626" strokeWidth="3" />

          {layers.hazards && (
            <g>
              {/* Step potential rings around downed line */}
              <circle cx="535" cy="345" r="28" fill="none" stroke="#DC2626" strokeWidth="2" className="svg-hazard-pulse" />
              <circle cx="535" cy="345" r="52" fill="#DC2626" fillOpacity="0.14" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="5 3" />
              {cableActive && <circle cx="535" cy="345" r="72" fill="#DC2626" fillOpacity="0.1" stroke="#DC2626" strokeWidth="1.5" />}
            </g>
          )}

          {layers.routes && (
            <g>
              <path d="M395,275 L580,255 L685,195" fill="none" stroke="#047857" strokeWidth="3" className="svg-route-flow" />
              <polygon points="690,192 677,193 683,204" fill="#047857" />
            </g>
          )}

          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="65" y="334" fill="#F8FAFC">{isEs ? 'BALIZA 50-100m' : 'TRIANGLE 50-100m'}</text>
              <text x="480" y="425" fill="#FCA5A5">{isEs ? 'CABLE CAÍDO >10m' : 'DOWNED LINE >10m'}</text>
              <text x="645" y="168" fill="#047857">{isEs ? 'TALUD SEGURO' : 'SAFE EMBANKMENT'}</text>
              <text x="275" y="242" fill={textPrimary}>{isEs ? 'ARCÉN + CHALECO' : 'SHOULDER + VEST'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'wilderness-shelter': {
      const windDeg = visual.windAngleDeg ?? 0;
      return (
        <g>
          {/* Sky */}
          <rect x="0" y="0" width="800" height="460" fill={nightMode ? '#0B1220' : '#F8FAFC'} />
          {/* Hillside Mid-Slope vs Cold Valley Sink */}
          <path d="M0,190 L280,245 L510,245 L645,355 L800,385 L800,460 L0,460 Z" fill={nightMode ? '#1E293B' : '#E2E8F0'} stroke={strokeMain} strokeWidth="2.5" />
          {/* Mid-slope bench highlight */}
          <rect x="285" y="232" width="210" height="14" rx="2" fill="#047857" fillOpacity="0.25" stroke="#047857" strokeWidth="1.5" />

          {/* Lean-To Shelter Frame & Insulation Bed */}
          <polygon points="315,244 435,160 445,244" fill="#047857" fillOpacity="0.2" stroke="#047857" strokeWidth="2.5" />
          {/* 15cm Ground Insulation Bed (Conduction barrier) */}
          <rect x="330" y="234" width="95" height="10" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
          {/* Drainage Trench Uphill */}
          <path d="M275,245 L288,262 L302,245" fill="#0284C7" fillOpacity="0.35" stroke="#0284C7" strokeWidth="2" />

          {/* Reflector Fire Pit */}
          <circle cx="485" cy="236" r="10" fill="#F59E0B" stroke="#DC2626" strokeWidth="2" />
          <line x1="508" y1="205" x2="508" y2="245" stroke="#78350F" strokeWidth="5" />

          {/* Widowmaker / Dead Snag Tree Left */}
          <line x1="155" y1="220" x2="155" y2="65" stroke="#78350F" strokeWidth="8" />
          <line x1="155" y1="105" x2="235" y2="128" stroke="#DC2626" strokeWidth="5" strokeDasharray="6 3" />

          {/* Wind Arrows */}
          <g transform={`translate(90, 95) rotate(${windDeg})`}>
            <line x1="0" y1="0" x2="90" y2="0" stroke="#0284C7" strokeWidth="3" />
            <polygon points="94,0 82,-6 82,6" fill="#0284C7" />
            <line x1="10" y1="20" x2="75" y2="20" stroke="#0284C7" strokeWidth="2" />
          </g>

          {layers.hazards && (
            <g>
              <circle cx="205" cy="128" r="42" fill="#DC2626" fillOpacity="0.14" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 3" className="svg-hazard-pulse" />
              <ellipse cx="705" cy="365" rx="68" ry="26" fill="#0284C7" fillOpacity="0.18" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="4 3" />
            </g>
          )}

          {layers.routes && (
            <g>
              <path d="M485,222 Q455,205 390,222" fill="none" stroke="#D97706" strokeWidth="2.5" className="svg-route-flow" />
            </g>
          )}

          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="115" y="55" fill="#DC2626">{isEs ? 'RAMA MUERTA (WIDOWMAKER)' : 'DEADFALL SNAG HAZARD'}</text>
              <text x="325" y="148" fill="#047857">{isEs ? 'REFUGIO SOTAVENTO' : 'LEEWARD SHELTER'}</text>
              <text x="328" y="282" fill="#D97706">{isEs ? 'COLCHÓN AISLANTE >15cm' : 'GROUND INSULATION >15cm'}</text>
              <text x="200" y="282" fill="#0284C7">{isEs ? 'ZANJA DRENAJE' : 'DRAIN TRENCH'}</text>
              <text x="615" y="340" fill="#0284C7">{isEs ? 'BOLSA AIRE FRÍO' : 'COLD AIR SINK'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'water-purification': {
      return (
        <g>
          <rect x="0" y="0" width="800" height="460" fill={nightMode ? '#0B1220' : '#F8FAFC'} />
          {/* Step 1: Turbid Source Intake vs Upstream Spring */}
          <rect x="55" y="140" width="145" height="175" rx="8" fill="#FEF3C7" fillOpacity={nightMode ? 0.18 : 0.7} stroke="#D97706" strokeWidth="2" />
          <path d="M55,205 Q125,195 200,205 L200,315 L55,315 Z" fill="#B45309" fillOpacity="0.3" />
          {/* Silt particles */}
          <circle cx="90" cy="275" r="3" fill="#78350F" />
          <circle cx="135" cy="292" r="4" fill="#78350F" />
          <circle cx="165" cy="268" r="2.5" fill="#78350F" />

          {/* Step 2: Multi-Layer Filter Column */}
          <rect x="295" y="105" width="160" height="235" rx="8" fill={fillSurface} stroke={strokeMain} strokeWidth="2.5" />
          <rect x="297" y="145" width="156" height="36" fill="#CBD5E1" />
          <rect x="297" y="181" width="156" height="42" fill="#FDE68A" />
          <rect x="297" y="223" width="156" height="42" fill="#334155" />
          <rect x="297" y="265" width="156" height="24" fill="#E2E8F0" />
          {/* Filtered water reservoir */}
          <rect x="297" y="295" width="156" height="43" fill="#BAE6FD" fillOpacity="0.65" />

          {/* Step 3: Rolling Boil / Disinfection Vessel */}
          <rect x="555" y="150" width="165" height="150" rx="8" fill={fillSurface} stroke="#047857" strokeWidth="2.5" />
          <rect x="557" y="200" width="161" height="98" fill="#38BDF8" fillOpacity="0.3" />
          {/* Bubbles */}
          <circle cx="605" cy="260" r="5" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="640" cy="235" r="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="670" cy="252" r="4" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
          {/* Flame underneath */}
          <path d="M595,318 Q638,295 680,318" fill="#F59E0B" stroke="#DC2626" strokeWidth="2" />

          {layers.routes && (
            <g>
              <path d="M200,190 L290,130" fill="none" stroke="#1D4ED8" strokeWidth="3" className="svg-route-flow" />
              <path d="M455,315 L550,240" fill="none" stroke="#047857" strokeWidth="3" className="svg-route-flow" />
            </g>
          )}

          {layers.hazards && (
            <circle cx="127" cy="285" r="38" fill="#DC2626" fillOpacity="0.14" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="4 3" className="svg-hazard-pulse" />
          )}

          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="60" y="128" fill="#D97706">{isEs ? '1. DECANTACIÓN' : '1. SEDIMENTATION'}</text>
              <text x="295" y="92" fill="#1D4ED8">{isEs ? '2. GRAVA + ARENA + CARBÓN' : '2. GRAVEL / SAND / CHARCOAL'}</text>
              <text x="555" y="138" fill="#047857">{isEs ? '3. EBULLICIÓN 100°C (1 MIN)' : '3. ROLLING BOIL 100°C'}</text>
              <text x="322" y="248" fill="#F8FAFC">{isEs ? 'CARBÓN ACTIVO' : 'CHARCOAL LAYER'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'rescue-signaling': {
      return (
        <g>
          <rect x="0" y="0" width="800" height="460" fill={nightMode ? '#0B1220' : '#F8FAFC'} />
          {/* Ground-to-Air Panels */}
          <rect x="55" y="75" width="380" height="190" rx="8" fill={fillSurface} stroke={strokeMain} strokeWidth="2" />
          {/* Symbol V (Require Assistance) */}
          <path d="M95,120 L125,185 L155,120" fill="none" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          {/* Symbol X (Medical Assistance) */}
          <path d="M210,120 L265,185 M265,120 L210,185" fill="none" stroke="#DC2626" strokeWidth="9" strokeLinecap="round" />
          {/* Symbol Arrow (Proceeding in direction) */}
          <path d="M315,152 L390,152 M368,132 L392,152 L368,172" fill="none" stroke="#047857" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />

          {/* International Distress Triangle (3x signals) */}
          <rect x="55" y="290" width="380" height="115" rx="8" fill={fillSurface} stroke={strokeMain} strokeWidth="2" />
          <polygon points="130,318 98,378 162,378" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
          <circle cx="130" cy="318" r="5" fill="#DC2626" />
          <circle cx="98" cy="378" r="5" fill="#DC2626" />
          <circle cx="162" cy="378" r="5" fill="#DC2626" />

          {/* Solar Shadow Stick + Azimuth Compass Right */}
          <rect x="465" y="75" width="280" height="330" rx="8" fill={fillSurface} stroke={strokeMain} strokeWidth="2" />
          <circle cx="605" cy="215" r="88" fill="none" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="605" cy="215" r="70" fill="none" stroke={strokeMuted} strokeWidth="1" strokeDasharray="3 3" />
          {/* Needle */}
          <polygon points="605,136 615,215 605,215" fill="#DC2626" />
          <polygon points="605,136 595,215 605,215" fill="#EF4444" />
          <polygon points="605,294 615,215 605,215" fill="#334155" />
          <polygon points="605,294 595,215 605,215" fill="#64748B" />
          {/* Shadow stick E-W */}
          <line x1="515" y1="355" x2="695" y2="355" stroke="#D97706" strokeWidth="3" />
          <circle cx="545" cy="355" r="5" fill="#1D4ED8" />
          <circle cx="665" cy="355" r="5" fill="#047857" />

          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="95" y="218" fill={textPrimary}>V = HELP</text>
              <text x="206" y="218" fill={textPrimary}>X = MEDIC</text>
              <text x="315" y="218" fill="#047857">{isEs ? '→ RUTA' : '→ HEADING'}</text>
              <text x="195" y="346" fill="#D97706">{isEs ? 'TRIÁNGULO SOCORRO (3×)' : '3× DISTRESS TRIANGLE'}</text>
              <text x="599" y="122" fill="#DC2626">N</text>
              <text x="599" y="316" fill={textMuted}>S</text>
              <text x="505" y="378" fill="#1D4ED8">W (t1)</text>
              <text x="645" y="378" fill="#047857">E (t2)</text>
            </g>
          )}
        </g>
      );
    }

    case 'critical-knots': {
      const step = visual.knotStep ?? 2;
      return (
        <g>
          <rect x="0" y="0" width="800" height="460" fill={nightMode ? '#0B1220' : '#F8FAFC'} />
          {/* Anchor Post */}
          <rect x="575" y="85" width="44" height="290" rx="8" fill={fillAlt} stroke={strokeMain} strokeWidth="2.5" />

          {/* Standing Part (Emerald) */}
          <path d="M90,230 L270,230" fill="none" stroke="#047857" strokeWidth="12" strokeLinecap="round" />
          {/* Bight / Loop (Amber) */}
          <circle cx="315" cy="230" r="46" fill="none" stroke="#D97706" strokeWidth="11" />
          {/* Working End Path (Route Blue) reacting to knotStep */}
          {step >= 1 && (
            <path
              d="M358,230 C435,230 475,145 595,145 C645,145 645,265 595,265 C495,265 405,295 315,276"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="10"
              strokeLinecap="round"
            />
          )}
          {step >= 2 && (
            <path
              d="M315,276 C295,270 292,205 315,184"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="10"
              strokeLinecap="round"
            />
          )}
          {step >= 3 && (
            <path
              d="M315,184 C275,148 220,175 265,230 L315,268"
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="10"
              strokeLinecap="round"
            />
          )}

          {/* Load Vector Arrow */}
          {layers.routes && (
            <g>
              <line x1="185" y1="265" x2="95" y2="265" stroke="#047857" strokeWidth="3" className="svg-route-flow" />
              <polygon points="90,265 104,258 104,272" fill="#047857" />
            </g>
          )}

          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="90" y="205" fill="#047857">{isEs ? 'FIRME (CARGA)' : 'STANDING PART (LOAD)'}</text>
              <text x="278" y="166" fill="#D97706">{isEs ? 'SENO / COTE' : 'BIGHT LOOP'}</text>
              <text x="410" y="128" fill="#1D4ED8">{isEs ? 'CHICOTE (EXTREMO LIBRE)' : 'WORKING END'}</text>
              <text x="556" y="72" fill={textPrimary}>{isEs ? 'PUNTO ANCLAJE' : 'ANCHOR POINT'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'kit-72h-pack': {
      const comp = visual.kitCompartment ?? activeZone;
      const box = (id: string, x: number, y: number, w: number, h: number, color: string) => {
        const selected = comp === id;
        return (
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            rx="8"
            fill={selected ? color : fillSurface}
            fillOpacity={selected ? 0.18 : 1}
            stroke={color}
            strokeWidth={selected ? 3 : 1.8}
          />
        );
      };
      return (
        <g>
          <rect x="0" y="0" width="800" height="460" fill={nightMode ? '#0B1220' : '#F8FAFC'} />
          {/* Backpack Outer Silhouette */}
          <rect x="195" y="42" width="410" height="380" rx="34" fill={fillAlt} stroke={strokeMain} strokeWidth="3" />
          {/* 6 Modular Compartments */}
          {box('water', 220, 68, 170, 105, '#0284C7')}
          {box('power', 410, 68, 170, 105, '#D97706')}
          {box('medical', 220, 190, 170, 105, '#DC2626')}
          {box('shelter', 410, 190, 170, 105, '#047857')}
          {box('docs', 220, 312, 170, 86, '#1D4ED8')}
          {box('tools', 410, 312, 170, 86, '#475569')}

          {layers.labels && (
            <g fontSize="12" fontFamily="JetBrains Mono, monospace" fontWeight="700">
              <text x="238" y="102" fill="#0284C7">{isEs ? 'AGUA 3L/DÍA' : 'WATER + FILTER'}</text>
              <text x="428" y="102" fill="#D97706">{isEs ? 'LUZ + RADIO DINAMO' : 'POWER + RADIO'}</text>
              <text x="238" y="224" fill="#DC2626">{isEs ? 'BOTIQUÍN IFAK' : 'TRAUMA / MEDS'}</text>
              <text x="428" y="224" fill="#047857">{isEs ? 'ABRIGO TÉRMICO' : 'SHELTER / Mylar'}</text>
              <text x="238" y="346" fill="#1D4ED8">{isEs ? 'DOCS + EFECTIVO' : 'DOCS + CASH'}</text>
              <text x="428" y="346" fill={textPrimary}>{isEs ? 'SILBATO + MULTIUSOS' : 'WHISTLE + TOOLS'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'seismic-structural-map': {
      return (
        <g>
          <rect x="0" y="375" width="800" height="85" fill={nightMode ? '#0F172A' : '#E2E8F0'} />
          {/* Multi-story Building Section */}
          <rect x="95" y="90" width="320" height="285" fill={fillSurface} stroke={strokeMain} strokeWidth="2.5" />
          <line x1="95" y1="185" x2="415" y2="185" stroke={strokeMain} strokeWidth="3" />
          <line x1="95" y1="280" x2="415" y2="280" stroke={strokeMain} strokeWidth="3" />
          {/* Interior Reinforced Core & Sturdy Table */}
          <rect x="195" y="190" width="16" height="185" fill="#047857" fillOpacity="0.25" stroke="#047857" strokeWidth="1.5" />
          <rect x="125" y="330" width="60" height="42" fill="#D1FAE5" stroke="#047857" strokeWidth="2" />
          {/* Exterior Facade Glass Collapse Zone (1.5xH) */}
          <rect x="415" y="270" width="165" height="105" fill="#DC2626" fillOpacity="0.12" stroke="#DC2626" strokeWidth="1.5" strokeDasharray="5 3" />
          {/* Open Safe Muster Park */}
          <circle cx="685" cy="335" r="46" fill="#D1FAE5" stroke="#047857" strokeWidth="2.5" />

          {layers.hazards && (
            <g>
              <circle cx="490" cy="315" r="52" fill="#DC2626" fillOpacity="0.16" stroke="#DC2626" strokeWidth="2" className="svg-hazard-pulse" />
              <rect x="355" y="295" width="48" height="75" fill="#DC2626" fillOpacity="0.18" stroke="#DC2626" strokeWidth="1.5" />
            </g>
          )}
          {layers.routes && (
            <path d="M155,348 L305,348 L415,365 L635,340" fill="none" stroke="#047857" strokeWidth="3" className="svg-route-flow" />
          )}
          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="115" y="320" fill="#047857">{isEs ? 'AGACHARSE-CUBRIRSE' : 'DROP-COVER-HOLD'}</text>
              <text x="430" y="258" fill="#DC2626">{isEs ? 'ZONA CAÍDA FACHADA' : 'FACADE COLLAPSE ZONE'}</text>
              <text x="635" y="278" fill="#047857">{isEs ? 'PUNTO ENCUENTRO' : 'OPEN MUSTER ZONE'}</text>
              <text x="330" y="290" fill="#DC2626">{isEs ? 'ASCENSOR NO' : 'NO ELEVATOR'}</text>
            </g>
          )}
        </g>
      );
    }

    case 'first-aid-triage': {
      return (
        <g>
          <rect x="0" y="0" width="800" height="460" fill={nightMode ? '#0B1220' : '#F8FAFC'} />
          {/* Supine Body Schematic */}
          <g transform="translate(145,140)">
            <circle cx="70" cy="85" r="30" fill={fillSurface} stroke={strokeMain} strokeWidth="2.5" />
            <rect x="110" y="45" width="185" height="80" rx="22" fill={fillSurface} stroke={strokeMain} strokeWidth="2.5" />
            <rect x="295" y="52" width="175" height="28" rx="10" fill={fillSurface} stroke={strokeMain} strokeWidth="2.5" />
            <rect x="295" y="90" width="175" height="28" rx="10" fill={fillSurface} stroke={strokeMain} strokeWidth="2.5" />
            {/* Proximal Tourniquet Band */}
            <rect x="335" y="49" width="16" height="34" fill="#DC2626" />
            {/* Core Rewarming Torso Zone */}
            <rect x="145" y="60" width="90" height="50" rx="8" fill="#F59E0B" fillOpacity="0.3" stroke="#D97706" strokeWidth="2" />
            {/* Airway Chin Lift Vector */}
            <path d="M52,55 L70,35" stroke="#047857" strokeWidth="3" />
          </g>

          {layers.hazards && (
            <circle cx="525" cy="205" r="34" fill="#DC2626" fillOpacity="0.16" stroke="#DC2626" strokeWidth="2" className="svg-hazard-pulse" />
          )}

          {layers.labels && (
            <g fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              <text x="150" y="165" fill="#047857">{isEs ? 'VÍA AÉREA / PLS' : 'AIRWAY / RECOVERY'}</text>
              <text x="275" y="170" fill="#D97706">{isEs ? 'CALOR CENTRAL' : 'CORE REWARMING'}</text>
              <text x="455" y="165" fill="#DC2626">{isEs ? 'TORNIQUETE 5-7cm PROXIMAL' : 'TOURNIQUET 5-7cm PROXIMAL'}</text>
            </g>
          )}
        </g>
      );
    }
  }
};
