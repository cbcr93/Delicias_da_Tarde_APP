import { db } from '../db';

export const insertRecoveryCode = async (email: string, code: string) => {
  const timestamp = Date.now();
  await db.runAsync(
    `INSERT OR REPLACE INTO recovery_codes (email, code, created_at) VALUES (?, ?, ?)`,
    [email, code, timestamp],
  );
};

export const findRecoveryCode = async (email: string) => {
  const result = await db.getFirstAsync<{ code: string; created_at: number }>(
    `SELECT code, created_at FROM recovery_codes WHERE email = ?`,
    [email],
  );

  return result;
};

export const deleteRecoveryCode = async (email: string) => {
  await db.runAsync(`DELETE FROM recovery_codes WHERE email = ?`, [email]);
};
