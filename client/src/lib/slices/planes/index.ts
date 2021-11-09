import { planesReducer, getPlanes } from './planes.slice';
import { planewWatcher } from './planes.saga';
import { selectPlanes, selectStatus } from './planes.selectors';

export const planesSelectors = { selectPlanes, selectStatus };
export const planesActions = { getPlanes };
export { planesReducer, planewWatcher };
