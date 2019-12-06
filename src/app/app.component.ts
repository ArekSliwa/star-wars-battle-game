import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BattleUnitSwitcherDialogContainerComponent} from './containers';
import {Store} from '@ngrx/store';
import * as fromGame from 'store/index';
import {Observable, zip} from 'rxjs';
import {Score} from 'models/score.model';
import {map, tap} from 'rxjs/operators';
import {ArrangeBattleService} from './services/arrange-battle.service';
import {FightPayloadModel} from 'models/fight-payload.model';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  score$: Observable<Score> = this.store.select(fromGame.selectScore);

  allUnitsResourcesLoaded$: Observable<boolean> = zip(
    this.store.select(fromGame.selectAllPeopleLoaded),
    this.store.select(fromGame.selectAllStarshipsLoaded),
  ).pipe(
    map(([peopleLoaded, starshipsLoaded]: [boolean, boolean]) => peopleLoaded && starshipsLoaded),
    tap((isLoaded) => !isLoaded || this.openBattleUnitSwitcherDialog())
  );

  unitsToFight$: Observable<FightPayloadModel> = this.arrangeBattleService.getUnitsToFight();

  constructor(
    public dialog: MatDialog,
    private store: Store<{}>,
    private arrangeBattleService: ArrangeBattleService
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

  onFightClick() {
    this.arrangeBattleService.startFight();
  }
}
