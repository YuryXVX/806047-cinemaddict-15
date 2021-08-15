import { FILMS_COUNT_PER_STEP } from '../const';
import { render, RenderPosition, replace, removeElement } from '../utils/render';
import { renderFilmCardViews } from './film';
import { RootPresenter } from './root-presenter';

import Container from '../views/container';
import NoFilmsMessage from '../views/no-films-message';
import Sort from '../views/sort';
import ShowMoreButton from '../views/show-more-button';

export default class FilmListPresenter extends RootPresenter {
  constructor(mainElement, store, renderFilmDetailsPopup) {
    super(store);

    this._mainElement = mainElement;
    this._containerComponent = new Container({classList: ['films']});
    this._filmListComponent = new Container({ title: 'All movies. Upcoming', classList: ['films-list'] });
    this._filmListContainerComponent = new Container({ tag: 'div', classList: ['films-list__container'] });
    this._sortComponent = null;
    this._noFilmsMessageComponent = null;

    this._filmsPresenters = [];

    this._onDataChange = this._onDataChange.bind(this);
    this._onRenderFilmDetailsPopup = renderFilmDetailsPopup;
    this._showFilmsCount = FILMS_COUNT_PER_STEP;
  }

  _rerender({ activeSortButton }) {
    this._renderSortComponent(activeSortButton);
    this._updateFilms(this._showFilmsCount);
  }

  _initListeners() {
    this._sortComponent.setSortButtonClickHandler((activeSortButton) => {
      this._store.activeSortButton = activeSortButton;
    });
  }

  render() {
    this._renderSortComponent(this._store.activeSortButton);
    this._renderAllFilms();
    this._renderLoadMoreButton();
  }

  _renderSortComponent(activeSortButton) {
    const oldComponent = this._sortComponent;
    this._sortComponent = new Sort(activeSortButton);

    this._initListeners();

    if(!oldComponent) {
      return render(this._mainElement, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    }

    replace(oldComponent, this._sortComponent);
  }

  _renderAllFilms() {
    render(this._mainElement, this._containerComponent.getElement(), RenderPosition.BEFOREEND);
    render(this._containerComponent.getElement(), this._filmListComponent.getElement(), RenderPosition.BEFOREEND);
    render(this._filmListComponent.getElement(), this._filmListContainerComponent.getElement(), RenderPosition.BEFOREEND);

    this._renderFilms(this._store.films.slice(0, this._showFilmsCount));
  }

  _removeFilms() {
    this._filmsPresenters.forEach((filmPresenter) => filmPresenter.destroy());
    this._filmsPresenters = [];
  }

  _updateFilms(filmsCount) {
    this._removeFilms();
    this._renderFilms(this._store.films.slice(0, filmsCount));
  }

  _renderFilms(films) {
    if(!films.length) {
      this._renderNoFilmsMessage();
      removeElement(this._sortComponent);
    }

    const container = this._filmListContainerComponent.getElement();

    const filmsPresenters = renderFilmCardViews(container, films, this._onDataChange, this._onRenderFilmDetailsPopup);

    this._filmsPresenters = this._filmsPresenters.concat(filmsPresenters);
    this._showFilmsCount = this._filmsPresenters.length;
  }

  _onDataChange(controller, oldData, newData) {
    this._store
      .updateFilm(oldData, newData)
      .then(() => this._updateFilms(this._showFilmsCount));

    controller.render(newData);
    this._store.filters = this._store.updateFilters();
    this._store.userRating = this._store.films;
  }

  _renderNoFilmsMessage() {
    const container = this._filmListComponent.getElement();

    this._noFilmsMessageComponent = new NoFilmsMessage();
    removeElement(this._sortComponent);
    render(container, this._noFilmsMessageComponent.getElement(), RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    if(!this._store.films.length) {
      return;
    }

    this._showMoreButton = new ShowMoreButton();
    render(this._filmListComponent.getElement(), this._showMoreButton.getElement(), RenderPosition.BEFOREEND);

    this._showMoreButton.setShowMoreButtonClickHandler(this._onLoadMoreButtonClick.bind(this));
  }

  _onLoadMoreButtonClick() {
    const prevFilmsCount = this._showFilmsCount;
    const films = this._store.films;

    this._showFilmsCount = this._showFilmsCount + FILMS_COUNT_PER_STEP;

    const chunckFilmList = films.slice(prevFilmsCount, this._showFilmsCount);

    this._renderFilms(chunckFilmList);

    if (this._showFilmsCount >= films.length) {
      removeElement(this._showMoreButton);
    }
  }

  destroy() {
    removeElement(this._containerComponent);
    removeElement(this._sortComponent);
  }
}
