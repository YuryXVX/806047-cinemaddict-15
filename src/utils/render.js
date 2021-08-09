import { freeze } from './helpers';

export const RenderPosition = freeze({
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
});

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
  }
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
