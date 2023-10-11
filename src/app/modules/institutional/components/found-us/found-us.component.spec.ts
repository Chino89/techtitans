import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundUsComponent } from './found-us.component';

describe('FoundUsComponent', () => {
  let component: FoundUsComponent;
  let fixture: ComponentFixture<FoundUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
