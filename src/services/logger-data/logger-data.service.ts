import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PingData } from 'src/models/ping/ping-data.class';
import { SpeedData } from 'src/models/speed/speed-data.class'
import { plainToInstance } from 'class-transformer';

@Injectable()
export class LoggerDataService {
  constructor(private http: HttpClient) { }
  
  private baseUrl = 'http://localhost:8000'
  private routes = {
      getPingData: (fromDate: Date, toDate: Date) => `${this.baseUrl}/ping/${fromDate.toISOString()}/${toDate.toISOString()}`,
      getSpeedData: (fromDate: Date, toDate: Date) => `${this.baseUrl}/ping/${fromDate.toISOString()}/${toDate.toISOString()}`
    };

  getPingData(fromDate: Date, toDate: Date) {
    return this.http.get(this.routes.getPingData(fromDate, toDate))      
    .subscribe((data: any) => {
      if(data?.length) {
        return data.map((p: PingData)  => plainToInstance(PingData, p))
      }
      return data;
    });
  }

  getSpeedData(fromDate: Date, toDate: Date) {
    return this.http.get(this.routes.getSpeedData(fromDate, toDate))      
    .subscribe((data: any) => {
      if(data?.length) {
        return data.map((p: SpeedData)  => plainToInstance(SpeedData, p))
      }
      return data;
    });
  }
}
