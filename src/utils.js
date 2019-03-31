const getElementFromTemplate = str => {
  return document.createRange().createContextualFragment(str);
};

const generateElement = (templateStr, selector, attrs) => {
  const docFragment = getElementFromTemplate(templateStr);
  const element = docFragment.querySelector(selector);
  Object.keys(attrs).forEach(it => element.setAttribute(it, attrs[it]));
  return docFragment;
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
