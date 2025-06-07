import * as models from '@models/types';

export enum ItemActionTypes {
  REQUEST = 'item/REQUEST',
  SUCCESS = 'item/SUCCESS',
  FAILURE = 'item/FAILURE',
  ADD_ITEM = 'item/ADD_ITEM',
}

export interface ItemState {
  items: models.Item[];
  loading: boolean;
  error: string | null;
}
