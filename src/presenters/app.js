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

    this._headerContainer = header;
    this._mainContainer = main;
    this._footerContainer = footer;

    this._profileComponent = null;
    this._filterComponent = null;
    this._footerComponent = new Footer(this._model.films.length);

    this._handleRaitingChange = this._handleRaitingChange.bind(this);
    this._handleChangeFilter = this._handleChangeFilter.bind(this);
    this._handleFiltersCountChange = this._handleFiltersCountChange.bind(this);

    this._filmListPresenter = new FilmList(this._model, this._handleRaitingChange, this._handleFiltersCountChange);
  }

  _rerender({ activeFilter }) {
    this._filterComponent.activeFilter = activeFilter;
  }

  _handleFiltersCountChange() {
    this._filterComponent.filters = this._model.updateFilters();
  }

  _handlerFiltersChange(value) {
    const filters = this._model.updateFilters(value);
    this._renderFilterComponent(this._model.activeFilter, filters);
  }

  _handleRaitingChange(value) {
    this._model.updateRating(value);
    this._profileComponent.raiting = this._model.userRating;
  }

  _handleChangeFilter(filter) {
    this._model.activeFilter = filter;
    this._model.activeSortButton = SortType.DEFAULT;
  }

  render() {
    this._renderHeaderComponent();
    this._renderFilterComponent(this._model.activeFilter, this._model.filters);
    this._filmListPresenter.render({ container: this._mainContainer, filters: this._filterComponent });
    this._renderFooterComponent();
  }

  _renderHeaderComponent() {
    this._profileComponent = new Profile(this._model.userRating);
    render(this._headerContainer, this._profileComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFooterComponent() {
    render(this._footerContainer, this._footerComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilterComponent(activeFilter, filters) {
    this._filterComponent = new Filters(activeFilter, filters);
    this._filterComponent.handleChangeFilter = this._handleChangeFilter;

    render(this._mainContainer, this._filterComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
