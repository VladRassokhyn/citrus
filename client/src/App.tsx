import React from 'react';
import { Route } from 'react-router';
import { Analitic } from './pages/Analitic/Analitics';
import { Checklist } from './pages/Checklist/Checklist';
import { CmMenu } from './pages/CM/CmMenu';
import { Main } from './pages/Main/Main';
import { Salesmans } from './pages/Salesmans/Salesmans';

export const App = (): JSX.Element => {
  return (
    <>
      <Route exact path={'/'} render={() => <Main />} />
      <Route exact path={'/cm'} render={() => <CmMenu />} />
      <Route exact path={'/analytics'} render={() => <Analitic />} />
      <Route exact path={'/salesmans'} render={() => <Salesmans />} />
      <Route exact path={'/checklist'} render={() => <Checklist />} />
    </>
  );
};
