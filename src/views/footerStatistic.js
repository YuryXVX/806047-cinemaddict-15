import { createElement } from '../utils/render';

const FOOTER_STATICTIC_TEMPLATE = (filmCount) => `<section class="footer__statistics">
                                      <p>${ filmCount } movies inside</p>
                                    </section>`;


export const footerStatisticTemplate = (filmCount) => createElement(FOOTER_STATICTIC_TEMPLATE(filmCount));
