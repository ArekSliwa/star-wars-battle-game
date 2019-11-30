import {Component, EventEmitter, Output} from '@angular/core';
import {BattleUnitName} from 'models/index';

@Component({
  selector: 'sw-battle-unit-switcher',
  templateUrl: './battle-unit-switcher.component.html',
  styleUrls: ['./battle-unit-switcher.component.scss']
})
export class BattleUnitSwitcherComponent {

  @Output()
  battleUnitClick: EventEmitter<BattleUnitName> = new EventEmitter();
}
