export type ProductsEntities = {
  id: string;
  name: string;
  description: string;
  price: string;
  type: string;
  code: string;
  amount: string;
};

export type IProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  type: string;
  code: string;
  amount: number;
};

export type IProductsCreate = {
  name: string;
  description: string;
  price: string;
  type: string;
  code: string;
  amount: string;
};