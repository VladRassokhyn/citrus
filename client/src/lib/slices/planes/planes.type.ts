import { LoadingStatuses } from './../../globalTypes';

export type Plane = {
  cm: number;
  cz: number;
  ca: number;
  to_cm: number;
  to_cz: number;
  to_ca: number;
};

export type PlanesState = {
  status: LoadingStatuses;
  updateStatus: LoadingStatuses;
  planes: Plane | null;
};
