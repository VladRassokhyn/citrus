export type FixLater = any;

export enum LoadingStatuses {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  SALESMAN = 'SALESMAN',
  MANAGER = 'MANAGER',
}

export enum TT {
  KR29 = 'KR29',
  KR52 = 'KR52',
  BV23 = 'BV23',
  GLOBUS = 'GLOBUS',
  LAVINA = 'LAVINA',
  DRIM = 'DRIM',
  OCEAN = 'OCEAN',
  PIRAMIDA = 'PIRAMIDA',
  BLOCK = 'BLOCK',
  SKY = 'SKY',
  GORODOK = 'GORODOK',
  RIVER = 'RIVER',
}

export type User = {
  username: string;
  name: string;
  lastName: string;
  role: UserRoles;
  id: number;
  tt: string;
};
