// home.js
import Utils from '../utils.js';
import NotesApi from '../data/notes-api.js';

// NoteComponent class definition (from your previous code)
// FormComponent class definition (from the provided code)

const home = () => {
  const noteListElement = document.querySelector('#noteList');
  const noteLoadingElement = document.querySelector('#loading-indicator');
  const noteListContainerElement = document.querySelector('ul');

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const displayResult = (notes) => {
    noteListElement.innerHTML = '';

    notes.forEach((note) => {
      const noteComponent = new NoteComponent();
      noteComponent.note = note;

      // Membuat elemen untuk menampilkan createdAt
      const createdAtElement = document.createElement('p');
      createdAtElement.textContent = `Created at: ${new Date(note.createdAt).toLocaleString()}`;

      // Menambahkan elemen createdAt ke dalam NoteComponent
      noteComponent.appendChild(createdAtElement);

      noteListElement.appendChild(noteComponent);
    });

    Utils.showElement(noteListElement);
  };


  const showNoteList = () => {
    const noteListContainerElements = document.querySelectorAll('.note-list-container');
    noteListContainerElements.forEach(noteListContainerElement => {
      const elementsToHide = noteListContainerElement.querySelectorAll('.note-list-item');
      elementsToHide.forEach(element => {
        Utils.hideElement(element);
      });
    });
    Utils.showElement(noteListElement);
  };


  const showNote = () => {
    showLoading();

    NotesApi.getNotes()
        .then((result) => {
          displayResult(result.data);
          showNoteList();
        })
        .catch((error) => {
          displayError(error);
        });
  };

  const getAllNotesButton = document.createElement('button');
  getAllNotesButton.textContent = 'Get All Notes';
  getAllNotesButton.addEventListener('click', showNote);
  noteListElement.appendChild(getAllNotesButton);

  const formComponent = new FormComponent();
  noteListElement.appendChild(formComponent);

  showNote();
};

export default home;
