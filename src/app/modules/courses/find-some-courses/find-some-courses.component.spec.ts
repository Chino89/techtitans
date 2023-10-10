import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSomeCoursesComponent } from './find-some-courses.component';

describe('FindSomeCoursesComponent', () => {
  let component: FindSomeCoursesComponent;
  let fixture: ComponentFixture<FindSomeCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSomeCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindSomeCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
