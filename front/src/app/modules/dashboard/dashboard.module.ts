import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    
  ],
  exports: [
    DashboardPageComponent
  ],
  providers: [],
})
export class DashboardModule {}
