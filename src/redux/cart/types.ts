import * as models from '@models/types';

export enum CartActionTypes {
  ADD_CART = 'cart/ADD_CART',
  READ_CARTS = 'cart/READ_CARTS',
  DELETE_CART = 'cart/DELETE_CART',
}

export interface CartState {
  cart: models.ProductsEntities[];
}
