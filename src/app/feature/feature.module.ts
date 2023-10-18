import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlliedCompaniesComponent } from './components/allied-companies/allied-companies.component';
import { RouterModule } from '@angular/router';
import { SwiperComponent } from './components/swiper/swiper.component';
import { register } from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [AlliedCompaniesComponent, SwiperComponent],
  imports: [CommonModule, RouterModule],
  exports: [AlliedCompaniesComponent, SwiperComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModule {}
