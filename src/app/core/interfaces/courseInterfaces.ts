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
  
  export type CourseResponse = {
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
    categoria: { id: number; nombre: string };
    usuario: {
      id: number;
      nombre: string;
      apellido: string;
      email: string;
    };
    docente: {
      id: number;
      nombre: string;
      apellido: string;
    };
  };

  export type CourseData = {
    data: CourseResponse[];
  };
  
  export type CourseDetailResponse = {
    data: CourseResponse;
  };