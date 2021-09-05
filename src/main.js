// presenter
import AppPresenter from './presenters/app';

// model
import FilmsModel from './models/films';

// api
import Api from './api/api';
import { ApiConfig } from './const';
import Provider from './provider/provider';
import Store from './store/store';

// containers
const header = document.querySelector('.header');
const footer = document.querySelector('.footer__statistics');
const main = document.querySelector('.main');

const containers = { header, footer, main };

const STORE_PREFIX = 'cinemadisc-localstorage';
const STORE_VER = 'v1';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(ApiConfig.TOKEN, ApiConfig.END_POINT);
const model = new FilmsModel();
const store = new Store(STORE_NAME, window.localStorage);
const provider = new Provider(api, store);
const app = new AppPresenter(containers, model, provider);


provider.getAllFilms()
  .then((movies) => {
    model.setState(movies);
    app.render();
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace('[offline]', '');
  provider.sync();
  app.renderToast('online');
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
  app.renderToast('offline');
});
