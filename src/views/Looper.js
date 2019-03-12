customElements.define(`looper-container`, class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: `open`
    });

    const Container = getElementFromTemplate(`
      <style>
        :host {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          width: 900px;
          height: 16px;
          padding-left: 35px;
          padding-right: 30px;
          box-sizing: border-box;
          background-color: rgba(16, 23, 22, 0.6);;
        }
        
        .timeline {
          position: relative;
          display: block;
          width: 100%;
          height: 4px;
          border-radius: 5px;
          background-color: red;
          cursor: pointer;
        }
        
        .marker {
          position: absolute;
          z-index: 20;
          display: block;
          width: 3px;
          height: 8px;
          background-color: black;
        }
      </style>
    `);

    render(Container, Timeline, Marker);
    this.shadowRoot.appendChild(Container);
  }
});
