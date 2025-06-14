import * as models from '@models/types';

import { ProductActionTypes } from './types';

export const addProduct = (product: models.ProductsEntities) => ({
  type: ProductActionTypes.ADD_PRODUCT as const,
  payload: product,
});

export const readProduct = (products: models.ProductsEntities[]) => ({
  type: ProductActionTypes.READ_PRODUCTS as const,
  payload: products,
});

export const readIdProduct = (product: models.ProductsEntities | null) => ({
  type: ProductActionTypes.READ_ID_PRODUCT as const,
  payload: product,
});

export const editProduct = (product: models.ProductsEntities) => ({
  type: ProductActionTypes.EDIT_PRODUCT as const,
  payload: product,
});

export const removeProduct = () => ({
  type: ProductActionTypes.DELETE_PRODUCT as const,
});

export type ProductActions =
  | ReturnType<typeof addProduct>
  | ReturnType<typeof readProduct>
  | ReturnType<typeof readIdProduct>
  | ReturnType<typeof editProduct>
  | ReturnType<typeof removeProduct>;
