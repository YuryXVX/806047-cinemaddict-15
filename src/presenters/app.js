import { SortType } from '../const';
import { render, RenderPosition } from '../utils/render';

// views
import Filters from '../views/filters';
import Footer from '../views/footer';
import Profile from '../views/profile';

// presenters
import FilmList from './film-list';

// constants
import { RootPresenter } from './root-presenter';

export default class App extends RootPresenter {
  constructor({ header, main, footer }, store) {
    super(store);
    this._isStatisticsViewRender = false;

    this._headerContainer = header;
    this._mainContainer = main;
    this._footerContainer = footer;

    this._profileView = null;
    this._filterView = null;
    this._footerView = new Footer(this._model.films.length);

    this._handleRaitingChange = this._handleRaitingChange.bind(this);
    this._handleChangeFilter = this._handleChangeFilter.bind(this);
    this._handleFiltersCountChange = this._handleFiltersCountChange.bind(this);
    this._handleDestroyFilmListPresentor = this._handleDestroyFilmListPresentor.bind(this);

    this._filmListPresenter = new FilmList(this._model, this._handleRaitingChange, this._handleFiltersCountChange);
  }

  rerender({ activeFilter }) {
    this._filterView.activeFilter = activeFilter;
  }

  _handleFiltersCountChange() {
    this._filterView.filters = this._model.updateFilters();
  }

  _handleRaitingChange(value) {
    this._model.updateRating(value);
    this._profileView.raiting = this._model.userRating;
  }

  _handleChangeFilter(filter) {
    if(this._isStatisticsViewRender) {
      this._renderFilmListPresentor();
    }
    this._model.activeFilter = filter;
    this._model.activeSortButton = SortType.DEFAULT;
  }

  _handleDestroyFilmListPresentor() {
    this._isStatisticsViewRender = true;
    this._filterView.activeFilter = 'STATISTIC';

    this._filmListPresenter.destroy();
  }

  _renderFilmListPresentor() {
    this._isStatisticsViewRender = false;
    this._filmListPresenter.render({ container: this._mainContainer, filters: this._filterView });
  }

  render() {
    this._renderHeaderComponent();
    this._renderFilterComponent(this._model.activeFilter, this._model.filters);
    this._filmListPresenter.render({ container: this._mainContainer, filters: this._filterView });
    this._renderFooterComponent();
  }

  _renderHeaderComponent() {
    this._profileView = new Profile(this._model.userRating);
    render(this._headerContainer, this._profileView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFooterComponent() {
    render(this._footerContainer, this._footerView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilterComponent(activeFilter, filters) {
    this._filterView = new Filters(activeFilter, filters);
    this._filterView.handleChangeFilter = this._handleChangeFilter;
    this._filterView.handleChangeView = this._handleDestroyFilmListPresentor;

    render(this._mainContainer, this._filterView.getElement(), RenderPosition.AFTERBEGIN);
  }
}
