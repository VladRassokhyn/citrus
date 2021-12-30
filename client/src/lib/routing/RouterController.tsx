import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { paths } from './paths';
import { User } from '@lib/slices/users';
import { useTypedSelector } from '@lib/hooks';
import { authSelectors } from '@lib/slices/auth';
import { RouteItem } from './types';
import { shopSelectors } from '@lib/slices/shop';

type Props = {
  routes: RouteItem[];
};

export const RouterController = (props: Props): JSX.Element => {
  const authUser = useTypedSelector(authSelectors.authUser);
  const currentShop = useTypedSelector(shopSelectors.currentShop);

  const getRouteAction = (route: RouteItem) => {
    if (route.private) {
      if (authUser) {
        return (
          <route.component authUser={authUser} routes={route.routes} currentShop={currentShop!} />
        );
      } else {
        return <Redirect to={paths.LOGIN.BASE()} />;
      }
    } else {
      return (
        <route.component
          authUser={authUser as User}
          routes={route.routes}
          currentShop={currentShop!}
        />
      );
    }
  };

  return (
    <Switch>
      {props.routes.map((route) => (
        <Route {...route} key={route.path}>
          {getRouteAction(route)}
        </Route>
      ))}
    </Switch>
  );
};
