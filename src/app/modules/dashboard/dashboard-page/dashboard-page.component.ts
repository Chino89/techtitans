import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import carouselContent from '../../../../assets/carousel/carousel.json';
import { CourseService } from 'src/app/core/services/course/course.service';

import { courseResponse } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  courses: courseResponse[] = [];

  items = carouselContent;
  constructor(private http: HttpClient, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe({
      error: (errorData) => console.log(errorData),
      next: (data: any) => {
        this.courses = data.data;
        console.log(this.courses, 'cursos');
      },
    });
  }
}
