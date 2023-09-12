import { Observable } from 'rxjs';

export type Course = {
  id: number;
  title: string;
  content: string;
  image: string;
  imageUrl: string;
  description: string;
};

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
  onExit: () => Observable<boolean> | Promise<boolean> | boolean;
}
