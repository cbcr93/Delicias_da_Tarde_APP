import { SalesActions } from './actions';
import { SaleActionTypes, SaleState } from './types';

const initialState: SaleState = {
  sales: [],
  summary: null,
};

export function SalesReducer(state = initialState, action: SalesActions): SaleState {
  switch (action.type) {
    case SaleActionTypes.READ_SALES:
      return { ...state, sales: action.payload };

    case SaleActionTypes.DELETE_SALE:
      return { ...state, sales: [] };

    case SaleActionTypes.READ_SUMMARY:
      return { ...state, summary: action.payload };

    default:
      return state;
  }
}
