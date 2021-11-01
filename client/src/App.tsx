import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router';
import { Header } from './Components/Header';
import { Preloader } from './Components/Preloader';
import { LoadingStatuses, UserRoles } from './lib/globalTypes';
import { useTypedSelector } from './lib/hooks';
import { selectAuthStatuses, getAuth, selectAuthUser } from './lib/slices/auth';
import { Analitic } from './pages/Analitics';
import { Checklist, Checklists } from './pages/Checklists';
import { CmMenu } from './pages/CM';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Users, User } from './pages/Users';

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
      <Route exact path={'/users/:userId'} render={() => <User />} />
      <Route exact path={'/checklist'} render={() => <Checklists />} />
      <Route
        exact
        path={'/checklist/:checklistId'}
        render={() => <Checklist />}
      />
      <Route exact path={'/login'} render={() => <Login />} />
    </>
  );
};
