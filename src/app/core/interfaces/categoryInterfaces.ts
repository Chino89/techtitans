export type CategoryDataResponse = {
  data: [CategoryData];
};

export type CategoryData = {
  id: Number;
  nombre: String;
  usuario: {
    nombre: String;
    apellido: String;
    email: String;
  };
};

export type CategoryName = {
  nombre: String;
};
