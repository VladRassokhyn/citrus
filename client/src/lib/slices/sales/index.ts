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
  selectSalesStatuses,
  selectSalesByDate,
  selectMounth,
} from './sales.selectors';

export const salesSelectors = {
  selectAllSales,
  selectSalesStatuses,
  selectSalesByDate,
  selectMounth,
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
export { salesReducer };
export { salesWatcher };
