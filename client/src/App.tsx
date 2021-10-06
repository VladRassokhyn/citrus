import React from 'react';
import { Route } from 'react-router';
import { CmMenu } from './pages/CM/CmMenu';
import { Main } from './pages/Main/Main';

export const App = (): JSX.Element => {
  return (
    <>
      <Route exact path={'/'} render={() => <Main />} />
      <Route exact path={'/cm'} render={() => <CmMenu />} />
    </>
  );
};
