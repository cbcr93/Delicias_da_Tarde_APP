import { SalesEntity, SalesItemEntity } from '@models/types';

import { db } from '../db';

// Inserir uma venda e seus itens
export const insertSale = async (sale: SalesEntity) => {
  await db.runAsync(
    `INSERT INTO sales (id, date, price_total, amount_total, finish, user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      sale.id,
      sale.date,
      sale.price_total,
      sale.amount_total,
      sale.finish ? 1 : 0,
      sale.user_id ?? null,
    ],
  );
};

export const insertSale_Itens = async (saleItem: SalesItemEntity) => {
  await db.runAsync(
    `INSERT INTO sales_item (id, sales_id, products_id, name, amount, price)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      saleItem.id,
      saleItem.sales_id,
      saleItem.products_id,
      saleItem.name,
      saleItem.amount,
      saleItem.price,
    ],
  );
};

// Buscar todas as vendas (com itens)
export const getAllSales = async (): Promise<SalesEntity[]> => {
  const sales = await db.getAllAsync<SalesEntity>(`SELECT * FROM sales ORDER BY date DESC`);
  for (const sale of sales) {
    sale.items = await db.getAllAsync<SalesItemEntity>(
      `SELECT * FROM sales_item WHERE sales_id = ?`,
      [sale.id],
    );
  }
  return sales;
};

// Buscar vendas por data (agrupamento)
export const searchSalesByDate = async (date: string): Promise<SalesEntity[]> => {
  const sales = await db.getAllAsync<SalesEntity>(
    `SELECT * FROM sales WHERE date LIKE ? ORDER BY date DESC`,
    [`%${date}%`],
  );
  for (const sale of sales) {
    sale.items = await db.getAllAsync<SalesItemEntity>(
      `SELECT * FROM sales_item WHERE sales_id = ?`,
      [sale.id],
    );
  }
  return sales;
};

// Atualizar apenas o campo 'finish'
export const updateSaleFinish = async (id: string, finish: boolean) => {
  await db.runAsync(`UPDATE sales SET finish = ? WHERE id = ?`, [finish ? 1 : 0, id]);
};
