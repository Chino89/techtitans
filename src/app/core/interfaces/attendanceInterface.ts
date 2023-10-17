export interface attendanceData {
  data: attendanceResponse;
}

export interface attendanceResponse {
  id: number;
  codigoInscripcion: string;
  asistio: boolean;
  puntaje: string;
  curso: Curso;
  estudiante: Docente;
  docente: Docente;
  pago: Pago;
}

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  portada: string;
  dia_curso: Date | null;
  hora_curso: string;
  duracion: string;
  precio: string;
  lugar: string;
  slug: string;
  categoria: Categoria;
  usuario: Docente;
  docente: Docente;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Docente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
}

export interface Pago {
  id: number;
  tokenPago: null;
  fechaPago: Date | null;
  pago: boolean;
}
