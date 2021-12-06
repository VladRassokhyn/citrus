import { LoadingStatuses } from './../../globalTypes';

export type Planes = {
  id?: number;
  tt: { label: string; value: string };
  cm: number;
  cz: number;
  ca: number;
  to_cm: number;
  to_cz: number;
  month: number;
  year: number;
};

export type PlanesState = {
  status: LoadingStatuses;
  planes: Planes;
};

export type GetPlanesPayload = {
  tt: string;
  month: number;
  year: number;
};
