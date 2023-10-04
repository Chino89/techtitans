export type UserDataResponse = {
  data: [UserResponse];
};

export type GetUser = {
  data: UserResponse;
};

export type UserResponse = {
  [key: string]: string | number | boolean | null;
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  avatar: string;
  public_id: null;
  status: boolean;
};

export type User = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  accessToken: string;
};

export type UserEditRequest = {
  [key: string]: string | number | boolean | null | Blob;
  nombre: string;
  apellido: string;
  email: string;
  imageFile: Blob;
  password: string;
  confirm_password: string;
};

// USER-ROLE = 2 (Docente)

export type TeacherDataResponse = {
  data: [TeacherData];
};

export type TeacherData = {
  id: Number;
  docente: String;
};

// USER-ROLE = 3 (Estudiante)
