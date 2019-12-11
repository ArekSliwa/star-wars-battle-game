import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BattleUnitName} from 'models/index';
import {MatButtonToggleChange} from '@angular/material';

@Component({
  selector: 'sw-battle-unit-switcher',
  templateUrl: './battle-unit-switcher.component.html',
  styleUrls: ['./battle-unit-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattleUnitSwitcherComponent {

  @Input()
  // TODO manage with ''
  initialValue: BattleUnitName | '';

  @Output()
  battleUnitClick: EventEmitter<BattleUnitName> = new EventEmitter();

  btnIconSize = '64px';

  onButtonToggleGroupChange({value}: MatButtonToggleChange) {
    this.battleUnitClick.emit(value);
  }
}
