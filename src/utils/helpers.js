export const freeze = (target) => Object.freeze(target);

export const getActiveClassButton = (isActive) => isActive ? 'film-card__controls-item--active' : '';
export const classListAdd = (element, className) => element.classList.add(className);
export const classListRemove = (element, className) => element.classList.remove(className);

export const deepClone = (target) => JSON.parse(JSON.stringify(target));

export const getShortDescription = (description) => description.length > 140 ? `${description.slice(0, 139)}...` : description;

export const isMac = () => window.navigator.userAgent.includes('Mac');
