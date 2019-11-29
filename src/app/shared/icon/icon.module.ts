import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SvgIconComponent} from './icon.component';

const cmp = [SvgIconComponent];

@NgModule({
  declarations: [...cmp],
  imports: [
    CommonModule
  ],
  exports: [...cmp]
})
export class SwIconModule { }
