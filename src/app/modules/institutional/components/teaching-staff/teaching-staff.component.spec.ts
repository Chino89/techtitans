import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachingStaffComponent } from './teaching-staff.component';

describe('TeachingStaffComponent', () => {
  let component: TeachingStaffComponent;
  let fixture: ComponentFixture<TeachingStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeachingStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeachingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
