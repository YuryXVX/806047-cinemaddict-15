import { getFilmInfoForStatisticsView, getFimsCountByGenre, filterFilmsByWatchingDate } from '../utils/filters';
import { render, RenderPosition } from '../utils/render';
import StatisticView from '../views/statistics';
import StatisticChartView from '../views/statistics-chart';

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

    const filmsData = getFilmInfoForStatisticsView(data.films);

    this._statisticsView = new StatisticView(filmsData);
    this._statisticsView.rank = data.userRating;
    this._statisticsView.handleChangeStatisctic = this._handleChangeStatisticView;


    render(this._container, this._statisticsView.getElement(), RenderPosition.BEFOREEND);

    this._renderStatistics(this._data.films);
  }

  _renderStatistics(films) {
    const dataForStatisticChart = getFimsCountByGenre(films);
    this._stastisticsChartView = new StatisticChartView(this._statisticsView.canvasContext, dataForStatisticChart);
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
