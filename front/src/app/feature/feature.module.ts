import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AlliedCompaniesComponent } from './components/allied-companies/allied-companies.component';

@NgModule({
  declarations: [CarouselComponent, AlliedCompaniesComponent],
  imports: [
    CommonModule
  ], 
  exports: [
    CarouselComponent,
    AlliedCompaniesComponent
  ],
})
export class FeatureModule { }
