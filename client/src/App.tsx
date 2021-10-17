import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Header } from './Components/Header';
import { Preloader } from './Components/Preloader';
import { LoadingStatuses } from './lib/globalTypes';
import { useTypedSelector } from './lib/hooks';
import { selectAuthStatuses, selectAuthUser } from './lib/slices/auth';
import { getAuth } from './lib/slices/auth/auth.slice';
import { Analitic } from './pages/Analitic/Analitics';
import { Checklist } from './pages/Checklist/Checklist';
import { CmMenu } from './pages/CM/CmMenu';
import { Login } from './pages/Login/Login';
import { Main } from './pages/Main/Main';
import { Salesmans } from './pages/Salesmans/Salesmans';

export const App = (): JSX.Element => {
  const authUser = useTypedSelector(selectAuthUser);
  const { authStatus } = useTypedSelector(selectAuthStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  if (
    authStatus === LoadingStatuses.LOADING ||
    authStatus == LoadingStatuses.IDLE
  ) {
    return <Preloader />;
  }

  return (
    <>
      <Header authUser={authUser} />
      <Route exact path={'/'} render={() => <Main />} />
      <Route exact path={'/cm'} render={() => <CmMenu />} />
      <Route exact path={'/analytics'} render={() => <Analitic />} />
      <Route exact path={'/salesmans'} render={() => <Salesmans />} />
      <Route exact path={'/checklist'} render={() => <Checklist />} />
      <Route exact path={'/login'} render={() => <Login />} />
    </>
  );
};
