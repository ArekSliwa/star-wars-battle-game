import {createAction, props, union} from '@ngrx/store';
import {BattleUnitName, PersonUI, ROUND_STAGE, Score, WinnerTypes} from 'models/index';
import {StarshipUI} from 'models/starship-ui.model';

const actionTypeGroupKey = 'Game';

export const changeBattleUnit = createAction(
  `[${actionTypeGroupKey}] Battle Unit Change`,
  props<{ battleUnitName: BattleUnitName }>()
);

export const updateScore = createAction(
  `[${actionTypeGroupKey}] Update Score`,
  props<{ score: Score }>()
);

export const updateRoundStage = createAction(
  `[${actionTypeGroupKey}] Update Round Stage`,
  props<{ roundStage: ROUND_STAGE }>()
);

export const setRoundWinner = createAction(
  `[${actionTypeGroupKey}] Set Round Winner`,
  props<{ roundWinner: WinnerTypes}>()
);

export const resetRoundWinner = createAction(
  `[${actionTypeGroupKey}] Reset Round Winner`,
);

export const getPeople = createAction(
  `[${actionTypeGroupKey}] API - Get People`,
  props<{ nextPageUrl?: string }>()
);

export const getPeopleFailure = createAction(
  `[${actionTypeGroupKey}] API - Get People Failure`,
  props<{ error: string }>()
);

export const getPeopleSuccess = createAction(
  `[${actionTypeGroupKey}] API - Get People Success`,
  props<{ people: PersonUI[], page: number, total: number }>()
);

export const getAllPeopleFinish = createAction(
  `[${actionTypeGroupKey}] API - Get All People Finish`
);

export const getStarships = createAction(
  `[${actionTypeGroupKey}] API - Get Starships`,
  props<{ nextPageUrl?: string }>()
);

export const getStarshipsFailure = createAction(
  `[${actionTypeGroupKey}] API - Get Starships Failure`,
  props<{ error: string }>()
);

export const getStarshipsSuccess = createAction(
  `[${actionTypeGroupKey}] API - Get Starships Success`,
  props<{ starships: StarshipUI[], page: number, total: number }>()
);

export const getAllStarshipsFinish = createAction(
  `[${actionTypeGroupKey}] API - Get All Starships Finish`
);

export const countTotalLoaded = createAction(
  `[${actionTypeGroupKey}] API - Count Total Loaded Resources`,
  props<{ totalLoadedInPercentage: number }>()
);

const all = union({
  changeBattleUnit,
  updateScore,
  updateRoundStage,
  setRoundWinner,
  resetRoundWinner,
  getPeople,
  getPeopleFailure,
  getPeopleSuccess,
  getAllPeopleFinish,
  getStarships,
  getStarshipsFailure,
  getStarshipsSuccess,
  getAllStarshipsFinish,
  countTotalLoaded
});

export type GameActionsUnion = typeof all;
