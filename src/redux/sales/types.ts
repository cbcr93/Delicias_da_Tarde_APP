import * as models from '@models/types';

export enum SaleActionTypes {
  ADD_SALE = 'sales/ADD_SALE',
  READ_SALES = 'sales/READ_SALES',
  DELETE_SALE = 'sales/DELETE_SALE',
  READ_SUMMARY = 'summary/READ_SUMMARY',
}

export interface SaleState {
  sales: models.SalesEntity[];
  summary: models.ISalesSummary | null;
}
