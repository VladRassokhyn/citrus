import { selectDaySalesStatuses, selectAllDaySales } from './daySales.selectors';
import { daySalesReducer, getDaySales, setDaySales } from './daySales.slice';
import { daySalesWatcher } from './daySales.saga';
import { Sales } from './daySales.type';

export const daySalesActions = { getDaySales, setDaySales };
export const daySalesSelectors = { selectDaySalesStatuses, selectAllDaySales };
export type { Sales };
export { daySalesReducer };
export { daySalesWatcher };
