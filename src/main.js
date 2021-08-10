import App from './controllers/app';

import { FILMS_COUNT } from './const';
import { getFilmsData } from './mock';

const header = document.querySelector('.header');
const footer = document.querySelector('.footer__statistics');
const main = document.querySelector('.main');

const containers = { header, footer, main };
const data = getFilmsData(FILMS_COUNT);

new App(containers, data).render();
