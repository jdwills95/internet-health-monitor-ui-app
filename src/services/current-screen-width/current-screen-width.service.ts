import { Injectable } from '@angular/core';

@Injectable()
export class CurrentScreenWidthService {
  constructor() {}

  isScreenWidthPhoneOrBigger(): boolean {
    return window.innerWidth >= 576;
  }

  isScreenWidthTabletOrBigger(): boolean {
    return window.innerWidth >= 768;
  }

  isScreenWidthDesktopOrBigger(): boolean {
    return window.innerWidth >= 992;
  }

  isScreenWidthLargeDesktopOrBigger(): boolean {
    return window.innerWidth >= 1200;
  }
}
