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
import { filmDetailsPopup } from './views/filmDetails';

import { getFilmsData } from './mock';

const headerContainer = document.querySelector('.header');
const footerStaticticContainer = document.querySelector('.footer__statistics');
const mainAppContainer = document.querySelector('.main');

const FILMS_COUNT = 70;
const FILMS_COUNT_PER_STEP = 5;

const { films, filters, mostCommented, topRated, commentsList, userRating } = getFilmsData(FILMS_COUNT);

// пока не обращай внимание на рендер попапа (написал так чтобы хотябы прокинуть и отсовать данные)
const renderPopup = (data) => {
  const { comments } = data;
  const currentCommentsList = commentsList.filter((comment) => comments.includes(comment.id));

  const patchDataForPopup = {
    ...data,
    comments: currentCommentsList,
  };
  const popup = filmDetailsPopup(patchDataForPopup);
  document.body.style.overflow = 'hidden';
  render(document.body, popup, RenderPosition.BEFOREEND);
};

const renderCard = (containerTemplate, filmList) => filmList.map((data) => render(containerTemplate, cardTemplate(data, renderPopup), RenderPosition.BEFOREEND));

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
render(topRatedFilmSection, topRatedContainer, RenderPosition.BEFOREEND);
render(mostCommentedFilmSection, mostCommentedContainer, RenderPosition.BEFOREEND);

const filmMinCount = Math.min(films.length, FILMS_COUNT_PER_STEP);

for(let i = 0; i < filmMinCount; i++) {
  render(filmListContainer, cardTemplate(films[i], renderPopup), RenderPosition.BEFOREEND);
}


renderCard(mostCommentedContainer, mostCommented);
renderCard(topRatedContainer, topRated);


render(headerContainer, profileTemplate(userRating), RenderPosition.BEFOREEND);
render(footerStaticticContainer, footerStatisticTemplate(films.length), RenderPosition.BEFOREEND);
render(mainAppContainer, sortTemplate(), RenderPosition.AFTERBEGIN);
render(mainAppContainer, filtersTemplate(filters), RenderPosition.AFTERBEGIN);
render(mainAppContainer, container, RenderPosition.BEFOREEND);


if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(filmSection, showMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const showMoreButton = filmSection.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();


    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmListContainer, cardTemplate(film, renderPopup), RenderPosition.BEFOREEND));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if(renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}


