const looperStyles = `
  <style>
    :host {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      width: 900px;
      height: 20px;
      padding-left: 35px;
      padding-right: 30px;
      box-sizing: border-box;
      background-color: rgba(16, 23, 22, 0.6);
    }
    
    .relative-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    
    .progress-bar {
      display: block;
      width: 100%;
      height: 4px;
      border-radius: 5px;
      background-color: grey;
      cursor: pointer;
    }
    
    .progress-bar::-webkit-progress-value {
      background: pink;
    }
    
    .marker {
      position: absolute;
      z-index: 20000;
      display: none;
      width: 3px;
      height: 8px;
    }
    
    .start-marker {
      background-color: blue;
    }
    
    .end-marker {
      background-color: red;
    }
  </style>
`;

class LooperContainer extends HTMLElement {
  constructor() {
    super();
    this.state = { startLoopTime: 0, endLoopTime: 0, progressBarClicks: 0, };
    this.attachShadow({ mode: `open` });
    const Container = getElementFromTemplate(looperStyles);
    const RelativeWrapper = this.generateWrapper();
    appendAll(Container, RelativeWrapper);
    appendAll(this.shadowRoot, Container);
  }

  generateWrapper() {
    const RelativeWrapper = getElementFromTemplate(`<div class="relative-wrapper"></div>`);
    const ProgressBar = this.generateProgressBar({ class: `progress-bar`, id: `progress-bar` });
    const StartMarker = this.generateMarker({ class: `marker start-marker`, id: `start-marker` });
    const EndMarker = this.generateMarker({ class: `marker end-marker`, id: `end-marker` });
    appendAll(RelativeWrapper.querySelector(`.relative-wrapper`), ProgressBar, StartMarker, EndMarker);
    return RelativeWrapper;
  }

  generateMarker({ id, ...rest }) {
    return generateElement(`<span id="${id}"></span>`, `#${id}`, rest);
  }

  generateProgressBar({ id, ...rest }) {
    const progressBar = generateElement(`<progress id="${id}"></progress>`, `#${id}`, rest).querySelector(`#progress-bar`);
    progressBar.addEventListener(`click`, this.onProgressBarClick);
    return progressBar;
  }

  onProgressBarClick = (evt) => {
    const clientRect = evt.target.getBoundingClientRect();
    const x = evt.clientX - clientRect.left;
    const videoElement = document.querySelector(`.looper-video-anchor-${this.id.split(`-`)[1]}`);
    const startMarker = this.shadowRoot.querySelector(`#start-marker`);
    const endMarker = this.shadowRoot.querySelector(`#end-marker`);
    const secondsToSet = getCurrentTimeInSeconds(clientRect.width, x, videoElement.duration);
    const runStartLoopCase = () => {
      endMarker.style.display = `none`;
      startMarker.style.display = `block`;
      startMarker.style.left = `${x}px`;
      videoElement.removeEventListener(`timeupdate`, this.onVideoElementTimeUpdate);
      videoElement.currentTime = secondsToSet;
      this.state.startLoopTime = secondsToSet;
      this.state.endLoopTime = videoElement.duration;
    };
    const runEndLoopCase = () => {
      endMarker.style.display = `block`;
      endMarker.style.left = `${x}px`;
      this.state.endLoopTime = secondsToSet;
    };

    if (isEven(this.state.progressBarClicks)) runStartLoopCase();
    else runEndLoopCase();

    if (this.state.endLoopTime < this.state.startLoopTime) runStartLoopCase();
    else this.state.progressBarClicks++;

    videoElement.addEventListener(`timeupdate`, this.onVideoElementTimeUpdate);
  }

  onVideoElementTimeUpdate = (evt) => {
    if (evt.target.currentTime >= this.state.endLoopTime) {
      evt.target.currentTime = this.state.startLoopTime;
      evt.target.play();
    }
  }
}

window.customElements.define(`looper-container`, LooperContainer);
