import { ValuesPipe } from './values.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ValuesPipe],
  exports: [ValuesPipe]
})
export class PipesModule {}
