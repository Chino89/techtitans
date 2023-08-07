import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  declarations: [DashboardPageComponent, HeaderComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
  exports: [
    DashboardPageComponent
  ],
  providers: [],
})
export class DashboardModule {}
