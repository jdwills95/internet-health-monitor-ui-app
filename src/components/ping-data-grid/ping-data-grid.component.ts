import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';

import { LoggerDataService } from 'src/services/logger-data/logger-data.service';
import { IPingData } from 'src/models/ping/ping-data.interface';

@Component({
  selector: 'app-ping-data-grid',
  templateUrl: './ping-data-grid.component.html',
  styleUrls: ['./ping-data-grid.component.scss'],
})
export class PingDataGridComponent {
  public pingDataLoaded: boolean = false;

  private gridApi!: GridApi<IPingData>;
  private gridColumnApi!: ColumnApi;

  pingDates = new FormGroup({
    fromDate: new FormControl<Date>(this.getFromDefaultDate()),
    toDate: new FormControl<Date>(new Date()),
    filterIpDrop: new FormControl<string>('All'),
  });

  public pingRowData!: IPingData[];

  pingColumnDefs = [
    {
      headerName: 'Date Time',
      field: 'dateTime',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'IP Address',
      field: 'ip',
      filter: true,
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Packets Received',
      field: 'packetsReceived',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Packets Sent',
      field: 'packetsSent',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Latency',
      field: 'latency',
      sortable: true,
      resizable: true,
    },
  ];

  onlyDroppedPackets = false;

  pingData: IPingData[] = [];
  pingDataFiltered: IPingData[] = [];
  ips: string[] = ['All'];

  fromDate = this.pingDates.controls['fromDate'].value
    ? this.pingDates.controls['fromDate'].value
    : this.getFromDefaultDate();

  toDate = this.pingDates.controls['toDate'].value
    ? this.pingDates.controls['toDate'].value
    : new Date();

  constructor(private loggerDataService: LoggerDataService) {
    this.pingDataLoaded = false;
    this.getPingData();
  }

  getPingData() {
    this.pingDataLoaded = false;

    const fromDate = this.pingDates.controls['fromDate'].value
      ? this.pingDates.controls['fromDate'].value
      : new Date(new Date().setMonth(new Date().getMonth() - 1));

    const toDate = this.pingDates.controls['toDate'].value
      ? this.pingDates.controls['toDate'].value
      : new Date();

    this.loggerDataService.getPingData(fromDate, toDate).then((pd) => {
      this.getUniquePingAddress(pd);
      this.pingData = pd;
      this.onPingFilterChanged();
    });
  }

  dateChange(type: string) {
    if (!this.checkDateRange()) {
      if (type == 'ping') {
        this.getPingData();
      }
    }
  }

  getFromDefaultDate(): Date {
    return new Date(new Date().setMonth(new Date().getMonth() - 1));
  }

  checkDateRange() {
    if (
      this.pingDates.controls.fromDate.value != null &&
      this.pingDates.controls.toDate.value
    ) {
      return (
        this.pingDates.controls.fromDate.value >
        this.pingDates.controls.toDate.value
      );
    }
    return false;
  }

  getUniquePingAddress(pingData: IPingData[]) {
    this.ips = ['All'];

    pingData.forEach((pd) => {
      if (!this.ips.includes(pd.ip)) {
        this.ips.push(pd.ip);
      }
    });
  }

  onPingFilterChanged() {
    if (this.pingDates.controls['filterIpDrop'].value == 'All') {
      this.pingDataFiltered = this.pingData;
    } else {
      this.pingDataFiltered = this.pingData.filter(
        (pd) => pd.ip == this.pingDates.controls['filterIpDrop'].value
      );
    }

    if (this.onlyDroppedPackets) {
      this.pingDataFiltered = this.pingData.filter(
        (pd) => pd.packetsReceived < pd.packetsSent
      );
    }

    this.pingRowData = this.pingDataFiltered;
    this.pingDataLoaded = true;
  }

  toggleDroppedPackets(e: any) {
    this.onlyDroppedPackets = e.checked;
    this.onPingFilterChanged();
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params: GridReadyEvent<IPingData>) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.pingRowData = this.pingDataFiltered;

    this.autoSizeAll(false);
  }
}
