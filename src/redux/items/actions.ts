import { Item } from '@models/types/item';

import { ItemActionTypes } from './types';

export const itemsRequest = () => ({
  type: ItemActionTypes.REQUEST as const,
});

export const itemsSuccess = (items: Item[]) => ({
  type: ItemActionTypes.SUCCESS as const,
  payload: items,
});

export const itemsFailure = (error: string) => ({
  type: ItemActionTypes.FAILURE as const,
  payload: error,
});

export const addItem = (item: Item) => ({
  type: ItemActionTypes.ADD_ITEM as const,
  payload: item,
});

export type ItemActions =
  | ReturnType<typeof itemsRequest>
  | ReturnType<typeof itemsSuccess>
  | ReturnType<typeof itemsFailure>
  | ReturnType<typeof addItem>;
