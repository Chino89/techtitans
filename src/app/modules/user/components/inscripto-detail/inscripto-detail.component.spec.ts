import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptoDetailComponent } from './inscripto-detail.component';

describe('InscriptoDetailComponent', () => {
  let component: InscriptoDetailComponent;
  let fixture: ComponentFixture<InscriptoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptoDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
