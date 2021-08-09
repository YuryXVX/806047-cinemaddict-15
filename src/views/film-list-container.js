import Component from './components';

const getFilmListContainerTemplate = (classList) => (
  `<div class="${classList}"></div>`
);

export default class FilmListSection extends Component {
  constructor(isExtra = false) {
    super();

    this._isExtra = isExtra;
  }

  getTemplate() {
    const classes = this._isExtra ? 'films-list__container films-list--extra' : 'films-list__container';
    return getFilmListContainerTemplate(classes);
  }
}
