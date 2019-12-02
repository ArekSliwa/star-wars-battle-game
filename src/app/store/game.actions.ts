import {createAction, props, union} from '@ngrx/store';
import {BattleUnitName, PersonUI, Score} from 'models/index';

const actionTypeGroupKey = 'Game';

export const changeBattleUnit = createAction(
  `[${actionTypeGroupKey}] Battle Unit Change`,
  props<{battleUnitName: BattleUnitName}>()
);

export const updateScore = createAction(
  `[${actionTypeGroupKey}] Update Score`,
  props<{score: Score}>()
);

export const getPeople = createAction(
  `[${actionTypeGroupKey}] API - Get People`,
  props<{nextPageUrl?: string}>()
);

export const getPeopleFailure = createAction(
  `[${actionTypeGroupKey}] API - Get People Failure`,
  props<{ error: string }>()
);

export const getPeopleSuccess = createAction(
  `[${actionTypeGroupKey}] API - Get People Success`,
  props<{ people: PersonUI[] }>()
);

export const getAllPeopleFinish = createAction(
  `[${actionTypeGroupKey}] API - Get All People Finish`
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
  getPeople,
  getPeopleFailure,
  getPeopleSuccess,
  getAllPeopleFinish,
  getStarshipsTotal,
  getStarshipsTotalFailure,
  getStarshipsTotalSuccess
});

export type GameActionsUnion = typeof all;
