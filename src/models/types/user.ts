export type UserEntities = {
  id: string;
  email: string;
  password: string;
  type: number;
  status: number;
};

export type UserRegister = {
  email: string;
  password: string;
  type?: number;
  status?: number;
};

export type IloggedUser = {
  id: string;
  email: string;
  password: string;
  type: number;
  status: number;
  lastLogin: string;
  expiresAt: string;
};
