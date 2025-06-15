import { SalesActions } from './actions';
import { SaleActionTypes, SaleState } from './types';

const initialState: SaleState = {
  sales: [],
};

export function SalesReducer(state = initialState, action: SalesActions): SaleState {
  switch (action.type) {
    case SaleActionTypes.READ_SALES:
      return { ...state, sales: action.payload };

    case SaleActionTypes.DELETE_SALE:
      return { ...state, sales: [] };

    default:
      return state;
  }
}
