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
} from './sales.slice';
import { salesWatcher } from './sales.saga';
import { selectAllSales, selectSalesStatuses } from './sales.selectors';

export const salesSelectors = { selectAllSales, selectSalesStatuses };
export const salesActions = {
  getSales,
  setSales,
  postSales,
  salesPosted,
  updateSales,
  salesUpdated,
  deleteSales,
  salesDeleted,
};
export { salesReducer };
export { salesWatcher };
