import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './Components/Header';
import { Preloader } from './Components/Preloader';
import { LoadingStatuses } from './lib/globalTypes';
import { useTypedSelector } from './lib/hooks';
import { RouterController } from './lib/routing/RouterController';
import { routes } from './lib/routing/routes';
import { authActions, authSelectors } from './lib/slices/auth';
import { shopActions, shopSelectors } from './lib/slices/shop';

export const App = (): JSX.Element => {
  const authStatus = useTypedSelector(authSelectors.status);
  const shopStatus = useTypedSelector(shopSelectors.status);
  const dispatch = useDispatch();

  const isAuthLoading =
    authStatus === LoadingStatuses.LOADING || authStatus === LoadingStatuses.IDLE;
  const isShopsLoading = shopStatus === LoadingStatuses.LOADING;

  useEffect(() => {
    dispatch(authActions.getAuth());
    dispatch(shopActions.getShops());
  }, []);

  if (isAuthLoading || isShopsLoading) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <RouterController routes={routes} />
    </>
  );
};
