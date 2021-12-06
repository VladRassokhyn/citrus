import { LoadingStatuses } from '../../globalTypes';
import { RootState } from '../../store';
import { Salesman } from './salesman.type';

export const salesmans = (state: RootState): Salesman[] | null => state.salesman.salesmans;

export const status = (state: RootState): LoadingStatuses => state.salesman.status
