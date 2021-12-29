import { pathMaker } from './common/pathMaker';

export const ENDPOINTS = {
  AUTH: {
    BASE: pathMaker('/auth'),
    LOGIN: pathMaker('/auth/login'),
  },
  CHECKLIST: {
    BASE: pathMaker('/checklist'),
    BY_ID: pathMaker('/checklist/:id'),
  },
  PLANES: {
    BASE: pathMaker('/planes'),
    BY_ID: pathMaker('/planes/:id'),
  },
  SALES: {
    BASE: pathMaker('/sales'),
    BY_ID: pathMaker('/sales/:id'),
  },
  SALESMANS: {
    BASE: pathMaker('/salesman'),
    BY_ID: pathMaker('/salesman/:id'),
  },
  SHOP: {
    BASE: pathMaker('/shops'),
    BY_ID: pathMaker('/shops/:id'),
  },
  TODO: {
    BASE: pathMaker('/todo'),
    BY_ID: pathMaker('/todo/:id'),
    COMMENTS: {
      BASE: pathMaker('/todo/comments'),
      BY_ID: pathMaker('/todo/comments/:id'),
    },
  },
  USER: {
    BASE: pathMaker('/users'),
    BY_ID: pathMaker('/users/:id'),
  },
};
