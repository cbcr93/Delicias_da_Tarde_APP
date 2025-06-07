import * as RecoveryCodesDb from '@database/repositories/recovery_codes';
import * as UserDb from '@database/repositories/users';
import * as Crypto from '@utils/crypto';

// Gera código numérico de 6 dígitos
export const generateRecoveryCode = () => Math.floor(100000 + Math.random() * 900000).toString();

// Armazena código temporário (simulado)
export const saveRecoveryCode = async (email: string, code: string) => {
  const encryptedCode = await Crypto.hashSHA256(code);

  await RecoveryCodesDb.insertRecoveryCode(email, encryptedCode);
};

export const validateRecoveryCode = async (email: string, code: string) => {
  const result = await RecoveryCodesDb.findRecoveryCode(email);

  if (!result) return false;

  const verifyCode = await Crypto.hashSHA256(code);

  const isValid = verifyCode === result.code;
  const isExpired = Date.now() - result.created_at > 15 * 60 * 1000; // 15 minutos

  return isValid && !isExpired;
};

export const clearRecoveryCode = async (email: string) => {
  await RecoveryCodesDb.deleteRecoveryCode(email);
};
export const validateResetPass = async (email: string, password: string) => {
  const user = await UserDb.findUserByEmail(email);

  if (!user) return false;

  const verifyPass = await Crypto.hashSHA256(password);
  if (verifyPass !== user.password) return false;

  return true;
};

export const resetUserPassword = async (email: string, password: string) => {
  const encryptedPass = await Crypto.hashSHA256(password);
  await UserDb.updateUserPassword(email, encryptedPass);
  await RecoveryCodesDb.deleteRecoveryCode(email);
};
