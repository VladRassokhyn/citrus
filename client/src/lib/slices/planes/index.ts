import {
  planesReducer,
  getPlanes,
  updatePlanes,
  planesUpdated,
  setError,
  setPlanes,
  planesPosted,
  postPlanes,
} from './planes.slice';
import { planewWatcher } from './planes.saga';
import { selectPlanes, selectStatus, selectUpdateStatus } from './planes.selectors';

export const planesSelectors = {
  selectPlanes,
  selectStatus,
  selectUpdateStatus,
};
export const planesActions = {
  getPlanes,
  updatePlanes,
  planesUpdated,
  setError,
  setPlanes,
  planesPosted,
  postPlanes,
};
export { planesReducer, planewWatcher };
