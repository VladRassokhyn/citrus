import { Redirect, Route, Switch } from 'react-router';
import { paths } from '.';
import { User } from '../globalTypes';
import { useTypedSelector } from '../hooks';
import { authSelectors } from '../slices/auth';
import { RouteItem } from './routes';

type Props = {
  routes: RouteItem[];
};

export const RouterController = (props: Props): JSX.Element => {
  const authUser = useTypedSelector(authSelectors.selectAuthUser);

  const getRouteAction = (route: RouteItem) => {
    if (route.private) {
      if (authUser) {
        return <route.component authUser={authUser} routes={route.routes} />;
      } else {
        return <Redirect to={paths.LOGIN.BASE()} />;
      }
    } else {
      return <route.component authUser={authUser as User} routes={route.routes} />;
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
