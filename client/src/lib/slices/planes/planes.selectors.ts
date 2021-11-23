import { LoadingStatuses } from './../../globalTypes';
import { RootState } from '../../store';
import { Planes } from './planes.type';

export const selectPlanes = (state: RootState): Planes => state.planes.planes;

export const selectStatus = (state: RootState): LoadingStatuses => state.planes.status;

export const selectUpdateStatus = (state: RootState): LoadingStatuses => state.planes.updateStatus;
