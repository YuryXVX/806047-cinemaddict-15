export const freeze = (target) => Object.freeze(target);

export const getActiveClassButton = (isActive) => isActive ? 'film-card__controls-item--active' : '';

export const toggleOverflowHiddenClass = (element, className) => {
  const classes = element.classList;
  return classes.toggle(className);
};

export const classListAdd = (element, className) => element.classList.add(className);
export const classListRemove = (element, className) => element.classList.remove(className);

export const deepClone = (target) => JSON.parse(JSON.stringify(target));
