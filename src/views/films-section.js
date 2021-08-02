import { createElement } from '../utils/render';

const sectionTemplate = '<section class="films"></section>';

export const getFilmsSectionTemplate = () => createElement(sectionTemplate);
