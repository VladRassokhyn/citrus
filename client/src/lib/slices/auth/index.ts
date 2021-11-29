import {
  tryLogin,
  setLogin,
  setAuthError,
  setLoginError,
  getAuth,
  setAuth,
  setAuthUser,
  logout,
  authReducer,
} from './auth.slice';
import { selectAuthUser, selectAuthStatuses } from './auth.selectors';
import { authWather } from './auth.saga';

export const authSelectors = { selectAuthUser, selectAuthStatuses };
export const authActions = {
  tryLogin,
  setLogin,
  setAuthError,
  setLoginError,
  getAuth,
  setAuth,
  setAuthUser,
  logout,
};
export { authWather, authReducer };
