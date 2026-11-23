import type {CategoryId, MissionScenario} from '../types';
import {ALL_CHALLENGES} from './challenges';
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

export {ALL_LESSONS, ALL_CHALLENGES};
