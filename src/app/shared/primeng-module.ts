import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {CarouselModule} from 'primeng/carousel';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {RatingModule} from 'primeng/rating';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {StepsModule} from 'primeng/steps';
import {SliderModule} from 'primeng/slider';
import {TabViewModule} from 'primeng/tabview';
@NgModule({
  declarations: [],
  imports: [
    TableModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    CarouselModule,
    DialogModule,
    ToastModule,
    RatingModule,
    InputTextareaModule,
    StepsModule,
    SliderModule,
    TabViewModule

  ],
  providers: [],
  exports: [ CardModule, CalendarModule, DropdownModule, TableModule,
    CarouselModule, RadioButtonModule, ButtonModule, DialogModule, ToastModule, RatingModule,
    InputTextareaModule, StepsModule, SliderModule, TabViewModule ]
})
export class PrimeModule { }
