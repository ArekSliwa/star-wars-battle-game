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

const all = union({
  changeBattleUnit,
  updateScore
});

export type GameActionsUnion = typeof all;
