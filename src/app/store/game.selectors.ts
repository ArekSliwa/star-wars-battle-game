import {createFeatureSelector, createSelector} from '@ngrx/store';
import {GameState} from './game.reducer';

export const sliceKey = 'game';

export const selectGameSlice = createFeatureSelector<GameState>(sliceKey);

export const selectBattleUnit = createSelector(
  selectGameSlice,
  (state: GameState) => !!state && state.battleUnitName
);
