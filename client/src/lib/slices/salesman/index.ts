import {
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
} from './salesman.slice';
import { salesmans, status, salesmanSales, salesmanById } from './salesman.selectors';

export const salesmanSelectors = { salesmans, status, salesmanSales, salesmanById };
export const salesmanActions = {
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
};
export { salesmanReducer } from './salesman.slice';
export { salesmanWatcher } from './salesman.saga';
export { salesmanApi } from './salesman.api';
export type { Salesman, SalesmanState, SalesmanPostPayload } from './salesman.type';
