import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { SharedModule } from 'src/components/shared.module';
import { ServicesModule } from 'src/services/services.module'
import { AgGridModule } from 'ag-grid-angular';
  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MatDatepickerModule } from '@angular/material/datepicker'  
import { MatNativeDateModule } from '@angular/material/core'  
import { MatFormFieldModule } from '@angular/material/form-field' 
import { MatInputModule } from '@angular/material/input';

import { MainPageModule } from 'src/app/features/main-page/main-page.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ServicesModule,
    HttpClientModule,
    AgGridModule,
    BrowserAnimationsModule,  
    MatDatepickerModule,  
    MatNativeDateModule,
    MatFormFieldModule,
    MainPageModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
