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

