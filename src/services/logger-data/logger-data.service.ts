import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PingData } from 'src/models/ping/ping-data.class';
import { SpeedData } from 'src/models/speed/speed-data.class'
import * as moment from 'moment';
import { environment } from 'src/assets/environment/environment'

@Injectable()
export class LoggerDataService {
  constructor(private http: HttpClient) { }
  
  private baseUrl = environment.backendBaseUrl;
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
              packetsReceived: Number(p.packets_received),
              packetsSent: Number(p.packets_sent),
              latency: Number(p.latency),
            }
            return pingData;
          });
          resolve(pingData);
        }
      })
    })
  }

  async getSpeedData(fromDate: Date, toDate: Date): Promise<Array<SpeedData>> {
    return new Promise((resolve, reject) => {
      
      this.http.get(this.routes.getSpeedData(fromDate, toDate))
      .subscribe((response: any) => {
        if(response){
          let speedData: SpeedData[] = [];
          speedData = response.map((p: any)  => {
            const speedData: SpeedData = {
              dateTime: moment.utc(p.date_time).toDate(),
              speedDown: p.speed_down,
              speedUp: p.speed_up,
            }
            return speedData;
          });
          resolve(speedData);
        }
      })
    })
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
