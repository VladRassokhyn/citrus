export type FixLater = any;

export enum LoadingStatuses {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type User = {
  username: string;
  name: string;
  lastName: string;
  role: string;
  id: number;
};
