import { pathMaker } from './pathMaker';

export const paths = {
  BASE: pathMaker('/'),
  LOGIN: {
    BASE: pathMaker('/login'),
  },
  CM: {
    BASE: pathMaker('/cm'),
  },
  USERS: {
    BASE: pathMaker('/users'),
    BY_ID: pathMaker('/users/:userId'),
  },
  CHECKLISTS: {
    BASE: pathMaker('/checklist'),
    BY_ID: pathMaker('/checklist/:checklistId'),
  },
  ANALYTICS: {
    BASE: pathMaker('/analytics'),
    MAIN: {
      BASE: pathMaker('/analytics/main'),
      BY_SALES_DATE: pathMaker('/analytics/main/:salesDate'),
    },
    EVENING_REPORT: {
      BASE: pathMaker('/analytics/evening-report'),
    },
    SALESMANS: {
      BASE: pathMaker('/analytics/salesmans'),
    },
    SHOPS: {
      BASE: pathMaker('/analytics/shops'),
    },
    PERIOD_TO_PERIOD: {
      BASE: pathMaker('/analytics/period-to-period'),
    },
  },
};
