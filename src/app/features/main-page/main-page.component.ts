import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';  

import { LoggerDataService } from 'src/services/logger-data/logger-data.service'
import { IPingData } from 'src/models/ping/ping-data.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  columnDefs = [
    {headerName: 'Date Time', field: 'dateTime'},
    {headerName: 'IP Address', field: 'ip', filter: true},
    {headerName: 'Packets Received', field: 'packetsReceived'},
    {headerName: 'Packets Sent', field: 'packetsSent'},
    {headerName: 'Latency', field: 'latency'}
  ];

  pingData: IPingData[] = [];

  constructor(
    private loggerDataService: LoggerDataService
  ) {
    const fromDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const toDate = new Date();

    this.loggerDataService.getPingData(fromDate, toDate)
    .then(pd => {
      this.pingData = pd;
    });
  }

}
