import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { SharedModuleModule } from 'src/app/shared/shared-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
