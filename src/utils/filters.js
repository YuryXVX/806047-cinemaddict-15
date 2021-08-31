import { TimePeriod, ProfileRaiting, SortType, FilterType } from '../const';

const toArrayFilmsToMapGanre = (target) => target.reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
const sortedMapByMaxCount = (target) => (Object.entries(target).sort(([, a], [, b]) => b - a));

export const getFimsCountByGenre = (films) => {
  const currentGenreMap = films.reduce((acc, it) => {
    const current = it.info.genre;

    current.forEach((c) => {
      acc[c] = 0;
    });

    return acc;
  }, {});

  films.forEach((film) => {
    const { info: { genre } } = film;
    genre.forEach((it) => {
      if(currentGenreMap[it]) {
        currentGenreMap[it]++;
      } else {
        currentGenreMap[it] = 1;
      }
    });
  });

  return toArrayFilmsToMapGanre(sortedMapByMaxCount(currentGenreMap));
};

const getTopGanre = (films) => {
  if(!films.length) {
    return;
  }
  const ganreMap = getFimsCountByGenre(films);

  const ganre = Object.keys(ganreMap)[0];

  return ganre;
};

const getAllFilmsDuration = (films) => films.length ? films.reduce((total, film) => total + film.info.runtime, 0) : 0;

export const getFilmInfoForStatisticsView = (films) => ({
  totalDutation: getAllFilmsDuration(films),
  watchedFilmsCount: films.length ? films.length : 0,
  getTopGanre: getTopGanre(films),
});

export const filterFilmsByWatchingDate = (films, timePeriod) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentMonthDay = currentDate.getDate();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const currentSeconds = currentDate.getSeconds();
  const currentMilliseconds = currentDate.getMilliseconds();
  let dateToCompare;

  switch (timePeriod) {
    case TimePeriod.TODAY:
      dateToCompare = new Date(currentYear, currentMonth, currentMonthDay);

      break;

    case TimePeriod.WEEK:
      dateToCompare = new Date(currentYear, currentMonth, currentMonthDay - 7, currentHours, currentMinutes, currentSeconds, currentMilliseconds);

      break;

    case TimePeriod.MONTH:
      dateToCompare = new Date(currentYear, currentMonth - 1, currentMonthDay, currentHours, currentMinutes, currentSeconds, currentMilliseconds);

      break;

    case TimePeriod.YEAR:
      dateToCompare = new Date(currentYear - 1, currentMonth, currentMonthDay, currentHours, currentMinutes, currentSeconds, currentMilliseconds);

      break;

    default:
      dateToCompare = null;
  }

  if (!dateToCompare) {
    return films;
  }

  return films.filter((film) => {
    const watchingDate = film.filmDetails.watchingDate ? new Date(film.filmDetails.watchingDate) : null;

    if (!watchingDate) {
      return null;
    }

    return watchingDate >= dateToCompare;
  });
};


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

export const getSortFilms = (films ,sortType = SortType.DEFAULT) => {
  switch(sortType) {
    case SortType.RATING: {
      return films.slice().sort((a, b) => a.info.totalRating > b.info.totalRating ? -1 : 0);
    }

    case SortType.DATE: {
      return films.slice().sort((a, b) => new Date(a.filmDetails.watchingDate) - new Date(b.filmDetails.watchingDate));
    }

    default: {
      return films.slice();
    }
  }
};

export const updateFilters = (films, activeFilter) => Object
  .keys(FilterType)
  .map((filter) => ({
    name: FilterType[filter],
    count: filter === activeFilter
      ? getFilmsByFilter(films, activeFilter).length
      : getFilmsByFilter(films, filter).length,
  }));
