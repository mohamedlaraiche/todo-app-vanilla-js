// Set classes

const createInput = document.querySelector('.createInput');
const createBtn = document.querySelector('.createBtn');
const todosHolder = document.querySelector('.todosHolder');
const form = document.querySelector('.formInput');

// Create elements

// Functions
const createTodo = (e) => {
  e.preventDefault();
  if (!createInput.value) {
    console.log('please fill the field');
  } else {
    const division = document.createElement('div');
    const input = document.createElement('input');
    division.className = 'todo';
    const paragraph = document.createElement('p');
    paragraph.className = 'todoText show';
    paragraph.textContent = createInput.value;
    input.className = ' editInput hide';
    const division2 = document.createElement('div');

    division2.className = 'mngBtns';
    const buttonUpdate = document.createElement('button');
    buttonUpdate.className = 'updateBtn';
    const updateIcon = document.createElement('i');

    updateIcon.className = 'fa-solid fa-pen-to-square';
    const buttonDelete = document.createElement('button');
    buttonDelete.className = 'deleteBtn';
    const deleteIcon = document.createElement('i');

    deleteIcon.className = 'fa-solid fa-trash-can';

    division.appendChild(paragraph);
    division.appendChild(input);
    division.appendChild(division2);
    buttonUpdate.appendChild(updateIcon);
    buttonDelete.appendChild(deleteIcon);
    division2.appendChild(buttonUpdate);
    division2.appendChild(buttonDelete);

    todosHolder.appendChild(division);

    localStorage.setItem('todo', division);
  }
};

console.log(todosHolder.value === undefined);
// Events
form.addEventListener('submit', createTodo);
