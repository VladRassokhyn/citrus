import { LoadingStatuses } from './../../globalTypes';

export type Planes = {
  cm: number;
  cz: number;
  ca: number;
  to_cm: number;
  to_cz: number;
};

export type PlanesState = {
  status: LoadingStatuses;
  updateStatus: LoadingStatuses;
  planes: Planes;
};
