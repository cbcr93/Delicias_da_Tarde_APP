import { UserEntities } from '@models/types';

import { db } from '../db';

export const insertUser = async (user: UserEntities) => {
  const { id, email, password, type, status } = user;
  await db.runAsync(
    `INSERT INTO users (id, email, password, type, status) VALUES (?, ?, ?, ?, ?);`,
    [id, email, password, type, status],
  );
};

export const findUserByEmail = async (email: string): Promise<UserEntities | null> => {
  const results = await db.getFirstAsync<UserEntities>(
    `SELECT * FROM users WHERE email = ? LIMIT 1;`,
    [email],
  );
  return results;
};

export const updateUserPassword = async (email: string, newPassword: string) => {
  await db.runAsync(`UPDATE users SET password = ? WHERE email = ?`, [newPassword, email]);
};
