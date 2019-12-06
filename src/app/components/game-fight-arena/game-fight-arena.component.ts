import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FightPayloadModel} from 'models/fight-payload.model';

@Component({
  selector: 'sw-game-fight-arena',
  templateUrl: './game-fight-arena.component.html',
  styleUrls: ['./game-fight-arena.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameFightArenaComponent {
  @Input()
  fightingUnits: FightPayloadModel;

}
