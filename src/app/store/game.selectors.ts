import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GameState} from './game.reducer';

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
