import Utils from '../utils.js'; // Jika Utils digunakan

class NoteListComponent extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._notes = [];
    this._column = 1;
    this._gutter = 16;

    this._updateStyle();
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML = `
      <div id="noteList"></div>
    `;
  }

  static get observedAttributes() {
    return ['column', 'gutter'];
  }

  connectedCallback() {
    fetch('https://notes-api.dicoding.dev/v2/notes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(response => response.json())
        .then(data => {
          this.notes = data.data;
        })
        .catch(error => {
          console.error('Error retrieving notes:', error);
        });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'column':
        this.column = newValue;
        break;
      case 'gutter':
        this.gutter = newValue;
        break;
    }
  }

  _updateStyle() {
    this._style.textContent = `
      #noteList {
        margin-top: 20px;
        grid-template-columns: ${'1fr '.repeat(this._column)};
        gap: ${this._gutter}px;
      }

      .note {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-bottom: 10px;
      }
    `;
  }

  set column(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._column = value;
    this._updateStyle();
  }

  get column() {
    return this._column;
  }

  set gutter(value) {
    const newValue = Number(value);
    if (!Utils.isValidInteger(newValue)) return;

    this._gutter = value;
    this._updateStyle();
  }

  get gutter() {
    return this._gutter;
  }

  displayNotes() {
    const noteListElement = this._shadowRoot.querySelector('#noteList');
    noteListElement.innerHTML = '';

    this._notes.forEach(note => {
      const noteItem = document.createElement('div');
      noteItem.classList.add('note');

      const titleElement = document.createElement('h2');
      titleElement.textContent = note.title;
      const bodyElement = document.createElement('p');
      bodyElement.textContent = note.body;

      noteItem.appendChild(titleElement);
      noteItem.appendChild(bodyElement);

      noteListElement.appendChild(noteItem);
    });
  }

  set notes(notes) {
    this._notes = notes || [];
    this.displayNotes();
  }
}

customElements.define('note-list-component', NoteListComponent);
