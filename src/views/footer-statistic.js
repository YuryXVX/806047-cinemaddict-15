import { createElement } from '../utils/render';

const getFooterStatisticTemplate = (filmCount) => (
  `<section class="footer__statistics">
    <p>${ filmCount } movies inside</p>
  </section>`
);


export const getFooterTemplate = (filmCount) => createElement(getFooterStatisticTemplate(filmCount));
