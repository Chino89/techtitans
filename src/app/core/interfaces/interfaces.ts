import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export type courseRequest = {
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

export type courseResponse = {
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
  categoria: {nombre: string}
  usuario: {
    nombre: string;
    apellido: string;
    email: string;
  }
  docente: {
    nombre: string;
    apellido: string;
  }
};

export type courseData = {
  data: courseResponse
}

export type CarouselItem = {
  img: string;
  alt: string;
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

export type backEndError = {
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

export interface onExit {
  onExit: (
    nextRoute: RouterStateSnapshot | undefined
  ) => Observable<boolean> | Promise<boolean> | boolean;
}
