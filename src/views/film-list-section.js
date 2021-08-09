import Component from './components';

const getFilmSectionTemplate = (classList) => (
  `<section class="${classList}">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section>
  `
);

export default class FilListContainer extends Component {
  constructor(isExtra = false) {
    super();

    this._isExtra = isExtra;
  }

  getTemplate() {
    const classes = this._isExtra ? 'films-list films-list--extra' : 'films-list';
    return getFilmSectionTemplate(classes);
  }
}
