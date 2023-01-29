import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';  

import { LoggerDataService } from 'src/services/logger-data/logger-data.service'
import { IPingData } from 'src/models/ping/ping-data.interface';
import {isAfterDateValidator} from 'src/validators/is-after-date/is-after-date.validator'

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  pingDates = new FormGroup({
    fromDate: new FormControl<Date>(this.getFromDefaultDate()),
    toDate: new FormControl<Date>(new Date()),
  });

  columnDefs = [
    {headerName: 'Date Time', field: 'dateTime'},
    {headerName: 'IP Address', field: 'ip', filter: true},
    {headerName: 'Packets Received', field: 'packetsReceived'},
    {headerName: 'Packets Sent', field: 'packetsSent'},
    {headerName: 'Latency', field: 'latency'}
  ];

  pingData: IPingData[] = [];

  fromDate = this.pingDates.controls['fromDate'].value ?
    this.pingDates.controls['fromDate'].value :
    this.getFromDefaultDate();

  toDate = this.pingDates.controls['toDate'].value ?
    this.pingDates.controls['toDate'].value :
    new Date();

  constructor(
    private loggerDataService: LoggerDataService
  ) {
    this.getPingData();
  }

  getPingData() {
    const fromDate = this.pingDates.controls['fromDate'].value ?
      this.pingDates.controls['fromDate'].value :
      new Date(new Date().setMonth(new Date().getMonth() - 1));

    const toDate = this.pingDates.controls['toDate'].value ?
      this.pingDates.controls['toDate'].value :
      new Date();

    this.loggerDataService.getPingData(fromDate, toDate)
    .then(pd => {
      this.pingData = pd;
    });
  }

  dateChange(type: string) {
    if(!this.checkDateRange()) {
      if(type == 'ping') {
        this.getPingData();
      }
    }
  }

  getFromDefaultDate(): Date {
    return new Date(new Date().setMonth(new Date().getMonth() - 1));
  }

  checkDateRange() {
    if(this.pingDates.controls.fromDate.value != null && this.pingDates.controls.toDate.value) {
      return this.pingDates.controls.fromDate.value > this.pingDates.controls.toDate.value
    }
    return false;
  }

}
