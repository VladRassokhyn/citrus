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
import { planes, status } from './planes.selectors';

export const planesSelectors = { planes, status };
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
