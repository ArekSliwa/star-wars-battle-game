import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BattleUnitName} from 'models/index';
import {MatButtonToggleChange} from '@angular/material';

@Component({
  selector: 'sw-battle-unit-switcher',
  templateUrl: './battle-unit-switcher.component.html',
  styleUrls: ['./battle-unit-switcher.component.scss']
})
export class BattleUnitSwitcherComponent {

  @Input()
  initialValue: BattleUnitName | null;

  @Output()
  battleUnitClick: EventEmitter<BattleUnitName> = new EventEmitter();

  onButtonToggleGroupChange({value}: MatButtonToggleChange) {
    this.battleUnitClick.emit(value);
  }
}
