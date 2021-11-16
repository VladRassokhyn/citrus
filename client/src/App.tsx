import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Header } from './Components/Header';
import { Preloader } from './Components/Preloader';
import { LoadingStatuses } from './lib/globalTypes';
import { useTypedSelector } from './lib/hooks';
import { RouterController } from './lib/routing/RouterController';
import { getAuth, authSelectors } from './lib/slices/auth';

export const App = (): JSX.Element => {
  const { authStatus } = useTypedSelector(authSelectors.selectAuthStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  if (authStatus === LoadingStatuses.LOADING || authStatus == LoadingStatuses.IDLE) {
    return <Preloader />;
  }

  return (
    <>
      <Header />
      <RouterController />
    </>
  );
};
