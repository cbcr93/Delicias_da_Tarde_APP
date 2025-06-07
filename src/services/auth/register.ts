import { v4 as uuidv4 } from 'uuid';
import * as UserDb from '@database/repositories/users';
import { UserStatus, UserType } from '@enum/users';
import { UserRegister } from '@models/types';
import * as Crypto from '@utils/crypto';

export const register = async (user: UserRegister) => {
  const { email, password, type = UserType.USERS, status = UserStatus.ACTIVE } = user;
  const id = uuidv4();
  const encryptedPassword = await Crypto.hashSHA256(password);

  await UserDb.insertUser({
    id,
    password: encryptedPassword,
    email,
    type,
    status,
  });
};
