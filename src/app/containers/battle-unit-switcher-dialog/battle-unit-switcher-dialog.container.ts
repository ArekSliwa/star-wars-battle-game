import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {BattleUnitName} from 'models/battle-unit.model';
import * as fromGame from 'store/index';
import {MatDialogRef} from '@angular/material';
import {Subject} from 'rxjs';
import {filter, map, takeUntil, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'sw-battle-unit-switcher-dialog-container',
  templateUrl: './battle-unit-switcher-dialog.container.html',
  styleUrls: ['./battle-unit-switcher-dialog.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleUnitSwitcherDialogContainerComponent implements OnDestroy {

  destroyed$: Subject<void> = new Subject<void>();

  battleUnitName$ = this.store.select(fromGame.selectBattleUnitName);

  battleUnitClick$: Subject<BattleUnitName> = new Subject<BattleUnitName>();

  changeBattleUnit$ = this.battleUnitClick$.pipe(
    takeUntil(this.destroyed$),
    withLatestFrom(this.battleUnitName$),
    filter((
      [battleUnitName, previousBattleUnitName]: [BattleUnitName, BattleUnitName]) =>
      battleUnitName !== previousBattleUnitName),
    map(([battleUnitName, previousBattleUnitName]: [BattleUnitName, BattleUnitName]) => {
      this.store.dispatch(fromGame.changeBattleUnit({battleUnitName}));
    })
  ).subscribe();

  constructor(public dialogRef: MatDialogRef<BattleUnitSwitcherDialogContainerComponent>,
              private store: Store<{}>) {
  }

  onBattleUnitClick(battleUnitName: BattleUnitName) {
    this.battleUnitClick$.next(battleUnitName);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
