import { createElement } from '../utils/render';

const FOOTER_STATICTIC_TEMPLATE =  `<section class="footer__statistics">
                                      <p>130 291 movies inside</p>
                                    </section>`;


export const footerStatisticTemplate = () => createElement(FOOTER_STATICTIC_TEMPLATE);
