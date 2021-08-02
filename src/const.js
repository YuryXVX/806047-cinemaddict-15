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

export const EmojiMap = freeze({
  smile: './images/emoji/smile.png',
  sleeping: './images/emoji/sleeping.png',
  puke: './images/emoji/puke.png',
  angry: './images/emoji/angry.png',
});
