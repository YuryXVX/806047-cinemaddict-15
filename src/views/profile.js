import Component from './component';

const createProfileTemplate = (rating) => (
  `<section class="header__profile profile">
    <p class="profile__rating">${rating}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);

export default class ProfileView extends Component {
  constructor(rating) {
    super();
    this._rating = rating;
  }

  get rating() {
    return this._rating;
  }

  set rating(newValue) {
    this._rating = newValue;

    this.updateComponent();
  }

  getTemplate() {
    return createProfileTemplate(this._rating);
  }
}
