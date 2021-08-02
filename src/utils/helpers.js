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
