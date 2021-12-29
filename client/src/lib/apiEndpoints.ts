import { pathMaker } from './common/pathMaker';

export const ENDPOINTS = {
  AUTH: {
    BASE: pathMaker('/auth'),
    LOGIN: pathMaker('/auth/login'),
  },
};
