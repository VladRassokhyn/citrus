import { Login } from '../../pages/Login/Login';
import { CmMenu } from '../../pages/CM';
import { Main } from '../../pages/Main';
import { Analitic } from '../../pages/Analitics';
import { User, Users } from '../../pages/Users';
import { Checklist, Checklists } from '../../pages/Checklists';
import { UserRoles } from '../globalTypes';

export type RouteItem = {
  path: string;
  component: () => JSX.Element | null;
  exact?: boolean;
  privat: boolean;
  roles: UserRoles[] | null;
};

export const routes: RouteItem[] = [
  {
    path: '/',
    component: Main,
    exact: true,
    privat: false,
    roles: null,
  },
  {
    path: '/cm',
    component: CmMenu,
    exact: true,
    privat: false,
    roles: null,
  },
  {
    path: '/analytics',
    component: Analitic,
    exact: true,
    privat: true,
    roles: null,
  },
  {
    path: '/users',
    component: Users,
    privat: true,
    roles: null,
  },
  {
    path: '/users/:userId',
    component: User,
    exact: true,
    privat: true,
    roles: null,
  },
  {
    path: '/checklist',
    component: Checklists,
    exact: true,
    privat: true,
    roles: null,
  },
  {
    path: '/checklist/:checklistId',
    component: Checklist,
    exact: true,
    privat: true,
    roles: null,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    privat: false,
    roles: null,
  },
];
