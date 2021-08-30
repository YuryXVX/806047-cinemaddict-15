export default class Comment {
  constructor(raw) {
    this.id = raw.id;
    this.author = raw.author;
    this.comment = raw.comment;
    this.date = raw.date;
    this.emotion = raw.emotion;
  }

  getRaw() {
    return {
      'comment': this.comment,
      'emotion': this.emotion,
    };
  }
}
