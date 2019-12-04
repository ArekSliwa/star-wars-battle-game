import {BattleUnitName, Score} from '../models';
import {createReducer, on} from '@ngrx/store';
import * as GameActions from './game.actions';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {PersonUI} from 'models/index';
import {StarshipUI} from 'models/starship-ui.model';


export const peopleAdapter = createEntityAdapter<PersonUI>({
  selectId: (person) => parseInt(person.url.substring(person.url.indexOf('people') + 7), 10)
});

export interface PeopleState extends EntityState<PersonUI> {
  loading: boolean;
  loaded: boolean;
  loadedAll: boolean;
  error: any | null;
}

const peopleInitialState = peopleAdapter.getInitialState({
  loading: false,
  loaded: false,
  loadedAll: false,
  error: null
});

export const starshipsAdapter = createEntityAdapter<StarshipUI>({
  selectId: (starship) => parseInt(starship.url.substring(starship.url.indexOf('starships') + 10), 10)
});

export interface StarshipsState extends EntityState<StarshipUI> {
  loading: boolean;
  loaded: boolean;
  loadedAll: boolean;
  error: any | null;
}

const starshipsInitialState = starshipsAdapter.getInitialState({
  loading: false,
  loaded: false,
  loadedAll: false,
  error: null
});


export interface GameState {
  battleUnitName: BattleUnitName;
  score: Score;
  people: PeopleState;
  starships: StarshipsState;
}

const initialState: GameState = {
  battleUnitName: null,
  score: {
    player1: 0,
    player2: 0
  },
  people: peopleInitialState,
  starships: starshipsInitialState
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
  on(GameActions.getAllPeopleFinish, (state) => ({
    ...state,
    people: peopleAdapter.removeMany(
      ({mass}) => mass === 'unknown',
      {
        ...state.people,
        loadedAll: true
      }
    )
  })),
  on(GameActions.getStarships, (state) => ({
    ...state,
    starships: {
      ...state.starships,
      loading: true,
      error: null
    }
  })),
  on(GameActions.getStarshipsFailure, (state, {error}) => ({
    ...state,
    starships: {
      ...state.starships,
      loading: false,
      error
    }
  })),
  on(GameActions.getStarshipsSuccess, (state, {starships}) => ({
    ...state,
    starships: starshipsAdapter.upsertMany(starships || [], {
      ...state.starships,
      loading: false,
      loaded: true,
      error: null
    })
  })),
  on(GameActions.getAllStarshipsFinish, (state) => ({
    ...state,
    starships: {
      ...state.starships,
      loadedAll: true
    }
  }))
);

export function gameReducer(
  state: GameState,
  actions: GameActions.GameActionsUnion
) {
  return reducer(state, actions);
}
