import { ISpeedData } from "src/models/speed/speed-data.interface";

export class SpeedData implements ISpeedData {
    date_time: string;
    speed_down: number;
    speed_up: number;

    constructor(input: any) {
        this.date_time = input.date_time;
        this.speed_down = input.speed_down;
        this.speed_up = input.speed_up;
    }
}