class NoteComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  _note = {
    idNote: '',
    strTitle: '',
    strBody: '',
  };

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
                .note {
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 10px;
                    margin-bottom: 10px;
                }
        `;
  }

  set note(value) {
    this._note = value;
    this.render();
  }

  get note() {
    return this._note;
  }


  render() {
    this._shadowRoot.innerHTML = '';

    this._updateStyle();

    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note');
    noteContainer.innerHTML = `
      <h3>${this._note.strTitle}</h3>
      <p>${this._note.strBody}</p>
    `;

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.appendChild(noteContainer);
  }
}

customElements.define("note-component", NoteComponent);
