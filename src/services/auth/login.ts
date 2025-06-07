import * as UserDb from '@database/repositories/users';
import * as models from '@models/types';
import translate from '@services/i18n';
import * as Crypto from '@utils/crypto';

export const login = async (email: string, password: string): Promise<models.IloggedUser> => {
  const user = await UserDb.findUserByEmail(email);
  if (!user) throw new Error(translate('ERROS.LOGIN.USER_NOT_FOUND'));

  const verifyPass = await Crypto.hashSHA256(password);
  if (verifyPass !== user.password) throw new Error(translate('ERROS.LOGIN.INCORRECT_PASSWORD'));

  const { id, type, status } = user;

  //expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // expira em 24h
  return {
    id,
    email,
    password,
    type,
    status,
    lastLogin: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 1).toISOString(),
  };
};
