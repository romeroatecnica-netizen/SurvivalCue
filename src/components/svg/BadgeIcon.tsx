import React from 'react';
import type {BadgeDefinition} from '../../types';

interface BadgeIconProps {
  iconKey: BadgeDefinition['iconKey'];
  unlocked: boolean;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({iconKey, unlocked}) => {
  const stroke = unlocked ? '#047857' : '#94A3B8';
  const fillBg = unlocked ? '#ECFDF5' : '#F1F5F9';
  const accent = unlocked ? '#D97706' : '#CBD5E1';

  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 shrink-0" aria-hidden="true">
      <polygon
        points="32,4 56,16 56,42 32,60 8,42 8,16"
        fill={fillBg}
        stroke={stroke}
        strokeWidth="2.5"
      />
      {iconKey === 'blackout' && (
        <path d="M35 16L22 34h10l-3 14 13-18H32l3-14z" fill={accent} stroke={stroke} strokeWidth="1.5" />
      )}
      {iconKey === 'topo' && (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <circle cx="32" cy="32" r="14" />
          <polygon points="32,20 36,32 32,30 28,32" fill="#DC2626" stroke="none" />
          <polygon points="32,44 36,32 32,34 28,32" fill="#64748B" stroke="none" />
        </g>
      )}
      {iconKey === 'seismic' && (
        <polyline points="14,34 22,34 26,20 31,46 37,24 41,34 50,34" fill="none" stroke={stroke} strokeWidth="2.5" />
      )}
      {iconKey === 'water' && (
        <path d="M32 16 C32 16 20 30 20 38 A12 12 0 0 0 44 38 C44 30 32 16 32 16 Z" fill="#0284C7" fillOpacity={unlocked ? 0.25 : 0.1} stroke={stroke} strokeWidth="2" />
      )}
      {iconKey === 'hazard' && (
        <g>
          <polygon points="32,16 48,44 16,44" fill={accent} fillOpacity="0.25" stroke={stroke} strokeWidth="2" />
          <line x1="32" y1="26" x2="32" y2="36" stroke={stroke} strokeWidth="2.5" />
          <circle cx="32" cy="40" r="1.5" fill={stroke} />
        </g>
      )}
      {iconKey === 'streak' && (
        <path d="M32 15 C38 24 43 29 43 36 A11 11 0 1 1 21 36 C21 30 25 26 28 22 C29 27 32 28 32 15 Z" fill={accent} fillOpacity="0.4" stroke={stroke} strokeWidth="2" />
      )}
      {iconKey === 'knots' && (
        <g fill="none" stroke={stroke} strokeWidth="2.5">
          <circle cx="28" cy="32" r="9" />
          <circle cx="37" cy="32" r="9" stroke="#1D4ED8" />
        </g>
      )}
      {iconKey === 'perfect' && (
        <polyline points="20,33 28,41 44,23" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
      {iconKey === 'clinic' && (
        <path d="M29 20h6v9h9v6h-9v9h-6v-9h-9v-6h9z" fill={stroke} />
      )}
      {iconKey === 'commander' && (
        <polygon points="32,15 37,26 49,27 40,35 42,47 32,41 22,47 24,35 15,27 27,26" fill={accent} stroke={stroke} strokeWidth="1.8" />
      )}
    </svg>
  );
};
