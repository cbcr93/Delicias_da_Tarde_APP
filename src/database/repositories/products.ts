import { ProductsEntities } from '@models/types';

import { db } from '../db';

export const insertProduct = async (product: ProductsEntities) => {
  await db.runAsync(
    `INSERT INTO products (id, name, description, price, type, code, amount) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      product.id,
      product.name,
      product.description ?? '',
      product.price,
      product.type,
      product.code,
      product.amount,
    ],
  );
};

export const getAllProducts = async (): Promise<ProductsEntities[]> => {
  return await db.getAllAsync<ProductsEntities>(`SELECT * FROM products ORDER BY name ASC`);
};

export const getProductById = async (id: string): Promise<ProductsEntities | null> => {
  const result = await db.getFirstAsync<ProductsEntities>(`SELECT * FROM products WHERE id = ?`, [
    id,
  ]);
  return result ?? null;
};

export const updateProduct = async (product: ProductsEntities) => {
  await db.runAsync(
    `UPDATE products SET name = ?, description = ?, price = ?, type = ?, code = ?, amount = ? WHERE id = ?`,
    [
      product.name,
      product.description ?? '',
      product.price,
      product.type,
      product.code,
      product.amount,
      product.id,
    ],
  );
};

export const deleteProduct = async (id: string) => {
  await db.runAsync(`DELETE FROM products WHERE id = ?`, [id]);
};

export const searchProducts = async (query: string): Promise<ProductsEntities[]> => {
  return await db.getAllAsync<ProductsEntities>(
    `SELECT * FROM products 
     WHERE name LIKE ? OR code LIKE ? OR type LIKE ?
     ORDER BY name ASC`,
    [`%${query}%`, `%${query}%`, `%${query}%`],
  );
};
