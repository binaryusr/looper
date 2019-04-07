const getElementFromTemplate = str => {
  return document.createRange().createContextualFragment(str);
};

const generateElement = (templateStr, selector, attrs) => {
  const docFragment = getElementFromTemplate(templateStr);
  const element = docFragment.querySelector(selector);
  Object.keys(attrs).forEach(it => element.setAttribute(it, attrs[it]));
  return docFragment;
};

const appendAll = (container, ...elements) => {
  container.innerHTML = ``;
  elements.forEach(it => container.appendChild(it));
};

const getCurrentTimeInSeconds = (barWidth, progressInPx, videoDuration) => {
  const oneSecond = barWidth / videoDuration;
  return progressInPx / oneSecond;
};

const computeProgressBarValue = videoElement => {
  const percent = (100 / videoElement.duration) * videoElement.currentTime;
  return percent / 100;
};

const isEven = number => number % 2 === 0;
