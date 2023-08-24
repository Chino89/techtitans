import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-new-courses',
  templateUrl: './new-courses.component.html',
  styleUrls: ['./new-courses.component.css']
})
export class NewCoursesComponent implements OnInit {
  @Input() coursesContent: Course[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
