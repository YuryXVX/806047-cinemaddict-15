export const freeze = (target) => Object.freeze(target);

export const getActiveClassButton = (isActive) => isActive ? 'film-card__controls-item--active' : '';

export const toggleOverflowHiddenClass = (element, className) => {
  const classes = element.classList;
  return classes.toggle(className);
};

export const classListAdd = (element, className) => element.classList.add(className);
export const classListRemove = (element, className) => element.classList.remove(className);

export const deepClone = (target) => JSON.parse(JSON.stringify(target));

export const getShortDescription = (description) => description.length > 140 ? `${description.slice(0, 139)}...` : description;

export const convertArrayToMap = (array) => (array.reduce((map, film) => {
  const { id } = film;

  if (!id) {
    return map;
  }

  map[film.id] = film;

  return map;
}, {}));
