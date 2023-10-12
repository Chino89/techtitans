import { Component, OnInit, Input } from '@angular/core';
import { TeacherData } from 'src/app/core/interfaces/userInterfaces';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.css']
})
export class TeacherCardComponent implements OnInit {
  @Input() teacher: TeacherData = {
    id: 0,
    docente: '',
    email: '',
    avatar: '',
  } 

  constructor() { }

  ngOnInit(): void {
  }

}
