import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseData, CourseResponse } from 'src/app/core/interfaces/courseInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  backendErrors: BackEndError[] = [];
  courses: CourseResponse[] = [];

  
  getData() {
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

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
