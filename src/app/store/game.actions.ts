import {createAction, props, union} from '@ngrx/store';
import {BattleUnitName} from '../models';

const actionTypeGroupKey = 'Game';

export const changeBattleUnit = createAction(
  `[${actionTypeGroupKey}] Battle Unit Change`,
  props<{battleUnitName: BattleUnitName}>()
);

const all = union({
  changeBattleUnit
});

export type GameActionsUnion = typeof all;
