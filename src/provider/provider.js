import Film, { toRawFilmModel } from '../adapters/film';
import { convertArrayToMap } from '../utils/filters';

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  get isOnline() {
    return window.navigator.onLine;
  }

  getAllFilms() {
    if (this.isOnline) {
      return this._api.getAllFilms()
        .then((films) => {
          const storageFilms = convertArrayToMap(films.map((film) => film.getRaw()));
          this._store.setItems(storageFilms);

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems()).map((film) => film);
    return Promise.resolve(storeFilms.map(((film) => new Film(film))));
  }

  updateFilm(filmID, updatedFilm) {
    if(this.isOnline) {
      return this._api.updateFilm(filmID, updatedFilm)
        .then((film) => {
          this._store.setItem(filmID, film.getRaw());

          return film;
        });
    }

    const oldFilm = this._store.getItem(filmID);
    const newFilm = Object.assign(oldFilm, toRawFilmModel(updatedFilm));
    this._store.setItem(filmID, newFilm);

    return Promise.resolve(updatedFilm);
  }

  getComments(filmID) {
    if (this.isOnline) {
      return this._api.getComments(filmID);
    }

    return Promise.reject();
  }

  deleteComment(filmId, commentID) {
    if (this.isOnline) {
      return this._api.deleteComment(commentID)
        .then(() => {
          const oldFilm = this._store.getItem(filmId);
          const comments = oldFilm.comments.filter((comment) => comment !== commentID);
          const newFilm = {...oldFilm, comments };
          this._store.setItem(filmId, newFilm);
        });
    }

    return Promise.reject();
  }

  createComment(filmId, comment) {
    if(this.isOnline) {
      return this._api.createComment(filmId, comment)
        .then((newComment) => {
          const oldFilm = this._store.getItem(filmId);
          const comments = [...newComment.map((it) => it.id)];
          const newFilm = {...oldFilm, comments };

          this._store.setItem(filmId, newFilm);

          return newComment;
        });
    }

    return Promise.reject();
  }

  sync() {
    if (this.isOnline) {
      return this._api.sync(Object.values(this._store.getItems()).map((film) => new Film(film)))
        .then((updatedFilms) => {
          const films = Object.assign(this._store.getItems(), convertArrayToMap(updatedFilms.map((film) => toRawFilmModel(film))));

          this._store.setItems(films);

          return Object.values(films);
        });
    }

    return Promise.reject();
  }
}
