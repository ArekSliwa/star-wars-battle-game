import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GameState, peopleAdapter, PeopleState, starshipsAdapter, StarshipsState} from './game.reducer';

export const sliceKey = 'game';

export const selectGameSlice = createFeatureSelector<GameState>(sliceKey);

export const selectBattleUnitName = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.battleUnitName
);

export const selectScore = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.score
);

export const selectRoundStage = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.roundStage
);

export const selectRoundWinner = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.roundWinner
);

export const selectPeopleState = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.people
);

export const {
  selectIds: selectPeopleIds,
  selectEntities: selectPeopleEntities,
  selectAll: selectAllPeople,
  selectTotal: selectPeopleTotal
} = peopleAdapter.getSelectors(selectPeopleState);

export const selectAllPeopleLoaded = createSelector(
  selectPeopleState,
  (state: PeopleState) => !!state && state.loadedAll
);

export const selectStarshipsState = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.starships
);

export const {
  selectIds: selectStarshipsIds,
  selectEntities: selectStarshipsEntities,
  selectAll: selectAllStarships,
  selectTotal: selectStarshipsTotal
} = starshipsAdapter.getSelectors(selectStarshipsState);

export const selectAllStarshipsLoaded = createSelector(
  selectStarshipsState,
  (state: StarshipsState) => !!state && state.loadedAll
);

export const selectTotalLoadedInPercentage = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.totalLoadedInPercentage
)
