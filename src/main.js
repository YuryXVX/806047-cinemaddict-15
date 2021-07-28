import { render, RenderPosition } from './utils/render';

import { cardTemplate } from './views/card';
import { filtersTemplate } from './views/filters';
import { footerStatisticTemplate } from './views/footerStatistic';
import { profileTemplate } from './views/profile';
import { sortTemplate } from './views/sort';
import { filmsSectionTemplate } from './views/filmsSection';
import { filmListSectionTemplate } from './views/filmListSection';
import { filmListContainerTepmlate } from './views/filmListContainer';
import { showMoreButtonTemplate } from './views/showMoreButton';

const headerContainer = document.querySelector('.header');
const footerStaticticContainer = document.querySelector('.footer__statistics');
const mainAppContainer = document.querySelector('.main');

const FILMS_COUNT = 5;
const FILMS_COUNT_EXTRA = 2;

const renderCard = (containerTemplate, cardCount) => Array(cardCount).fill(null).map(() => render(containerTemplate, cardTemplate(), RenderPosition.BEFOREEND));

const container = filmsSectionTemplate();
const filmSection = filmListSectionTemplate();
const topRatedFilmSection  = filmListSectionTemplate(true);
const mostCommentedFilmSection  = filmListSectionTemplate(true);
const filmListContainer = filmListContainerTepmlate();
const topRatedContainer = filmListContainerTepmlate();
const mostCommentedContainer = filmListContainerTepmlate(true);

render(container, filmSection, RenderPosition.AFTERBEGIN);
render(container, topRatedFilmSection, RenderPosition.BEFOREEND);
render(container, mostCommentedFilmSection, RenderPosition.BEFOREEND);

render(filmSection, filmListContainer, RenderPosition.BEFOREEND);
render(filmSection, showMoreButtonTemplate(), RenderPosition.BEFOREEND);
render(topRatedFilmSection, topRatedContainer, RenderPosition.BEFOREEND);
render(mostCommentedFilmSection, mostCommentedContainer, RenderPosition.BEFOREEND);

renderCard(filmListContainer, FILMS_COUNT);
renderCard(mostCommentedContainer, FILMS_COUNT_EXTRA);
renderCard(topRatedContainer, FILMS_COUNT_EXTRA);


render(headerContainer, profileTemplate(), RenderPosition.BEFOREEND);
render(footerStaticticContainer, footerStatisticTemplate(), RenderPosition.BEFOREEND);
render(mainAppContainer, sortTemplate(), RenderPosition.AFTERBEGIN);

render(mainAppContainer, filtersTemplate(), RenderPosition.AFTERBEGIN);
render(mainAppContainer, container, RenderPosition.BEFOREEND);


