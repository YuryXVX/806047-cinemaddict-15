export const toRawFilmModel = (model) => ({
  'id': model.id,
  'comments': model.comments,
  'film_info': {
    'title': model.info.title,
    'alternative_title': model.info.alternativeTitle,
    'total_rating': model.info.totalRating,
    'poster': model.info.poster,
    'age_rating': model.info.ageRating,
    'director': model.info.director,
    'writers': model.info.writers,
    'actors': model.info.actors,
    'release': {
      'date': model.info.release.date,
      'release_country': model.info.release.releaseCountry,
    },
    'runtime': model.info.runtime,
    'genre': model.info.genre,
    'description': model.info.description,
  },

  'user_details': {
    'watchlist': model.filmDetails.watchlist,
    'already_watched': model.filmDetails.history,
    'watching_date': model.filmDetails.watchingDate,
    'favorite': model.filmDetails.favorite,
  },
});


export default class Film {
  constructor(raw) {
    this.id = raw.id;
    this.comments = raw.comments;
    this.info = {
      title: raw['film_info'].title,
      alternativeTitle: raw['film_info']['alternative_title'],
      totalRating: raw['film_info']['total_rating'],
      poster: raw['film_info'].poster,
      ageRating: raw['film_info']['age_rating'],
      director: raw['film_info'].director,
      writers: raw['film_info'].writers,
      actors: raw['film_info'].actors,
      description: raw['film_info'].description,
      release: {
        date: raw['film_info'].release.date,
        releaseCountry: raw['film_info'].release['release_country'],
      },
      runtime: raw['film_info'].runtime,
      genre: raw['film_info'].genre,
    },

    this.filmDetails = {
      watchlist: raw['user_details']['watchlist'],
      history: raw['user_details']['already_watched'],
      watchingDate: raw['user_details']['watching_date'],
      favorite: raw['user_details'].favorite,
    };
  }

  _hasCommentIds(comments) {
    return comments.some((comment) => typeof comment !== 'string');
  }

  getRaw() {
    return {
      'id': this.id,
      'comments': this._hasCommentIds(this.comments) ? this.comments.map((comment) => comment.id) : this.comments,
      'film_info': {
        'title': this.info.title,
        'alternative_title': this.info.alternativeTitle,
        'total_rating': this.info.totalRating,
        'poster': this.info.poster,
        'age_rating': this.info.ageRating,
        'director': this.info.director,
        'writers': this.info.writers,
        'actors': this.info.actors,
        'release': {
          'date': this.info.release.date,
          'release_country': this.info.release.releaseCountry,
        },
        'runtime': this.info.runtime,
        'genre': this.info.genre,
        'description': this.info.description,
      },

      'user_details': {
        'watchlist': this.filmDetails.watchlist,
        'already_watched': this.filmDetails.history,
        'watching_date': this.filmDetails.watchingDate,
        'favorite': this.filmDetails.favorite,
      },
    };
  }
}
