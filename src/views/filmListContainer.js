import { createElement } from '../utils/render';

const FILM_LIST_CONTAINER_TEMPLATE = (classList) => `<section class="${classList}">
                                                    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
                                                   </section>
                                                  `;

export const filmListContainerTepmlate = (isExtra = false) => {
  const classes = isExtra ? 'films-list__container films-list--extra' : 'films-list__container';
  return createElement(FILM_LIST_CONTAINER_TEMPLATE(classes));
};
