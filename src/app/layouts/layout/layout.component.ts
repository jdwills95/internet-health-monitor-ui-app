import { Component, HostListener } from '@angular/core';

import { CurrentScreenWidthService } from 'src/services/current-screen-width/current-screen-width.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  title = 'resume-app';
  isDesktopOrBigger = true;

  constructor(
    private currentScreenWidthService: CurrentScreenWidthService,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isDesktopOrBigger = this.currentScreenWidthService.isScreenWidthLargeDesktopOrBigger();
  }
}
