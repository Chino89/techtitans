import { UserDetail } from './enrollmentInterfaces';

export type UsersPayment = {
  data: UserPaymentmentData[];
};

export type UserPaymentmentData = {
  id: number;
  tokenPago: string;
  pago: false;
  fechaPago: null;
  usuario: UserDetail;
  inscripcion: inscriptionDetail | null;
};

export type inscriptionDetail = {
  id: number;
  codigoInscripcion: string;
  asistio: boolean;
  puntaje: string;
};

export type pagoDto = {
  pago: boolean
}

export type mensajeResponse = {
  mensaje: string;
}
