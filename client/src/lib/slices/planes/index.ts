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
export { planesReducer };
export { planesApi } from './planes.api';
export { planewWatcher } from './planes.saga';
export type { GetPlanesPayload, Planes } from './planes.type';
