import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  CourseData,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-find-some-courses',
  templateUrl: './find-some-courses.component.html',
  styleUrls: ['./find-some-courses.component.css'],
})
export class FindSomeCoursesComponent implements OnInit {
  subscriptions: Subscription[] = [];
  backendErrors: BackEndError[] = [];
  allCourses: CourseResponse[] = [];
  filteredCourses: CourseResponse[] = [];

  findCertainCourse = this.formBuilder.group({
    search: [''],
  });

  getData() {
    const getAllCoursesServiceSubscription = this.courseService
      .getAllCourses()
      .subscribe({
        error: (errorData) => console.log(errorData),
        next: (data: CourseData) => {
          this.allCourses = data.data;
          console.log(this.allCourses, 'la data');
        },
      });
    this.subscriptions.push(getAllCoursesServiceSubscription);
  }

  filterCourses(filterParam: string): void {
    this.filteredCourses = this.allCourses.filter((course) => {
      return course.slug.includes(filterParam);
    });
  }

  onFindCourse() {
    const filterParam = this.search.value;
    this.filterCourses(filterParam as string);
  }

  get search() {
    return this.findCertainCourse.controls.search;
  }

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
