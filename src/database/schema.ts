import { db } from './db';

export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      orderIndex INTEGER
    );
  `);

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        type INTEGER DEFAULT '1',
        status INTEGER DEFAULT '2'
      );`,
  );

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS recovery_codes (
      email TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );`,
  );

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS products(
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT NOT NULL,
      type TEXT NOT NULL,
      code TEXT NOT NULL,
      amount TEXT NOT NULL
    );`,
  );

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sales (
      id TEXT PRIMARY KEY,
      date TEXT NOT NULL,
      price_total TEXT NOT NULL,
      amount_total TEXT NOT NULL,
      finish BOOLEAN NOT NULL,
      user_id TEXT,
      FOREIGN KEY(user_id) REFERENCES user(id)
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS sales_item (
      id TEXT PRIMARY KEY,
      sales_id TEXT NOT NULL,
      products_id TEXT NOT NULL,
      name TEXT NOT NULL,
      amount TEXT NOT NULL,
      price TEXT NOT NULL,
      FOREIGN KEY(sales_id) REFERENCES sales(id),
      FOREIGN KEY(products_id) REFERENCES products(id)
    );
  `);
};
