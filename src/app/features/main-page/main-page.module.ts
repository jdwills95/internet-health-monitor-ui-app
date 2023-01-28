import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

import { SharedModule } from 'src/components/shared.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SharedModule,
    AgGridModule
  ]
})
export class MainPageModule { }
