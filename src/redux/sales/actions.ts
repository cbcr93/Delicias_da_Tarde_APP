import * as models from '@models/types';

import { SaleActionTypes } from './types';

export const addSales = (product: models.SalesEntity) => ({
  type: SaleActionTypes.ADD_SALE as const,
  payload: product,
});

export const readSales = (products: models.SalesEntity[]) => ({
  type: SaleActionTypes.READ_SALES as const,
  payload: products,
});

export const removeSales = () => ({
  type: SaleActionTypes.DELETE_SALE as const,
});

export const readSumary = (summary: models.ISalesSummary) => ({
  type: SaleActionTypes.READ_SUMMARY as const,
  payload: summary,
});

export type SalesActions =
  | ReturnType<typeof addSales>
  | ReturnType<typeof readSales>
  | ReturnType<typeof readSumary>
  | ReturnType<typeof removeSales>;
