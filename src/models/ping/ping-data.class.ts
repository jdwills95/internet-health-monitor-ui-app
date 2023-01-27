import { IPingData } from "./ping-data.interface"

export class PingData implements IPingData {
    date_time: string;
    ip: string;
    packets_received: string;
    latency: string;

    constructor(input: any) {
        this.date_time = input.date_time;
        this.ip = input.ip;
        this.packets_received = input.packets_received;
        this.latency = input.latency;
    }
}