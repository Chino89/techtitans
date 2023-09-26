import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export type CourseRequest = {
  nombre: string;
  descripcion: string;
  dia: string;
  hora: string;
  duracion: string;
  precio: string;
  categoriaId: string;
  docenteId: string;
  file: Blob;
};

export type CourseResponse = {
  id: number;
  nombre: string;
  descripcion: string;
  portada: string;
  public_id: string;
  dia_curso: string;
  hora_curso: string;
  duracion: string;
  precio: string;
  slug: string;
  categoria: { nombre: string };
  usuario: {
    nombre: string;
    apellido: string;
    email: string;
  };
  docente: {
    nombre: string;
    apellido: string;
  };
};

export type CourseData = {
  data: CourseResponse[];
};

export type CourseDetailResponse = {
  data: CourseResponse;
};

export type CarouselItem = {
  img: string;
  alt: string;
};

export type DropdownItem = {
  svg: string;
  routerLink: string;
  component: string;
  phrase: string;
};

export type Customizer = {
  svg: string;
  action: string;
  style: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  terms: boolean;
};

export type SetPasswordRequest = {
  password: string;
  confirm_password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type BackEndError = {
  mensaje: string;
};

export type BackEndResponse = {
  mensaje: string;
};

export type User = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  accessToken: string;
};

export type TeacherDataResponse = {
  data: [TeacherData];
};

export type TeacherData = {
  id: Number;
  docente: String;
};

export type CategoryDataResponse = {
  data: [CategoryData];
};

export type CategoryData = {
  id: Number;
  nombre: String;
  usuario: {
    nombre: String;
    apellido: String;
    email: String;
  };
};

export interface onExit {
  onExit: (
    nextRoute: RouterStateSnapshot | undefined
  ) => Observable<boolean> | Promise<boolean> | boolean;
}
