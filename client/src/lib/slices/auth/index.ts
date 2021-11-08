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

export const authSelectors = { selectAuthUser, selectAuthStatuses };
export {
  authReducer,
  tryLogin,
  setLogin,
  setAuthError,
  setLoginError,
  getAuth,
  setAuth,
  setAuthUser,
  logout,
};
