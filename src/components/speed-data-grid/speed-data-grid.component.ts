import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';

import { LoggerDataService } from 'src/services/logger-data/logger-data.service';
import { ISpeedData } from 'src/models/speed/speed-data.interface';

@Component({
  selector: 'app-speed-data-grid',
  templateUrl: './speed-data-grid.component.html',
  styleUrls: ['./speed-data-grid.component.scss'],
})
export class SpeedDataGridComponent {
  public speedDataLoaded: boolean = false;

  private gridApi!: GridApi<ISpeedData>;
  private gridColumnApi!: ColumnApi;

  speedDates = new FormGroup({
    fromDate: new FormControl<Date>(this.getFromDefaultDate()),
    toDate: new FormControl<Date>(new Date()),
    filterIpDrop: new FormControl<string>('All'),
  });

  public speedRowData!: ISpeedData[];

  speedColumnDefs = [
    {
      headerName: 'Date Time',
      field: 'dateTime',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Download Speed (MBps)',
      field: 'speedDown',
      sortable: true,
      resizable: true,
    },
    {
      headerName: 'Upload Speed (MBps)',
      field: 'speedUp',
      sortable: true,
      resizable: true,
    },
  ];

  speedData: ISpeedData[] = [];
  speedDataFiltered: ISpeedData[] = [];

  fromDate = this.speedDates.controls['fromDate'].value
    ? this.speedDates.controls['fromDate'].value
    : this.getFromDefaultDate();

  toDate = this.speedDates.controls['toDate'].value
    ? this.speedDates.controls['toDate'].value
    : new Date();

  constructor(private loggerDataService: LoggerDataService) {
    this.speedDataLoaded = false;
    this.getSpeedData();
  }

  getSpeedData() {
    this.speedDataLoaded = false;

    const fromDate = this.speedDates.controls['fromDate'].value
      ? this.speedDates.controls['fromDate'].value
      : new Date(new Date().setMonth(new Date().getMonth() - 1));

    const toDate = this.speedDates.controls['toDate'].value
      ? this.speedDates.controls['toDate'].value
      : new Date();

    this.loggerDataService.getSpeedData(fromDate, toDate).then((pd) => {
      this.speedData = pd;
      this.onSpeedFilterChanged();
    });
  }

  dateChange(type: string) {
    if (!this.checkDateRange()) {
      if (type == 'speed') {
        this.getSpeedData();
      }
    }
  }

  getFromDefaultDate(): Date {
    return new Date(new Date().setMonth(new Date().getMonth() - 1));
  }

  checkDateRange() {
    if (
      this.speedDates.controls.fromDate.value != null &&
      this.speedDates.controls.toDate.value
    ) {
      return (
        this.speedDates.controls.fromDate.value >
        this.speedDates.controls.toDate.value
      );
    }
    return false;
  }

  onSpeedFilterChanged() {
    this.speedDataFiltered = this.speedData;
    this.speedRowData = this.speedDataFiltered;
    this.speedDataLoaded = true;
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params: GridReadyEvent<ISpeedData>) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.speedRowData = this.speedDataFiltered;

    this.autoSizeAll(false);
  }
}
