import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoggerDataService {
  constructor(private http: HttpClient) { }
  
  private baseUrl = 'http://localhost:8000'
  private routes = {
      getPingData: (fromDate: Date, toDate: Date) => `${this.baseUrl}/ping/${fromDate}/${toDate}`,
      getSpeedData: (fromDate: Date, toDate: Date) => `${this.baseUrl}/ping/${fromDate}/${toDate}`
    };

  getPingData(fromDate: Date, toDate: Date) {
    return this.http.get(this.routes.getPingData(fromDate, toDate))      
    .subscribe((data: any) => {
      debugger;
    });
  }

  getSpeedData(fromDate: Date, toDate: Date) {
    return this.http.get(this.routes.getSpeedData(fromDate, toDate))      
    .subscribe((data: any) => {

    });
  }
}
