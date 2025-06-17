import { Dispatch } from 'redux';
import * as models from '@models/types';
import { RootState } from '@redux/rootReducer';
import * as productsRepository from '@database/repositories/products';
import { formatCents } from '@utils/formatters';
import { showToast } from '@utils/toast';

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

      if (payload && payload.amount === '0') {
        showToast({
          type: 'error',
          title: 'Não item no estoque!',
        });
      } else {
        if (!payload) payload = product;

        if (index !== -1) {
          const existing = { ...currentCart[index] };
          if (payload.amount === existing.amount) {
            showToast({
              type: 'error',
              title: 'Maximo de item no estoque!',
            });
          } else {
            const updatedAmount = Number(existing.amount) + 1;
            const updatedPrice = formatCents(Number(existing.price) + Number(payload.price));

            currentCart[index] = {
              ...existing,
              amount: updatedAmount.toString(),
              price: updatedPrice,
            };
            dispatch(cartActions.readCart(currentCart));
            showToast({
              type: 'success',
              title: 'Item adicionado no carrinho!',
            });
          }
        } else {
          currentCart.push({
            ...product,
            amount: '1',
            price: formatCents(Number(product.price)),
          });
          dispatch(cartActions.readCart(currentCart));
          showToast({
            type: 'success',
            title: 'Item adicionado no carrinho!',
          });
        }
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro desconhecido';
      console.log('Erro ao adicionar ao carrinho', message);
      showToast({
        type: 'error',
        title: 'Erro ao adicionar no carrinho!',
      });
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
      showToast({
        type: 'success',
        title: 'Item removido do carrinho!',
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro desconhecido';
      console.log('Erro ao remover ao carrinho', message);
      showToast({
        type: 'error',
        title: 'Erro ao remover no carrinho!',
      });
    }
  };

export const removeAllCart = () => async (dispatch: Dispatch<cartActions.CartActions>) => {
  try {
    dispatch(cartActions.removeCart());
    showToast({
      type: 'success',
      title: 'Carrinho limpo!',
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Erro desconhecido';
    console.log('Erro ao remover ao carrinho', message);
    showToast({
      type: 'error',
      title: 'Erro ao remover no carrinho!',
    });
  }
};
