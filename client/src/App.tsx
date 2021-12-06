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
  const shopsStatus = useTypedSelector(shopSelectors.status);
  const authUser = useTypedSelector(authSelectors.authUser);
  const shops = useTypedSelector(shopSelectors.allShops);
  const dispatch = useDispatch();

  const isShopsLoading = shopsStatus === LoadingStatuses.LOADING;
  const isAuthLoading =
    authStatus === LoadingStatuses.LOADING || authStatus === LoadingStatuses.IDLE;

  useEffect(() => {
    dispatch(shopActions.getShops());
    dispatch(authActions.getAuth());
  }, []);

  useEffect(() => {
    if (authUser && shops) {
      const currentShop = shops.find((shop) => shop.name === authUser.tt.value);
      currentShop && dispatch(shopActions.setCurrentShop(currentShop));
    }
  }, [authUser, shops]);

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
