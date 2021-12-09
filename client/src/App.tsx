import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './Components/Header';
import { Preloader } from './Components/Preloader';
import { LoadingStatuses } from './lib/globalTypes';
import { useTypedSelector } from './lib/hooks';
import { RouterController } from './lib/routing/RouterController';
import { routes } from './lib/routing/routes';
import { authActions, authSelectors } from './lib/slices/auth';

export const App = (): JSX.Element => {
  const authStatus = useTypedSelector(authSelectors.status);
  const dispatch = useDispatch();

  const isAuthLoading =
    authStatus === LoadingStatuses.LOADING || authStatus === LoadingStatuses.IDLE;

  useEffect(() => {
    dispatch(authActions.getAuth());
  }, []);

  if (isAuthLoading) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <RouterController routes={routes} />
    </>
  );
};
