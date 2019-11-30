import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BattleUnitName} from 'models/battle-unit.model';
import {Store} from '@ngrx/store';
import * as fromGame from 'store/index';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private store: Store<{}>) {

  }
  onBattleUnitClick(battleUnitName: BattleUnitName) {
    this.store.dispatch(fromGame.changeBattleUnit({ battleUnitName }));
  }
}
