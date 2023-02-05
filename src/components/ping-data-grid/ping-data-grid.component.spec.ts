import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PingDataGridComponent } from './ping-data-grid.component';

describe('PingDataGridComponent', () => {
  let component: PingDataGridComponent;
  let fixture: ComponentFixture<PingDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PingDataGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PingDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
