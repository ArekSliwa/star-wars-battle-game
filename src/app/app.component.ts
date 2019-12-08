import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BattleUnitSwitcherDialogContainerComponent} from './containers';
import {Store} from '@ngrx/store';
import * as fromGame from 'store/index';
import {Observable, zip} from 'rxjs';
import {map, tap, filter} from 'rxjs/operators';

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

    // get totals and divide by page count (10)
  }

  // TODO remove
  openBattleUnitSwitcherDialog() {
    this.dialog.open(BattleUnitSwitcherDialogContainerComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
