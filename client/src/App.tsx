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
  const { authStatus } = useTypedSelector(authSelectors.selectAuthStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.getAuth());
  }, []);

  if (authStatus === LoadingStatuses.LOADING || authStatus == LoadingStatuses.IDLE) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <RouterController routes={routes} />
    </>
  );
};
