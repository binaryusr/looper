const outerLooperStyles = parentElement => `
  top: ${parentElement.getBoundingClientRect().top}px;
  left: ${parentElement.getBoundingClientRect().left}px;
`;

const generateLooper = (videoElement, id) => {
  const looper = document.createElement(`looper-container`);
  looper.id = id;
  looper.setAttribute(`style`, outerLooperStyles(videoElement));
  return looper;
};

const VideoElements = [ ...document.querySelectorAll(`video`) ];

VideoElements.map((it, i) => {
  it.classList.add(`looper-video-anchor-${i}`);
  const looper = generateLooper(it, `looper-${i}`);
  it.parentNode.appendChild(looper);

  it.addEventListener(`timeupdate`, evt => {
    const progressBar = document.querySelector(`looper-container`).shadowRoot.querySelector(`#progress-bar`);
    const percent = Math.floor((100 / it.duration) * it.currentTime);
    progressBar.value = percent / 100;
  });
});
