import { RootState } from '../../store';

export const selectPlanes = (state: RootState) => state.planes.planes;

export const selectStatus = (state: RootState) => state.planes.status;

export const selectUpdateStatus = (state: RootState) => state.planes.updateStatus;
