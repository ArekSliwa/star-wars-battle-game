import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Score} from 'models/score.model';

@Component({
  selector: 'sw-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {
  @Input()
  score: Score;
}
