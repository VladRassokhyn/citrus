import { RootState } from './../../store';

export const selectAuthUser = (state: RootState) => state.auth.authUser;
