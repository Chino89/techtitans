import { Component, Input, OnInit } from '@angular/core';
import { AttendanceDetail, CourseResponse } from 'src/app/core/interfaces/courseInterfaces';


@Component({
  selector: 'app-new-courses',
  templateUrl: './new-courses.component.html',
  styleUrls: ['./new-courses.component.css'],
})
export class NewCoursesComponent implements OnInit {
  @Input() coursesContent: CourseResponse[] = [];
  @Input() codigoInscripcion: string = '';

  constructor() {}

  ngOnInit(): void {
    console.log(this.coursesContent);

  }
}
