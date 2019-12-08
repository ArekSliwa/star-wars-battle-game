import {ChangeDetectionStrategy, Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'sw-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreloaderComponent implements OnInit {

  @Input()
  loadedInPercentage: number = 0;

  lightSaberOpened = false;

  ngOnInit() {
  }

  onLightSaberClick() {
    this.lightSaberOpened = !this.lightSaberOpened;
  }

}
