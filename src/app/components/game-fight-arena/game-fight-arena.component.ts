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
import {animate, keyframes, query, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'sw-game-fight-arena',
  templateUrl: './game-fight-arena.component.html',
  styleUrls: ['./game-fight-arena.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // TODO refactor - animation should be DRY and in dedicated file

    trigger('fightArenaStage', [
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
        [
          query('.game-card__unit-value',
            style({
             // opacity: 0,
              width: 0
            })
          ),
          query(':self', [
            style({
              transform: 'scale(.01)'
            }),
            animate('1000ms', style({
              transform: 'scale(1)'
            }))
          ]),
        ]),
      transition(`${GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE}=>${GAME_FIGHT_ARENA_ANIMATION_STATE.HIGHLIGHT_WINNER}`,
        [
          query('.game-card__unit-value', [
            // animate('1000ms', style({
            //   opacity: 1
            // })),
            animate('2000ms steps(44)', style({
              width: '24em'
            }))
          ]),
          query('.winner', [
            style({
              borderColor: 'transparent'
            }),
            animate('2000ms', keyframes([

              // TODO is there a way to add iteration-count?
              style({borderColor: '#ffe300', offset: .15}),
              style({borderColor: 'transparent', offset: .3}),
              style({borderColor: '#ffe300', offset: .45}),
              style({borderColor: 'transparent', offset: .6}),
              style({borderColor: '#ffe300', offset: .75}),
              style({borderColor: 'transparent', offset: .9}),
            ]))
            // animate('700ms', style({borderColor: 'transparent'})),
            // animate('700ms', style({borderColor: '#ffe300'})),
          ])
        ]),
      transition(`${GAME_FIGHT_ARENA_ANIMATION_STATE.HIGHLIGHT_WINNER}=>${GAME_FIGHT_ARENA_ANIMATION_STATE.LEAVE_WITH_SPACE}`,
        animate('1000ms')),
      transition(`void=>${GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE}`,
        [
          query('.game-card__unit-value',
            style({
             // opacity: 0,
              width: 0
            }),
          ),
          query(':self', [
            style({
              transform: 'scale(.01)'
            }),
            animate('1000ms', style({
              transform: 'scale(1)'
            }))
          ]),
        ]),
      transition(`${GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE}=>${GAME_FIGHT_ARENA_ANIMATION_STATE.DEFAULT}`,
        style({
          transform: 'scale(.01)',
          opacity: 1
        }))
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
