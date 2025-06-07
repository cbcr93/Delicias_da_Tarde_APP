import { Dispatch } from 'redux';
import * as itemRepository from '@database/repositories/item';
import * as models from '@models/types';

import * as itemActions from './actions';

export const fetchItems = () => async (dispatch: Dispatch<itemActions.ItemActions>) => {
  dispatch(itemActions.itemsRequest());

  try {
    const payload: models.Item[] = await itemRepository.getItems();
    dispatch(itemActions.itemsSuccess(payload));
  } catch (e: unknown) {
    let message = 'Erro desconhecido';

    if (e instanceof Error) {
      message = e.message;
    }

    dispatch(itemActions.itemsFailure(message));
  }
};

export const searchItems =
  (search: string) => async (dispatch: Dispatch<itemActions.ItemActions>) => {
    dispatch(itemActions.itemsRequest());

    try {
      const payload: models.Item[] = await itemRepository.searchItemsByTitle(search);
      dispatch(itemActions.itemsSuccess(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }

      dispatch(itemActions.itemsFailure(message));
    }
  };

export const addItems =
  (item: models.Item) => async (dispatch: Dispatch<itemActions.ItemActions>) => {
    dispatch(itemActions.itemsRequest());

    try {
      await itemRepository.insertItem(item);
      const payload: models.Item[] = await itemRepository.getItems();
      dispatch(itemActions.itemsSuccess(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }

      dispatch(itemActions.itemsFailure(message));
    }
  };

export const removeItemsById =
  (id: number) => async (dispatch: Dispatch<itemActions.ItemActions>) => {
    dispatch(itemActions.itemsRequest());

    try {
      await itemRepository.deleteItem(id);
      const payload: models.Item[] = await itemRepository.getItems();
      dispatch(itemActions.itemsSuccess(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }

      dispatch(itemActions.itemsFailure(message));
    }
  };
