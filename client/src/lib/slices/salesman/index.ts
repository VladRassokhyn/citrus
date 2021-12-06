import {
  salesmanReducer,
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
} from './salesman.slice';
import { salesmans, status } from './salesman.selectors';
import { salesmanWatcher } from './salesman.saga';
import { Salesman } from './salesman.type';

export const salesmanSelectors = { salesmans, status };
export const salesmanActions = {
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
};
export { salesmanReducer, salesmanWatcher };
export type { Salesman };
