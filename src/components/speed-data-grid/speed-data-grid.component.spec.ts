import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedDataGridComponent } from './speed-data-grid.component';

describe('SpeedDataGridComponent', () => {
  let component: SpeedDataGridComponent;
  let fixture: ComponentFixture<SpeedDataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeedDataGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeedDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
