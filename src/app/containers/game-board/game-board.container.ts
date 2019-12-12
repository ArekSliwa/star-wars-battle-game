import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Score} from 'models/score.model';
import * as fromGame from 'store/index';
import {FightPayloadModel, ROUND_STAGE, WinnerTypes} from 'models/index';
import {Store} from '@ngrx/store';
import {ArrangeBattleService} from 'services/index';
import {filter, map, tap} from 'rxjs/operators';
import {GAME_FIGHT_ARENA_ANIMATION_STATE} from '../../components/game-fight-arena';

@Component({
  selector: 'sw-game-board-container',
  templateUrl: './game-board.container.html',
  styleUrls: ['./game-board.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardContainerComponent {

  score$: Observable<Score> = this.store.select(fromGame.selectScore);

  unitsToFight$: Observable<FightPayloadModel> = this.arrangeBattleService.getUnitsToFight();

  isRoundStandBy$ = this.store.select(fromGame.selectRoundStage).pipe(
    map((roundStage: ROUND_STAGE) => roundStage === ROUND_STAGE.STAND_BY ? true : false)
  );

  currentRequiredAnimationState$: Observable<GAME_FIGHT_ARENA_ANIMATION_STATE> = this.store.select(fromGame.selectRoundStage).pipe(
    filter((roundStage: ROUND_STAGE) =>
      roundStage === ROUND_STAGE.FLY_IN ||
      roundStage === ROUND_STAGE.WINNER ||
      roundStage === ROUND_STAGE.FLY_OUT ||
      roundStage === ROUND_STAGE.STAND_BY),
    map((roundStage: ROUND_STAGE) => {
      switch (roundStage) {
        case ROUND_STAGE.FLY_IN:
          return GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE;
        case ROUND_STAGE.WINNER:
          return GAME_FIGHT_ARENA_ANIMATION_STATE.HIGHLIGHT_WINNER;
        case ROUND_STAGE.FLY_OUT:
          return GAME_FIGHT_ARENA_ANIMATION_STATE.LEAVE_WITH_SPACE;
        default:
          return GAME_FIGHT_ARENA_ANIMATION_STATE.DEFAULT;
      }
    })
  );

  roundWinner$: Observable<WinnerTypes | ''> = this.store.select(fromGame.selectRoundWinner).pipe(
    tap(() => {
      this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.WINNER}));
    })
  );

  constructor(
    private store: Store<{}>,
    private arrangeBattleService: ArrangeBattleService) {
  }

  onFightClick(): void {
    this.arrangeBattleService.startFight();
  }

  onArenaEndAnimation(animationStateName: GAME_FIGHT_ARENA_ANIMATION_STATE) {
    switch (animationStateName) {
      case GAME_FIGHT_ARENA_ANIMATION_STATE.COME_FROM_SPACE:
        this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.COMPARE}));
        break;
      case GAME_FIGHT_ARENA_ANIMATION_STATE.HIGHLIGHT_WINNER:
        this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.SCORE_UPDATE}));
        break;
      case GAME_FIGHT_ARENA_ANIMATION_STATE.LEAVE_WITH_SPACE:
        this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.STAND_BY}));
        break;
      default:
        this.store.dispatch(fromGame.updateRoundStage({roundStage: ROUND_STAGE.STAND_BY}));
        break;
    }
  }

}
