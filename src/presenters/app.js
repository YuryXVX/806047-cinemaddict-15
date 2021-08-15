import { render, RenderPosition, replace } from '../utils/render';

// views
import Filters from '../views/filters';
import Footer from '../views/footer';
import Profile from '../views/profile';

// presenters
import FilmDetailsPresenter from './film-details';
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
    this._footerComponent = new Footer(this._store.films.length);

    this._renderFilmDetailsPopup = this._renderFilmDetailsPopup.bind(this);
    this._filmListPresenter = new FilmList(this._mainContainer, this._store, this._renderFilmDetailsPopup);
    this._filmDetailsPresenter = null;
    this._filmDetailsPresenters = new Set();
  }

  _rerender() {
    this._renderFilterComponent();
    this._renderHeaderComponent();
  }

  render() {
    this._renderHeaderComponent();
    this._renderFilterComponent();
    this._filmListPresenter.render();
    this._renderFooterComponent();
  }

  _renderHeaderComponent() {
    const oldComponent = this._profileComponent;

    this._profileComponent = new Profile(this._store.userRating);

    if(!oldComponent) {
      return render(this._headerContainer, this._profileComponent.getElement(), RenderPosition.BEFOREEND);
    }

    replace(oldComponent, this._profileComponent);
  }

  _renderFooterComponent() {
    render(this._footerContainer, this._footerComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilterComponent() {
    const oldComponent = this._filterComponent;

    this._filterComponent = new Filters(this._store.filters);

    if(!oldComponent) {
      return render(this._mainContainer, this._filterComponent.getElement(), RenderPosition.AFTERBEGIN);
    }

    replace(oldComponent, this._filterComponent);
  }

  _destroyOpenedPopupDetails() {
    if(this._filmDetailsPresenters.has(this._filmDetailsPresenter)) {
      this._filmDetailsPresenters.forEach((it) => it.destroy());

      this._filmDetailsPresenters.delete(this._filmDetailsPresenter);
      this._filmDetailsPresenter = null;
    }
  }

  _renderFilmDetailsPopup(film) {
    this._destroyOpenedPopupDetails();

    const model = {
      ...film,
      comments: this._store.commentsList.filter((comment) => film.comments.includes(comment.id)),
    };

    // нужно прокинуть коллебек для изменненеия данных или перенести в презентор списка фильмов
    this._filmDetailsPresenter = new FilmDetailsPresenter(this._onDataChange);
    this._filmDetailsPresenters.add(this._filmDetailsPresenter);
    this._filmDetailsPresenter.render(model);
  }
}
