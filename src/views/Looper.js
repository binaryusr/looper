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
      background-color: plum;
    }
    
    .end-marker {
      background-color: red;
    }
  </style>
`;

const getCurrentTimeInSeconds = (barWidth, progressInPx, videoDuration) => {
  const oneSecond = barWidth / videoDuration;
  return progressInPx / oneSecond;
};

class LooperContiner extends HTMLElement {
  constructor() {
    super();
    this.state = {
      startMarker: null,
      endMarker: null,
      progressBarClicks: 0,
    };
    this.attachShadow({
      mode: `open`
    });
    const Container = getElementFromTemplate(looperStyles);
    const RelativeWrapper = this.generateWrapper();
    render(Container, RelativeWrapper);
    render(this.shadowRoot, Container);
  }

  setState(obj) {
    this.state = { ...this.state, obj };
  }

  generateWrapper() {
    const RelativeWrapper = getElementFromTemplate(`<div class="relative-wrapper"></div>`);
    const ProgressBar = this.generateProgressBar({ class: `progress-bar`, id: `progress-bar` });
    const StartMarker = this.generateMarker({ class: `marker start-marker`, id: `start-marker` });
    const EndMarker = this.generateMarker({ class: `marker end-marker`, id: `end-marker` });
    render(RelativeWrapper.querySelector(`.relative-wrapper`), ProgressBar, StartMarker, EndMarker);
    return RelativeWrapper;
  }

  generateMarker({ id, ...rest }) {
    return generateElement(`<span id="${id}"></span>`, `#${id}`, rest);
  }

  generateProgressBar({ id, ...rest }) {
    const progressBar = generateElement(`<progress id="${id}"></progress>`, `#${id}`, rest);
    progressBar.querySelector(`#progress-bar`).addEventListener(`click`, this.onProgressBarClick.bind(this));
    return progressBar;
  }

  onProgressBarClick(evt) {
    const clientRect = evt.target.getBoundingClientRect();
    const x = evt.clientX - clientRect.left;
    const videoElement = document.querySelector(`.looper-video-anchor-${this.id.split(`-`)[1]}`);
    const secondsToSet = getCurrentTimeInSeconds(clientRect.width, x, videoElement.duration);

    if (this.state.progressBarClicks % 2 === 0) {
      const startMarker = evt.target.parentNode.querySelector(`#start-marker`);
      startMarker.style.display = `block`;
      startMarker.style.left = `${x}px`;
      videoElement.currentTime = secondsToSet;
    }
    if (this.state.progressBarClicks % 2 === 1) {
      const endMarker = evt.target.parentNode.querySelector(`#end-marker`);
      endMarker.style.display = `block`;
      endMarker.style.left = `${x}px`;
    }
    this.setState({ progressBarClicks: this.state.progressBarClicks++ });
    if (this.state.progressBarClicks >= 2) this.setState({ progressBarClicks: 0 });
  }
}

window.customElements.define(`looper-container`, LooperContiner);
