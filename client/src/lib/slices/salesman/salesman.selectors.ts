import { RootState } from '../../store';

export const selectAllSalesmans = (state: RootState) => state.salesman.salesmans;
