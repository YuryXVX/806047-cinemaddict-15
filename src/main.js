import App from './controllers/app';

import { getFilmsData } from './mock';

const header = document.querySelector('.header');
const footer = document.querySelector('.footer__statistics');
const main = document.querySelector('.main');

const FILMS_COUNT = 11;

const data = getFilmsData(FILMS_COUNT);

new App({ header, footer, main }, data).render();
