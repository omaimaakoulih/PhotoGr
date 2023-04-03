import { NgModule } from '@angular/core';
import { DateTimePipe } from './dateTimePipe';

@NgModule({
  declarations: [DateTimePipe],
  exports: [DateTimePipe]
})
export class DateTimePipeMod { }