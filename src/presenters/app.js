import { render, RenderPosition, replace } from '../utils/render';

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

    this._filmListPresenter = new FilmList(this._mainContainer, this._model, this._handleRaitingChange);
  }

  _rerenderFilterComponent({films}) {
    this._handlerFiltersChange(films);
  }

  _handlerFiltersChange(value) {
    const filters = this._model.updateFilters(value);
    this._renderFilterComponent(this._model.activeFilter, filters);
  }

  _handleRaitingChange(value) {
    this._model.updateRating(value);
    this._renderHeaderComponent();
  }

  _initFiltersListeners() {
    this._filterComponent.setClickButtonFlilter((filter) => {
      this._model.activeFilter = filter;
    });
  }

  render() {
    this._renderHeaderComponent();
    this._renderFilterComponent(this._model.activeFilter, this._model.filters);
    this._filmListPresenter.render();
    this._renderFooterComponent();
  }

  _renderHeaderComponent() {
    const oldComponent = this._profileComponent;

    this._profileComponent = new Profile(this._model.userRating);

    if(!oldComponent) {
      return render(this._headerContainer, this._profileComponent.getElement(), RenderPosition.BEFOREEND);
    }

    replace(oldComponent, this._profileComponent);
  }

  _renderFooterComponent() {
    render(this._footerContainer, this._footerComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilterComponent(activeFilter, filters) {
    const oldComponent = this._filterComponent;
    this._filterComponent = new Filters(activeFilter, filters);

    this._initFiltersListeners();
    if(!oldComponent) {
      return render(this._mainContainer, this._filterComponent.getElement(), RenderPosition.AFTERBEGIN);
    }

    replace(oldComponent, this._filterComponent);
  }
}
