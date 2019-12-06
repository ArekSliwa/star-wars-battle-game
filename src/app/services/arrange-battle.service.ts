import {Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subject, Subscription} from 'rxjs';
import {Score} from 'models/score.model';
import * as fromGame from 'store/index';
import {BattleUnitName} from 'models/battle-unit.model';
import {filter, map, shareReplay, switchMap, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {getRandomInt} from 'shared/util';
import {UNIT_BATTLE_PROP_NAME} from 'models/unit-battle-prop-name.model';
import {FightPayloadModel, FightUnitsIds} from 'models/fight-payload.model';

@Injectable({
  providedIn: 'root'
})
export class ArrangeBattleService implements OnDestroy {

  private destroyed$: Subject<void> = new Subject<void>();

  private score$: Observable<Score> = this.store.select(fromGame.selectScore);

  private selectedBattleUnitName$: Observable<BattleUnitName | ''> = this.store.select(fromGame.selectBattleUnitName);

  private letFight: Subject<void> = new Subject<void>();

  private unitIdsToFight$: Observable<FightUnitsIds> = this.letFight.pipe(
    withLatestFrom(this.selectedBattleUnitName$),
    switchMap(([ _, selectedBattleUnitName ]) => {
      return this.store.select(fromGame[`select${selectedBattleUnitName}Ids`]);
    }),
    // get unit id for player one
    map((ids: string[]) => {
      const player1UnitId = ids[getRandomInt(0, ids.length)];
      return {
        player1UnitId,
        ids: ids.filter((id) => id !== player1UnitId)
      };
    }),
    // get unit id for player two
    map(({player1UnitId, ids}) => ({
      player1UnitId,
      player2UnitId: ids[getRandomInt(0, ids.length)]
    })),
  );

  private unitsToFight$: Observable<FightPayloadModel> = this.unitIdsToFight$.pipe(
    withLatestFrom(this.selectedBattleUnitName$),
    switchMap(([unitsIdsToFight, selectedBattleUnitName]: [FightUnitsIds, BattleUnitName]) => {
      return this.store.select(fromGame[`select${selectedBattleUnitName}Entities`]).pipe(
        map((entities) => ({
          player1Unit: entities[unitsIdsToFight.player1UnitId],
          player2Unit: entities[unitsIdsToFight.player2UnitId],
          battleUnitProp: UNIT_BATTLE_PROP_NAME[selectedBattleUnitName]
        }))
      );
    }),
    shareReplay(1)
  );

  compareUnits$: Subscription = this.unitsToFight$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.score$),
    map(([{player1Unit, player2Unit, battleUnitProp}, currentScore]: [FightPayloadModel, Score]) => ({
      player1Value: Number(player1Unit[battleUnitProp].replace(',', '.')),
      player2Value: Number(player2Unit[battleUnitProp].replace(',', '.')),
      currentScore
    })),
    filter(({player1Value, player2Value}) => player1Value !== player2Value),
    tap(({player1Value, player2Value, currentScore}) => {
      this.store.dispatch(fromGame.updateScore({
        score: {
          ...currentScore,
          player1: player1Value > player2Value ? currentScore.player1 + 1 : currentScore.player1,
          player2: player1Value < player2Value ? currentScore.player2 + 1 : currentScore.player2,
        }
      }));
    }),
  ).subscribe(); // TODO unsubscribe

  constructor(private store: Store<{}>) { }

  getUnitsToFight(): Observable<FightPayloadModel> {
    return this.unitsToFight$;
  }

  startFight(): void {
    this.letFight.next();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
