
import { ProductsEntities } from '@models/types';
import { db } from '../db';

// CREATE
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
    ]
  );
};

// READ (All)
export const getAllProducts = async (): Promise<ProductsEntities[]> => {
  return await db.getAllAsync<ProductsEntities>(`SELECT * FROM products ORDER BY name ASC`);
};

// READ (By ID)
export const getProductById = async (id: string): Promise<ProductsEntities | null> => {
  const result = await db.getFirstAsync<ProductsEntities>(`SELECT * FROM products WHERE id = ?`, [id]);
  return result ?? null;
};

// UPDATE
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
    ]
  );
};

// DELETE
export const deleteProduct = async (id: string) => {
  await db.runAsync(`DELETE FROM products WHERE id = ?`, [id]);
};

// SEARCH by name or code
export const searchProducts = async (query: string): Promise<ProductsEntities[]> => {
  return await db.getAllAsync<ProductsEntities>(
    `SELECT * FROM products 
     WHERE name LIKE ? OR code LIKE ? OR type LIKE ?
     ORDER BY name ASC`,
    [`%${query}%`, `%${query}%`, `%${query}%`]
  );
};
