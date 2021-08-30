import { render, RenderPosition } from '../utils/render';
import StatisticView from '../views/statistics';
import StatisticChartView from '../views/statistics-chart';

const getAllFilmsDuration = (films) => films.length ? films.reduce((total, film) => total + film.info.runtime, 0) : 0;

const getFilmInfoForStatisticsView = (films) => ({
  totalDutation: getAllFilmsDuration(films),
  watchedFilmsCount: films.length ? films.length : 0,
});


const TimePeriod = {
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

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

export default class StatisticPresenter {
  constructor() {
    this._container = null;
    this._data = null;

    this._statisticsView = null;
    this._stastisticsChartView = null;

    this._handleChangeStatisticView = this._handleChangeStatisticView.bind(this);
  }

  render({ container, data }) {
    this._container = container;
    this._data = data;

    const filmsData = getFilmInfoForStatisticsView(data.films.slice());

    this._statisticsView = new StatisticView(filmsData);
    this._statisticsView.rank = data.userRating;
    this._statisticsView.handleChangeStatisctic = this._handleChangeStatisticView;


    render(this._container, this._statisticsView.getElement(), RenderPosition.BEFOREEND);

    this._renderStatistics();
  }

  _renderStatistics(films) {
    this._stastisticsChartView = new StatisticChartView(this._statisticsView.canvasContext, films || this._data.films);
    this._stastisticsChartView.renderChart();
  }

  destroy() {
    this._statisticsView.destroyElement();
    this._container = null;
    this._statisticsView = null;
    this._stastisticsChartView = null;
  }

  _handleChangeStatisticView(type) {
    const films = filterFilmsByWatchingDate(this._data.films, type);


    this._statisticsView.data = getFilmInfoForStatisticsView(films);
    this._renderStatistics(films);
  }
}
