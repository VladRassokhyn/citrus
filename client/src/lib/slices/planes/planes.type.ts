import { LoadingStatuses } from './../../globalTypes';

export type Planes = {
  id: number;
  tt: { label: string; value: string };
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
