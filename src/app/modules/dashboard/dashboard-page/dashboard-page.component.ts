import { AttendanceDetail } from './../../../core/interfaces/courseInterfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import carouselContent from '../../../../assets/carousel/carousel.json';
import { CourseService } from 'src/app/core/services/course/course.service';

import {
  CourseData,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  courses: CourseResponse[] = [];
  subscriptions: Subscription[] = [];
code: string = '';
  items = carouselContent;
  constructor(private http: HttpClient, private courseService: CourseService) {}

  ngOnInit(): void {
    const getAllCoursesServiceSubscription = this.courseService
      .getAllCourses()
      .subscribe({
        error: (errorData) => console.log(errorData),
        next: (data: CourseData) => {
          this.courses = data.data;
        },
      });
    this.subscriptions.push(getAllCoursesServiceSubscription);

  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
