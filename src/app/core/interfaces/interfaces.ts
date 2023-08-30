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
  email: string,
  password: string;
}

type User = {
  id: number,
  name?: string
  lastname?: string
  email: string
  message?: string
}

export { Course, CarouselItem, LoginRequest, User };
