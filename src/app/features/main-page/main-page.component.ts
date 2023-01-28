import { Component } from '@angular/core';

import { LoggerDataService } from 'src/services/logger-data/logger-data.service'
import { IPingData } from 'src/models/ping/ping-data.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  columnDefs = [
    {headerName: 'Date Time', field: 'dateTime'},
    {headerName: 'IP Address', field: 'ip'},
    {headerName: 'Packets Received', field: 'packetsReceived'},
    {headerName: 'Packets Sent', field: 'packetsSent'},
    {headerName: 'Latency', field: 'latency'}
  ];

  pingData: IPingData[] = [];

  constructor(
    private loggerDataService: LoggerDataService
  ) {
    const fromDate = new Date('22 January 2023 02:00 UTC');
    const toDate = new Date('22 January 2023 15:00 UTC');

    this.loggerDataService.getPingData(fromDate, toDate)
    .then(pd => {
      this.pingData = pd;
    });
  }

}
