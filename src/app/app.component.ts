import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BattleUnitSwitcherDialogContainerComponent} from './containers';
import {Store} from '@ngrx/store';
import * as fromGame from 'store/index';
import {Observable, zip} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  allUnitsResourcesLoaded$: Observable<boolean> = zip(
    this.store.select(fromGame.selectAllPeopleLoaded),
    this.store.select(fromGame.selectAllStarshipsLoaded),
  ).pipe(
    map(([peopleLoaded, starshipsLoaded]: [boolean, boolean]) => peopleLoaded && starshipsLoaded),
    tap((isLoaded) => !isLoaded || this.openBattleUnitSwitcherDialog())
  );

  constructor(
    private store: Store<{}>,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(fromGame.getPeople({nextPageUrl: ''}));
    this.store.dispatch(fromGame.getStarships({nextPageUrl: ''}));
  }

  openBattleUnitSwitcherDialog() {
    this.dialog.open(BattleUnitSwitcherDialogContainerComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
