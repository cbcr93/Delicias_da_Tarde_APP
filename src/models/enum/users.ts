export enum UserType {
  ADMIN = 1,
  USERS = 2,
}
export enum UserStatus {
  PENDENT = 1,
  ACTIVE = 2,
  REPROVED = 3,
  BLOCKED = 4,
}

export const UserStatusMap: Record<UserStatus, string> = {
  [UserStatus.PENDENT]: 'Status Pendente',
  [UserStatus.ACTIVE]: 'Ativo',
  [UserStatus.REPROVED]: 'Reprovado',
  [UserStatus.BLOCKED]: 'Bloqueado',
};

export const getUserStatusText = (status: UserStatus | number | undefined): string => {
  return UserStatusMap[status as UserStatus] || 'Desconhecido';
};

export const UserTypeMap: Record<UserType, string> = {
  [UserType.ADMIN]: 'ADMIN',
  [UserType.USERS]: 'ATENDENTE',
};

export const getUserTypeText = (Type: UserType | number | undefined): string => {
  return UserTypeMap[Type as UserType] || 'Desconhecido';
};
