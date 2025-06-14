import { ProductActions } from './actions';
import { ProductActionTypes, ProductState } from './types';

const initialState: ProductState = {
  products: [],
  product: null,
};

export function productReducer(state = initialState, action: ProductActions): ProductState {
  switch (action.type) {
    case ProductActionTypes.READ_PRODUCTS:
      return { ...state, products: action.payload };
    case ProductActionTypes.READ_ID_PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state;
  }
}
