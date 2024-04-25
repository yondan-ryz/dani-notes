const apiUrl = 'https://notes-api.dicoding.dev/v2/notes';

class NotesApi {
    static createNote(title, body) {
        return new Promise((resolve, reject) => {
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, body })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error creating note: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => {
                    console.error('Error creating note:', error);
                    reject(error);
                });
        });
    }

    static deleteNote(note_id) {
        return new Promise((resolve, reject) => {
            fetch(`${apiUrl}/${note_id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error deleting note: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => {
                    console.error('Error deleting note:', error);
                    reject(error);
                });
        });
    }

    static getNoteById(note_id) {
        return new Promise((resolve, reject) => {
            fetch(`${apiUrl}/${note_id}`, {
                method: 'GET'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error retrieving note: ${response.statusText}`);
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => {
                    console.error('Error retrieving note:', error);
                    reject(error);
                });
        });
    }

    static getNotes() {
        return fetch(apiUrl, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error retrieving notes: ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error retrieving notes:', error);
                throw error;
            });
    }
}

export default NotesApi;
