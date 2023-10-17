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

export type CourseFormData = {
  [key: string]: string | null;
  nombre: string | null;
  descripcion: string | null;
  dia: string | null;
  hora: string | null;
  duracion: string | null;
  precio: string | null;
  categoriaId: string | null;
  docenteId: string | null;
};

export type PaymentDetail = {
  id: number;
  tokenPago: string;
  fechaPago: null;
  pago: false;
};

export type StudentDetail = {
  id: number;
  nombre: string;
  apellido: string;
  email?: string;
};

export type TeacherDetail = {
  id: number;
  nombre: string;
  apellido: string;
};

export type AttendanceDetail = {
  id: number;
  codigoInscripcion: string;
  asistio: boolean;
  puntaje: string;
  estudiante: StudentDetail;
  pago: PaymentDetail;
};

export type CourseResponse = {
  [key: string]:
    | string
    | number
    | Blob
    | AttendanceDetail[]
    | StudentDetail
    | TeacherDetail
    | CategoryInfo;
  asistencia: AttendanceDetail[];
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
  categoria: CategoryInfo;
  usuario: StudentDetail;
  docente: TeacherDetail;
};

export type CategoryInfo = { id: number; nombre: string };

export type CourseData = {
  data: CourseResponse[];
};

export type CourseDetailResponse = {
  data: CourseResponse;
};
