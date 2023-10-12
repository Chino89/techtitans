import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSvgIconModule } from 'angular-svg-icon';
import { InstitutionalRoutingModule } from './institutional-routing.module';
import { OurStaffComponent } from './components/our-staff/our-staff.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ContactComponent } from './components/contact/contact.component';
import { InstitutionalPageComponent } from './components/institutional-page/institutional-page.component';
import { FoundUsComponent } from './components/found-us/found-us.component';
import { TeachingStaffComponent } from './components/teaching-staff/teaching-staff.component';
import { NewsComponent } from './components/news/news.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    OurStaffComponent,
    OurServicesComponent,
    ContactComponent,
    InstitutionalPageComponent,
    FoundUsComponent,
    TeachingStaffComponent,
    NewsComponent,
  ],
  imports: [CommonModule, InstitutionalRoutingModule, AngularSvgIconModule, SharedModule],
})
export class InstitutionalModule {}
