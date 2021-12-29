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
import { authUser, status, error } from './auth.selectors';

export { authApi } from './auth.api';
export { authWather } from './auth.saga';
export const authSelectors = { authUser, status, error };
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
export { authReducer };
