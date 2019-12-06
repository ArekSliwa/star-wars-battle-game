import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Score} from 'models/score.model';
import * as fromGame from 'store/index';
import {FightPayloadModel} from 'models/index';
import {Store} from '@ngrx/store';
import {ArrangeBattleService} from 'services/index';

@Component({
  selector: 'sw-game-board-container',
  templateUrl: './game-board.container.html',
  styleUrls: ['./game-board.container.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardContainerComponent {

  score$: Observable<Score> = this.store.select(fromGame.selectScore);

  unitsToFight$: Observable<FightPayloadModel> = this.arrangeBattleService.getUnitsToFight();

  constructor(
    private store: Store<{}>,
    private arrangeBattleService: ArrangeBattleService) {
  }

  onFightClick() {
    this.arrangeBattleService.startFight();
  }

}
