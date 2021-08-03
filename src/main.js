import { render, RenderPosition } from './utils/render';
import { getFilmCardTemplate } from './views/card';
import { getFiltersTemplate } from './views/filters';
import { getFooterTemplate } from './views/footer-statistic';
import { getProfileTemplate } from './views/profile';
import { getSortTemplate } from './views/sort';
import { getFilmsSectionTemplate } from './views/films-section';
import { getFilmListSectionTemplate } from './views/film-list-section';
import { getFilmListContainerTepmlate } from './views/film-list-container';
import { getShowMoreButtonTemplate } from './views/show-more-button';
import { getFilmDetailsPopupTemplate } from './views/film-details';

import { getFilmsData } from './mock';

const headerContainer = document.querySelector('.header');
const footerStaticticContainer = document.querySelector('.footer__statistics');
const mainAppContainer = document.querySelector('.main');

const FILMS_COUNT = 70;
const FILMS_COUNT_PER_STEP = 5;

const { films, filters, mostCommented, topRated, commentsList, userRating } = getFilmsData(FILMS_COUNT);

// пока не обращай внимание на рендер попапа (написал так чтобы хотябы прокинуть и отрисовать данные)
const renderPopup = (data) => {
  const { comments } = data;

  const patchDataForPopup = {
    ...data,
    comments: commentsList.filter((comment) => comments.includes(comment.id)),
  };

  const popup = getFilmDetailsPopupTemplate(patchDataForPopup);
  document.body.style.overflow = 'hidden';
  render(document.body, popup, RenderPosition.BEFOREEND);
};

const renderCard = (containerTemplate, filmList) => filmList.map((data) => render(containerTemplate, getFilmCardTemplate(data, renderPopup), RenderPosition.BEFOREEND));

const container = getFilmsSectionTemplate();
const filmSection = getFilmListSectionTemplate();
const topRatedFilmSection  = getFilmListSectionTemplate(true);
const mostCommentedFilmSection  = getFilmListSectionTemplate(true);
const filmListContainer = getFilmListContainerTepmlate();
const topRatedContainer = getFilmListContainerTepmlate();
const mostCommentedContainer = getFilmListContainerTepmlate(true);

render(container, filmSection, RenderPosition.AFTERBEGIN);
render(container, topRatedFilmSection, RenderPosition.BEFOREEND);
render(container, mostCommentedFilmSection, RenderPosition.BEFOREEND);

render(filmSection, filmListContainer, RenderPosition.BEFOREEND);
render(topRatedFilmSection, topRatedContainer, RenderPosition.BEFOREEND);
render(mostCommentedFilmSection, mostCommentedContainer, RenderPosition.BEFOREEND);

const filmMinCount = Math.min(films.length, FILMS_COUNT_PER_STEP);

for(let i = 0; i < filmMinCount; i++) {
  render(filmListContainer, getFilmCardTemplate(films[i], renderPopup), RenderPosition.BEFOREEND);
}


renderCard(mostCommentedContainer, mostCommented);
renderCard(topRatedContainer, topRated);


render(headerContainer, getProfileTemplate(userRating), RenderPosition.BEFOREEND);
render(footerStaticticContainer, getFooterTemplate(films.length), RenderPosition.BEFOREEND);
render(mainAppContainer, getSortTemplate(), RenderPosition.AFTERBEGIN);
render(mainAppContainer, getFiltersTemplate(filters), RenderPosition.AFTERBEGIN);
render(mainAppContainer, container, RenderPosition.BEFOREEND);


if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(filmSection, getShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const showMoreButton = filmSection.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();


    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmListContainer, getFilmCardTemplate(film, renderPopup), RenderPosition.BEFOREEND));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if(renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}


