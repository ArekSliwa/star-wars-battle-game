import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IconId} from './icon.model';

@Component({
  selector: 'sw-svg-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  @Input()
  iconId: IconId;
  @Input()
  size = '32px';

  get getSize() {
    return {
      width: this.size,
      height: this.size
    };
  }
}


