import { Login } from '../../pages/Login/Login';
import { CmMenu } from '../../pages/CM';
import { Main } from '../../pages/Main';
import { Analitic, EveningReport } from '../../pages/Analitics';
import { User, Users } from '../../pages/Users';
import { Checklist, Checklists } from '../../pages/Checklists';
import { UserRoles } from '../globalTypes';
import { MainAnalitics } from '../../pages/Analitics/Main';
import { Salesmans } from '../../pages/Analitics/Salesmans';
import { DayDetail } from '../../pages/Analitics/DayDetail';
import { paths } from '.';
import { User as UserType } from '../slices/users';
import { Shops } from '../../pages/Analitics/Shops';

type Props = {
  authUser: UserType;
  routes: RouteItem[];
};

export type RouteItem = {
  path: string;
  component: (props: Props) => JSX.Element;
  exact?: boolean;
  private: boolean;
  roles: UserRoles[] | null;
  routes: RouteItem[];
};

export const routes: RouteItem[] = [
  {
    path: paths.BASE(),
    component: Main,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
  {
    path: paths.CM.BASE(),
    component: CmMenu,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
  {
    path: paths.ANALYTICS.BASE(),
    component: Analitic,
    exact: false,
    private: true,
    roles: null,
    routes: [
      {
        path: paths.ANALYTICS.EVENING_REPORT.BASE(),
        component: EveningReport,
        exact: false,
        private: true,
        roles: null,
        routes: [],
      },
      {
        path: paths.ANALYTICS.MAIN.BASE(),
        component: MainAnalitics,
        exact: true,
        private: true,
        roles: null,
        routes: [],
      },
      {
        path: paths.ANALYTICS.SALESMANS.BASE(),
        component: Salesmans,
        exact: false,
        private: true,
        roles: null,
        routes: [],
      },
      {
        path: paths.ANALYTICS.MAIN.BY_SALES_DATE(),
        component: DayDetail,
        exact: false,
        private: true,
        roles: null,
        routes: [],
      },
      {
        path: paths.ANALYTICS.SHOPS.BASE(),
        component: Shops,
        exact: false,
        private: true,
        roles: null,
        routes: [],
      },
    ],
  },
  {
    path: paths.USERS.BASE(),
    component: Users,
    private: true,
    exact: true,
    roles: null,
    routes: [],
  },
  {
    path: paths.USERS.BY_ID(),
    component: User,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    path: paths.CHECKLISTS.BASE(),
    component: Checklists,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    path: paths.CHECKLISTS.BY_ID(),
    component: Checklist,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    path: paths.LOGIN.BASE(),
    component: Login,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
];
