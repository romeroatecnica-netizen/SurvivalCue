import React from 'react';
import {AlertCircle, ArrowRight, CheckCircle2, Target} from 'lucide-react';
import type {LangCode} from '../config/seo';
import type {UiStrings} from '../i18n/ui';
import type {CategoryId, MissionScenario, UserProfile} from '../types';
import {tLoc} from '../types';

interface ClinicViewProps {
  profile: UserProfile;
  missions: MissionScenario[];
  weakestCategory: CategoryId;
  categoryPct: Record<CategoryId, number>;
  lang: LangCode;
  ui: UiStrings;
  onLaunchMission: (missionId: string) => void;
  onResolveMistake: (mistakeId: string) => void;
}

export const ClinicView: React.FC<ClinicViewProps> = ({
  profile,
  missions,
  weakestCategory,
  categoryPct,
  lang,
  ui,
  onLaunchMission,
  onResolveMistake,
}) => {
  const missedList = Object.values(profile.missedDecisions);
  const targetedMissions = missions.filter(
    (m) => m.category === weakestCategory && !profile.completedMissions[m.id]
  );
  const fallbackTargeted =
    targetedMissions.length > 0
      ? targetedMissions.slice(0, 3)
      : missions.filter((m) => m.category === weakestCategory).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Weakest Category Diagnostic Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs text-slate-500">
              {ui.controls.weakestCategoryLabel} ·{' '}
              <span className="font-mono tabular-nums font-semibold text-amber-700">
                {categoryPct[weakestCategory]}%
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {ui.categories[weakestCategory]}
            </h2>
          </div>
        </div>

        {fallbackTargeted[0] && (
          <button
            type="button"
            onClick={() => onLaunchMission(fallbackTargeted[0].id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>{ui.controls.startClinicDrill}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Unresolved Missed Decisions */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          {ui.nav.clinic} ({missedList.length})
        </h3>

        {missedList.length === 0 ? (
          <div className="border border-slate-200 rounded-lg p-5 bg-slate-50 flex items-center gap-3 text-sm text-slate-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{ui.controls.noMistakesYet}</span>
          </div>
        ) : (
          <div className="space-y-3">
            {missedList.map((miss) => {
              const mission = missions.find((m) => m.id === miss.missionId);
              const stage = mission?.stages.find((s) => s.id === miss.stageId);
              const optimalOpt = stage?.options.find((o) => o.isOptimal);
              if (!mission || !stage || !optimalOpt) return null;

              return (
                <div
                  key={miss.id}
                  className="border border-slate-200 rounded-lg p-4 bg-slate-50/70 space-y-2.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs text-slate-500">
                      {ui.categories[mission.category]} · {tLoc(mission.title, lang)}
                    </div>
                    <button
                      type="button"
                      onClick={() => onResolveMistake(miss.id)}
                      className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                    >
                      {ui.controls.clearMistake}
                    </button>
                  </div>

                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="text-sm font-semibold text-slate-900">
                      {tLoc(stage.title, lang)} — {tLoc(stage.prompt, lang)}
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-md p-3 text-xs text-emerald-950 space-y-1">
                    <div className="font-bold">
                      {ui.controls.optimalChoice}: {tLoc(optimalOpt.label, lang)}
                    </div>
                    <p>{tLoc(optimalOpt.rationale, lang)}</p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => onLaunchMission(mission.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                    >
                      <span>{ui.controls.resumeMission}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommended Drills in Lowest-Mastery Sector */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          {ui.categories[weakestCategory]}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fallbackTargeted.map((m) => (
            <div
              key={m.id}
              className="border border-slate-200 rounded-lg p-4 flex flex-col justify-between bg-slate-50/50"
            >
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  {ui.controls.difficulty} {m.difficulty} · {m.estimatedMinutes} {ui.controls.minutesShort}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{tLoc(m.title, lang)}</h4>
                <p className="text-xs text-slate-600 mt-1.5">{tLoc(m.briefing, lang)}</p>
              </div>
              <button
                type="button"
                onClick={() => onLaunchMission(m.id)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                <span>{ui.controls.startMission}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
