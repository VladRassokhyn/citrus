import { LoadingStatuses } from '@lib/globalTypes';
import { RootState } from '@lib/store';
import { Planes } from '@lib/slices/planes';

export const planes = (state: RootState): Planes => state.planes.planes;

export const status = (state: RootState): LoadingStatuses => state.planes.status;
