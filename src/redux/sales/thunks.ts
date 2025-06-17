import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import * as productsRepository from '@database/repositories/products';
import * as salesRepository from '@database/repositories/sales';
import * as models from '@models/types';
import { showToast } from '@utils/toast';

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

export const fetchSalesSummaryByDateRange =
  (startDate?: string, endDate?: string) =>
    async (dispatch: Dispatch) => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();

        const defaultStart = new Date(year, month, 1);
        const defaultEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

        const start = startDate ?? defaultStart.toISOString();
        const end = endDate ?? defaultEnd.toISOString();

        const payload: models.ISalesSummary =
          await salesRepository.getSalesSummaryByDateRange(start, end);
        dispatch(salesActions.readSumary(payload));
      } catch (e: unknown) {
        let message = 'Erro desconhecido';
        if (e instanceof Error) message = e.message;
        Alert.alert('Erro ao obter resumo de vendas', message);
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

        const originalProduct = await productsRepository.getProductById(item.id);
        if (item.id && item.amount && originalProduct) {
          const newAmount = (Number(originalProduct.amount) ?? 0) - (Number(item.amount) ?? 0);

          const updatedProduct = {
            ...originalProduct,
            amount: newAmount > 0 ? newAmount.toString() : '0',
          };

          await productsRepository.updateProduct(updatedProduct);
        }

      }
      const payload: models.SalesEntity[] = await salesRepository.getAllSales();
      dispatch(salesActions.readSales(payload));
      showToast({
        type: 'success',
        title: 'Compra finalizada!',
      });
    } catch (e: unknown) {
      let message = 'Erro desconhecido';
      if (e instanceof Error) message = e.message;
      console.log('Erro ao registrar venda', message);
      showToast({
        type: 'error',
        title: 'Erro ao registrar venda!',
      });
    }
  };

export const editFinishSale =
  (data: models.SalesEntity, finish: boolean) => async (dispatch: Dispatch<salesActions.SalesActions>) => {
    try {
      await salesRepository.updateSaleFinish(
        data.id,
        finish ? true : false,
      );

      const payload: models.SalesEntity[] = await salesRepository.getAllSales();
      dispatch(salesActions.readSales(payload));
      showToast({
        type: 'success',
        title: 'Venda Editada!',
      });
    } catch (e: unknown) {
      let message = 'Erro desconhecido';
      if (e instanceof Error) message = e.message;
      console.log('Erro ao registrar venda', message);
      showToast({
        type: 'error',
        title: 'Erro ao editar venda!',
      });
    }
  };
