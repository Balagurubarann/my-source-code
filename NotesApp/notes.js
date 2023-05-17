// Elements 

const noteCreationContainer  = document.getElementById('note-creation-container');
const inputModelContainer = document.getElementById('input-model-container');
const notesStorage = document.getElementById('notes-storage');

const addNotesButton = document.getElementById('add-notes-btn');
const cancelButton = document.getElementById('cancel-btn');
const submitButton = document.getElementById('submit-btn');

const notesTitle = document.getElementById('notes-title');
const notesBody = document.getElementById('notes-body');

// Events

addNotesButton.addEventListener('click', getInputModelBox);

cancelButton.addEventListener('click', getNoteCreationBox);
submitButton.addEventListener('click', createNote);

// functions

function getInputModelBox() {
    notesTitle.value = '';
    notesBody.value = '';
    noteCreationContainer.style.display = 'none';
    notesStorage.style.display = 'none';

    setTimeout(() => {
        inputModelContainer.style.display = 'flex';
        inputModelContainer.classList.toggle('fade-in', !(inputModelContainer.classList.contains('fade-in')));
    }, 300);
}

function getNoteCreationBox() {
    inputModelContainer.style.display = 'none';

    setTimeout(() => {
        noteCreationContainer.style.display = 'flex';
        notesStorage.style.display = 'grid';
        noteCreationContainer.classList.toggle('fade-in', !(noteCreationContainer.classList.contains('fade-in')));
        notesStorage.classList.toggle('fade-in', !(notesStorage.classList.contains('fade-in')));
    }, 300);
}

function createNote(e) {
    if (notesTitle.value == '' || notesBody.value == '') return;

    const storedNotes = document.createElement('div');
    storedNotes.classList.add('stored-notes');
    storedNotes.setAttribute('id', 'stored-notes');
    notesStorage.appendChild(storedNotes);

    const titleLabel = document.createElement('label');
    titleLabel.classList.add('note-title');
    const labelH3 = document.createElement('h3');
    labelH3.style.fontWeight = '300';
    labelH3.innerText = notesTitle.value;
    titleLabel.appendChild(labelH3);
    storedNotes.appendChild(titleLabel);

    const notesContent = document.createElement('div');
    notesContent.classList.add('notes-content');
    notesContent.setAttribute('id', 'notes-content');
    notesContent.innerText = notesBody.value;
    storedNotes.appendChild(notesContent);

    const dateTimeDiv = document.createElement('div');
    dateTimeDiv.classList.add('date-time');
    const date = new Date();
    dateTimeDiv.innerText = `${getMonthName()} ${date.getFullYear()}-${addZero(date.getMonth())}-${addZero(date.getDate())} . ${railwayToNormal(date.getHours())}.${addZero(date.getMinutes())} ${isAmorPm(date.getHours())}`;
    storedNotes.appendChild(dateTimeDiv);

    getNoteCreationBox();
}


// Additional Function

function addZero(value) {
    return value < 10 ? `0${value}` : value;
}

function isAmorPm(hour) {
    return hour > 12 ? 'PM' : 'AM';
}

function railwayToNormal(hour) {
    return hour > 12 ? `0${hour - 12}` : hour;
}

function getMonthName() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[new Date().getMonth()];
}
