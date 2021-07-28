import { createElement } from '../utils/render';

const FILM_LIST_SECTION_TEMPLATE = (classList) => `<section class="${classList}">
                                                      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                                                    </section>
                                                  `;

export const filmListSectionTemplate = (isExtra = false) => {
  const classes = isExtra ? 'films-list films-list--extra' : 'films-list';
  return createElement(FILM_LIST_SECTION_TEMPLATE(classes));
};
