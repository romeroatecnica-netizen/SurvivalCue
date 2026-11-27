import type {LangCode} from '../config/seo';
import {ALL_CHALLENGES, ALL_MISSIONS, HARD_DECISION_TRIALS} from '../data';
import type {CategoryId, ChallengePayload, ChallengeTrial} from '../types';

export function hashSeedFNV1a(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function mulberry32(seedNum: number): () => number {
  let a = seedNum >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffleSeeded<T>(items: readonly T[], seedKey: string): T[] {
  const arr = [...items];
  const rng = mulberry32(hashSeedFNV1a(seedKey));
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

export function generateFreshSeed(): string {
  const timePart = Date.now().toString(36).slice(-4).toUpperCase();
  const randPart = Math.floor(1000 + Math.random() * 9000).toString(36).toUpperCase();
  return `SC-${timePart}${randPart}`;
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(encoded: string): string {
  const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4));
  const binary = atob(base64 + pad);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export function encodeChallengeParam(payload: ChallengePayload): string {
  return toBase64Url(JSON.stringify(payload));
}

const VALID_CATEGORIES = new Set<string>(['all', 'blackout', 'disaster', 'urban', 'wilderness']);

export function decodeChallengeParam(rawParam: string): ChallengePayload | null {
  try {
    const jsonStr = fromBase64Url(rawParam.trim());
    const parsed = JSON.parse(jsonStr) as Partial<ChallengePayload>;
    if (!parsed || typeof parsed.seed !== 'string' || parsed.seed.length < 2) {
      return null;
    }
    const category =
      typeof parsed.category === 'string' && VALID_CATEGORIES.has(parsed.category)
        ? (parsed.category as CategoryId | 'all')
        : 'all';
    const count =
      typeof parsed.count === 'number' && parsed.count >= 4 && parsed.count <= 12
        ? Math.round(parsed.count)
        : 6;
    const timerSec =
      typeof parsed.timerSec === 'number' && parsed.timerSec >= 15 && parsed.timerSec <= 60
        ? Math.round(parsed.timerSec)
        : 25;

    return {
      v: 1,
      seed: parsed.seed.slice(0, 24),
      challengerName:
        typeof parsed.challengerName === 'string' && parsed.challengerName.trim()
          ? parsed.challengerName.trim().slice(0, 32)
          : 'Field Operator',
      challengerScore:
        typeof parsed.challengerScore === 'number' &&
        parsed.challengerScore >= 0 &&
        parsed.challengerScore <= 100
          ? Math.round(parsed.challengerScore)
          : undefined,
      challengerTimeSec:
        typeof parsed.challengerTimeSec === 'number' && parsed.challengerTimeSec >= 0
          ? Math.round(parsed.challengerTimeSec)
          : undefined,
      category,
      count,
      timerSec,
    };
  } catch {
    return null;
  }
}

export function detectIncomingChallenge(): ChallengePayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const param = params.get('c') ?? params.get('challenge') ?? params.get('reto');
    if (!param) return null;
    return decodeChallengeParam(param);
  } catch {
    return null;
  }
}

export function buildChallengeShareUrl(payload: ChallengePayload, lang: LangCode): string {
  const encoded = encodeChallengeParam(payload);
  if (typeof window === 'undefined') {
    const langPart = lang === 'en' ? '' : `&lang=${lang}`;
    return `https://survivalcue.bastelar.com/?c=${encoded}${langPart}`;
  }
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set('c', encoded);
  if (lang !== 'en') {
    url.searchParams.set('lang', lang);
  }
  return url.toString();
}

/**
 * Generates a deterministic yet rotating gauntlet of mixed high-difficulty tactical
 * decisions and visual sketch/map trials for a given seed.
 */
export function buildChallengeTrials(
  seed: string,
  category: CategoryId | 'all',
  count: number
): ChallengeTrial[] {
  const matchesCat = (cat: CategoryId) => category === 'all' || cat === category;

  // 1. Nuanced high-difficulty decisions
  const hardDecisionPool: ChallengeTrial[] = HARD_DECISION_TRIALS.filter((t) =>
    matchesCat(t.category)
  ).map((t) => ({
    kind: 'decision',
    id: t.id,
    category: t.category,
    scene: t.scene,
    title: t.title,
    situation: t.situation,
    prompt: t.prompt,
    initialVisual: t.initialVisual,
    hotspots: shuffleSeeded(t.hotspots, `${seed}::${t.id}::spots`),
    options: shuffleSeeded(t.options, `${seed}::${t.id}::opts`),
  }));

  // 2. Hard & standard visual map/diagram spotters
  const visualPool: ChallengeTrial[] = ALL_CHALLENGES.filter((c) =>
    matchesCat(c.category)
  ).map((c) => ({
    kind: 'visual',
    id: c.id,
    category: c.category,
    scene: c.scene,
    title: c.title,
    prompt: c.prompt,
    initialVisual: c.initialVisual,
    hotspots: shuffleSeeded(c.hotspots, `${seed}::${c.id}::vspots`),
    correctHotspotId: c.correctHotspotId,
    explanation: c.explanation,
  }));

  // 3. Harder mission stages (prioritizing difficulty 2-3, plus all if single category)
  const missionStagePool: ChallengeTrial[] = [];
  for (const mission of ALL_MISSIONS) {
    if (!matchesCat(mission.category)) continue;
    if (category === 'all' && mission.difficulty < 2) continue;
    mission.stages.forEach((stage, idx) => {
      const trialId = `${mission.id}::${stage.id}::${idx}`;
      missionStagePool.push({
        kind: 'decision',
        id: trialId,
        category: mission.category,
        scene: mission.scene,
        title: mission.title,
        situation: stage.situation,
        prompt: stage.prompt,
        initialVisual: stage.initialVisual,
        hotspots: shuffleSeeded(stage.hotspots, `${seed}::${trialId}::spots`),
        options: shuffleSeeded(
          stage.options.map((o) => ({
            id: o.id,
            hotspotId: o.hotspotId,
            label: o.label,
            isOptimal: o.isOptimal,
            rationale: o.rationale,
            visualEffect: o.visualEffect,
          })),
          `${seed}::${trialId}::opts`
        ),
      });
    });
  }

  // Shuffle each bucket independently with the seed, then interleave to ensure
  // rotating variety across hard decisions, visual SVG drills, and scenario phases.
  const sHard = shuffleSeeded(hardDecisionPool, `${seed}::bucket-hard`);
  const sVisual = shuffleSeeded(visualPool, `${seed}::bucket-visual`);
  const sStages = shuffleSeeded(missionStagePool, `${seed}::bucket-stages`);

  const combined: ChallengeTrial[] = [];
  const usedIds = new Set<string>();
  const pushUnique = (trial: ChallengeTrial | undefined) => {
    if (!trial || usedIds.has(trial.id) || combined.length >= count) return;
    usedIds.add(trial.id);
    combined.push(trial);
  };

  const maxLen = Math.max(sHard.length, sVisual.length, sStages.length);
  for (let i = 0; i < maxLen && combined.length < count; i += 1) {
    pushUnique(sHard[i]);
    pushUnique(sVisual[i]);
    pushUnique(sStages[i]);
  }

  // Final deterministic ordering of the selected gauntlet
  return shuffleSeeded(combined, `${seed}::final-order`);
}
