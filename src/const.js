import { freeze } from './utils/helpers';

export const FilterType = freeze({
  ALL: 'All Films',
  WATCHLIST: 'Watchlist',
  FAVORITES: 'Favorites',
  HISTORY: 'History',
});

export const ProfileRaiting = freeze({
  NOVICE: 'novice',
  FAN: 'fan',
  MORE_BUFF: 'movie buff',
  NOTHING: '',
});
