import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {battleUnitSwitcherDialogConfig, BattleUnitSwitcherDialogContainerComponent} from './containers';
import {Store} from '@ngrx/store';
import * as fromGame from 'store/index';
import {Observable} from 'rxjs';
import {tap, filter} from 'rxjs/operators';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  totalLoadedInPercentage$: Observable<number> = this.store.select(fromGame.selectTotalLoadedInPercentage);

  allResourcesLoaded$: Observable<number> = this.totalLoadedInPercentage$.pipe(
    filter((totalLoadedInPercentage) => totalLoadedInPercentage === 100),
    tap(() => this.openBattleUnitSwitcherDialog())
  );

  constructor(
    private store: Store<{}>,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(fromGame.getPeople({nextPageUrl: '?page=1'}));
    this.store.dispatch(fromGame.getStarships({nextPageUrl: '?page=1'}));
  }

  openBattleUnitSwitcherDialog() {
    this.dialog.open(BattleUnitSwitcherDialogContainerComponent, {
      ...battleUnitSwitcherDialogConfig,
      disableClose: true
    });
  }
}
