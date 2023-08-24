import { Component, OnInit } from '@angular/core';
import carouselContent from '../../../../assets/carousel/carousel.json';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/core/interfaces/interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  courses: Course[] = [];

  items = carouselContent;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Course[]>('	https://jsonplaceholder.org/posts')
      .pipe(map((r) => r.slice(1, 7)))
      .subscribe((response) => (this.courses = response));
  }
}
