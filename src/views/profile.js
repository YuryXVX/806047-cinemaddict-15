import Component from './component';

const createProfileTemplate = (raiting) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${raiting}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class ProfileView extends Component {
  constructor(raiting) {
    super();
    this._raiting = raiting;
  }

  get raiting() {
    return this._raiting;
  }

  set raiting(newValue) {
    this._raiting = newValue;

    this.updateComponent();
  }

  getTemplate() {
    return createProfileTemplate(this._raiting);
  }
}
