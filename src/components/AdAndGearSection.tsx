import React from 'react';
import {ExternalLink} from 'lucide-react';
import type {UiStrings} from '../i18n/ui';

interface MediaNetAdSlotProps {
  slotId: string;
  label: string;
  variant: 'leaderboard' | 'rectangle';
}

export const MediaNetAdSlot: React.FC<MediaNetAdSlotProps> = ({slotId, label, variant}) => {
  const minHeightClass = variant === 'leaderboard' ? 'min-h-[100px]' : 'min-h-[250px]';
  return (
    <aside
      aria-label={label}
      className={`ad-slot-container w-full bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 ${minHeightClass}`}
    >
      <span className="text-xs text-slate-400 mb-2">{label}</span>
      <div
        id={slotId}
        data-ad-provider="media-net"
        className="w-full max-w-[728px] flex items-center justify-center text-xs font-mono text-slate-400"
      >
        {/* Reserved CLS-safe Media.net container */}
        <span>728×90 / Responsive Contextual Slot · {slotId}</span>
      </div>
    </aside>
  );
};

interface GearShowcaseProps {
  ui: UiStrings;
}

export const GearShowcase: React.FC<GearShowcaseProps> = ({ui}) => {
  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{ui.gear.sectionTitle}</h2>
          <p className="text-sm text-slate-600 mt-1">{ui.gear.sectionSubtitle}</p>
        </div>
        <span className="text-xs text-slate-500">{ui.gear.disclosure}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ui.gear.items.map((item) => (
          <article
            key={item.id}
            className="border border-slate-200 rounded-lg p-4 flex flex-col justify-between bg-slate-50/50"
          >
            <div>
              <div className="text-xs text-slate-500 mb-1.5">
                {ui.categories[item.category]}
              </div>
              <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="text-xs font-mono text-slate-600 mt-1">{item.spec}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.reason}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80">
              <a
                href={item.url}
                target="_blank"
                rel="sponsored nofollow noopener"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline whitespace-nowrap"
              >
                <span>{ui.gear.ctaLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
