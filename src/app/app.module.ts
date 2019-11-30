import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SwIconModule} from 'shared/icon';
import {BattleUnitSwitcherComponent} from './components/battle-unit-switcher/battle-unit-switcher.component';
import {ActionReducerMap, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {storeFreeze} from 'ngrx-store-freeze';
import * as fromGame from 'store/index';
import {MatButtonModule} from '@angular/material';


export interface State {
  game: fromGame.GameState;
}

export const reducers: ActionReducerMap<State> = {
  game: fromGame.gameReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];

const matModules = [
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    BattleUnitSwitcherComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SwIconModule,
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
  bootstrap: [AppComponent]
})
export class AppModule {
}
