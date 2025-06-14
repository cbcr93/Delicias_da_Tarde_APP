import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import * as productsRepository from '@database/repositories/products';
import * as models from '@models/types';

import * as productsActions from './actions';
import { Alert } from 'react-native';

export const fetchProduct = () => async (dispatch: Dispatch<productsActions.ProductActions>) => {
  try {
    const payload: models.ProductsEntities[] = await productsRepository.getAllProducts();
    dispatch(productsActions.readProduct(payload));
  } catch (e: unknown) {
    let message = 'Erro desconhecido';

    if (e instanceof Error) {
      message = e.message;
    }
    Alert.alert('Erro', message);
  }
};

export const addProduct =
  (product: models.IProductsCreate) => async (dispatch: Dispatch<productsActions.ProductActions>) => {
    const id = uuidv4();
    try {
      await productsRepository.insertProduct({ ...product, id });
      const payload: models.ProductsEntities[] = await productsRepository.getAllProducts();
      dispatch(productsActions.readProduct(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }
      Alert.alert('Erro', message);

    }
  };

export const editProduct =
  (product: models.ProductsEntities) => async (dispatch: Dispatch<productsActions.ProductActions>) => {
    try {
      await productsRepository.updateProduct(product);
      const payload: models.ProductsEntities[] = await productsRepository.getAllProducts();
      dispatch(productsActions.readProduct(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }
      Alert.alert('Erro', message);

    }
  };

export const removeProductById =
  (id: string) => async (dispatch: Dispatch<productsActions.ProductActions>) => {
    try {
      await productsRepository.deleteProduct(id);
      const payload: models.ProductsEntities[] = await productsRepository.getAllProducts();
      dispatch(productsActions.readProduct(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }

      Alert.alert('Erro', message);
    }
  };

export const getProductById =
  (id: string) => async (dispatch: Dispatch<productsActions.ProductActions>) => {
    try {
      const payload: models.ProductsEntities | null = await productsRepository.getProductById(id);
      dispatch(productsActions.readIdProduct(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }

      Alert.alert('Erro', message);
    }
  };

export const searchProduct =
  (search: string) => async (dispatch: Dispatch<productsActions.ProductActions>) => {
    try {
      const payload: models.ProductsEntities[] = await productsRepository.searchProducts(search);
      dispatch(productsActions.readProduct(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';

      if (e instanceof Error) {
        message = e.message;
      }

      Alert.alert('Erro', message);
    }
  };
