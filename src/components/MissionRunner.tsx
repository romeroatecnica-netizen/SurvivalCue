import React, {useEffect, useMemo, useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import type {LangCode} from '../config/seo';
import type {UiStrings} from '../i18n/ui';
import type {
  MissedDecisionRecord,
  MissionCompletionRecord,
  MissionScenario,
  SceneHotspot,
  StageOption,
  TacticalMeters,
  VisualStatePatch,
} from '../types';
import {tLoc} from '../types';
import {shuffleSeeded} from '../utils/challengeLink';
import {TacticalVisualStage} from './TacticalVisualStage';

interface MissionRunnerProps {
  mission: MissionScenario;
  lang: LangCode;
  ui: UiStrings;
  initialTimedMode: boolean;
  onToggleTimedMode: (timed: boolean) => void;
  onComplete: (record: MissionCompletionRecord, missed: MissedDecisionRecord[]) => void;
  onBack: () => void;
}

const clampMeter = (val: number) => Math.max(0, Math.min(100, val));

export const MissionRunner: React.FC<MissionRunnerProps> = ({
  mission,
  lang,
  ui,
  initialTimedMode,
  onToggleTimedMode,
  onComplete,
  onBack,
}) => {
  const [stageIndex, setStageIndex] = useState(0);
  const [meters, setMeters] = useState<TacticalMeters>(mission.initialMeters);
  const [selectedOption, setSelectedOption] = useState<StageOption | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [optimalCount, setOptimalCount] = useState(0);
  const [missedList, setMissedList] = useState<MissedDecisionRecord[]>([]);
  const [finished, setFinished] = useState(false);
  const [timedMode, setTimedMode] = useState(initialTimedMode);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [attemptNonce, setAttemptNonce] = useState(0);

  const stage = mission.stages[stageIndex];

  const shuffledOptions = useMemo(() => {
    return shuffleSeeded(stage.options, `${mission.id}::${stage.id}::${attemptNonce}::opts`);
  }, [mission.id, stage.id, stage.options, attemptNonce]);

  const shuffledHotspots = useMemo(() => {
    const ordered: SceneHotspot[] = [];
    for (const opt of shuffledOptions) {
      const match = stage.hotspots.find((h) => h.id === opt.hotspotId);
      if (match && !ordered.some((o) => o.id === match.id)) {
        ordered.push(match);
      }
    }
    for (const h of stage.hotspots) {
      if (!ordered.some((o) => o.id === h.id)) {
        ordered.push(h);
      }
    }
    return ordered;
  }, [stage.hotspots, shuffledOptions]);

  useEffect(() => {
    setSecondsLeft(45);
  }, [stageIndex, mission.id, attemptNonce]);

  useEffect(() => {
    if (!timedMode || selectedOption || finished) return;
    if (secondsLeft <= 0) {
      const worstOpt =
        [...shuffledOptions].sort((a, b) => a.scoreDelta - b.scoreDelta)[0] ??
        shuffledOptions[0];
      if (worstOpt) {
        handleSelectOption(worstOpt);
      }
      return;
    }
    const id = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timedMode, selectedOption, finished, secondsLeft]);

  const currentVisual: VisualStatePatch = useMemo(() => {
    if (!selectedOption) return stage.initialVisual;
    return {...stage.initialVisual, ...selectedOption.visualEffect};
  }, [stage, selectedOption]);

  const handleSelectOption = (option: StageOption) => {
    if (selectedOption || finished) return;
    setSelectedOption(option);
    setMeters((prev) => ({
      selfProtection: clampMeter(prev.selfProtection + option.meterDelta.selfProtection),
      resources: clampMeter(prev.resources + option.meterDelta.resources),
      orientation: clampMeter(prev.orientation + option.meterDelta.orientation),
    }));
    setTotalScore((s) => s + option.scoreDelta);
    if (option.isOptimal) {
      setOptimalCount((c) => c + 1);
    } else {
      setMissedList((prev) => [
        ...prev,
        {
          id: `${mission.id}::${stage.id}`,
          missionId: mission.id,
          stageId: stage.id,
          category: mission.category,
          chosenOptionId: option.id,
          recordedAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const handleHotspotClick = (spot: SceneHotspot) => {
    if (selectedOption || finished) return;
    const matched =
      stage.options.find((opt) => opt.hotspotId === spot.id) ??
      (typeof spot.optionIndex === 'number' ? stage.options[spot.optionIndex] : undefined);
    if (matched) {
      handleSelectOption(matched);
    }
  };

  const handleAdvance = () => {
    if (stageIndex < mission.stages.length - 1) {
      setStageIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      const finalPct = Math.min(100, Math.round(totalScore));
      setFinished(true);
      onComplete(
        {
          missionId: mission.id,
          category: mission.category,
          scorePct: finalPct,
          optimalCount,
          completedAt: new Date().toISOString(),
          finalMeters: meters,
        },
        missedList
      );
    }
  };

  const handleRestart = () => {
    setStageIndex(0);
    setMeters(mission.initialMeters);
    setSelectedOption(null);
    setTotalScore(0);
    setOptimalCount(0);
    setMissedList([]);
    setFinished(false);
    setSecondsLeft(45);
    setAttemptNonce((n) => n + 1);
  };

  const handleTimedSwitch = () => {
    const next = !timedMode;
    setTimedMode(next);
    onToggleTimedMode(next);
  };

  const meterRow = (label: string, val: number) => {
    const barColor =
      val >= 65 ? 'bg-emerald-700' : val >= 35 ? 'bg-amber-600' : 'bg-red-600';
    return (
      <div className="flex-1 min-w-[160px]">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-medium text-slate-700">{label}</span>
          <span className="font-mono font-semibold text-slate-900 tabular-nums">{val}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-200 ${barColor}`}
            style={{width: `${val}%`}}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Mission Control Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{ui.controls.backToCatalog}</span>
          </button>
          <div>
            <div className="text-xs text-slate-500">
              {ui.categories[mission.category]} · {ui.controls.stageProgress}{' '}
              <span className="tabular-nums font-semibold">
                {finished ? 3 : stageIndex + 1}/3
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {tLoc(mission.title, lang)}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleTimedSwitch}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              timedMode
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{timedMode ? ui.controls.timedMode : ui.controls.studyMode}</span>
            {timedMode && !finished && (
              <span className="font-mono tabular-nums ml-1">
                ({secondsLeft}
                {ui.controls.secondsLeft})
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Live 3-Meter Telemetry Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap gap-6">
        {meterRow(ui.meters.selfProtection, meters.selfProtection)}
        {meterRow(ui.meters.resources, meters.resources)}
        {meterRow(ui.meters.orientation, meters.orientation)}
      </div>

      {finished ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs text-emerald-700 font-semibold">
                {ui.controls.completedLabel}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {tLoc(mission.title, lang)}
              </h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500">Score</div>
              <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-700">
                {Math.min(100, Math.round(totalScore))}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="text-xs text-slate-500">{ui.controls.optimalChoice}</div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {optimalCount} / 3
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="text-xs text-slate-500">{ui.meters.selfProtection}</div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {meters.selfProtection}%
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="text-xs text-slate-500">{ui.meters.orientation}</div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {meters.orientation}%
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{ui.controls.retryMission}</span>
            </button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{ui.controls.backToCatalog}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Split Sandbox Layout: Visual Stage Left/Top (60%) + Decision Deck Right (40%) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            <TacticalVisualStage
              scene={mission.scene}
              visual={currentVisual}
              hotspots={shuffledHotspots}
              lang={lang}
              ui={ui}
              examMode={true}
              activeHotspotId={selectedOption?.hotspotId ?? null}
              correctHotspotId={
                selectedOption
                  ? stage.options.find((o) => o.isOptimal)?.hotspotId ?? null
                  : null
              }
              wrongHotspotId={
                selectedOption && !selectedOption.isOptimal
                  ? selectedOption.hotspotId ?? null
                  : null
              }
              onHotspotSelect={handleHotspotClick}
              disabled={Boolean(selectedOption)}
            />
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div>
              <div className="text-xs font-mono text-blue-700 font-semibold">
                {ui.controls.stageProgress} {stageIndex + 1}/3 · {tLoc(stage.title, lang)}
              </div>
              <p className="text-sm text-slate-700 mt-1.5 leading-relaxed">
                {tLoc(stage.situation, lang)}
              </p>
              <h3 className="text-base font-bold text-slate-900 mt-2">
                {tLoc(stage.prompt, lang)}
              </h3>
            </div>

            <div className="space-y-2.5">
              {shuffledOptions.map((opt, idx) => {
                const isChosen = selectedOption?.id === opt.id;
                const showFeedback = Boolean(selectedOption);
                let styleClass =
                  'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40';
                if (showFeedback) {
                  if (opt.isOptimal) {
                    styleClass = 'border-emerald-600 bg-emerald-50/70';
                  } else if (isChosen) {
                    styleClass = 'border-red-500 bg-red-50/70';
                  } else {
                    styleClass = 'border-slate-200 bg-slate-50 opacity-65';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={Boolean(selectedOption)}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left border rounded-lg p-3.5 transition-colors cursor-pointer disabled:cursor-default ${styleClass}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono text-xs font-bold text-slate-500 mt-0.5 tabular-nums">
                        [{idx + 1}]
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900">
                          {tLoc(opt.label, lang)}
                        </div>
                        {showFeedback && (
                          <div className="text-xs text-slate-600 mt-0.5">
                            {tLoc(opt.summary, lang)}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedOption && (
              <div
                className={`border rounded-lg p-4 space-y-3 ${
                  selectedOption.isOptimal
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  {selectedOption.isOptimal ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span className="text-emerald-900">{ui.controls.optimalChoice}</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-red-700" />
                      <span className="text-red-900">{ui.controls.suboptimalChoice}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-800 leading-relaxed">
                  {tLoc(selectedOption.rationale, lang)}
                </p>
                <button
                  type="button"
                  onClick={handleAdvance}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {stageIndex < mission.stages.length - 1
                      ? ui.controls.nextStage
                      : ui.controls.finishMission}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
