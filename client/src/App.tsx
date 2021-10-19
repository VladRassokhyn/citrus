import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Header } from './Components/Header';
import { Preloader } from './Components/Preloader';
import { LoadingStatuses } from './lib/globalTypes';
import { useTypedSelector } from './lib/hooks';
import { selectAuthStatuses, getAuth } from './lib/slices/auth';
import { Analitic } from './pages/Analitics';
import { Checklist } from './pages/Checklist';
import { CmMenu } from './pages/CM';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Users } from './pages/Users';
import { User } from './pages/Users/User';

export const App = (): JSX.Element => {
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
      <Header />
      <Route exact path={'/'} render={() => <Main />} />
      <Route exact path={'/cm'} render={() => <CmMenu />} />
      <Route exact path={'/analytics'} render={() => <Analitic />} />
      <Route exact path={'/users'} render={() => <Users />} />
      <Route exact path={'/checklist'} render={() => <Checklist />} />
      <Route exact path={'/login'} render={() => <Login />} />
      <Route exact path={'/users/:userId'} render={() => <User />} />
    </>
  );
};
