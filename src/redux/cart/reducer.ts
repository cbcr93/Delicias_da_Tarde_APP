import { CartActions } from './actions';
import { CartActionTypes, CartState } from './types';

const initialState: CartState = {
  cart: [],
};

export function CartReducer(state = initialState, action: CartActions): CartState {
  switch (action.type) {
    case CartActionTypes.READ_CARTS:
      return { ...state, cart: action.payload };

    case CartActionTypes.DELETE_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
}
