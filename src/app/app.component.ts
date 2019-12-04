import {ChangeDetectionStrategy, Component, EventEmitter, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BattleUnitSwitcherDialogContainerComponent} from './containers';
import {Store} from '@ngrx/store';
import * as fromGame from 'store/index';
import {Observable, Subject, zip} from 'rxjs';
import {Score} from 'models/score.model';
import {PeopleApiService, StarshipsApiService} from 'api/index';
import {exhaustMap, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {BattleUnitName} from 'models/battle-unit.model';
import {getRandomInt} from 'shared/util';
import {UNIT_BATTLE_PROP_NAME} from 'models/index';

@Component({
  selector: 'sw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  score$: Observable<Score> = this.store.select(fromGame.selectScore);

  unitsloaded$: Observable<boolean> = zip(
    this.store.select(fromGame.selectAllPeopleLoaded),
    this.store.select(fromGame.selectAllStarshipsLoaded),
  ).pipe(
    map(([peopleLoaded, starshipsLoaded]: [boolean, boolean]) => peopleLoaded && starshipsLoaded),
    tap((isLoaded) => !isLoaded || this.openBattleUnitSwitcherDialog())
  );

  selectedBattleUnit$: Observable<BattleUnitName | ''> = this.store.select(fromGame.selectBattleUnitName);

  // TODO add typings
  fightClick$: Subject<any> = new Subject<any>();

  // TODO add typings
  unitsIdsToFight$ = this.fightClick$.pipe(
    withLatestFrom(this.selectedBattleUnit$),
    // TODO do something with this 'nothing' below
    switchMap(([nothing, selectedBattleUnit]) => {
      return this.store.select(fromGame[`select${selectedBattleUnit}Ids`]);
    }),
    map((ids: string[]) => {
      const player1UnitId = ids[getRandomInt(0, ids.length)];
      console.log(ids);
      console.log(player1UnitId)
      return {
        player1: player1UnitId,
        player2: null,
        ids: ids.filter((id) => id !== player1UnitId)
      };
    }),
    map(({player1, player2, ids}) => ({
      player1,
      player2: ids[getRandomInt(0, ids.length)]
    })),
    tap((playersUnitIds) => console.log(playersUnitIds))
  );

  // TODO add typings
  unitsToFight$ = this.unitsIdsToFight$.pipe(
    withLatestFrom(this.selectedBattleUnit$),
    switchMap(([playersUnitIds, selectedBattleUnitName]) => {
      return this.store.select(fromGame[`select${selectedBattleUnitName}Entities`]).pipe(
        map((entities) => ({
          player1: entities[playersUnitIds.player1],
          player2: entities[playersUnitIds.player2],
          battleUnitProp: UNIT_BATTLE_PROP_NAME[selectedBattleUnitName]
        }))
      );
    }),
    tap((units) => console.log(units))
  );


  constructor(
    public dialog: MatDialog,
    private store: Store<{}>,
    private peopleApi: PeopleApiService,
    private starshipsApi: StarshipsApiService
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
    this.fightClick$.next();
  }
}
