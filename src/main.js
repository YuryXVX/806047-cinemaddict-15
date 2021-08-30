import AppPresenter from './presenters/app';
import FilmsStore from './models/films';

const header = document.querySelector('.header');
const footer = document.querySelector('.footer__statistics');
const main = document.querySelector('.main');

const containers = { header, footer, main };

import Api from './api/api';

const api = new Api();
const store = new FilmsStore();
const app = new AppPresenter(containers, store);

api.getAllMovies()
  .then((movies) => {
    store.setState(movies);
    app.render();
  });
