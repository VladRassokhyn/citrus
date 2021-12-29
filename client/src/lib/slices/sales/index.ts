import {
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
export { salesReducer } from './sales.slice';
export { salesWatcher } from './sales.saga';
export { salesApi } from './sales.api';
export { SalesIndexes } from './sales.type';
export type {
  Sales,
  SalesState,
  SalesTuple,
  SalesResponse,
  SalesPayload,
  GetSalesPayload,
  PutSalesPayload,
  PostSalesPayload,
  DeleteSalesPayload,
} from './sales.type';
