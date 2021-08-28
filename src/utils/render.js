import Component from '../views/component';
import { freeze } from './helpers';

export const RenderPosition = freeze({
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTER: 'after',
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
    case RenderPosition.AFTER:
      container.after(component);
  }
};

export const removeElement = (component) => {
  component.element.remove();
  component.destroyElement();
};

export const replace = (oldComponent, newComponent) => {
  let oldElement;
  let newElement;

  if (oldComponent instanceof Component) {
    oldElement = oldComponent.getElement();
  }

  if (newComponent instanceof Component) {
    newElement = newComponent.getElement();
  }

  if(oldElement === null || newElement === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  oldElement.replaceWith(newElement);
  removeElement(oldComponent);
};
