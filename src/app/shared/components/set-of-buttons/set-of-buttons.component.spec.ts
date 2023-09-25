import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOfButtonsComponent } from './set-of-buttons.component';

describe('SetOfButtonsComponent', () => {
  let component: SetOfButtonsComponent;
  let fixture: ComponentFixture<SetOfButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetOfButtonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetOfButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
