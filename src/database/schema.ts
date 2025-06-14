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
};
