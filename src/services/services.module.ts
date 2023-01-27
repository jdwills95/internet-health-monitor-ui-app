import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoggerDataService} from 'src/services/logger-data/logger-data.service';
import {CurrentScreenWidthService} from 'src/services/current-screen-width/current-screen-width.service'



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    LoggerDataService,
    CurrentScreenWidthService
  ]
})
export class ServicesModule { }
