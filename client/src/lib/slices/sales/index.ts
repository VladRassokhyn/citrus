import {
  salesReducer,
  getSales,
  setSales,
  postSales,
  salesPosted,
  updateSales,
  salesUpdated,
  deleteSales,
  salesDeleted,
  sortSales,
  setmonth,
} from './sales.slice';
import { salesWatcher } from './sales.saga';
import {
  sales,
  salesLength,
  status,
  salesByDate,
  monthAndYear,
  salsesByRange,
} from './sales.selectors';

export const salesSelectors = {
  sales,
  salesLength,
  status,
  salesByDate,
  monthAndYear,
  salsesByRange,
};
export const salesActions = {
  getSales,
  setSales,
  postSales,
  salesPosted,
  updateSales,
  salesUpdated,
  deleteSales,
  salesDeleted,
  sortSales,
  setmonth,
};
export { salesReducer, salesWatcher };

export type { Sales } from './sales.type';
export { SalesIndexes } from './sales.type';
