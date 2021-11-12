import { planesReducer, getPlanes, updatePlanes } from './planes.slice';
import { planewWatcher } from './planes.saga';
import {
  selectPlanes,
  selectStatus,
  selectUpdateStatus,
} from './planes.selectors';

export const planesSelectors = {
  selectPlanes,
  selectStatus,
  selectUpdateStatus,
};
export const planesActions = { getPlanes, updatePlanes };
export { planesReducer, planewWatcher };
