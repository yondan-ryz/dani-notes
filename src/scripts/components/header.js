class HeaderComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
        h1 {
          text-align: center;
        }
      `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);

    const container = document.createElement('div');
    container.innerHTML = `
        <h1>Notes App</h1>
      `;
    
      this._shadowRoot.appendChild(container);
  }
  
};

customElements.define("header-component", HeaderComponent);
