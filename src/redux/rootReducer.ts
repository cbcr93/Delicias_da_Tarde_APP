import { combineReducers } from 'redux';

import { CartReducer } from './cart/reducer';
import { itemReducer } from './items/reducer';
import { productReducer } from './product/reducer';
import { SalesReducer } from './sales/reducer';

export const rootReducer = combineReducers({
  item: itemReducer,
  product: productReducer,
  cart: CartReducer,
  sales: SalesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
