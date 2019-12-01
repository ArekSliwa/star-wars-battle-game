import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BattleUnitSwitcherDialogContainerComponent} from './containers';
import {Store} from '@ngrx/store';
import * as fromGame from 'store/index';
import {Observable} from 'rxjs';
import {Score} from 'models/score.model';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  score$: Observable<Score> = this.store.select(fromGame.selectScore);

  constructor(public dialog: MatDialog, private store: Store<{}>) {}

  ngOnInit() {
    this.openBattleUnitSwitcherDialog();
  }

  openBattleUnitSwitcherDialog() {
    this.dialog.open(BattleUnitSwitcherDialogContainerComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
