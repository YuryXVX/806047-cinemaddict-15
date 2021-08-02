import { createElement } from '../utils/render';

const getFilmSectionTemplate = (classList) => (
  `<section class="${classList}">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  `
);

export const getFilmListSectionTemplate = (isExtra = false) => {
  const classes = isExtra ? 'films-list films-list--extra' : 'films-list';
  return createElement(getFilmSectionTemplate(classes));
};
