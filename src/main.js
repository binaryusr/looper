const generateLooper = (videoElement, id) => {
  const looper = document.createElement(`looper-container`);
  looper.id = id;
  looper.setAttribute(`style`, `
    top: ${videoElement.getBoundingClientRect().top}px;
    left: ${videoElement.getBoundingClientRect().left}px;
  `);
  return looper;
};

[ ...document.querySelectorAll(`video`) ].map((it, i) => {
  it.classList.add(`looper-video-anchor-${i}`);
  const looper = generateLooper(it, `looper-${i}`);
  it.parentNode.appendChild(looper);

  it.addEventListener(`timeupdate`, evt => {
    const progressBar = document.querySelector(`looper-container`).shadowRoot.querySelector(`#progress-bar`);
    progressBar.value = computeProgressBarValue(it);
  });
});
