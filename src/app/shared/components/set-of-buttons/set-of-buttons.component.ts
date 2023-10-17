import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LoginService } from 'src/app/core/services/auth/login.service';
import { buttonInteractions } from '../../../../assets/icons/buttonInteractions';
import { Subscription } from 'rxjs';
import {
  BackEndResponse,
  Customizer,
} from 'src/app/core/interfaces/interfaces';
import { User } from 'src/app/core/interfaces/userInterfaces';
import { CourseResponse } from 'src/app/core/interfaces/courseInterfaces';
import { EnrollmentService } from 'src/app/core/services/enrollment/enrollment.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-set-of-buttons',
  templateUrl: './set-of-buttons.component.html',
  styleUrls: ['./set-of-buttons.component.css'],
})
export class SetOfButtonsComponent implements OnInit, OnDestroy {
  buttons: {
    [key: string]: Customizer;
  } = buttonInteractions;
  userIsLoged = false;
  userData: User = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    roles: [''],
    accessToken: '',
  };
  subscriptions: Subscription[] = [];
  currentDate: string | null = null;

  @Input() inscriptionCode: string = '';
  @Input() paymentToken: string = '';
  @Input() payment: boolean = false;
  @Input() codigoInscripcion: string = '';
  @Input() courseData: CourseResponse = {
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
    asistencia: [
      {
        id: 0,
        codigoInscripcion: '',
        asistio: false,
        puntaje: '',
        estudiante: {
          id: 0,
          nombre: '',
          apellido: '',
          email: '',
        },
        pago: {
          id: 0,
          tokenPago: '',
          fechaPago: null,
          pago: false,
        },
      },
    ],
  };

  @Output() showToast = new EventEmitter<string>();
  @Output() backEndErrors = new EventEmitter<BackEndResponse>();

  onSubscribe() {
    const param = this.route.snapshot.paramMap.get('identificator') as string;
    const id = Number(this.userData.id);

    const courseEnrollmentServiceSubscription = this.enrollmentService
      .courseEnrollment(param, id)
      .subscribe({
        error: (error) => {
          this.showToast.emit('error' as string);
          this.backEndErrors.emit(error.error);
        },
        complete: () => {
          this.showToast.emit('check' as string);
        },
      });
    this.subscriptions.push(courseEnrollmentServiceSubscription);
  }

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService,
    public datepipe: DatePipe
  ) {
    this.currentDate = this.datepipe.transform(new Date(), 'dd/MM/yyyy');
  }

  ngOnInit(): void {
    const currentUserLoginOnServiceSubscription =
      this.loginService.currentUserLoginOn.subscribe({
        next: (userIsLoged) => {
          this.userIsLoged = userIsLoged;
        },
      });
    this.subscriptions.push(currentUserLoginOnServiceSubscription);

    const currentUserDataServiceSubscription =
      this.loginService.currentUserData.subscribe({
        next: (userData) => {
          this.userData = userData;
        },
      });
    this.subscriptions.push(currentUserDataServiceSubscription);
  }

  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
