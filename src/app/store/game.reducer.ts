import {BattleUnitName, Score} from '../models';
import {createReducer, on} from '@ngrx/store';
import * as GameActions from './game.actions';

export interface GameState {
  battleUnitName: BattleUnitName;
  score: Score;
  peopleTotal: number;
  starshipsTotal: number;
  peopleLoading: boolean;
  starshipsLoading: boolean;
  error: string;
}

const initialState: GameState = {
  battleUnitName: null,
  score: {
    player1: 0,
    player2: 0
  },
  peopleTotal: null,
  starshipsTotal: null,
  peopleLoading: false,
  starshipsLoading: false,
  error: null
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
  })),
  on(GameActions.getPeopleTotal, (state) => ({
    ...state,
    peopleLoading: true,
    error: null
  })),
  on(GameActions.getPeopleTotalFailure, (state, {error}) => ({
    ...state,
    peopleLoading: false,
    error
  })),
  on(GameActions.getPeopleTotalSuccess, (state, {peopleTotal}) => ({
    ...state,
    peopleTotal,
    peopleLoading: false,
    error: null
  })),
  on(GameActions.getStarshipsTotal, (state) => ({
    ...state,
    starshipsLoading: true,
    error: null
  })),
  on(GameActions.getStarshipsTotalFailure, (state, {error}) => ({
    ...state,
    starshipsLoading: false,
    error
  })),
  on(GameActions.getStarshipsTotalSuccess, (state, {starshipsTotal}) => ({
    ...state,
    starshipsTotal,
    starshipsLoading: false,
    error: null
  }))
);

export function gameReducer(
  state: GameState,
  actions: GameActions.GameActionsUnion
) {
  return reducer(state, actions);
}
