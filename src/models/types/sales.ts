import * as models from '@models/types';

export interface SalesItemEntity {
  id: string;
  sales_id: string;
  products_id: string;
  name: string;
  amount: string;
  price: string;
}

export interface SalesEntity {
  id: string;
  date: string;
  price_total: string;
  amount_total: string;
  finish: boolean;
  user_id?: string;
  items?: SalesItemEntity[];
}

export interface ISaleCreate {
  price_total: string;
  amount_total: string;
  finish: boolean;
  user_id?: string;
  itens: models.ProductsEntities[];
}

export interface ISalesSummary {
  amount_total_sales: number;
  price_total_sales: string;
  average_ticket_sales: string;
  amount_total_stoke: number;
}
