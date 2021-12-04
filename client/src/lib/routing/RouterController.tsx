import { Redirect, Route, Switch } from 'react-router';
import { paths } from '.';
import { User } from '../slices/users';
import { useTypedSelector } from '../hooks';
import { authSelectors } from '../slices/auth';
import { RouteItem } from './routes';
import { shopSelectors } from '../slices/shop';
import { useState } from 'react';
import { Preloader } from '../../Components/Preloader';

type Props = {
  routes: RouteItem[];
};

export const RouterController = (props: Props): JSX.Element => {
  const authUser = useTypedSelector(authSelectors.selectAuthUser);
  const shop = useTypedSelector(shopSelectors.byCodeName(authUser?.tt.value));
  const [currentShop, setCurrentShop] = useState(shop);

  if (!shop) {
    return <Preloader />;
  }

  const getRouteAction = (route: RouteItem) => {
    if (route.private) {
      if (authUser) {
        return (
          <route.component
            authUser={authUser}
            routes={route.routes}
            currentShop={currentShop}
            setCurrentShop={setCurrentShop}
          />
        );
      } else {
        return <Redirect to={paths.LOGIN.BASE()} />;
      }
    } else {
      return (
        <route.component
          authUser={authUser as User}
          routes={route.routes}
          currentShop={currentShop}
          setCurrentShop={setCurrentShop}
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
