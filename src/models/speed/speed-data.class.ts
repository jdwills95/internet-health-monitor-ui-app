import { ISpeedData } from "src/models/speed/speed-data.interface";

export class SpeedData implements ISpeedData {
    dateTime: Date;
    speedDown: number;
    speedUp: number;

    constructor(input: any) {
        this.dateTime = input.dateTime;
        this.speedDown = input.speedDown;
        this.speedUp = input.speedUp;
    }
}