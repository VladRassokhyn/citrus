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
