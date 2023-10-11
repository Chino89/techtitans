import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { OurStaffComponent } from './components/our-staff/our-staff.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { FoundUsComponent } from './components/found-us/found-us.component';
import { InstitutionalPageComponent } from './components/institutional-page/institutional-page.component';
import { TeachingStaffComponent } from './components/teaching-staff/teaching-staff.component';
import { NewsComponent } from './components/news/news.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionalPageComponent,
    children: [
      {
        path: 'nuestro-staff',
        pathMatch: 'full',
        component: OurStaffComponent,
        children: [],
      },
      {
        path: 'servicios',
        pathMatch: 'full',
        component: OurServicesComponent,
        children: [],
      },
      {
        path: 'direccion',
        pathMatch: 'full',
        component: FoundUsComponent,
        children: [],
      },
      {
        path: 'contacto',
        pathMatch: 'full',
        component: ContactComponent,
        children: [],
      },
    ],
  },
  {
    path: 'cuerpo-docente',
    pathMatch: 'full',
    component: TeachingStaffComponent,
    children: [],
  },
  {
    path: 'novedades',
    pathMatch: 'full',
    component: NewsComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionalRoutingModule { }
