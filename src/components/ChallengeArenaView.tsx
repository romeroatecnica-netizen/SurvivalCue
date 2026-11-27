import React, {useEffect, useMemo, useState} from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  Crosshair,
  RefreshCw,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Swords,
  Trophy,
  UserCheck,
} from 'lucide-react';
import type {LangCode} from '../config/seo';
import type {UiStrings} from '../i18n/ui';
import type {
  CategoryId,
  ChallengeDecisionOption,
  ChallengePayload,
  SceneHotspot,
  VisualStatePatch,
} from '../types';
import {tLoc} from '../types';
import {
  buildChallengeShareUrl,
  buildChallengeTrials,
  generateFreshSeed,
} from '../utils/challengeLink';
import {TacticalVisualStage} from './TacticalVisualStage';

interface ChallengeArenaViewProps {
  incomingChallenge: ChallengePayload | null;
  onClearIncomingChallenge: () => void;
  playerName: string;
  lang: LangCode;
  ui: UiStrings;
  onCompleteArena: (scorePct: number, beatChallenger: boolean) => number;
}

type ArenaPhase = 'lobby' | 'playing' | 'debrief';

export const ChallengeArenaView: React.FC<ChallengeArenaViewProps> = ({
  incomingChallenge,
  onClearIncomingChallenge,
  playerName,
  lang,
  ui,
  onCompleteArena,
}) => {
  const [phase, setPhase] = useState<ArenaPhase>('lobby');
  const [activeDuel, setActiveDuel] = useState<ChallengePayload | null>(incomingChallenge);
  const [seed, setSeed] = useState<string>(() =>
    incomingChallenge ? incomingChallenge.seed : generateFreshSeed()
  );
  const [category, setCategory] = useState<CategoryId | 'all'>(() =>
    incomingChallenge ? incomingChallenge.category : 'all'
  );
  const [count, setCount] = useState<number>(() =>
    incomingChallenge ? incomingChallenge.count : 6
  );
  const [timerSec, setTimerSec] = useState<number>(() =>
    incomingChallenge ? incomingChallenge.timerSec : 25
  );

  // Active Gauntlet State
  const [trialIndex, setTrialIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(timerSec);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<ChallengeDecisionOption | null>(null);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Sync if incoming URL challenge arrives after mount
  useEffect(() => {
    if (incomingChallenge) {
      setActiveDuel(incomingChallenge);
      setSeed(incomingChallenge.seed);
      setCategory(incomingChallenge.category);
      setCount(incomingChallenge.count);
      setTimerSec(incomingChallenge.timerSec);
      setPhase('lobby');
    }
  }, [incomingChallenge]);

  const trials = useMemo(
    () => buildChallengeTrials(seed, category, count),
    [seed, category, count]
  );

  const currentTrial = trials[trialIndex];
  const isTrialResolved =
    timedOut || selectedDecision !== null || selectedSpotId !== null;

  // Per-trial countdown + overall elapsed clock
  useEffect(() => {
    if (phase !== 'playing' || isTrialResolved || !currentTrial) return;

    if (secondsLeft <= 0) {
      setTimedOut(true);
      return;
    }

    const id = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
      setElapsedSec((e) => e + 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [phase, isTrialResolved, secondsLeft, currentTrial]);

  const handleRotateSeed = () => {
    setActiveDuel(null);
    onClearIncomingChallenge();
    setSeed(generateFreshSeed());
    setCopiedUrl(false);
  };

  const handleDismissIncoming = () => {
    setActiveDuel(null);
    onClearIncomingChallenge();
    setSeed(generateFreshSeed());
    setCategory('all');
    setCount(6);
    setTimerSec(25);
  };

  const startGauntlet = () => {
    setTrialIndex(0);
    setSecondsLeft(timerSec);
    setElapsedSec(0);
    setSelectedDecision(null);
    setSelectedSpotId(null);
    setTimedOut(false);
    setCorrectCount(0);
    setXpEarned(0);
    setCopiedUrl(false);
    setPhase('playing');
  };

  const handleSelectDecision = (opt: ChallengeDecisionOption) => {
    if (isTrialResolved) return;
    setSelectedDecision(opt);
    if (opt.isOptimal) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleSelectVisualSpot = (spot: SceneHotspot) => {
    if (isTrialResolved || !currentTrial) return;
    if (currentTrial.kind === 'visual') {
      setSelectedSpotId(spot.id);
      if (spot.id === currentTrial.correctHotspotId) {
        setCorrectCount((c) => c + 1);
      }
      return;
    }
    const matchedOpt = currentTrial.options.find((o) => o.hotspotId === spot.id);
    if (matchedOpt) {
      handleSelectDecision(matchedOpt);
    }
  };

  const finalScorePct =
    trials.length > 0 ? Math.round((correctCount / trials.length) * 100) : 0;

  const duelResult: 'victory' | 'tie' | 'defeat' | null = useMemo(() => {
    if (!activeDuel || typeof activeDuel.challengerScore !== 'number') return null;
    if (finalScorePct > activeDuel.challengerScore) return 'victory';
    if (finalScorePct < activeDuel.challengerScore) return 'defeat';
    if (typeof activeDuel.challengerTimeSec === 'number') {
      if (elapsedSec < activeDuel.challengerTimeSec) return 'victory';
      if (elapsedSec > activeDuel.challengerTimeSec) return 'defeat';
    }
    return 'tie';
  }, [activeDuel, finalScorePct, elapsedSec]);

  const handleNextTrial = () => {
    if (trialIndex < trials.length - 1) {
      setTrialIndex((i) => i + 1);
      setSecondsLeft(timerSec);
      setSelectedDecision(null);
      setSelectedSpotId(null);
      setTimedOut(false);
    } else {
      const won = duelResult === 'victory';
      const gained = onCompleteArena(finalScorePct, won);
      setXpEarned(gained);
      setPhase('debrief');
    }
  };

  const sharePayload: ChallengePayload = useMemo(
    () => ({
      v: 1,
      seed,
      challengerName: playerName,
      challengerScore: phase === 'debrief' ? finalScorePct : undefined,
      challengerTimeSec: phase === 'debrief' ? elapsedSec : undefined,
      category,
      count: trials.length,
      timerSec,
    }),
    [seed, playerName, phase, finalScorePct, elapsedSec, category, trials.length, timerSec]
  );

  const shareUrl = useMemo(
    () => buildChallengeShareUrl(sharePayload, lang),
    [sharePayload, lang]
  );

  const handleCopyUrl = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const ta = document.createElement('textarea');
        ta.value = shareUrl;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedUrl(true);
      window.setTimeout(() => setCopiedUrl(false), 2600);
    } catch {
      // Ignore clipboard permission errors cleanly
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return;
    try {
      await navigator.share({
        title: `${ui.brandName} · ${ui.challenge.title}`,
        text:
          phase === 'debrief'
            ? `${playerName}: ${finalScorePct}% (${elapsedSec}s) — ${seed}`
            : `${playerName} — ${seed}`,
        url: shareUrl,
      });
    } catch {
      // User cancelled share dialog
    }
  };

  // Rematch with brand-new rotating trials
  const handleNewRotatingRematch = () => {
    setActiveDuel(null);
    onClearIncomingChallenge();
    setSeed(generateFreshSeed());
    setCopiedUrl(false);
    setPhase('lobby');
  };

  // Visual state derivation for active trial
  const activeVisual: VisualStatePatch = useMemo(() => {
    if (!currentTrial) return {};
    if (currentTrial.kind === 'decision') {
      if (!selectedDecision) return currentTrial.initialVisual;
      return {...currentTrial.initialVisual, ...selectedDecision.visualEffect};
    }
    const isCorrect = selectedSpotId === currentTrial.correctHotspotId;
    return {
      ...currentTrial.initialVisual,
      activeZoneId: selectedSpotId ?? undefined,
      safeRouteId: isTrialResolved ? currentTrial.correctHotspotId : undefined,
      hazardZoneId:
        isTrialResolved && !isCorrect && selectedSpotId ? selectedSpotId : undefined,
    };
  }, [currentTrial, selectedDecision, selectedSpotId, isTrialResolved]);

  if (phase === 'playing' && currentTrial) {
    const isDecision = currentTrial.kind === 'decision';
    const isCorrectAnswer = isDecision
      ? Boolean(selectedDecision?.isOptimal)
      : selectedSpotId === currentTrial.correctHotspotId;

    const correctHotspotId = !isTrialResolved
      ? null
      : isDecision
      ? currentTrial.options.find((o) => o.isOptimal)?.hotspotId ?? null
      : currentTrial.correctHotspotId;

    const wrongHotspotId = !isTrialResolved || isCorrectAnswer
      ? null
      : isDecision
      ? selectedDecision?.hotspotId ?? null
      : selectedSpotId;

    return (
      <div className="space-y-4">
        {/* Live Challenge Telemetry Strip */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Swords className="w-5 h-5 text-blue-700 shrink-0" />
            <div>
              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                <span>{ui.categories[currentTrial.category]}</span>
                <span>·</span>
                <span className="font-mono font-semibold tabular-nums">
                  {ui.challenge.trialLabel} {trialIndex + 1}/{trials.length}
                </span>
                <span>·</span>
                <span className="font-mono text-slate-600">{seed}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {tLoc(currentTrial.title, lang)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-mono tabular-nums text-slate-600">
              {correctCount}/{trialIndex + (isTrialResolved ? 1 : 0)} ✓
            </div>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold tabular-nums ${
                secondsLeft <= 7 && !isTrialResolved
                  ? 'bg-red-50 text-red-700 border-red-300'
                  : 'bg-amber-50 text-amber-800 border-amber-300'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>
                {secondsLeft}
                {ui.controls.secondsLeft}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          <div className="lg:col-span-7">
            <TacticalVisualStage
              scene={currentTrial.scene}
              visual={activeVisual}
              hotspots={currentTrial.hotspots}
              lang={lang}
              ui={ui}
              examMode={true}
              activeHotspotId={
                isDecision ? selectedDecision?.hotspotId ?? null : selectedSpotId
              }
              correctHotspotId={correctHotspotId}
              wrongHotspotId={wrongHotspotId}
              onHotspotSelect={handleSelectVisualSpot}
              disabled={isTrialResolved}
            />
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            {currentTrial.kind === 'decision' ? (
              <>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {tLoc(currentTrial.situation, lang)}
                </p>
                <h3 className="text-base font-bold text-slate-900">
                  {tLoc(currentTrial.prompt, lang)}
                </h3>

                <div className="space-y-2.5">
                  {currentTrial.options.map((opt, idx) => {
                    const isChosen = selectedDecision?.id === opt.id;
                    let cls =
                      'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40';
                    if (isTrialResolved) {
                      if (opt.isOptimal) cls = 'border-emerald-600 bg-emerald-50/70';
                      else if (isChosen) cls = 'border-red-500 bg-red-50/70';
                      else cls = 'border-slate-200 bg-slate-50 opacity-65';
                    }
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isTrialResolved}
                        onClick={() => handleSelectDecision(opt)}
                        className={`w-full text-left border rounded-lg p-3.5 transition-colors cursor-pointer disabled:cursor-default ${cls}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="font-mono text-xs font-bold text-slate-500 mt-0.5 tabular-nums">
                            [{idx + 1}]
                          </span>
                          <span className="text-sm font-semibold text-slate-900">
                            {tLoc(opt.label, lang)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>{ui.nav.visualDrill}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {tLoc(currentTrial.prompt, lang)}
                </h3>

                <div className="space-y-2">
                  {currentTrial.hotspots.map((spot, idx) => {
                    const isChosen = selectedSpotId === spot.id;
                    const isAnswer = spot.id === currentTrial.correctHotspotId;
                    let cls = 'border-slate-200 bg-white hover:border-blue-400';
                    if (isTrialResolved) {
                      if (isAnswer) cls = 'border-emerald-600 bg-emerald-50';
                      else if (isChosen) cls = 'border-red-500 bg-red-50';
                      else cls = 'border-slate-200 bg-slate-50 opacity-65';
                    }
                    return (
                      <button
                        key={spot.id}
                        type="button"
                        disabled={isTrialResolved}
                        onClick={() => handleSelectVisualSpot(spot)}
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
              </>
            )}

            {isTrialResolved && (
              <div
                className={`border rounded-lg p-4 space-y-3 ${
                  isCorrectAnswer
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold">
                  {isCorrectAnswer ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span className="text-emerald-900">{ui.controls.optimalChoice}</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4 text-red-700" />
                      <span className="text-red-900">
                        {timedOut ? ui.challenge.timeoutNotice : ui.controls.suboptimalChoice}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-800 leading-relaxed">
                  {currentTrial.kind === 'decision'
                    ? tLoc(
                        (
                          selectedDecision ??
                          currentTrial.options.find((o) => o.isOptimal) ??
                          currentTrial.options[0]
                        ).rationale,
                        lang
                      )
                    : tLoc(currentTrial.explanation, lang)}
                </p>

                <button
                  type="button"
                  onClick={handleNextTrial}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <span>
                    {trialIndex < trials.length - 1
                      ? ui.challenge.nextTrialBtn
                      : ui.challenge.finishGauntletBtn}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'debrief') {
    return (
      <div className="space-y-5">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-mono font-semibold text-blue-700">
                {ui.challenge.seedLabel}: {seed}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {ui.challenge.title}
              </h2>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500">{ui.challenge.yourScore}</div>
              <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-700">
                {finalScorePct}%
              </div>
            </div>
          </div>

          {duelResult && activeDuel && typeof activeDuel.challengerScore === 'number' && (
            <div
              className={`border rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 ${
                duelResult === 'victory'
                  ? 'bg-emerald-50 border-emerald-200'
                  : duelResult === 'tie'
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-slate-50 border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <Trophy
                  className={`w-6 h-6 shrink-0 ${
                    duelResult === 'victory'
                      ? 'text-emerald-700'
                      : duelResult === 'tie'
                      ? 'text-amber-700'
                      : 'text-slate-600'
                  }`}
                />
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {duelResult === 'victory'
                      ? ui.challenge.duelVictory
                      : duelResult === 'tie'
                      ? ui.challenge.duelTie
                      : ui.challenge.duelDefeat}
                  </div>
                  <div className="text-xs text-slate-700 mt-0.5 font-mono tabular-nums">
                    {playerName}: {finalScorePct}% ({elapsedSec}s) vs{' '}
                    {activeDuel.challengerName}: {activeDuel.challengerScore}%
                    {typeof activeDuel.challengerTimeSec === 'number'
                      ? ` (${activeDuel.challengerTimeSec}s)`
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="text-xs text-slate-500">{ui.challenge.yourScore}</div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {correctCount} / {trials.length} ({finalScorePct}%)
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="text-xs text-slate-500">{ui.challenge.yourTime}</div>
              <div className="text-xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {elapsedSec}s
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="text-xs text-slate-500">{ui.challenge.xpEarned}</div>
              <div className="text-xl font-bold font-mono tabular-nums text-emerald-700 mt-1">
                +{xpEarned} XP
              </div>
            </div>
          </div>

          {/* Share Challenge Link Box */}
          <div className="border border-blue-200 bg-blue-50/40 rounded-xl p-5 space-y-3">
            <div className="text-xs font-bold text-blue-900">
              {ui.challenge.sharePromptLabel}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                onFocus={(e) => e.currentTarget.select()}
                className="flex-1 min-w-[220px] px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-lg text-slate-700"
              />
              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>
                  {copiedUrl ? ui.challenge.copiedFeedback : ui.challenge.copyLinkBtn}
                </span>
              </button>
              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{ui.challenge.shareNativeBtn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Rematch with Fresh Rotating Seed */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-600">{ui.challenge.rematchNote}</p>
            <button
              type="button"
              onClick={handleNewRotatingRematch}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{ui.challenge.rematchBtn}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lobby Phase (Incoming Duel Banner OR Custom Seeded Challenge Setup)
  return (
    <div className="space-y-5">
      {activeDuel && (
        <div className="bg-slate-900 text-white rounded-xl p-6 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold">
                <Swords className="w-4 h-4" />
                <span>{ui.challenge.incomingBannerTitle}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {ui.challenge.challengerLabel}: {activeDuel.challengerName}
              </h2>
              <p className="text-xs text-slate-300">
                {ui.categories[activeDuel.category]} · {activeDuel.count}{' '}
                {ui.challenge.trialCountLabel} · {activeDuel.timerSec}s ·{' '}
                <span className="font-mono">{activeDuel.seed}</span>
              </p>
            </div>

            {typeof activeDuel.challengerScore === 'number' && (
              <div className="flex items-center gap-5 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3">
                <div>
                  <div className="text-xs text-slate-400">
                    {ui.challenge.targetScoreLabel}
                  </div>
                  <div className="text-2xl font-extrabold font-mono tabular-nums text-emerald-400">
                    {activeDuel.challengerScore}%
                  </div>
                </div>
                {typeof activeDuel.challengerTimeSec === 'number' && (
                  <div className="border-l border-slate-700 pl-5">
                    <div className="text-xs text-slate-400">
                      {ui.challenge.targetTimeLabel}
                    </div>
                    <div className="text-2xl font-extrabold font-mono tabular-nums text-amber-400">
                      {activeDuel.challengerTimeSec}s
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={startGauntlet}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>{ui.challenge.acceptChallengeBtn}</span>
            </button>
            <button
              type="button"
              onClick={handleDismissIncoming}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{ui.challenge.dismissIncomingBtn}</span>
            </button>
          </div>
        </div>
      )}

      {!activeDuel && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700">
                <Swords className="w-4 h-4" />
                <span className="font-mono">{seed}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">
                {ui.challenge.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {ui.challenge.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRotateSeed}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{ui.challenge.rotateSeedBtn}</span>
            </button>
          </div>

          {/* Configuration Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {ui.controls.filterByCategory}
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value as CategoryId | 'all');
                  setSeed(generateFreshSeed());
                }}
                className="w-full px-3 py-2 text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-700 cursor-pointer"
              >
                {(['all', 'blackout', 'disaster', 'urban', 'wilderness'] as const).map(
                  (cat) => (
                    <option key={cat} value={cat}>
                      {ui.categories[cat]}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700 mb-1.5">
                {ui.challenge.trialCountLabel}
              </div>
              <div className="flex items-center gap-2">
                {[6, 8].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCount(n)}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition-colors cursor-pointer ${
                      count === n
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700 mb-1.5">
                {ui.challenge.paceLabel}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTimerSec(25)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                    timerSec === 25
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {ui.challenge.paceHard}
                </button>
                <button
                  type="button"
                  onClick={() => setTimerSec(35)}
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                    timerSec === 35
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {ui.challenge.paceStandard}
                </button>
              </div>
            </div>
          </div>

          {/* Seeded Rotating Preview List */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold text-slate-500">
              {ui.challenge.previewListLabel} ({seed})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {trials.map((trial, i) => (
                <div
                  key={trial.id}
                  className="border border-slate-200 rounded-lg px-3 py-2.5 bg-slate-50/70 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <div className="text-[11px] text-slate-500 truncate">
                      {ui.categories[trial.category]}
                    </div>
                    <div className="text-xs font-semibold text-slate-900 truncate">
                      {i + 1}. {tLoc(trial.title, lang)}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-blue-700 shrink-0">
                    {trial.kind === 'visual' ? 'SVG' : 'OPS'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Launch OR Direct Link Copy */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={startGauntlet}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{ui.challenge.startSoloBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>
                {copiedUrl ? ui.challenge.copiedFeedback : ui.challenge.copyLinkBtn}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
