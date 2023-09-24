import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.css'],
})
export class CoursesPageComponent implements OnInit {
  courses: Course[] = [];
  filteredCoursesInSection: Course[] = [];
  selectedCategory: string = 'todos';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<Course[]>('https://jsonplaceholder.typicode.com/posts') // Cambiar a la URL correcta de los cursos
      .subscribe((allCourses) => {
        this.courses = allCourses;
        this.filteredCoursesInSection = allCourses;
      });
  }

  filterCoursesByCategoryInSection(): void {
    if (this.selectedCategory === 'todos') {
      this.filteredCoursesInSection = this.courses;
    } else {
      this.filteredCoursesInSection = this.courses.filter(
        (curso) => curso.category === this.selectedCategory
      );
    }
  }
}
