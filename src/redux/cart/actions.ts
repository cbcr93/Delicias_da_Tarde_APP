import * as models from '@models/types';

import { CartActionTypes } from './types';

export const addCart = (product: models.ProductsEntities) => ({
  type: CartActionTypes.ADD_CART as const,
  payload: product,
});

export const readCart = (products: models.ProductsEntities[]) => ({
  type: CartActionTypes.READ_CARTS as const,
  payload: products,
});

export const removeCart = () => ({
  type: CartActionTypes.DELETE_CART as const,
});

export type CartActions =
  | ReturnType<typeof addCart>
  | ReturnType<typeof readCart>
  | ReturnType<typeof removeCart>;
