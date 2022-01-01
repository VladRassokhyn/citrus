import { Login } from '@pages/Login';
import { CmMenu } from '@pages/CM';
import { Main } from '@pages/Main';
import { Analitic } from '@pages/Analitics';
import { EveningReport } from '@pages/Analitics/EveningReport';
import { User, Users } from '@pages/Users';
import { Checklist, Checklists } from '@pages/Checklists';
import { MainAnalitics } from '@pages/Analitics/Main';
import { Salesmans } from '@pages/Analitics/Salesmans';
import { DayDetail } from '@pages/Analitics/DayDetail';
import { paths } from './paths';
import { Shops } from '@pages/Analitics/Shops';
import { PeriodToPeriod } from '@pages/Analitics/PeriodToPeriod';
import { Todo } from '@pages/Todo';
import { RouteItem } from './types';
import { SalesByPeriod } from '@pages/Analitics/SalesByPeriod';
import { Raiting } from '@pages/Analitics/Raiting';
import { Ratios } from '@pages/Analitics/Ratios';

export const analyticsRoutes: RouteItem[] = [
  {
    label: 'Главная',
    path: paths.ANALYTICS.MAIN.BASE(),
    component: MainAnalitics,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Вечерний отчет',
    path: paths.ANALYTICS.EVENING_REPORT.BASE(),
    component: EveningReport,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Продажи за период',
    path: paths.ANALYTICS.SALES_BY_PERIOD.BASE(),
    component: SalesByPeriod,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Период к периоду',
    path: paths.ANALYTICS.PERIOD_TO_PERIOD.BASE(),
    component: PeriodToPeriod,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Соотношения',
    path: paths.ANALYTICS.RATIOS.BASE(),
    component: Ratios,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Рейтинг Продавцов',
    path: paths.ANALYTICS.RAITING.BASE(),
    component: Raiting,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Продавцы',
    path: paths.ANALYTICS.SALESMANS.BASE(),
    component: Salesmans,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'День детально',
    path: paths.ANALYTICS.MAIN.BY_SALES_DATE(),
    component: DayDetail,
    navigationVisible: false,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Магазины',
    path: paths.ANALYTICS.SHOPS.BASE(),
    component: Shops,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Период к периоду по продавцу',
    path: paths.ANALYTICS.PERIOD_TO_PERIOD.BY_SALESMAN(),
    component: PeriodToPeriod,
    navigationVisible: false,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
];

export const routes: RouteItem[] = [
  {
    label: 'Домашняя страница',
    path: paths.BASE(),
    component: Main,
    navigationVisible: true,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
  {
    label: 'Наполнение',
    path: paths.CM.BASE(),
    component: CmMenu,
    navigationVisible: true,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
  {
    label: 'Разработка',
    path: paths.TODO.BASE(),
    component: Todo,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Аналитика',
    path: paths.ANALYTICS.BASE(),
    component: Analitic,
    navigationVisible: true,
    exact: false,
    private: true,
    roles: null,
    routes: analyticsRoutes,
  },
  {
    label: 'Пользователи',
    path: paths.USERS.BASE(),
    component: Users,
    navigationVisible: true,
    private: true,
    exact: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Пользователь детально',
    path: paths.USERS.BY_ID(),
    component: User,
    navigationVisible: false,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Чеклисты',
    path: paths.CHECKLISTS.BASE(),
    component: Checklists,
    navigationVisible: true,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Чеклист детально',
    path: paths.CHECKLISTS.BY_ID(),
    component: Checklist,
    navigationVisible: false,
    exact: true,
    private: true,
    roles: null,
    routes: [],
  },
  {
    label: 'Вход',
    path: paths.LOGIN.BASE(),
    component: Login,
    navigationVisible: true,
    exact: true,
    private: false,
    roles: null,
    routes: [],
  },
];
