import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionalRoutingModule } from './institutional-routing.module';
import { OurStaffComponent } from './components/our-staff/our-staff.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { ContactComponent } from './components/contact/contact.component';
import { InstitutionalPageComponent } from './components/institutional-page/institutional-page.component';
import { FoundUsComponent } from './components/found-us/found-us.component';


@NgModule({
  declarations: [
    OurStaffComponent,
    OurServicesComponent,
    ContactComponent,
    InstitutionalPageComponent,
    FoundUsComponent
  ],
  imports: [
    CommonModule,
    InstitutionalRoutingModule
  ]
})
export class InstitutionalModule { }
