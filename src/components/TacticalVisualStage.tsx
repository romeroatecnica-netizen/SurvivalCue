import React, {useState} from 'react';
import {
  AlertTriangle,
  Compass,
  Eye,
  Flashlight,
  Layers,
  Maximize2,
  Minimize2,
  Route,
  Tag,
} from 'lucide-react';
import type {LangCode} from '../config/seo';
import type {UiStrings} from '../i18n/ui';
import type {
  LayerVisibility,
  SceneHotspot,
  SceneTemplateId,
  VisualStatePatch,
} from '../types';
import {tLoc} from '../types';
import {SceneArtworks} from './svg/SceneArtworks';

interface TacticalVisualStageProps {
  scene: SceneTemplateId;
  visual: VisualStatePatch;
  hotspots: SceneHotspot[];
  lang: LangCode;
  ui: UiStrings;
  activeHotspotId?: string | null;
  correctHotspotId?: string | null;
  wrongHotspotId?: string | null;
  onHotspotSelect?: (hotspot: SceneHotspot) => void;
  disabled?: boolean;
}

export const TacticalVisualStage: React.FC<TacticalVisualStageProps> = ({
  scene,
  visual,
  hotspots,
  lang,
  ui,
  activeHotspotId,
  correctHotspotId,
  wrongHotspotId,
  onHotspotSelect,
  disabled = false,
}) => {
  const [layers, setLayers] = useState<LayerVisibility>({
    hazards: true,
    routes: true,
    gridCompass: true,
    labels: true,
  });
  const [nightMode, setNightMode] = useState<boolean>(Boolean(visual.nightModeDefault));
  const [zoomed, setZoomed] = useState<boolean>(false);
  const [hoveredSpot, setHoveredSpot] = useState<SceneHotspot | null>(null);

  const toggleLayer = (key: keyof LayerVisibility) => {
    setLayers((prev) => ({...prev, [key]: !prev[key]}));
  };

  const activeSpotObj = hotspots.find((h) => h.id === activeHotspotId) ?? null;
  const beamTarget =
    visual.flashlightTarget ??
    (hoveredSpot ? {x: hoveredSpot.x, y: hoveredSpot.y} : activeSpotObj ? {x: activeSpotObj.x, y: activeSpotObj.y} : {x: 400, y: 230});

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Stage Layer & Inspection Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleLayer('hazards')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              layers.hazards
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{ui.layers.hazards}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('routes')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              layers.routes
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Route className="w-3.5 h-3.5" />
            <span>{ui.layers.routes}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('gridCompass')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              layers.gridCompass
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{ui.layers.gridCompass}</span>
          </button>

          <button
            type="button"
            onClick={() => toggleLayer('labels')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              layers.labels
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>{ui.layers.labels}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setNightMode((n) => !n)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              nightMode
                ? 'bg-amber-500 text-slate-950 border-amber-500'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Flashlight className="w-3.5 h-3.5" />
            <span>{ui.layers.nightMode}</span>
          </button>

          <button
            type="button"
            onClick={() => setZoomed((z) => !z)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border bg-white text-slate-700 border-slate-200 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {zoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{zoomed ? ui.layers.zoomOut : ui.layers.zoomIn}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Viewport */}
      <div
        className={`relative overflow-auto transition-colors duration-200 ${
          nightMode ? 'bg-[#0B1220]' : 'bg-[#F8FAFC]'
        }`}
      >
        <div
          className="transition-transform duration-200 origin-center mx-auto"
          style={{transform: zoomed ? 'scale(1.32)' : 'scale(1)'}}
        >
          <svg
            viewBox="0 0 800 460"
            className="w-full h-auto block select-none"
            role="img"
            aria-label={scene}
          >
            <defs>
              <pattern id="tactical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={nightMode ? '#1E293B' : '#E2E8F0'}
                  strokeWidth="0.8"
                />
              </pattern>
              <radialGradient id="flashlight-beam" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.28" />
                <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0.72" />
              </radialGradient>
            </defs>

            {/* Technical Coordinate Grid */}
            {layers.gridCompass && <rect x="0" y="0" width="800" height="460" fill="url(#tactical-grid)" />}

            {/* Main Domain SVG Scene */}
            <SceneArtworks
              scene={scene}
              visual={visual}
              layers={layers}
              nightMode={nightMode}
              lang={lang}
              activeHotspotId={activeHotspotId}
            />

            {/* Blackout Flashlight Spotlight Effect */}
            {nightMode && (
              <g pointerEvents="none">
                <circle cx={beamTarget.x} cy={beamTarget.y} r="195" fill="url(#flashlight-beam)" />
              </g>
            )}

            {/* Grid Compass Rose Corner */}
            {layers.gridCompass && (
              <g transform="translate(746, 46)" pointerEvents="none">
                <circle
                  cx="0"
                  cy="0"
                  r="24"
                  fill={nightMode ? '#0F172A' : '#FFFFFF'}
                  fillOpacity="0.9"
                  stroke={nightMode ? '#475569' : '#CBD5E1'}
                  strokeWidth="1.5"
                />
                <polygon points="0,-17 5,0 0,-3 -5,0" fill="#DC2626" />
                <polygon points="0,17 5,0 0,3 -5,0" fill="#64748B" />
                <text
                  x="0"
                  y="-27"
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="700"
                  fill={nightMode ? '#F8FAFC' : '#0F172A'}
                >
                  N
                </text>
              </g>
            )}

            {/* Interactive Clickable Hotspots */}
            {hotspots.map((spot, idx) => {
              const isSelected = activeHotspotId === spot.id;
              const isCorrect = correctHotspotId === spot.id;
              const isWrong = wrongHotspotId === spot.id;

              let ringColor = '#1D4ED8';
              let fillColor = '#EFF6FF';
              if (spot.role === 'hazard') {
                ringColor = '#DC2626';
                fillColor = '#FEF2F2';
              } else if (spot.role === 'safe') {
                ringColor = '#047857';
                fillColor = '#ECFDF5';
              }
              if (isCorrect) {
                ringColor = '#047857';
                fillColor = '#D1FAE5';
              } else if (isWrong) {
                ringColor = '#DC2626';
                fillColor = '#FEE2E2';
              } else if (isSelected) {
                ringColor = '#D97706';
                fillColor = '#FEF3C7';
              }

              const labelText = tLoc(spot.label, lang);
              const approxWidth = Math.max(76, Math.min(185, labelText.length * 7 + 16));
              const labelX = spot.x > 610 ? spot.x - approxWidth - 18 : spot.x + 18;
              const labelY = spot.y < 42 ? spot.y + 8 : spot.y - 12;

              return (
                <g
                  key={spot.id}
                  role="button"
                  tabIndex={disabled ? -1 : 0}
                  aria-label={labelText}
                  onClick={() => {
                    if (!disabled && onHotspotSelect) onHotspotSelect(spot);
                  }}
                  onKeyDown={(e) => {
                    if (!disabled && onHotspotSelect && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      onHotspotSelect(spot);
                    }
                  }}
                  onMouseEnter={() => setHoveredSpot(spot)}
                  onMouseLeave={() => setHoveredSpot(null)}
                  className={disabled ? 'cursor-default' : 'cursor-pointer'}
                >
                  {/* Outer Pulse / Selection Halo */}
                  <circle
                    cx={spot.x}
                    cy={spot.y}
                    r={isSelected || hoveredSpot?.id === spot.id ? 21 : 16}
                    fill={ringColor}
                    fillOpacity="0.16"
                    stroke={ringColor}
                    strokeWidth="1.5"
                  />
                  {/* Core Target Button */}
                  <circle
                    cx={spot.x}
                    cy={spot.y}
                    r="11"
                    fill={fillColor}
                    stroke={ringColor}
                    strokeWidth="2.5"
                  />
                  <text
                    x={spot.x}
                    y={spot.y + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="700"
                    fill={ringColor}
                  >
                    {idx + 1}
                  </text>

                  {/* Hotspot Caption Box */}
                  {(layers.labels || hoveredSpot?.id === spot.id || isSelected) && (
                    <g pointerEvents="none">
                      <rect
                        x={labelX}
                        y={labelY}
                        width={approxWidth}
                        height="22"
                        rx="5"
                        fill={nightMode ? '#0F172A' : '#FFFFFF'}
                        fillOpacity="0.94"
                        stroke={ringColor}
                        strokeWidth="1.2"
                      />
                      <text
                        x={labelX + 8}
                        y={labelY + 14.5}
                        fontSize="10.5"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                        fontWeight="600"
                        fill={nightMode ? '#F8FAFC' : '#0F172A'}
                      >
                        {labelText.slice(0, 24)}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Stage Status Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-emerald-700" />
          <span className="font-medium text-slate-800">
            {visual.statusTag ? tLoc(visual.statusTag, lang) : ui.controls.clickSketchHint}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Eye className="w-3.5 h-3.5" />
          <span className="font-mono tabular-nums">{hotspots.length} hotspots</span>
        </div>
      </div>
    </div>
  );
};
