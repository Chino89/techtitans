import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  CategoryData,
  CategoryDataResponse,
} from 'src/app/core/interfaces/categoryInterfaces';
import {
  CourseData,
  CourseResponse,
} from 'src/app/core/interfaces/courseInterfaces';
import { BackEndError } from 'src/app/core/interfaces/interfaces';
import { TeacherData } from 'src/app/core/interfaces/userInterfaces';
import { CategoryService } from 'src/app/core/services/category/category.service';
import { CourseService } from 'src/app/core/services/course/course.service';

@Component({
  selector: 'app-find-course',
  templateUrl: './find-course.component.html',
  styleUrls: ['./find-course.component.css'],
})
export class FindCourseComponent implements OnInit {
  subscriptions: Subscription[] = [];
  backendErrors: BackEndError[] = [];
  categories: CategoryData[] = [];
  teachers: TeacherData[] = [];
  courses: CourseResponse[] = [];

  findCourseForm = this.formBuilder.group({
    categoria: [''],
    // docenteId: [''],
  });

  getData() {
    const getCategoriesServiceSubscription = this.categoryService
      .getCategories()
      .subscribe({
        next: (data: CategoryDataResponse) => (this.categories = data.data),
        error: (errorData) => {
          if (errorData.error.mensaje) {
            this.backendErrors = [{ mensaje: errorData.error.mensaje }];
          } else {
            this.backendErrors = errorData.error.errors as BackEndError[];
          }
        },
      });
    // const getTeachersServiceSubscription = this.userService
    //   .getTeachers()
    //   .subscribe({
    //     next: (data: TeacherDataResponse) => (this.teachers = data.data),
    //     error: (errorData) => console.log(errorData),
    //   });
    this.subscriptions.push(
      // getTeachersServiceSubscription,
      getCategoriesServiceSubscription
    );
  }

  onFindCourse() {
    const category = this.findCourseForm.value.categoria;
    const getCoursesByCategoryServiceSubscription = this.courseService
      .getCoursesByCategory(category as string)
      .subscribe({
        next: (data: CourseData) => (this.courses = data.data),
        error: (errorData) => {
          if (errorData.error.mensaje) {
            this.backendErrors = [{ mensaje: errorData.error.mensaje }];
          } else {
            this.backendErrors = errorData.error.errors as BackEndError[];
          }
        },
      });
    this.subscriptions.push(getCoursesByCategoryServiceSubscription);
  }

  get categoria() {
    return this.findCourseForm.controls.categoria;
  }
  // get docenteId() {
  //   return this.findCourseForm.controls.docenteId;
  // }

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
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
