import { Redirect, Route, Switch } from 'react-router';
import { useTypedSelector } from '../hooks';
import { authSelectors } from '../slices/auth';
import { RouteItem, routes } from './routes';

export const RouterController = () => {
  const authUser = useTypedSelector(authSelectors.selectAuthUser);

  const getRouteAction = (route: RouteItem) => {
    if (route.privat) {
      if (authUser) {
        return <route.component />;
      } else {
        return <Redirect to={'/login'} />;
      }
    } else {
      return <route.component />;
    }
  };

  return (
    <Switch>
      {routes.map((route) => (
        <Route path={route.path} exact={route.exact} key={route.path}>
          {getRouteAction(route)}
        </Route>
      ))}
    </Switch>
  );
};
