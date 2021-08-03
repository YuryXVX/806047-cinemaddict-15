import { createElement } from '../utils/render';

const getFilmListContainerTemplate = (classList) => (
  `<section class="${classList}">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  `
);

export const getFilmListContainerTepmlate = (isExtra = false) => {
  const classes = isExtra ? 'films-list__container films-list--extra' : 'films-list__container';
  return createElement(getFilmListContainerTemplate(classes));
};
