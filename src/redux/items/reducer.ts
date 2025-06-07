import { ItemActions } from './actions';
import { ItemActionTypes, ItemState } from './types';

const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
};

export function itemReducer(state = initialState, action: ItemActions): ItemState {
  switch (action.type) {
    case ItemActionTypes.REQUEST:
      return { ...state, loading: true, error: null };
    case ItemActionTypes.SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case ItemActionTypes.FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ItemActionTypes.ADD_ITEM:
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
}
