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
import {MatButtonModule, MatButtonToggleModule, MatDialogModule} from '@angular/material';
import * as fromGame from 'store/index';
import {BattleUnitSwitcherComponent} from './components';
import {BattleUnitSwitcherDialogContainerComponent} from './containers';
import {SwDirectivesModule} from 'shared/directives/directives.module';
import { ScoreComponent } from './components/score/score.component';


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
  MatButtonToggleModule
];

const swModules = [
  SwIconModule,
  SwDirectivesModule
];

@NgModule({
  declarations: [
    AppComponent,
    BattleUnitSwitcherComponent,
    BattleUnitSwitcherDialogContainerComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule,
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
    EffectsModule.forRoot([]),
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
