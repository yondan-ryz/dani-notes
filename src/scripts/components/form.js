import NotesApi from '../data/notes-api.js';

class FormComponent extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
    this._style = document.createElement('style');
  }

    _updateStyle() {
    this._style.textContent = `
                form {
                    display: grid;
                    grid-gap: 10px;
                }

                input[type="text"],
                textarea {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-sizing: border-box;
                }

                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #0056b3;
                }
              `;
      }



    connectedCallback() {
      this.render();
    }

    render() {
      this._updateStyle();

      this.shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `
            <form id="noteForm">
                <input type="text" id="noteTitle" placeholder="Kegiatan" required>
                <textarea id="noteBody" placeholder="Deskripsi Kegiatan" required></textarea>
                <button type="submit" id="addButton">Add Note</button>
            </form>
        `;

        const form = this.shadowRoot.querySelector("#noteForm");
        const titleInput = form.querySelector("#noteTitle");
        const bodyInput = form.querySelector("#noteBody");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const title = titleInput.value.trim();
            const body = bodyInput.value.trim();

            if (title !== "" && body !== "") {
                addNoteAndDisplay(title, body);
                resetFormInputs();
            } else {
                alert("Judul dan Isi catatan tidak boleh kosong!");
            }
        });

        const addNoteAndDisplay = (title, body) => {
            NotesApi.createNote(title, body)
              .then(data => {
                console.log('Note created:', data);
                const noteListElement = document.querySelector("#noteList");
                const noteItemElement = document.createElement('note-item');
                noteItemElement.setAttribute('note', JSON.stringify(data));

                const noteDeleteElement = document.createElement('button');
                noteDeleteElement.textContent = 'Delete';
                noteDeleteElement.addEventListener('click', () => NotesApi.deleteNote(data.id));

                noteItemElement.appendChild(noteDeleteElement);

                noteListElement.appendChild(noteItemElement);
              })
              .catch(error => {
                console.error('Error creating note:', error);

              });
          }

        function resetFormInputs() {
            titleInput.value = "";
            bodyInput.value = "";
        }
    }
};

customElements.define("form-component", FormComponent);
