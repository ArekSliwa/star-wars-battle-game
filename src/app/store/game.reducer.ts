import {BattleUnitName, Score} from '../models';
import {createReducer, on} from '@ngrx/store';
import * as GameActions from './game.actions';

export interface GameState {
  battleUnitName: BattleUnitName;
  score: Score;
}

const initialState: GameState  = {
  battleUnitName: null,
  score: {
    player1: 0,
    player2: 0
  }
};

const reducer = createReducer(
  initialState,
  on(GameActions.changeBattleUnit, (state, {battleUnitName}) => ({
    ...state,
    battleUnitName
  })),
  on(GameActions.updateScore, (state, {score}) => ({
    ...state,
    score
  }))
);

export function gameReducer(
  state: GameState,
  actions: GameActions.GameActionsUnion
) {
  return reducer(state, actions);
}
