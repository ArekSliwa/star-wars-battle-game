import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SwIconModule} from 'shared/icon';
import {ActionReducerMap, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {storeFreeze} from 'ngrx-store-freeze';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import * as fromGame from 'store/index';
import {BattleUnitSwitcherComponent} from './components';
import {BattleUnitSwitcherDialogContainerComponent, GameBoardContainerComponent} from './containers';
import {SwDirectivesModule} from 'shared/directives/directives.module';
import { ScoreComponent } from './components/score/score.component';
import {HttpClientModule} from '@angular/common/http';
import {GameEffects} from 'store/game.effects';
import { GameBoardLayoutComponent } from './components/game-board-layout/game-board-layout.component';
import { GameFightArenaComponent } from './components/game-fight-arena/game-fight-arena.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { GameOptionsContainerComponent } from './containers/game-options/game-options.container';
import { GameHeaderComponent } from './components/game-header/game-header.component';

export interface State {
  game: fromGame.GameState;
}

export const reducers: ActionReducerMap<State> = {
  game: fromGame.gameReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

const matModules = [
  MatButtonModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatCardModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule
];

const swModules = [
  SwIconModule,
  SwDirectivesModule
];

@NgModule({
  declarations: [
    // containers
    AppComponent,
    GameOptionsContainerComponent,
    GameBoardContainerComponent,
    BattleUnitSwitcherDialogContainerComponent,

    // presentational
    BattleUnitSwitcherComponent,
    ScoreComponent,
    GameBoardLayoutComponent,
    GameFightArenaComponent,
    PreloaderComponent,
    GameHeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...swModules,
    ...matModules,
    StoreModule.forRoot(
      reducers,
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true
        }
      }
    ),
    EffectsModule.forRoot([GameEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    BattleUnitSwitcherDialogContainerComponent
  ]
})
export class AppModule {
}
