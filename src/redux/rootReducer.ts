import { combineReducers } from 'redux';

import { itemReducer } from './items/reducer';
import { productReducer } from './product/reducer';

export const rootReducer = combineReducers({
  item: itemReducer,
  product: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
