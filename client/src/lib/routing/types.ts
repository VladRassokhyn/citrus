import { UserRoles } from '@lib/globalTypes';
import { Shop } from '@lib/slices/shop';
import { User } from '@lib/slices/users';

type Props = {
  authUser: User;
  routes: RouteItem[];
  currentShop: Shop;
};

export type RouteItem = {
  label: string;
  path: string;
  navigationVisible: boolean;
  component: (props: Props) => JSX.Element;
  exact?: boolean;
  private: boolean;
  roles: UserRoles[] | null;
  routes: RouteItem[];
};
