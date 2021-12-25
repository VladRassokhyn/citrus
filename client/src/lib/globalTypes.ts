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
  PPC = 'PPC',
}

export enum ServicesColors {
  CM = 'green',
  CZ = 'red',
  CA = '#9018ad',
  ALL = '#413eed',
}

export enum LoadingErrors {
  IDLE = 'EDLI',
  NOT_AUTORISED = 'NOT_AUTORISED',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
}

export type Action<T> = {
  type: string;
  payload: T;
};
