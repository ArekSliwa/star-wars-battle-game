import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BattleUnitSwitcherDialogContainerComponent} from '..';
import * as fromGame from 'store/index';
import {Store} from '@ngrx/store';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'sw-game-options-container',
  templateUrl: './game-options.container.html',
  styleUrls: ['./game-options.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOptionsContainerComponent {
  constructor(
    private store: Store<{}>,
    public dialog: MatDialog,
  ) {

  }

  openBattleUnitSwitcherDialog() {
    this.dialog.open(BattleUnitSwitcherDialogContainerComponent, {
      height: '400px',
      width: '600px',
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
