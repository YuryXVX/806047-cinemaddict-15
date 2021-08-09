import dayjs from 'dayjs';

export const freeze = (target) => Object.freeze(target);

export const filmDurationCovert = (num) => {
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const lessHour = rhours !== 0 ? `${rhours}h` : '';
  const lessMinutes = minutes !== 0 ? `${rminutes}m` : '';
  return `${lessHour} ${lessMinutes}`;
};

export const getReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');
export const getHumanizedCommentDate = (date) => dayjs(date).format('DD/MM/YYYY h:mm');

export const getRandomRaiting = (max) => {
  const int = Math.random() * max;
  return Number(int.toFixed(2));
};


export const getRandomIntInclusive = (min, max) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export const getRandomFlag = () => Math.random() > .5;

export const getRandomDate = (start, end) =>new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

export const getActiveClassButton = (isActive) => isActive ? 'film-card__controls-item--active' : '';

export const toggleOverflowHiddenClass = (element, className) => {
  const classes = element.classList;
  return classes.toggle(className);
};
