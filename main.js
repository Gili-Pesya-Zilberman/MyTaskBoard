// Notes array
let notes = [];

// load, save and display notes
loadFromStorage();

function loadFromStorage() {
    const jsonString = localStorage.getItem("notes");
    if (jsonString) { // if (jsonString !== null) {
        notes = JSON.parse(jsonString);
    }
    displayNotes();
}

// Add and display notes
function addNotes() {

    // Prevent refresh: 
    event.preventDefault();

    // Take DOM elements: 
    const noteTextBox = document.getElementById("noteTextBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    // Create notes item object: 
    const note = {
        noteText: noteTextBox.value,
        date: dateBox.value,
        time: timeBox.value,
        isFadeIn: true // set to true when adding new notes
    };

    // Add note to notes array: 
    notes.push(note);

    // Display array on page: 
    displayNotes();

    // Clearing the form:
    noteTextBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    noteTextBox.focus();

    // Save to Storage: 
    const jsonString = JSON.stringify(notes);
    localStorage.setItem("notes", jsonString);

}

// Display notes on page: 
function displayNotes() {

    // Take DOM elements: 
    const stickyNote = document.getElementById("stickyNote");

    let html = "";
    for (const note of notes) {
        const noteIndex = notes.indexOf(note);

        //  Checking if the isFadeIn property of the note object is true or false 
        // True = still not fade in, false = already fade in
        const fadeInClass = note.isFadeIn ? 'noteFadeIn' : '';

        // Format the date in dd-mm-yyyy format:
        const date = new Date(note.date);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

        html += `
            <li class="${fadeInClass} noteHover">
            <p class="textInformation">${note.noteText}</p>
            <p class="bottom">${formattedDate}</p>
            <p class="bottom">${note.time}</p>
            <button class="buttonHover" onclick="deleteNote(${noteIndex})">X</button>
            </li>
        `;
        note.isFadeIn = false; // set to false after adding to page
    }
    stickyNote.innerHTML = html;
}

// Clearing the form:
function clearForm() {
    noteTextBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    noteTextBox.focus();
}

// Delete note by Index
function deleteNote(noteIndex) {
    notes.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}