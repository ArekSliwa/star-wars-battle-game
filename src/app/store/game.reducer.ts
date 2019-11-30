import {BattleUnitName} from '../models';
import {createReducer, on} from '@ngrx/store';
import * as GameActions from './game.actions';

export interface GameState {
  battleUnitName: BattleUnitName;
}

const initialState: GameState  = {
  battleUnitName: null
};

const reducer = createReducer(
  initialState,
  on(GameActions.changeBattleUnit, (state, {battleUnitName}) => ({
    ...state,
    battleUnitName
  }))
);

export function gameReducer(
  state: GameState,
  actions: GameActions.GameActionsUnion
) {
  return reducer(state, actions);
}
