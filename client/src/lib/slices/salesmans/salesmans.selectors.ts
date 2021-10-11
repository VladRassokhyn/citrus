import { LoadingStatuses } from '../../globalTypes';
import { RootState } from '../../store';
import { Salesman } from './salesmans.types';

export const selectAllSalesmans = (state: RootState): Salesman[] =>
  state.salesmans.items;

export const selectSalesmansStatus = (state: RootState): LoadingStatuses =>
  state.salesmans.status;

export const selectSalesmansCRUSstatus = (state: RootState): LoadingStatuses =>
  state.salesmans.CRUDstatus;
