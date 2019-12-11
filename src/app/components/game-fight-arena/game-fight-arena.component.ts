import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FightPayloadModel} from 'models/fight-payload.model';
import {IconId} from 'shared/icon';
import {BattleUnitName, UNIT_BATTLE_PROP_NAME, WinnerTypes} from 'models/index';
import {getEnumKeyByValue} from 'shared/util';
import {GAME_FIGHT_ARENA_ANIMATION_STATE} from './game-fight-arena-anim-state.model';
import {animate, query, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'sw-game-fight-arena',
  templateUrl: './game-fight-arena.component.html',
  styleUrls: ['./game-fight-arena.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fightArenaStage', [
      state('void', style({
        transform: 'scale(.01)'
      })),
      state(GAME_FIGHT_ARENA_ANIMATION_STATE.DEFAULT, style({
        transform: 'scale(.01)',
        opacity: 1
      })),
      state(GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE, style({
        transform: 'scale(1)'
      })),
      state(GAME_FIGHT_ARENA_ANIMATION_STATE.LEAVE_WITH_SPACE, style({
        transform: 'scale(1.5)',
        opacity: 0
      })),
      transition(
        `${GAME_FIGHT_ARENA_ANIMATION_STATE.DEFAULT}=>${GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE}`,
        animate('2000ms')),
      transition(`${GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE}=>${GAME_FIGHT_ARENA_ANIMATION_STATE.HIGHLIGHT_WINNER}`,
        [
          query('.winner', [
            style({background: 'green'}),
            animate('2000ms', style({ background: 'blue' }))
          ])
        ]),
      transition(`${GAME_FIGHT_ARENA_ANIMATION_STATE.HIGHLIGHT_WINNER}=>${GAME_FIGHT_ARENA_ANIMATION_STATE.LEAVE_WITH_SPACE}`,
        animate('2000ms')),
      transition(`void=>${GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE}`,
        animate('2000ms')),
      transition(`${GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE}=>${GAME_FIGHT_ARENA_ANIMATION_STATE.DEFAULT}`,
        animate('0ms'))
    ]),
  ]
})
export class GameFightArenaComponent {

  @Input()
  fightingUnits: FightPayloadModel;

  @Input()
  animationState: GAME_FIGHT_ARENA_ANIMATION_STATE = GAME_FIGHT_ARENA_ANIMATION_STATE.DEFAULT;

  @Input()
  winner: WinnerTypes;

  @Output()
  currentEndedAnimation: EventEmitter<GAME_FIGHT_ARENA_ANIMATION_STATE> = new EventEmitter<GAME_FIGHT_ARENA_ANIMATION_STATE>();

  @HostBinding('@fightArenaStage') get animation() {
    return this.animationState;
  }

  @HostListener('@fightArenaStage.done')
  animationDone() {
    this.currentEndedAnimation.emit(this.animationState);
  }

  getUnitIcon(fightingUnits: FightPayloadModel): IconId {
    const currentBattleUnit: BattleUnitName = getEnumKeyByValue(UNIT_BATTLE_PROP_NAME, fightingUnits.battleUnitProp);

    return (currentBattleUnit === 'People' ? 'darth-vader' : 'millennium-falcon') as IconId;
  }

}
