import { sales, status } from './raiting.selectors';
import { getSales, setSales, setError, sortBy } from './raiting.slice';

export const raitingSelectors = { sales, status };
export const raitingActions = { getSales, setSales, setError, sortBy };
export { raitingApi } from './raiting.api';
export { raitingWatcher } from './raiting.saga';
export { raitingReducer } from './raiting.slice';
