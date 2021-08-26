import Component from './component';

const createCommentsListTemplate = () => ('<ul class="film-details__comments-list"></ul>');

export default class FilmsDetailsCommentList extends Component {
  getTemplate() {
    return createCommentsListTemplate();
  }
}


