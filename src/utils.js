const getElementFromTemplate = str => {
  return document.createRange().createContextualFragment(str);
};

const render = (container, ...elements) => {
  container.innerHTML = ``;
  elements.forEach(it => container.appendChild(it));
};

const getElementWithEvent = (element, selector, { event, handler, options = {} }) => {
  const clone = element.cloneNode(true);
  const eventElement = clone.querySelector(selector);
  eventElement.addEventListener(event, handler, options);
  return clone;
};
