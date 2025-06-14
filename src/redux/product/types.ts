import * as models from '@models/types';

export enum ProductActionTypes {
  REQUEST = 'product/REQUEST',
  SUCCESS = 'product/SUCCESS',
  FAILURE = 'product/FAILURE',
  ADD_PRODUCT = 'product/ADD_PRODUCT',
  EDIT_PRODUCT = 'product/EDIT_PRODUCT',
  READ_PRODUCTS = 'product/READ_PRODUCTS',
  READ_ID_PRODUCT = 'product/READ_ID_PRODUCT',
  DELETE_PRODUCT = 'product/DELETE_PRODUCT',
  SEARCH_PRODUCT = 'product/SEARCH_PRODUCT',
}

export interface ProductState {
  products: models.ProductsEntities[];
  product: models.ProductsEntities | null;
}
