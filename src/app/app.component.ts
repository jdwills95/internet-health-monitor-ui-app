import { Component, HostListener } from '@angular/core';


import { CurrentScreenWidthService } from 'src/services/current-screen-width/current-screen-width.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'internet-health-monitor-ui-app';
  isDesktopOrBigger = true;
  
  constructor(
    private currentScreenWidthService: CurrentScreenWidthService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isDesktopOrBigger = this.currentScreenWidthService.isScreenWidthLargeDesktopOrBigger();
  }
}
