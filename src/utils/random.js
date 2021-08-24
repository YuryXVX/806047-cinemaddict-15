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

export const getRandomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
