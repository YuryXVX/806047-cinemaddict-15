import AppPresenter from './presenters/app';
import FilmsStore from './models/films';

const header = document.querySelector('.header');
const footer = document.querySelector('.footer__statistics');
const main = document.querySelector('.main');

const containers = { header, footer, main };

import Api from './api/api';
import { ApiConfig } from './const';

const api = new Api(ApiConfig.TOKEN, ApiConfig.END_POINT);
const store = new FilmsStore();
const app = new AppPresenter(containers, store, api);

api.getAllFilms()
  .then((movies) => {
    store.setState(movies);
    app.render();
  })
  .catch(() => {
    store.setState([]);
    app.render();
    app.renderToast('there was an error getting movies');
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});
