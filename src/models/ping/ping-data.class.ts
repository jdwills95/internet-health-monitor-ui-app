import { IPingData } from "src/models/ping/ping-data.interface"

export class PingData implements IPingData {
    dateTime: Date;
    ip: string;
    packetsReceived: number;
    packetsSent: number;
    latency: string;

    constructor(input: any) {
        this.dateTime = input.dateTime;
        this.ip = input.ip;
        this.packetsReceived = input.packetsReceived;
        this.packetsSent = input.packetsSent;
        this.latency = input.latency;
    }
}