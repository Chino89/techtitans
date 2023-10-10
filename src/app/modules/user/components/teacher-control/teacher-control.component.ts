import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CourseResponse } from 'src/app/core/interfaces/courseInterfaces';
import { UserEnrollment, UserEnrollmentData } from 'src/app/core/interfaces/enrollmentInterfaces';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';

@Component({
  selector: 'app-teacher-control',
  templateUrl: './teacher-control.component.html',
  styleUrls: ['./teacher-control.component.css'],
})
export class TeacherControlComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  @Input() courseContent: CourseResponse = {
    id: 0,
    nombre: '',
    descripcion: '',
    portada: '',
    public_id: '',
    dia_curso: '',
    hora_curso: '',
    duracion: '',
    precio: '',
    slug: '',
    categoria: { id: 0, nombre: '' },
    usuario: {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
    },
    docente: { id: 0, nombre: '', apellido: '' },
  };
  allAttendances: UserEnrollmentData[] = []
  asistence = 0;

  attendanceForm = this.formBuilder.group({
    alumno: ['', []],
  });

  markAsPresent() {
  }

  get alumno() {
    return this.attendanceForm.controls.alumno;
  }

  constructor(
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    const getAttendancesServiceSubscription = this.enrollmentService
      .getAttendances()
      .subscribe({
        next: (response: UserEnrollment) => {
          this.allAttendances = response.data;
          this.asistence = this.allAttendances.length;

        },  
        error: (errorData) => {
          console.log(errorData)
        },
      });
    this.subscriptions.push(getAttendancesServiceSubscription);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
