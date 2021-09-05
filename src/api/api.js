import Comment from '../adapters/comment';
import Film from '../adapters/film';
import { SuccessHTTPStatusRange, HTTPMethod } from '../const';

export default class Api {
  constructor(token, endPoint) {
    this._authorization = token;
    this._endPoint = endPoint;
  }

  getAllFilms() {
    return this._load({ url: 'movies'})
      .then(Api.toJson)
      .then((raw) => raw.map((it) => new Film(it)));
  }

  updateFilm(filmID, film) {
    return this._load({
      url: `movies/${filmID}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(film.getRaw()),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJson)
      .then((rawFilm) => new Film(rawFilm));
  }

  getComments(filmID) {
    return this._load({url: `comments/${filmID}`})
      .then(Api.toJson)
      .then((rawComments) => rawComments.map((rawComment) => new Comment(rawComment)))
      .catch((err) => {
        throw Error(err);
      });
  }

  createComment(filmID, comment) {
    return this._load({
      url: `comments/${filmID}`,
      method: HTTPMethod.POST,
      body: JSON.stringify(comment.getRaw()),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJson)
      .then(({comments: rawComments}) => rawComments.map((rawComment) => new Comment(rawComment)));
  }

  deleteComment(commentID) {
    return this._load({
      url: `comments/${commentID}`,
      method: HTTPMethod.DELETE,
    });
  }

  sync(films) {
    return this._load({
      url: 'movies/sync',
      method: HTTPMethod.POST,
      body: JSON.stringify(films.map((film) => film.getRaw())),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(Api.toJson)
      .then(({updated: updatedFilms}) => updatedFilms.map((updatedFilm) => new Film(updatedFilm)));
  }

  _load({url, method = HTTPMethod.GET, body = null, headers = new Headers()}) {
    headers.append('Authorization', this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static toJson(respose) {
    return respose.json();
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static catchError(err) {
    throw err;
  }
}
