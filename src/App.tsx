import React, {useEffect, useMemo, useState} from 'react';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Flame,
  Globe,
  Shield,
} from 'lucide-react';
import {AcademyView} from './components/AcademyView';
import {GearShowcase, MediaNetAdSlot} from './components/AdAndGearSection';
import {ChallengeArenaView} from './components/ChallengeArenaView';
import {ClinicView} from './components/ClinicView';
import {MissionRunner} from './components/MissionRunner';
import {ProfileDashboard} from './components/ProfileDashboard';
import {VisualDrillView} from './components/VisualDrillView';
import {
  CANONICAL_ORIGIN,
  detectInitialLanguage,
  getCanonicalUrl,
  SUPPORTED_LANGUAGES,
  type LangCode,
} from './config/seo';
import {
  ALL_CHALLENGES,
  ALL_LESSONS,
  ALL_MISSIONS,
  CATEGORY_TOTALS,
} from './data';
import {UI_TRANSLATIONS} from './i18n/ui';
import type {
  AppMode,
  CategoryId,
  ChallengePayload,
  MissedDecisionRecord,
  MissionCompletionRecord,
  ProgressStore,
  UserProfile,
} from './types';
import {tLoc} from './types';
import {detectIncomingChallenge} from './utils/challengeLink';
import {
  computeMasteryStats,
  createDefaultProfile,
  getRankIndex,
  loadProgressStore,
  recordArenaCompletion,
  recordChallengeCompletion,
  recordLessonCompletion,
  recordMissionCompletion,
  resolveMistakeRecord,
  saveProgressStore,
  validateImportedStore,
} from './utils/storage';

export function App() {
  const [incomingChallenge, setIncomingChallenge] = useState<ChallengePayload | null>(() =>
    detectIncomingChallenge()
  );
  const [lang, setLang] = useState<LangCode>(() => detectInitialLanguage());
  const [mode, setMode] = useState<AppMode>(() =>
    detectIncomingChallenge() ? 'challenge' : 'missions'
  );
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | 'all'>('all');
  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [store, setStore] = useState<ProgressStore>(() => loadProgressStore());
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const ui = UI_TRANSLATIONS[lang] ?? UI_TRANSLATIONS.en;
  const langMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === lang) ?? SUPPORTED_LANGUAGES[0];

  const activeProfile: UserProfile = useMemo(() => {
    return (
      store.profiles.find((p) => p.id === store.activeProfileId) ?? store.profiles[0]
    );
  }, [store]);

  const {categoryPct, globalPct, weakestCategory} = useMemo(() => {
    return computeMasteryStats(
      activeProfile,
      CATEGORY_TOTALS,
      ALL_LESSONS.length,
      ALL_CHALLENGES.length
    );
  }, [activeProfile]);

  const rankIndex = getRankIndex(activeProfile.xp);

  useEffect(() => {
    saveProgressStore(store);
  }, [store]);

  // Synchronize HTML lang, RTL dir, title, description, canonical & og:url strictly using CANONICAL_ORIGIN
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = langMeta.dir;

    const pageTitle = `${ui.brandName} — ${ui.heroTitle}`;
    document.title = pageTitle;

    const canonicalHref = getCanonicalUrl(lang);
    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalHref);
    }
    const ogUrlEl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.setAttribute('content', canonicalHref);
    }
    const descEl = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', ui.heroSubtitle);
    }
    const ogTitleEl = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute('content', pageTitle);
    }
    const ogDescEl = document.querySelector<HTMLMetaElement>(
      'meta[property="og:description"]'
    );
    if (ogDescEl) {
      ogDescEl.setAttribute('content', ui.heroSubtitle);
    }

    try {
      window.localStorage.setItem('survivalcue_lang', lang);
      const url = new URL(window.location.href);
      if (lang === 'en') {
        url.searchParams.delete('lang');
      } else {
        url.searchParams.set('lang', lang);
      }
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    } catch {
      // Ignore history/storage edge restrictions
    }
  }, [lang, langMeta.dir, ui]);

  const updateActiveProfile = (updater: (profile: UserProfile) => UserProfile) => {
    setStore((prev) => ({
      ...prev,
      profiles: prev.profiles.map((p) =>
        p.id === prev.activeProfileId ? updater(p) : p
      ),
    }));
  };

  const handleMissionComplete = (
    record: MissionCompletionRecord,
    missed: MissedDecisionRecord[]
  ) => {
    updateActiveProfile((prof) => recordMissionCompletion(prof, record, missed));
  };

  const handleLessonMastered = (lessonId: string) => {
    updateActiveProfile((prof) => recordLessonCompletion(prof, lessonId));
  };

  const handleChallengeSolved = (challengeId: string) => {
    updateActiveProfile((prof) => recordChallengeCompletion(prof, challengeId));
  };

  const handleArenaComplete = (scorePct: number, beatChallenger: boolean): number => {
    let gained = 55 + Math.round(scorePct * 0.8) + (beatChallenger ? 40 : 0);
    updateActiveProfile((prof) => {
      const res = recordArenaCompletion(prof, scorePct, beatChallenger);
      gained = res.xpGained;
      return res.updated;
    });
    return gained;
  };

  const handleClearIncomingChallenge = () => {
    setIncomingChallenge(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('c');
      url.searchParams.delete('challenge');
      url.searchParams.delete('reto');
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    } catch {
      // Ignore history edge errors
    }
  };

  const handleResolveMistake = (mistakeId: string) => {
    updateActiveProfile((prof) => resolveMistakeRecord(prof, mistakeId));
  };

  const handleToggleTimedMode = (timed: boolean) => {
    updateActiveProfile((prof) => ({...prof, preferredTimedMode: timed}));
  };

  const handleSwitchProfile = (profileId: string) => {
    setStore((prev) => ({...prev, activeProfileId: profileId}));
  };

  const handleCreateProfile = (name: string) => {
    const created = createDefaultProfile(name);
    setStore((prev) => ({
      ...prev,
      activeProfileId: created.id,
      profiles: [...prev.profiles, created],
    }));
  };

  const handleRenameProfile = (profileId: string, name: string) => {
    setStore((prev) => ({
      ...prev,
      profiles: prev.profiles.map((p) => (p.id === profileId ? {...p, name} : p)),
    }));
  };

  const handleDeleteProfile = (profileId: string) => {
    setStore((prev) => {
      if (prev.profiles.length <= 1) return prev;
      const remaining = prev.profiles.filter((p) => p.id !== profileId);
      const nextActive =
        prev.activeProfileId === profileId ? remaining[0].id : prev.activeProfileId;
      return {...prev, activeProfileId: nextActive, profiles: remaining};
    });
  };

  const handleImportStore = (rawJson: string): boolean => {
    const parsed = validateImportedStore(rawJson);
    if (!parsed) return false;
    setStore(parsed);
    return true;
  };

  const launchMission = (missionId: string) => {
    setMode('missions');
    setActiveMissionId(missionId);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const activeMission = useMemo(
    () => ALL_MISSIONS.find((m) => m.id === activeMissionId) ?? null,
    [activeMissionId]
  );

  const visibleMissions = useMemo(() => {
    if (categoryFilter === 'all') return ALL_MISSIONS;
    return ALL_MISSIONS.filter((m) => m.category === categoryFilter);
  }, [categoryFilter]);

  const navItems: Array<{id: AppMode; label: string}> = [
    {id: 'missions', label: ui.nav.missions},
    {id: 'academy', label: ui.nav.academy},
    {id: 'visual_drill', label: ui.nav.visualDrill},
    {id: 'challenge', label: ui.nav.challenge},
    {id: 'clinic', label: ui.nav.clinic},
    {id: 'profile', label: ui.nav.profile},
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Zone 3-Contract Single-Row Top Bar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href={getCanonicalUrl(lang)}
            onClick={(e) => {
              e.preventDefault();
              setMode('missions');
              setActiveMissionId(null);
            }}
            className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            {ui.brandName}
          </a>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 text-sm font-medium"
          >
            {navItems.map((item) => {
              const active = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMode(item.id);
                    if (item.id !== 'missions') setActiveMissionId(null);
                  }}
                  className={`py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
                    active
                      ? 'text-emerald-700 border-emerald-700 font-semibold'
                      : 'text-slate-600 border-transparent hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Control (Language Switcher) */}
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="lang-select" className="sr-only">
              Language
            </label>
            <div className="relative inline-flex items-center">
              <Globe className="w-4 h-4 text-slate-500 absolute start-2.5 pointer-events-none" />
              <select
                id="lang-select"
                value={lang}
                onChange={(e) => setLang(e.target.value as LangCode)}
                className="ps-8 pe-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-700 cursor-pointer whitespace-nowrap"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Nav Row */}
        <div className="md:hidden border-t border-slate-100 px-3 py-2 flex items-center gap-1.5 overflow-x-auto">
          {navItems.map((item) => {
            const active = mode === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setMode(item.id);
                  if (item.id !== 'missions') setActiveMissionId(null);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Hero & Active Profile Telemetry Strip (Hidden when inside active mission to maximize stage focus) */}
        {!activeMission && (
          <section className="space-y-5">
            <div className="max-w-4xl">
              <h1
                className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900"
                style={{textWrap: 'balance'}}
              >
                {ui.heroTitle}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed max-w-3xl">
                {ui.heroSubtitle}
              </p>
            </div>

            {/* Active Profile Bar & 4 Sector Progress */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={() => setMode('profile')}
                    className="inline-flex items-center gap-2 font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-emerald-700" />
                    <span>{activeProfile.name}</span>
                  </button>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-semibold text-slate-700">
                    {ui.ranks[rankIndex]}
                  </span>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-mono font-bold tabular-nums text-emerald-700">
                    {activeProfile.xp} XP
                  </span>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono font-bold tabular-nums text-amber-600">
                    <Flame className="w-4 h-4" />
                    {activeProfile.streakDays} {ui.profile.days}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-500">{ui.profile.globalMastery}:</span>
                  <span className="font-mono font-bold tabular-nums text-blue-700 text-sm">
                    {globalPct}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setMode('profile')}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline cursor-pointer whitespace-nowrap"
                  >
                    {ui.nav.profile}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
                {(['blackout', 'disaster', 'urban', 'wilderness'] as CategoryId[]).map(
                  (cat) => (
                    <div key={cat}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-600 truncate pr-2">
                          {ui.categories[cat]}
                        </span>
                        <span className="font-mono font-semibold tabular-nums text-slate-900">
                          {categoryPct[cat]}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-700 transition-all duration-300"
                          style={{width: `${categoryPct[cat]}%`}}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}

        {/* Primary Interactive Simulator Workspace */}
        <section aria-label="Simulator Workspace">
          {mode === 'missions' && activeMission && (
            <MissionRunner
              key={activeMission.id}
              mission={activeMission}
              lang={lang}
              ui={ui}
              initialTimedMode={activeProfile.preferredTimedMode}
              onToggleTimedMode={handleToggleTimedMode}
              onComplete={handleMissionComplete}
              onBack={() => setActiveMissionId(null)}
            />
          )}

          {mode === 'missions' && !activeMission && (
            <div className="space-y-5">
              {/* Interactive Sector Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
                  {(['all', 'blackout', 'disaster', 'urban', 'wilderness'] as const).map(
                    (cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          categoryFilter === cat
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {ui.categories[cat]}
                      </button>
                    )
                  )}
                </div>

                <div className="text-xs font-mono tabular-nums text-slate-500">
                  {Object.keys(activeProfile.completedMissions).length} /{' '}
                  {ALL_MISSIONS.length} {ui.controls.completedLabel}
                </div>
              </div>

              {/* Mission Cards Grid (Zero-Pill Metadata Discipline) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleMissions.map((mission) => {
                  const rec = activeProfile.completedMissions[mission.id];
                  return (
                    <article
                      key={mission.id}
                      className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                          <span>
                            {ui.categories[mission.category]} · {ui.controls.difficulty}{' '}
                            <span className="font-mono tabular-nums">
                              {mission.difficulty}
                            </span>{' '}
                            ·{' '}
                            <span className="font-mono tabular-nums">
                              {mission.estimatedMinutes}
                            </span>{' '}
                            {ui.controls.minutesShort}
                          </span>
                          {rec && (
                            <span className="inline-flex items-center gap-1 font-mono font-bold tabular-nums text-emerald-700 shrink-0">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {rec.scorePct}%
                            </span>
                          )}
                        </div>
                        <h2 className="text-base font-bold text-slate-900 leading-snug">
                          {tLoc(mission.title, lang)}
                        </h2>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {tLoc(mission.briefing, lang)}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => launchMission(mission.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                        >
                          <span>
                            {rec ? ui.controls.resumeMission : ui.controls.startMission}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {mode === 'academy' && (
            <AcademyView
              lessons={ALL_LESSONS}
              completedLessons={activeProfile.completedLessons}
              lang={lang}
              ui={ui}
              onMasterLesson={handleLessonMastered}
            />
          )}

          {mode === 'visual_drill' && (
            <VisualDrillView
              challenges={ALL_CHALLENGES}
              completedChallenges={activeProfile.completedChallenges}
              lang={lang}
              ui={ui}
              onSolveChallenge={handleChallengeSolved}
            />
          )}

          {mode === 'challenge' && (
            <ChallengeArenaView
              incomingChallenge={incomingChallenge}
              onClearIncomingChallenge={handleClearIncomingChallenge}
              playerName={activeProfile.name}
              lang={lang}
              ui={ui}
              onCompleteArena={handleArenaComplete}
            />
          )}

          {mode === 'clinic' && (
            <ClinicView
              profile={activeProfile}
              missions={ALL_MISSIONS}
              weakestCategory={weakestCategory}
              categoryPct={categoryPct}
              lang={lang}
              ui={ui}
              onLaunchMission={launchMission}
              onResolveMistake={handleResolveMistake}
            />
          )}

          {mode === 'profile' && (
            <ProfileDashboard
              store={store}
              activeProfile={activeProfile}
              categoryPct={categoryPct}
              globalPct={globalPct}
              missions={ALL_MISSIONS}
              lang={lang}
              ui={ui}
              onSwitchProfile={handleSwitchProfile}
              onCreateProfile={handleCreateProfile}
              onRenameProfile={handleRenameProfile}
              onDeleteProfile={handleDeleteProfile}
              onImportStore={handleImportStore}
            />
          )}
        </section>

        {/* Ad Slot #1 (Between Simulator & Editorial SEO — Zero Overlap, CLS-Reserved) */}
        <MediaNetAdSlot
          slotId="survivalcue-medianet-top"
          label={ui.adLabel}
          variant="leaderboard"
        />

        {/* Contextual 72-Hour Emergency Gear Reference */}
        <GearShowcase ui={ui} />

        {/* Editorial SEO Knowledge Pillars & FAQ */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {ui.editorial.title}
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {ui.editorial.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-slate-100">
            {ui.editorial.pillars.map((pillar, idx) => (
              <article key={idx} className="space-y-1.5">
                <h3 className="text-sm font-bold text-slate-900">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.body}</p>
              </article>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-base font-bold text-slate-900">{ui.editorial.faqTitle}</h3>
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg">
              {ui.editorial.faqs.map((faq, idx) => {
                const open = openFaqIdx === idx;
                return (
                  <div key={idx} className="p-4">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(open ? null : idx)}
                      className="w-full flex items-center justify-between gap-4 text-left text-sm font-semibold text-slate-900 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${
                          open ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {open && (
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ad Slot #2 (Page Bottom — CLS-Reserved) */}
        <MediaNetAdSlot
          slotId="survivalcue-medianet-bottom"
          label={ui.adLabel}
          variant="rectangle"
        />
      </main>

      {/* Footer with Educational & Life-Safety Disclaimer */}
      <footer className="bg-white border-t border-slate-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-3">
          <div className="text-xs font-bold text-slate-800">
            {ui.footer.disclaimerTitle}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-4xl">
            {ui.footer.disclaimerBody}
          </p>
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              {ui.brandName} · {CANONICAL_ORIGIN}
            </span>
            <span>{ui.footer.canonicalNotice}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
