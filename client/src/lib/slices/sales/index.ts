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
  selectAllSales,
  selectSalesLength,
  selectSalesStatuses,
  selectSalesByDate,
  selectMonth,
  selectSalsesByRange,
} from './sales.selectors';
import { Sales } from './sales.type';

export const salesSelectors = {
  selectAllSales,
  selectSalesStatuses,
  selectSalesByDate,
  selectSalesLength,
  selectMonth,
  selectSalsesByRange,
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
