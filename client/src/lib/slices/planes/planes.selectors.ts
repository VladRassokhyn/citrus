import { LoadingStatuses } from './../../globalTypes';
import { RootState } from '../../store';
import { Planes } from './planes.type';

export const planes = (state: RootState): Planes => state.planes.planes;

export const status = (state: RootState): LoadingStatuses => state.planes.status;
