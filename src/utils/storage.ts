import type {
  CategoryId,
  MissedDecisionRecord,
  MissionCompletionRecord,
  ProgressStore,
  UserProfile,
} from '../types';

const STORAGE_KEY = 'survivalcue_progress_v1';

export function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayIsoDate(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function createDefaultProfile(name = 'Field Operator'): UserProfile {
  const today = getTodayIsoDate();
  return {
    id: `prof-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    name,
    createdAt: new Date().toISOString(),
    xp: 0,
    streakDays: 1,
    lastActiveDate: today,
    completedMissions: {},
    completedLessons: [],
    completedChallenges: [],
    missedDecisions: {},
    unlockedBadges: [],
    preferredTimedMode: false,
  };
}

export function loadProgressStore(): ProgressStore {
  if (typeof window === 'undefined') {
    const fallback = createDefaultProfile();
    return {version: 1, activeProfileId: fallback.id, profiles: [fallback]};
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = createDefaultProfile();
      const store: ProgressStore = {version: 1, activeProfileId: initial.id, profiles: [initial]};
      saveProgressStore(store);
      return store;
    }
    const parsed = JSON.parse(raw) as ProgressStore;
    if (!parsed || !Array.isArray(parsed.profiles) || parsed.profiles.length === 0) {
      throw new Error('Empty store');
    }
    const validActive = parsed.profiles.some((p) => p.id === parsed.activeProfileId)
      ? parsed.activeProfileId
      : parsed.profiles[0].id;
    return {
      version: 1,
      activeProfileId: validActive,
      profiles: parsed.profiles,
    };
  } catch {
    const initial = createDefaultProfile();
    return {version: 1, activeProfileId: initial.id, profiles: [initial]};
  }
}

export function saveProgressStore(store: ProgressStore): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Ignore quota errors cleanly
  }
}

export function touchStreak(profile: UserProfile): UserProfile {
  const today = getTodayIsoDate();
  if (profile.lastActiveDate === today) {
    return profile;
  }
  const yesterday = getYesterdayIsoDate();
  const nextStreak = profile.lastActiveDate === yesterday ? profile.streakDays + 1 : 1;
  return {
    ...profile,
    streakDays: nextStreak,
    lastActiveDate: today,
  };
}

export function evaluateBadges(profile: UserProfile): string[] {
  const badges = new Set(profile.unlockedBadges);
  const missions = Object.values(profile.completedMissions);

  const countByCat = (cat: CategoryId) => missions.filter((m) => m.category === cat).length;

  if (countByCat('blackout') >= 4) badges.add('badge-blackout-72h');
  if (countByCat('disaster') >= 4) badges.add('badge-seismic-calm');
  if (countByCat('wilderness') >= 4) badges.add('badge-water-alchemist');
  if (countByCat('urban') >= 4) badges.add('badge-urban-responder');
  if (profile.completedChallenges.length >= 5) badges.add('badge-topo-reader');
  if (profile.streakDays >= 7 || profile.xp >= 600) badges.add('badge-streak-7');
  if (profile.completedLessons.length >= 7) badges.add('badge-academy-scholar');
  if (missions.some((m) => m.scorePct === 100)) badges.add('badge-perfect-run');
  if (missions.length >= 12) badges.add('badge-clinic-healer');
  if (
    profile.xp >= 1200 &&
    countByCat('blackout') >= 1 &&
    countByCat('disaster') >= 1 &&
    countByCat('urban') >= 1 &&
    countByCat('wilderness') >= 1
  ) {
    badges.add('badge-commander');
  }

  return Array.from(badges);
}

export function recordMissionCompletion(
  profile: UserProfile,
  record: MissionCompletionRecord,
  newMissed: MissedDecisionRecord[]
): UserProfile {
  const touched = touchStreak(profile);
  const previous = touched.completedMissions[record.missionId];
  const xpGain = previous ? 45 + Math.round(record.scorePct * 0.4) : 110 + Math.round(record.scorePct * 0.9);

  const nextMissed = {...touched.missedDecisions};
  // Remove resolved misses from this mission if user scored optimally on them
  for (const key of Object.keys(nextMissed)) {
    if (key.startsWith(`${record.missionId}::`)) {
      delete nextMissed[key];
    }
  }
  for (const miss of newMissed) {
    nextMissed[miss.id] = miss;
  }

  const bestRecord: MissionCompletionRecord =
    previous && previous.scorePct > record.scorePct
      ? {...record, scorePct: previous.scorePct, optimalCount: Math.max(previous.optimalCount, record.optimalCount)}
      : record;

  const updated: UserProfile = {
    ...touched,
    xp: touched.xp + xpGain,
    completedMissions: {
      ...touched.completedMissions,
      [record.missionId]: bestRecord,
    },
    missedDecisions: nextMissed,
  };

  return {
    ...updated,
    unlockedBadges: evaluateBadges(updated),
  };
}

export function recordLessonCompletion(profile: UserProfile, lessonId: string): UserProfile {
  const touched = touchStreak(profile);
  const already = touched.completedLessons.includes(lessonId);
  const updated: UserProfile = {
    ...touched,
    xp: touched.xp + (already ? 15 : 65),
    completedLessons: already ? touched.completedLessons : [...touched.completedLessons, lessonId],
  };
  return {
    ...updated,
    unlockedBadges: evaluateBadges(updated),
  };
}

export function recordChallengeCompletion(profile: UserProfile, challengeId: string): UserProfile {
  const touched = touchStreak(profile);
  const already = touched.completedChallenges.includes(challengeId);
  const updated: UserProfile = {
    ...touched,
    xp: touched.xp + (already ? 10 : 45),
    completedChallenges: already
      ? touched.completedChallenges
      : [...touched.completedChallenges, challengeId],
  };
  return {
    ...updated,
    unlockedBadges: evaluateBadges(updated),
  };
}

export function resolveMistakeRecord(profile: UserProfile, mistakeId: string): UserProfile {
  const touched = touchStreak(profile);
  const nextMissed = {...touched.missedDecisions};
  delete nextMissed[mistakeId];
  const updated: UserProfile = {
    ...touched,
    xp: touched.xp + 20,
    missedDecisions: nextMissed,
  };
  return {
    ...updated,
    unlockedBadges: evaluateBadges(updated),
  };
}

export function getRankIndex(xp: number): number {
  if (xp >= 1800) return 4;
  if (xp >= 1100) return 3;
  if (xp >= 550) return 2;
  if (xp >= 180) return 1;
  return 0;
}

export function computeMasteryStats(
  profile: UserProfile,
  totalsByCategory: Record<CategoryId, number>,
  totalLessons: number,
  totalChallenges: number
): {
  categoryPct: Record<CategoryId, number>;
  globalPct: number;
  weakestCategory: CategoryId;
} {
  const cats: CategoryId[] = ['blackout', 'disaster', 'urban', 'wilderness'];
  const completedMissions = Object.values(profile.completedMissions);

  const categoryPct = {} as Record<CategoryId, number>;
  let weakestCategory: CategoryId = 'blackout';
  let lowestVal = 101;

  for (const cat of cats) {
    const total = Math.max(1, totalsByCategory[cat]);
    const done = completedMissions.filter((m) => m.category === cat);
    const weightedSum = done.reduce((acc, m) => acc + Math.max(0.5, m.scorePct / 100), 0);
    const pct = Math.min(100, Math.round((weightedSum / total) * 100));
    categoryPct[cat] = pct;
    if (pct < lowestVal) {
      lowestVal = pct;
      weakestCategory = cat;
    }
  }

  const totalMissions = Math.max(
    1,
    cats.reduce((acc, c) => acc + totalsByCategory[c], 0)
  );
  const missionPart = (completedMissions.length / totalMissions) * 65;
  const lessonPart = (profile.completedLessons.length / Math.max(1, totalLessons)) * 20;
  const challengePart = (profile.completedChallenges.length / Math.max(1, totalChallenges)) * 15;
  const globalPct = Math.min(100, Math.round(missionPart + lessonPart + challengePart));

  return {categoryPct, globalPct, weakestCategory};
}

export function validateImportedStore(rawJson: string): ProgressStore | null {
  try {
    const parsed = JSON.parse(rawJson) as Partial<ProgressStore>;
    if (!parsed || !Array.isArray(parsed.profiles) || parsed.profiles.length === 0) {
      return null;
    }
    const sanitizedProfiles: UserProfile[] = [];
    for (const p of parsed.profiles) {
      if (!p || typeof p.id !== 'string' || typeof p.name !== 'string') continue;
      sanitizedProfiles.push({
        id: p.id,
        name: p.name.slice(0, 40),
        createdAt: typeof p.createdAt === 'string' ? p.createdAt : new Date().toISOString(),
        xp: typeof p.xp === 'number' && p.xp >= 0 ? Math.floor(p.xp) : 0,
        streakDays: typeof p.streakDays === 'number' && p.streakDays >= 1 ? Math.floor(p.streakDays) : 1,
        lastActiveDate: typeof p.lastActiveDate === 'string' ? p.lastActiveDate : getTodayIsoDate(),
        completedMissions:
          p.completedMissions && typeof p.completedMissions === 'object' ? p.completedMissions : {},
        completedLessons: Array.isArray(p.completedLessons) ? p.completedLessons : [],
        completedChallenges: Array.isArray(p.completedChallenges) ? p.completedChallenges : [],
        missedDecisions:
          p.missedDecisions && typeof p.missedDecisions === 'object' ? p.missedDecisions : {},
        unlockedBadges: Array.isArray(p.unlockedBadges) ? p.unlockedBadges : [],
        preferredTimedMode: Boolean(p.preferredTimedMode),
      });
    }
    if (sanitizedProfiles.length === 0) return null;
    const activeId = sanitizedProfiles.some((p) => p.id === parsed.activeProfileId)
      ? (parsed.activeProfileId as string)
      : sanitizedProfiles[0].id;
    return {
      version: 1,
      activeProfileId: activeId,
      profiles: sanitizedProfiles,
    };
  } catch {
    return null;
  }
}
