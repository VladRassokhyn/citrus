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
  BV66 = 'BV66',
  GLOBUS = 'GLOBUS',
  LAVINA = 'LAVINA',
  DRIM = 'DRIM',
  OCEAN = 'OCEAN',
  PIRAMIDA = 'PIRAMIDA',
  BLOCK = 'BLOCK',
  SKY = 'SKY',
  GORODOK = 'GORODOK',
  RIVER = 'RIVER',
  HITMALL = 'HITMALL',
  RESPUBLIKA = 'RESPUBLIKA',
}

export enum LoadingErrors {
  IDLE = 'EDLI',
  NOT_AUTORISED = 'NOT_AUTORISED',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
}

export type User = {
  username: string;
  name: string;
  lastName: string;
  role: UserRoles;
  id: number;
  tt: string;
};
