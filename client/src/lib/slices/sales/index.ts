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
  setMounth,
} from './sales.slice';
import { salesWatcher } from './sales.saga';
import {
  selectAllSales,
  selectSalesLength,
  selectSalesStatuses,
  selectSalesByDate,
  selectMounth,
  selectSalsesByRange,
} from './sales.selectors';
import { Sales } from './sales.type';

export const salesSelectors = {
  selectAllSales,
  selectSalesStatuses,
  selectSalesByDate,
  selectSalesLength,
  selectMounth,
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
  setMounth,
};
export { salesReducer, salesWatcher };
export type { Sales };
