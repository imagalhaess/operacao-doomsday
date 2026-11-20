import type { UIState } from '../data/types';
import { routeFromHash } from '../router';

export const ui: UIState = {
  route: routeFromHash(),
  search: '',
  status: 'all',
  importance: 'all',
  sort: 'release',
  track: 'all',
  selectedTrack: 't1',
  selectedId: null,
};

