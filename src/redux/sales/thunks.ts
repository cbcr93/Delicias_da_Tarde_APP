import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import * as salesRepository from '@database/repositories/sales';
import * as models from '@models/types';

import * as salesActions from './actions';

export const fetchSales = () => async (dispatch: Dispatch<salesActions.SalesActions>) => {
  try {
    const payload: models.SalesEntity[] = await salesRepository.getAllSales();
    dispatch(salesActions.readSales(payload));
  } catch (e: unknown) {
    let message = 'Erro desconhecido';
    if (e instanceof Error) message = e.message;
    Alert.alert('Erro', message);
  }
};

export const addSale =
  (data: models.ISaleCreate) => async (dispatch: Dispatch<salesActions.SalesActions>) => {
    const saleId = uuidv4();

    try {
      await salesRepository.insertSale({
        id: saleId,
        date: new Date().toISOString(),
        price_total: data.price_total,
        amount_total: data.amount_total,
        finish: data.finish,
        user_id: data.user_id,
      });

      for (const item of data.itens) {
        await salesRepository.insertSale_Itens({
          id: uuidv4(),
          sales_id: saleId,
          products_id: item.id,
          name: item.name,
          amount: item.amount,
          price: item.price,
        });
      }

      const payload: models.SalesEntity[] = await salesRepository.getAllSales();
      dispatch(salesActions.readSales(payload));
    } catch (e: unknown) {
      let message = 'Erro desconhecido';
      if (e instanceof Error) message = e.message;
      Alert.alert('Erro ao registrar venda', message);
    }
  };
