import dayjs from 'dayjs';

// eslint-disable-next-line no-undef
const relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

export const formatDuration = (date) => dayjs().to(dayjs(date));
export const formatReleaseDate = (date) => dayjs(date).format('DD MMMM YYYY');

export const filmDurationCovert = (num) => {
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const lessHour = rhours !== 0 ? `${rhours}h` : '';
  const lessMinutes = minutes !== 0 ? `${rminutes}m` : '';
  return `${lessHour} ${lessMinutes}`;
};

