import { FilterType, ProfileRaiting } from '../const';
import { getFilmsMockData, getCommentMockData } from './films';

export const getFilmsByFilter = (films, filter) => {
  if(filter === 'ALL') {
    return films;
  }

  return films.slice().filter(({ filmDetails }) => filmDetails[filter.toLowerCase()]);
};

export const getUserRaiting = (filmsCount) => {
  if(filmsCount >= 1 && filmsCount <= 10) {
    return ProfileRaiting.NOVICE;
  }

  if(filmsCount >= 11 && filmsCount <= 20) {
    return ProfileRaiting.FAN;
  }

  if(filmsCount >= 21) {
    return ProfileRaiting.MORE_BUFF;
  }

  return ProfileRaiting.NOTHING;
};

export const getFilmsData = (filmCount) => {
  const films = getFilmsMockData(filmCount);
  const commentsList = getCommentMockData();
  const topRated = films.slice().sort((a, b) => a.info.totalRating < b.info.totalRating ? 0 : -1).slice(1, 3);
  const mostCommented = films.slice().sort((a, b) => a.comments.length < b.comments.length ? 0 : -1).slice(1, 3);

  const userRating = getUserRaiting(getFilmsByFilter(films, FilterType.HISTORY).length);


  const filters = Object.keys(FilterType).map((filter) => ({
    name: FilterType[filter],
    count: getFilmsByFilter(films, filter).length,
    active: FilterType[filter] === FilterType.ALL,
  }));

  const updateFilters = (filmList) => (
    Object.keys(FilterType).map((filter) => ({
      name: FilterType[filter],
      count: getFilmsByFilter(filmList, filter).length,
      active: FilterType[filter] === FilterType.ALL,
    }))
  );

  return { films, topRated, mostCommented, updateFilters, filters, commentsList, userRating };
};
