import * as models from '@models/types';

export enum SaleActionTypes {
  ADD_SALE = 'sales/ADD_SALE',
  READ_SALES = 'sales/READ_SALES',
  DELETE_SALE = 'sales/DELETE_SALE',
}

export interface SaleState {
  sales: models.SalesEntity[];
}
