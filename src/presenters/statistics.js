import { render, RenderPosition } from '../utils/render';
import StatisticView from '../views/statistics';

export default class StatisticPresenter {
  constructor() {
    this._container = null;
    this._data = null;

    this._ststisticsView = null;
  }

  render({ container, data }) {
    this._container = container;
    this._ststisticsView = new StatisticView(data);

    render(this._container, this._ststisticsView.getElement(), RenderPosition.BEFOREEND);
  }

  destroy() {
    this._ststisticsView.destroyElement();
    this._container = null;
    this._ststisticsView = null;
  }
}
