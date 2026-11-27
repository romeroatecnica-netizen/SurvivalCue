import type {CategoryId, MissionScenario} from '../types';
import {ALL_CHALLENGES as BASE_CHALLENGES} from './challenges';
import {HARD_DECISION_TRIALS, HARD_VISUAL_TRIALS} from './hardTrials';
import {ALL_LESSONS} from './lessons';
import {BLACKOUT_MISSIONS} from './scenariosBlackout';
import {DISASTER_MISSIONS} from './scenariosDisaster';
import {URBAN_MISSIONS} from './scenariosUrban';
import {WILDERNESS_MISSIONS} from './scenariosWilderness';

export const ALL_MISSIONS: MissionScenario[] = [
  ...BLACKOUT_MISSIONS,
  ...DISASTER_MISSIONS,
  ...URBAN_MISSIONS,
  ...WILDERNESS_MISSIONS,
];

export const CATEGORY_TOTALS: Record<CategoryId, number> = {
  blackout: BLACKOUT_MISSIONS.length,
  disaster: DISASTER_MISSIONS.length,
  urban: URBAN_MISSIONS.length,
  wilderness: WILDERNESS_MISSIONS.length,
};

export const ALL_CHALLENGES = [...BASE_CHALLENGES, ...HARD_VISUAL_TRIALS];

export {ALL_LESSONS, HARD_DECISION_TRIALS, HARD_VISUAL_TRIALS};
