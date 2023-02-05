import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { PingDataGridComponent } from './ping-data-grid/ping-data-grid.component';
import { SpeedDataGridComponent } from './speed-data-grid/speed-data-grid.component';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
  ],
  declarations: [PingDataGridComponent, SpeedDataGridComponent],
  exports: [PingDataGridComponent, SpeedDataGridComponent],
  providers: [],
  entryComponents: [],
})
export class SharedModule {}
