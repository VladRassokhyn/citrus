import {
  salesmanReducer,
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
} from './salesman.slice';
import { selectAllSalesmans } from './salesman.selectors';
import { salesmanWatcher } from './salesman.saga';

export const salesmanSelectors = { selectAllSalesmans };
export const salesmanActions = {
  getSalesmans,
  setSalesmans,
  postSalesman,
  salesmanPosted,
  deleteSalesman,
  salesmanDeleted,
};
export { salesmanReducer, salesmanWatcher };
