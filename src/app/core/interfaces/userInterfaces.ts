export type UserDataResponse = {
  data: [UserResponse];
};

export type GetUser = {
  data: UserResponse;
};

export type UserResponse = {
  id: Number;
  nombre: String;
  apellido: String;
  email: String;
  avatar: String;
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
  nombre: String;
  apellido: String;
  imageFile: Blob;
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
