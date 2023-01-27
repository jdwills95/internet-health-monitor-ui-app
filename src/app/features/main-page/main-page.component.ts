import { Component } from '@angular/core';

import { LoggerDataService } from 'src/services/logger-data/logger-data.service'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  constructor(
    private loggerDataService: LoggerDataService
  ) {
    const fromDate = new Date('22 January 2023 02:00 UTC');
    const toDate = new Date('22 January 2023 15:00 UTC');

    const x = this.loggerDataService
    .getPingData(fromDate, toDate);
  }

}
