import { Component } from '@angular/core';
import carouselContent from '../../../../assets/carousel/carousel.json';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  items = carouselContent;
  constructor() {}
}
