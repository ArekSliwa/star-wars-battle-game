import {createAction, props, union} from '@ngrx/store';
import {BattleUnitName, Score} from '../models';

const actionTypeGroupKey = 'Game';

export const changeBattleUnit = createAction(
  `[${actionTypeGroupKey}] Battle Unit Change`,
  props<{battleUnitName: BattleUnitName}>()
);

export const updateScore = createAction(
  `[${actionTypeGroupKey}] Update Score`,
  props<{score: Score}>()
);

export const getPeopleTotal = createAction(
  `[${actionTypeGroupKey}] API - Get People Total`
);

export const getPeopleTotalFailure = createAction(
  `[${actionTypeGroupKey}] API - Get People Total Failure`,
  props<{ error: string }>()
);

export const getPeopleTotalSuccess = createAction(
  `[${actionTypeGroupKey}] API - Get People Total Success`,
  props<{ peopleTotal: number }>()
);

export const getStarshipsTotal = createAction(
  `[${actionTypeGroupKey}] API - Get Starships Total`
);

export const getStarshipsTotalFailure = createAction(
  `[${actionTypeGroupKey}] API - Get Starships Total Failure`,
  props<{ error: string }>()
);

export const getStarshipsTotalSuccess = createAction(
  `[${actionTypeGroupKey}] API - Get Starships Total Success`,
  props<{ starshipsTotal: number }>()
);

const all = union({
  changeBattleUnit,
  updateScore,
  getPeopleTotal,
  getPeopleTotalFailure,
  getPeopleTotalSuccess,
  getStarshipsTotal,
  getStarshipsTotalFailure,
  getStarshipsTotalSuccess
});

export type GameActionsUnion = typeof all;
