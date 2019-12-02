import {BattleUnitName, Score} from '../models';
import {createReducer, on} from '@ngrx/store';
import * as GameActions from './game.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {PersonUI} from 'models/index';


export const peopleAdapter = createEntityAdapter<PersonUI>({
  selectId: (person) => parseInt(person.url.substring(person.url.indexOf('people') + 7), 10)
});

export interface PeopleState extends EntityState<PersonUI> {
  loading: boolean;
  loaded: boolean;
  error: any | null;
}

const peopleInitialState = peopleAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});

export interface GameState {
  battleUnitName: BattleUnitName;
  score: Score;
  starshipsTotal: number;
  starshipsLoading: boolean;
  people: PeopleState;
  error: string;
}

const initialState: GameState = {
  battleUnitName: null,
  score: {
    player1: 0,
    player2: 0
  },
  starshipsTotal: null,
  starshipsLoading: false,
  people: peopleInitialState,
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
  on(GameActions.getPeople, (state) => ({
    ...state,
    people: {
      ...state.people,
      loading: true,
      error: null
    }
  })),
  on(GameActions.getPeopleFailure, (state, {error}) => ({
    ...state,
    people: {
      ...state.people,
      loading: false,
      error
    }
  })),
  on(GameActions.getPeopleSuccess, (state, {people}) => ({
    ...state,
    people: peopleAdapter.upsertMany(people || [], {
      ...state.people,
      loading: false,
      loaded: true,
      error: null
    })
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
