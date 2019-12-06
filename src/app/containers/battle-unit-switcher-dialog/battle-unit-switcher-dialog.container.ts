import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {BattleUnitName, Score} from 'models/index';
import * as fromGame from 'store/index';
import {MatDialogRef} from '@angular/material';
import {Observable, Subject, Subscription} from 'rxjs';
import {filter, map, startWith, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {ArrangeBattleService} from '../../services/arrange-battle.service';

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

  battleUnitClick$: Subject<BattleUnitName> = new Subject<BattleUnitName>();

  playClick$: Subject<Score> = new Subject<Score>();

  battleUnitChange$: Observable<boolean> = this.battleUnitClick$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.battleUnitName$),
    map(([newBattleUnitName, previousBattleUnitName]: [BattleUnitName, BattleUnitName]) =>
      newBattleUnitName !== previousBattleUnitName),
    startWith(false)
  );

  startNewGame$: Subscription = this.playClick$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.battleUnitClick$),
    // set name of battle unit before new game:
    tap(([_, battleUnitName]) => {
      this.store.dispatch(fromGame.changeBattleUnit({battleUnitName}));
    }),
    // start first fight TODO refactor
    tap(() => this.arrangeBattleService.startFight())
  ).subscribe();

  constructor(public dialogRef: MatDialogRef<BattleUnitSwitcherDialogContainerComponent>,
              private store: Store<{}>,
              private arrangeBattleService: ArrangeBattleService) {
  }

  onBattleUnitClick(battleUnitName: BattleUnitName): void {
    this.battleUnitClick$.next(battleUnitName);
  }

  onPlayClick(): void {
    this.playClick$.next();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
