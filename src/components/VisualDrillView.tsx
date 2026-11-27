import React, {useMemo, useState} from 'react';
import {ArrowRight, CheckCircle2, Crosshair, RotateCcw, XCircle} from 'lucide-react';
import type {LangCode} from '../config/seo';
import type {UiStrings} from '../i18n/ui';
import type {SceneHotspot, SketchChallenge} from '../types';
import {tLoc} from '../types';
import {shuffleSeeded} from '../utils/challengeLink';
import {TacticalVisualStage} from './TacticalVisualStage';

interface VisualDrillViewProps {
  challenges: SketchChallenge[];
  completedChallenges: string[];
  lang: LangCode;
  ui: UiStrings;
  onSolveChallenge: (challengeId: string) => void;
}

export const VisualDrillView: React.FC<VisualDrillViewProps> = ({
  challenges,
  completedChallenges,
  lang,
  ui,
  onSolveChallenge,
}) => {
  const [index, setIndex] = useState(0);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);

  const challenge = challenges[index];
  const isSolved = selectedSpotId !== null;
  const isCorrect = selectedSpotId === challenge.correctHotspotId;

  const shuffledHotspots = useMemo(() => {
    return shuffleSeeded(challenge.hotspots, `${challenge.id}::${retryNonce}`);
  }, [challenge.id, challenge.hotspots, retryNonce]);

  const handleSelectHotspot = (spot: SceneHotspot) => {
    if (selectedSpotId !== null) return;
    setSelectedSpotId(spot.id);
    if (spot.id === challenge.correctHotspotId) {
      onSolveChallenge(challenge.id);
    }
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % challenges.length);
    setSelectedSpotId(null);
  };

  const handleJump = (i: number) => {
    setIndex(i);
    setSelectedSpotId(null);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Crosshair className="w-5 h-5 text-blue-700 shrink-0" />
          <div>
            <div className="text-xs text-slate-500">
              {ui.categories[challenge.category]} ·{' '}
              <span className="font-mono tabular-nums">
                {index + 1}/{challenges.length}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {tLoc(challenge.title, lang)}
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {challenges.map((c, i) => {
            const done = completedChallenges.includes(c.id);
            const active = i === index;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleJump(i)}
                className={`w-8 h-8 rounded-md text-xs font-mono font-semibold tabular-nums border transition-colors cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900'
                    : done
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8">
          <TacticalVisualStage
            scene={challenge.scene}
            visual={{
              ...challenge.initialVisual,
              activeZoneId: selectedSpotId ?? undefined,
              safeRouteId: isSolved ? challenge.correctHotspotId : undefined,
              hazardZoneId:
                isSolved && !isCorrect && selectedSpotId ? selectedSpotId : undefined,
            }}
            hotspots={shuffledHotspots}
            lang={lang}
            ui={ui}
            examMode={true}
            activeHotspotId={selectedSpotId}
            correctHotspotId={isSolved ? challenge.correctHotspotId : null}
            wrongHotspotId={isSolved && !isCorrect ? selectedSpotId : null}
            onHotspotSelect={handleSelectHotspot}
            disabled={isSolved}
          />
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
            {tLoc(challenge.prompt, lang)}
          </p>

          <div className="space-y-2">
            {shuffledHotspots.map((spot, idx) => {
              const isChosen = selectedSpotId === spot.id;
              const isAnswer = spot.id === challenge.correctHotspotId;
              let cls = 'border-slate-200 bg-white hover:border-blue-400';
              if (isSolved) {
                if (isAnswer) cls = 'border-emerald-600 bg-emerald-50';
                else if (isChosen) cls = 'border-red-500 bg-red-50';
                else cls = 'border-slate-200 bg-slate-50 opacity-65';
              }
              return (
                <button
                  key={spot.id}
                  type="button"
                  disabled={isSolved}
                  onClick={() => handleSelectHotspot(spot)}
                  className={`w-full text-left border rounded-lg p-3 text-xs font-semibold text-slate-800 transition-colors cursor-pointer disabled:cursor-default ${cls}`}
                >
                  <span className="font-mono text-slate-500 mr-2 tabular-nums">
                    [{idx + 1}]
                  </span>
                  {tLoc(spot.label, lang)}
                </button>
              );
            })}
          </div>

          {isSolved && (
            <div
              className={`border rounded-lg p-4 space-y-3 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span className="text-emerald-900">{ui.controls.challengeSolved}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-700" />
                    <span className="text-red-900">{ui.controls.challengeWrong}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-800 leading-relaxed">
                {tLoc(challenge.explanation, lang)}
              </p>

              <div className="flex items-center gap-2">
                {!isCorrect && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSpotId(null);
                      setRetryNonce((n) => n + 1);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{ui.controls.retryMission}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  <span>{ui.controls.nextChallenge}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
