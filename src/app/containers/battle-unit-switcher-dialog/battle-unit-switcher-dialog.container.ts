import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BattleUnitName, Score} from 'models/index';
import * as fromGame from 'store/index';
import {MatDialogRef} from '@angular/material';
import {Observable, Subject} from 'rxjs';
import {filter, map, startWith, takeUntil, tap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'sw-battle-unit-switcher-dialog-container',
  templateUrl: './battle-unit-switcher-dialog.container.html',
  styleUrls: ['./battle-unit-switcher-dialog.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleUnitSwitcherDialogContainerComponent implements OnDestroy {

  destroyed$: Subject<void> = new Subject<void>();

  // TODO: check why '' is needed below
  battleUnitName$: Observable<BattleUnitName | ''> = this.store.select(fromGame.selectBattleUnitName);

  score$: Observable<Score> = this.store.select(fromGame.selectScore);

  battleUnitClick$: Subject<BattleUnitName> = new Subject<BattleUnitName>();

  playClick$: Subject<Score> = new Subject<Score>();

  battleUnitChange$: Observable<boolean> = this.battleUnitClick$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.battleUnitName$),
    map(([battleUnitName, previousBattleUnitName]: [BattleUnitName, BattleUnitName]) => {
      return battleUnitName !== previousBattleUnitName;
    }),
    startWith(false)
  );

  startNewGame$ = this.playClick$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.score$, this.battleUnitClick$),
    tap(([resetedScore, currentScore, battleUnitName]) => {
      // set name of battle unit before new game:
      this.store.dispatch(fromGame.changeBattleUnit({battleUnitName}));
    }),
    filter(([resetedScore, currentScore]) =>
      Object.entries(resetedScore).toString() !== Object.entries(currentScore).toString()),
    // and if current score not 0 : 0 then reset score before new game:
    map(([resetedScore, currentScore]) => {
      this.store.dispatch(fromGame.updateScore({ score: resetedScore }));
    })
  ).subscribe();

  constructor(public dialogRef: MatDialogRef<BattleUnitSwitcherDialogContainerComponent>,
              private store: Store<{}>) {
  }

  onBattleUnitClick(battleUnitName: BattleUnitName) {
    this.battleUnitClick$.next(battleUnitName);
  }

  onPlayClick() {
    const resetedScore: Score = {
      player1: 0,
      player2: 0
    };
    this.playClick$.next(resetedScore);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
