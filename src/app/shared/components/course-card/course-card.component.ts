import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {
  @Input() courseContent: Course = {
    id: 0,
    title: '',
    content: '',
    image: '',
    description: '',
    category:''
    
  };

  constructor() { }

  ngOnInit(): void {
  }
}


