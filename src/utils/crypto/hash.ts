import * as ExpoCrypto from 'expo-crypto';

export const hashSHA256 = async (value: string): Promise<string> => {
  return await ExpoCrypto.digestStringAsync(ExpoCrypto.CryptoDigestAlgorithm.SHA256, value);
};
