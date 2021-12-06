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
import { Sales } from './sales.type';

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
export type { Sales };
