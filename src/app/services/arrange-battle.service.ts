import {Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {Score} from 'models/score.model';
import * as fromGame from 'store/index';
import {BattleUnitName} from 'models/battle-unit.model';
import {delay, filter, map, shareReplay, switchMap, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {getRandomInt} from 'shared/util';
import {UNIT_BATTLE_PROP_NAME} from 'models/unit-battle-prop-name.model';
import {FightPayloadModel, FightUnitsIds} from 'models/fight-payload.model';
import {ROUND_STAGE} from 'models/round-stage.model';
import {WinnerTypes} from 'models/winner.model';

@Injectable({
  providedIn: 'root'
})
export class ArrangeBattleService implements OnDestroy {

  private destroyed$: Subject<void> = new Subject<void>();

  private score$: Observable<Score> = this.store.select(fromGame.selectScore);

  private selectedBattleUnitName$: Observable<BattleUnitName | ''> = this.store.select(fromGame.selectBattleUnitName);

  private roundStage$: Observable<ROUND_STAGE> = this.store.select(fromGame.selectRoundStage);

  private startRound: Subject<void> = new Subject<void>();

  private unitIdsToFight$: Observable<FightUnitsIds> = this.startRound.pipe(
    tap(() => this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.PREPARE}))),
    withLatestFrom(this.selectedBattleUnitName$),
    switchMap(([_, selectedBattleUnitName]) => {
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
    tap(() => this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.FLY_IN}))),
    shareReplay(1)
  );

  private compareUnits$: Observable<WinnerTypes> = this.unitsToFight$.pipe(
    // normalize values
    map(({player1Unit, player2Unit, battleUnitProp}: FightPayloadModel) => ({
      player1Value: Number(player1Unit[battleUnitProp].replace(',', '.')),
      player2Value: Number(player2Unit[battleUnitProp].replace(',', '.')),
    })),
    map(({player1Value, player2Value}) => {

      // TODO - refactor
      if (player1Value > player2Value) {
        return 'player1' as WinnerTypes;
      } else if (player1Value < player2Value) {
        return 'player2' as WinnerTypes;
      } else {
        return 'no_winner' as WinnerTypes;
      }
    })

    // // if values are the same, there is no need to update score. TODO animation management in this case
    // filter(({player1Value, player2Value}) => player1Value !== player2Value),
    // compare and update score
    // tap(({player1Value, player2Value, currentScore}) => {
    //   this.store.dispatch(fromGame.updateScore({
    //     score: {
    //       ...currentScore,
    //       player1: player1Value > player2Value ? currentScore.player1 + 1 : currentScore.player1,
    //       player2: player1Value < player2Value ? currentScore.player2 + 1 : currentScore.player2,
    //     }
    //   }));
    // }),
  );
  spreadWinnerToUniverse$ = this.roundStage$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.compareUnits$),
    filter(([roundStage, _]: [ROUND_STAGE, WinnerTypes]) => roundStage === ROUND_STAGE.COMPARE),
    tap(([_, roundWinner]: [ROUND_STAGE, WinnerTypes]) => {
      this.store.dispatch(fromGame.setRoundWinner({roundWinner}));
    })
  ).subscribe();

  updateScore$ = this.roundStage$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.compareUnits$, this.score$),
    filter(([roundStage, winner, currentScore]: [ROUND_STAGE, WinnerTypes, Score]) => roundStage === ROUND_STAGE.SCORE_UPDATE),
    tap(([roundStage, winner, currentScore]: [ROUND_STAGE, WinnerTypes, Score]) => {
      this.store.dispatch(fromGame.updateScore({
        score: {
          ...currentScore,
          player1: winner === 'player1' ? currentScore.player1 + 1 : currentScore.player1,
          player2: winner === 'player2' ? currentScore.player2 + 1 : currentScore.player2
        }
      }));
    }),
    delay(1000),
    tap(() => this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.FLY_OUT})))
  ).subscribe();


  constructor(private store: Store<{}>) {
  }

  getUnitsToFight(): Observable<FightPayloadModel> {
    return this.unitsToFight$;
  }

  startFight(): void {
    this.store.dispatch(fromGame.resetRoundWinner());
    this.startRound.next();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }

}
