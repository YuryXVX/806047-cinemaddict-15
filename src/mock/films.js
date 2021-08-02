import { filmMock, comment } from './film';

const getFilmsMockData = (count) => Array(count).fill(null).map(filmMock);
const getCommentMockData = (count = 15) => Array(count).fill(null).map(comment);

export { getFilmsMockData, getCommentMockData };
