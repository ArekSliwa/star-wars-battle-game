import {ChangeDetectionStrategy, Component} from '@angular/core';
import {battleUnitSwitcherDialogConfig, BattleUnitSwitcherDialogContainerComponent} from '..';
import * as fromGame from 'store/index';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material';
import {map} from 'rxjs/operators';
import {ROUND_STAGE} from 'models/round-stage.model';

@Component({
  selector: 'sw-game-options-container',
  templateUrl: './game-options.container.html',
  styleUrls: ['./game-options.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOptionsContainerComponent {

  isRoundStandBy$ = this.store.select(fromGame.selectRoundStage).pipe(
    map((roundStage: ROUND_STAGE) => roundStage === ROUND_STAGE.STAND_BY ? true : false)
  );

  constructor(
    private store: Store<{}>,
    public dialog: MatDialog,
  ) {

  }

  openBattleUnitSwitcherDialog() {
    this.dialog.open(BattleUnitSwitcherDialogContainerComponent, {
      ...battleUnitSwitcherDialogConfig
    });
  }

  resetCurrentGame() {
    this.store.dispatch(fromGame.updateScore({
      score: {
        player1: 0,
        player2: 0
      }
    }));
  }
}
