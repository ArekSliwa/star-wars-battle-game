import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'sw-game-board-layout',
  templateUrl: './game-board-layout.component.html',
  styleUrls: ['./game-board-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
