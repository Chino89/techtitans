type Course = {
  id: number;
  title: string;
  content: string;
  image: string;
};

type CarouselItem = {
    img: string;
    alt: string;
  };

type LoginRequest = {
  email: string;
  password: string;
}

type RegisterRequest = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  terms: boolean;
}

type backEndError = {
  msg: string;
}

type User = {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  roles: string[];
  accessToken: string;
}

export { Course, CarouselItem, LoginRequest, User, RegisterRequest, backEndError };
