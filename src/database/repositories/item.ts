import { Item } from '@models/types/item';

import { db } from '../db';

export const insertItem = async (item: Item) => {
  await db.runAsync(`INSERT INTO items (title, description, orderIndex) VALUES (?, ?, ?)`, [
    item.title,
    item.description,
    item.orderIndex,
  ]);
};

export const getItems = async (): Promise<Item[]> => {
  const results = await db.getAllAsync<Item>(`SELECT * FROM items ORDER BY orderIndex ASC`);
  return results;
};

export const deleteItem = async (id: number) => {
  await db.runAsync(`DELETE FROM items WHERE id = ?`, [id]);
};

export const searchItemsByTitle = async (title: string): Promise<Item[]> => {
  const results = await db.getAllAsync<Item>(
    `SELECT * FROM items WHERE title LIKE ? ORDER BY orderIndex ASC`,
    [`%${title}%`],
  );
  return results;
};
