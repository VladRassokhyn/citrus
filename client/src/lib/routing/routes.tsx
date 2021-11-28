import { Login } from '../../pages/Login/Login';
import { CmMenu } from '../../pages/CM';
import { Main } from '../../pages/Main';
import { Analitic, EveningReport } from '../../pages/Analitics';
import { User, Users } from '../../pages/Users';
import { Checklist, Checklists } from '../../pages/Checklists';
import { User as UserType, UserRoles } from '../globalTypes';
import { MainAnalitics } from '../../pages/Analitics/Main';
import { Salesmans } from '../../pages/Analitics/Salesmans';
import { DayDetail } from '../../pages/Analitics/DayDetail';

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
    path: '/',
    component: Main,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
  {
    path: '/cm',
    component: CmMenu,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
  {
    path: '/analytics',
    component: Analitic,
    exact: false,
    private: true,
    roles: null,
    routes: [
      {
        path: '/analytics/evening-report',
        component: EveningReport,
        exact: false,
        private: true,
        roles: null,
        routes: [],
      },
      {
        path: '/analytics/main',
        component: MainAnalitics,
        exact: true,
        private: true,
        roles: null,
        routes: [],
      },
      {
        path: '/analytics/salesmans',
        component: Salesmans,
        exact: false,
        private: true,
        roles: null,
        routes: [],
      },
      {
        path: '/analytics/main/:salesDate',
        component: DayDetail,
        exact: false,
        private: true,
        roles: null,
        routes: [],
      },
    ],
  },
  {
    path: '/users',
    component: Users,
    private: true,
    exact: true,
    roles: null,
    routes: [],
  },
  {
    path: '/users/:userId',
    component: User,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    path: '/checklist',
    component: Checklists,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    path: '/checklist/:checklistId',
    component: Checklist,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
];
