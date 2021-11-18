import {
  salesmanReducer,
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
} from './salesman.slice';
import { selectAllSalesmans, selectSalesmanStatuses } from './salesman.selectors';
import { salesmanWatcher } from './salesman.saga';

export const salesmanSelectors = { selectAllSalesmans, selectSalesmanStatuses };
export const salesmanActions = {
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
};
export { salesmanReducer, salesmanWatcher };
