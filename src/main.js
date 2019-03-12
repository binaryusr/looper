const VideoElements = [ ...document.querySelectorAll(`video`) ];

VideoElements.map(it => {
  const looperContainer = document.createElement(`looper-container`);
  it.parentNode.appendChild(looperContainer);
  looperContainer.style.top = `${it.getBoundingClientRect().top}px`;
  looperContainer.style.left = `${it.getBoundingClientRect().left}px`;
  console.log(it.getBoundingClientRect())
});
