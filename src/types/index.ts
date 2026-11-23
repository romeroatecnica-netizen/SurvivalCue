import type {LangCode} from '../config/seo';

export type CategoryId = 'blackout' | 'disaster' | 'urban' | 'wilderness';

export type AppMode = 'missions' | 'academy' | 'visual_drill' | 'clinic' | 'profile';

export type SceneTemplateId =
  | 'home-blackout-cutaway'
  | 'topo-evacuation-map'
  | 'road-vehicle-storm'
  | 'wilderness-shelter'
  | 'water-purification'
  | 'rescue-signaling'
  | 'critical-knots'
  | 'kit-72h-pack'
  | 'seismic-structural-map'
  | 'first-aid-triage';

export type LocText = {
  en: string;
  es: string;
} & Partial<Record<LangCode, string>>;

export interface SceneHotspot {
  id: string;
  /** SVG coordinates inside 800x460 viewBox */
  x: number;
  y: number;
  label: LocText;
  role?: 'safe' | 'hazard' | 'utility' | 'route';
  optionIndex?: number;
}

export interface VisualStatePatch {
  activeZoneId?: string;
  safeRouteId?: string;
  hazardZoneId?: string;
  flashlightTarget?: {x: number; y: number} | null;
  nightModeDefault?: boolean;
  windAngleDeg?: number;
  waterLevelPct?: number;
  knotStep?: number;
  kitCompartment?: string;
  statusTag?: LocText;
}

export interface TacticalMeters {
  selfProtection: number; // 0..100
  resources: number; // 0..100
  orientation: number; // 0..100
}

export interface StageOption {
  id: string;
  hotspotId?: string;
  label: LocText;
  summary: LocText;
  isOptimal: boolean;
  scoreDelta: number;
  meterDelta: {
    selfProtection: number;
    resources: number;
    orientation: number;
  };
  rationale: LocText;
  visualEffect: VisualStatePatch;
}

export interface MissionStage {
  id: string;
  title: LocText;
  situation: LocText;
  prompt: LocText;
  initialVisual: VisualStatePatch;
  hotspots: SceneHotspot[];
  options: StageOption[];
}

export interface MissionScenario {
  id: string;
  category: CategoryId;
  scene: SceneTemplateId;
  difficulty: 1 | 2 | 3;
  estimatedMinutes: number;
  title: LocText;
  briefing: LocText;
  initialMeters: TacticalMeters;
  stages: [MissionStage, MissionStage, MissionStage];
}

export interface IllustratedLesson {
  id: string;
  category: CategoryId;
  scene: SceneTemplateId;
  title: LocText;
  subtitle: LocText;
  visualPreset: VisualStatePatch;
  hotspots: SceneHotspot[];
  keyPoints: LocText[];
  microChallenge: {
    question: LocText;
    options: LocText[];
    correctIndex: number;
    explanation: LocText;
  };
}

export interface SketchChallenge {
  id: string;
  category: CategoryId;
  scene: SceneTemplateId;
  title: LocText;
  prompt: LocText;
  initialVisual: VisualStatePatch;
  hotspots: SceneHotspot[];
  correctHotspotId: string;
  explanation: LocText;
}

export interface LayerVisibility {
  hazards: boolean;
  routes: boolean;
  gridCompass: boolean;
  labels: boolean;
}

export interface MissionCompletionRecord {
  missionId: string;
  category: CategoryId;
  scorePct: number;
  optimalCount: number;
  completedAt: string;
  finalMeters: TacticalMeters;
}

export interface MissedDecisionRecord {
  id: string; // `${missionId}::${stageId}`
  missionId: string;
  stageId: string;
  category: CategoryId;
  chosenOptionId: string;
  recordedAt: string;
}

export interface BadgeDefinition {
  id: string;
  iconKey:
    | 'blackout'
    | 'topo'
    | 'seismic'
    | 'water'
    | 'streak'
    | 'hazard'
    | 'knots'
    | 'perfect'
    | 'clinic'
    | 'commander';
  title: LocText;
  description: LocText;
}

export interface UserProfile {
  id: string;
  name: string;
  createdAt: string;
  xp: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedMissions: Record<string, MissionCompletionRecord>;
  completedLessons: string[];
  completedChallenges: string[];
  missedDecisions: Record<string, MissedDecisionRecord>;
  unlockedBadges: string[];
  preferredTimedMode: boolean;
}

export interface ProgressStore {
  version: number;
  activeProfileId: string;
  profiles: UserProfile[];
}

export function tLoc(text: LocText | undefined, lang: LangCode): string {
  if (!text) return '';
  return text[lang] ?? text.en;
}
