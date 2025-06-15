import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import * as models from '@models/types';
import { RootState } from '@redux/rootReducer';
import * as productsRepository from '@database/repositories/products';
import { formatCents } from '@utils/formatters';

import * as cartActions from './actions';

export const addCart =
  (product: models.ProductsEntities) =>
  async (dispatch: Dispatch<cartActions.CartActions>, getState: () => RootState) => {
    try {
      const state = getState();
      const currentCart = [...state.cart.cart];
      const index = currentCart.findIndex((p) => p.id === product.id);

      let payload: models.ProductsEntities | null = await productsRepository.getProductById(
        product.id,
      );

      if (!payload) payload = product;

      if (index !== -1) {
        const existing = { ...currentCart[index] };

        const updatedAmount = Number(existing.amount) + 1;
        const updatedPrice = formatCents(Number(existing.price) + Number(payload.price));

        currentCart[index] = {
          ...existing,
          amount: updatedAmount.toString(),
          price: updatedPrice,
        };
      } else {
        currentCart.push({
          ...product,
          amount: '1',
          price: formatCents(Number(product.price)),
        });
      }

      dispatch(cartActions.readCart(currentCart));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro desconhecido';
      Alert.alert('Erro ao adicionar ao carrinho', message);
    }
  };

export const removeCartById =
  (product: models.ProductsEntities) =>
  async (dispatch: Dispatch<cartActions.CartActions>, getState: () => RootState) => {
    try {
      const state = getState();
      const currentCart = [...state.cart.cart];
      const index = currentCart.findIndex((p) => p.id === product.id);

      let payload: models.ProductsEntities | null = await productsRepository.getProductById(
        product.id,
      );

      if (!payload) payload = product;

      if (index === -1) return;

      const existing = { ...currentCart[index] };

      if (Number(existing.amount) > 1) {
        const updatedAmount = Number(existing.amount) - 1;
        const updatedPrice = formatCents(Number(existing.price) - Number(payload.price));

        currentCart[index] = {
          ...existing,
          amount: updatedAmount.toString(),
          price: updatedPrice,
        };
      } else {
        currentCart.splice(index, 1);
      }

      dispatch(cartActions.readCart(currentCart));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro desconhecido';
      Alert.alert('Erro ao remover do carrinho', message);
    }
  };

export const removeAllCart = () => async (dispatch: Dispatch<cartActions.CartActions>) => {
  try {
    dispatch(cartActions.removeCart());
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Erro desconhecido';
    Alert.alert('Erro ao remover do carrinho', message);
  }
};
