import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PingData } from 'src/models/ping/ping-data.class';
import { SpeedData } from 'src/models/speed/speed-data.class'
import { plainToInstance } from 'class-transformer';
import * as moment from "moment";

@Injectable()
export class LoggerDataService {
  constructor(private http: HttpClient) { }
  
  private baseUrl = 'http://localhost:8000'
  private routes = {
      getPingData: (fromDate: Date, toDate: Date) => 
      `${this.baseUrl}/ping/${this.formatDateForAPI(fromDate)}/${this.formatDateForAPI(toDate)}`,
      getSpeedData: (fromDate: Date, toDate: Date) => 
      `${this.baseUrl}/ping/${this.formatDateForAPI(fromDate)}/${this.formatDateForAPI(toDate)}`
    };

  async getPingData(fromDate: Date, toDate: Date): Promise<Array<PingData>> {
    return new Promise((resolve, reject) => {
      
      this.http.get(this.routes.getPingData(fromDate, toDate))
      .subscribe((response: any) => {
        if(response){
          let pingData: PingData[] = [];
          pingData = response.map((p: any)  => {
            const pingData: PingData = {
              dateTime: moment.utc(p.date_time).toDate(),
              ip: p.ip.trim(),
              packetsReceived: Number(p.packets_received.trim()),
              packetsSent: Number(p.packets_sent.trim()),
              latency: p.latency.trim(),
            }
            return pingData;
          });
          resolve(pingData);
        }
      })
    })
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

  private convertLocalDateToUTC(date: Date) {
    return moment(date).toDate();
  }

  private convertDateToISOString(date: Date) {
    return date.toISOString();
  }

  private formatDateForAPI(date: Date) {
    return this.convertDateToISOString(this.convertLocalDateToUTC(date));
  }
}
