import { FilterType, SortType } from '../const';
import { removeElement, render, RenderPosition } from '../utils/render';

// views
import Filters from '../views/filters';
import Footer from '../views/footer';
import Profile from '../views/profile';
import LoadingView  from '../views/loading';

// presenters
import FilmList from './film-list';
import Statistic from './statistics';
import RootPresenter from './root-presenter';
import { getFilmsByFilter, getUserRaiting } from '../utils/filters';

export default class App extends RootPresenter {
  constructor({ header, main, footer }, store) {
    super(store);
    this._isStaticsitcsViewRendered = false;

    this._headerContainer = header;
    this._mainContainer = main;
    this._footerContainer = footer;

    this._profileView = null;
    this._filterView = null;
    this._loadingView = null;
    this._footerView = null;

    this._handleRaitingChange = this._handleRaitingChange.bind(this);
    this._handleChangeFilter = this._handleChangeFilter.bind(this);
    this._handleFiltersCountChange = this._handleFiltersCountChange.bind(this);
    this._handleDestroyFilmListPresentor = this._handleDestroyFilmListPresentor.bind(this);

    this._filmListPresenter = new FilmList(this._model, this._handleRaitingChange, this._handleFiltersCountChange);
    this._statisticsPresenter = new Statistic();
  }

  beforeRender() {
    this._renderDefaultLayout();
  }

  _renderDefaultLayout() {
    this._renderHeaderComponent();
    this._renderFilterComponent(this._model.activeFilter, this._model.filters);

    this._loadingView = new LoadingView();

    render(this._mainContainer, this._loadingView.getElement(), RenderPosition.BEFOREEND);

    this._renderFooterComponent();
  }

  _handleFiltersCountChange() {
    this._filterView.filters = this._model.updateFilters();
  }

  _handleRaitingChange(value) {
    this._model.userRating = getUserRaiting(getFilmsByFilter(value, FilterType.HISTORY).length);
    this._profileView.raiting = this._model.userRating;
  }

  _handleChangeFilter(filter) {
    if(this._isStaticsitcsViewRendered) {
      this._statisticsPresenter.destroy();
      this._renderFilmListPresenter();
    }
    this._model.activeFilter = filter;
    this._filterView.activeFilter = filter;
    this._model.activeSortButton = SortType.DEFAULT;
  }

  _handleDestroyFilmListPresentor() {
    this._isStaticsitcsViewRendered = true;
    this._filterView.activeFilter = 'STATISTIC';

    this._filmListPresenter.destroy();

    this._statisticsPresenter.render({ container: this._mainContainer, data: this._model });
  }

  _renderFilmListPresenter() {
    this._isStaticsitcsViewRendered = false;

    if(this._loadingView) {
      removeElement(this._loadingView);
    }

    this._loadingView = null;

    this._filmListPresenter.render({ container: this._mainContainer, filters: this._filterView });
  }

  _updated() {
    this._footerView.filmsCount = this._model.films.length;
    this._handleFiltersCountChange();
    this._handleRaitingChange(this._model.films);
  }

  render() {
    this._updated();
    this._renderFilmListPresenter();
  }

  _renderHeaderComponent() {
    this._profileView = new Profile(this._model.userRating);
    render(this._headerContainer, this._profileView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFooterComponent() {
    this._footerView = new Footer(this._model.films.length);
    render(this._footerContainer, this._footerView.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilterComponent(activeFilter, filters) {
    this._filterView = new Filters(activeFilter, filters);
    this._filterView.handleChangeFilter = this._handleChangeFilter;
    this._filterView.handleChangeView = this._handleDestroyFilmListPresentor;

    render(this._mainContainer, this._filterView.getElement(), RenderPosition.AFTERBEGIN);
  }
}
