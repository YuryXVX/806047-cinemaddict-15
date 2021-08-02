import {
  filmDurationCovert,
  getReleaseDate,
  getHumanizedCommentDate,
  getRandomIntInclusive,
  getRandomDate,
  getRandomRaiting,
  getRandomFlag
} from '../utils/helpers';

const filmDescriptions = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('.');
const filmTitles = ['The Dance of Life', 'Sagebrush Trail', 'The Man with the Golden Arm', 'Santa Claus Conquers the Martians', 'Popeye the Sailor Meets Sindbad the Sailor'];
const filmPosters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'sagebrush-trail.jpg', 'the-man-with-the-golden-arm.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg'];
const writers = ['Takeshi Kitano', 'Kitano Takeshi', 'Takeshi Takeshi'];
const actors = ['Morgan Freeman', 'Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'];
const genre = ['Comedy', 'Drama', 'Comedy', 'Drama', 'Comedy', 'Drama'];
const directors = ['Anthony Mann', 'Tom Ford'];
const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const getCommentsIdList = () => Array(getRandomIntInclusive(1, 15)).fill(null).map((_, i) => i + 1);

export const comment = (_, i) => ({
  id: i + 1,
  author: directors[getRandomIntInclusive(0, directors.length - 1)],
  comment: filmDescriptions[getRandomIntInclusive(0, filmDescriptions.length - 1)],
  date: getHumanizedCommentDate(getRandomDate(new Date(2012, 0, 1), new Date())),
  emotion: emotions[getRandomIntInclusive(0, emotions.length - 1)],
});


const filmMock = () => ({
  comments: getCommentsIdList(),
  info: {
    title: filmTitles[getRandomIntInclusive(0, filmTitles.length - 1)],
    alternativeTitle: filmTitles[getRandomIntInclusive(0, filmTitles.length - 1)],
    totalRating: getRandomRaiting(10),
    poster: `./images/posters/${filmPosters[getRandomIntInclusive(0, filmPosters.length - 1)]}`,
    ageRating: getRandomIntInclusive(0, 100),
    director: directors[getRandomIntInclusive(0, directors.length - 1)],
    writers: [writers[getRandomIntInclusive(0, writers.length - 1)], writers[getRandomIntInclusive(0, writers.length - 1)]],
    actors: [actors[getRandomIntInclusive(0, actors.length - 1)], actors[getRandomIntInclusive(0, actors.length - 1)]],
    release: {
      date: getReleaseDate(getRandomDate(new Date(2012, 0, 1), new Date())),
      releaseCountry: 'Finland',
    },
    runtime: filmDurationCovert(getRandomIntInclusive(0, 300)),
    genre: genre,
    description: filmDescriptions[getRandomIntInclusive(0, filmDescriptions.length - 1)],
  },
  details: {
    watchlist: getRandomFlag(),
    history: getRandomFlag(),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: getRandomFlag(),
  },
});

export { filmMock };
