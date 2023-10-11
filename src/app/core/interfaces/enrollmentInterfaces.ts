import { CourseResponse } from './courseInterfaces';

export type EnrollmentResponse = {
  mensaje: string;
  code: string;
};

export type PaymentDetail = {
  id: number;
  tokenPago: string;
  fechaPago: null;
  pago: false;
};

export type UserDetail = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
};

export type UserEnrollment = {
  data: UserEnrollmentData[]
};

export type StudentDetail = {
  id:       number;
  nombre:   string;
  apellido: string;
  email?:   string;
}

export type AttendanceDetail = {
  id:                number;
  codigoInscripcion: string;
  asistio:           boolean;
  puntaje:           string;
  estudiante: StudentDetail;
  pago:              PaymentDetail;
}

export type UserEnrollmentData = {
  id: number;
  codigoInscripcion: string;
  asistio: Boolean;
  puntaje: string;
  curso: CourseResponse;
  estudiante: UserDetail;
  docente: UserDetail;
  pago: PaymentDetail;
  asistencia: AttendanceDetail[];
};

export type attendanceDto = {
  asistio: boolean;
  puntaje: string;
}
