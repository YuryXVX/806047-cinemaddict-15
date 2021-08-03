import { getComment, getFilm } from './film';

const getFilmsMockData = (count) => Array(count).fill(null).map(getFilm);
const getCommentMockData = (count = 15) => Array(count).fill(null).map(getComment);

export { getFilmsMockData, getCommentMockData };
