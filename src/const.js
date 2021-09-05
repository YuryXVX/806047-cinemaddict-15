import { freeze } from './utils/helpers';

export const FilterType = freeze({
  ALL: 'All Films',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITE: 'Favorites',
});

export const FilterForInitialStateApp = Object.values(FilterType).map((name) => ({ name, count: 0}));

export const ProfileRaiting = freeze({
  NOVICE: 'novice',
  FAN: 'fan',
  MORE_BUFF: 'movie buff',
  NOTHING: '',
});

export const KeyCode = freeze({
  ESCAPE: 'Escape',
  ENTER: 'Enter',
});

export const EmojiMap = freeze({
  smile: './images/emoji/smile.png',
  sleeping: './images/emoji/sleeping.png',
  puke: './images/emoji/puke.png',
  angry: './images/emoji/angry.png',
});

export const SortType = freeze({
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
});

export const EmptyListMessages = {
  ALL: 'There are no movies in our database',
  WATCHLIST: 'There are no movies in watchlist database',
  HISTORY: 'There are no movies in history database',
  FAVORITE: 'There are no movies in favorite database',
};

export const TimePeriod = freeze({
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
});

export const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};

export const HTTPMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const ApiConfig = {
  TOKEN: 'Basic ddsadasewqe1013',
  END_POINT: 'https://15.ecmascript.pages.academy/cinemaddict/',
};

export const FILMS_COUNT_PER_STEP = 5;
export const PREFIX_CLASS_BUTTON = '.film-card__controls-item';

