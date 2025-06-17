import { ISalesSummary, SalesEntity, SalesItemEntity } from '@models/types';

import { db } from '../db';

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

export const updateSaleFinish = async (id: string, finish: boolean) => {
  await db.runAsync(`UPDATE sales SET finish = ? WHERE id = ?`, [finish ? 1 : 0, id]);
};

export const getSalesSummaryByDateRange = async (
  startDate: string,
  endDate: string,
): Promise<ISalesSummary> => {
  const salesResult = await db.getAllAsync<{
    amount_total: string;
    price_total: string;
  }>(`SELECT amount_total, price_total FROM sales WHERE date BETWEEN ? AND ?`, [
    startDate,
    endDate,
  ]);

  let amount_total_sales = 0;
  let price_total_sales = 0;

  for (const sale of salesResult) {
    const amount = parseInt(sale.amount_total, 10);
    const priceRaw = sale.price_total?.replace(/\D/g, '').trim() ?? '';

    const price = priceRaw.length > 0 && !isNaN(Number(priceRaw)) ? Number(priceRaw) / 100 : 0;

    amount_total_sales += isNaN(amount) ? 0 : amount;
    price_total_sales += price;
  }

  const average_ticket_sales = amount_total_sales > 0 ? price_total_sales / amount_total_sales : 0;

  const stockResult = await db.getAllAsync<{ amount: string }>(`SELECT amount FROM products`);

  const amount_total_stoke = stockResult.reduce((acc, curr) => {
    const parsed = parseInt(curr.amount, 10);
    return acc + (isNaN(parsed) ? 0 : parsed);
  }, 0);

  return {
    amount_total_sales,
    price_total_sales: price_total_sales.toFixed(2),
    average_ticket_sales: average_ticket_sales.toFixed(2),
    amount_total_stoke,
  };
};
