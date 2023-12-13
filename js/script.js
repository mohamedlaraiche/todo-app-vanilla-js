// Set classes
const createInput = document.querySelector('.createInput');
const todosHolder = document.querySelector('.todosHolder');
const form = document.querySelector('.formInput');

// Functions
const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const getTodosFromLocalStorage = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const updateTodoInLocalStorage = (id, newText) => {
  const todos = getTodosFromLocalStorage();
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, text: newText };
    }
    return todo;
  });
  saveTodosToLocalStorage(updatedTodos);
};

const displayTodo = (todo) => {
  const division = document.createElement('div');
  division.className = 'todo';
  division.id = 'todo-' + todo.id;

  const paragraph = document.createElement('p');
  paragraph.className = 'todoText';
  paragraph.textContent = todo.text;

  const input = document.createElement('input');
  input.className = 'editInput hide';
  input.type = 'text';
  input.value = todo.text;

  const division2 = document.createElement('div');
  division2.className = 'mngBtns';

  const buttonUpdate = document.createElement('button');
  buttonUpdate.className = 'updateBtn';
  buttonUpdate.onclick = function () {
    toggleEdit(todo.id);
  };

  const updateIcon = document.createElement('i');
  updateIcon.className = 'fa-solid fa-pen-to-square';

  const buttonSave = document.createElement('button');
  buttonSave.className = 'saveBtn hide';
  buttonSave.textContent = 'Save';
  buttonSave.onclick = function () {
    saveUpdatedTodo(todo.id);
  };

  const buttonDelete = document.createElement('button');
  buttonDelete.className = 'deleteBtn';
  buttonDelete.onclick = function () {
    deleteTodo(todo.id);
  };

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa-solid fa-trash-can';

  division.appendChild(paragraph);
  division.appendChild(input);
  division.appendChild(division2);
  buttonUpdate.appendChild(updateIcon);
  buttonDelete.appendChild(deleteIcon);
  division2.appendChild(buttonUpdate);
  division2.appendChild(buttonSave);
  division2.appendChild(buttonDelete);

  todosHolder.appendChild(division);
};

const createTodo = (e) => {
  e.preventDefault();
  if (!createInput.value) {
    alert('please fill the field');
  } else {
    const newTodo = { id: Date.now(), text: createInput.value };
    const todos = getTodosFromLocalStorage();
    todos.push(newTodo);
    saveTodosToLocalStorage(todos);
    displayTodo(newTodo);
    createInput.value = '';
  }
};

const deleteTodo = (id) => {
  const todos = getTodosFromLocalStorage();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  saveTodosToLocalStorage(updatedTodos);

  const todoElement = document.getElementById('todo-' + id);
  if (todoElement) {
    todosHolder.removeChild(todoElement);
  }
};

const toggleEdit = (id) => {
  const todoElement = document.getElementById('todo-' + id);
  const paragraph = todoElement.querySelector('.todoText');
  const input = todoElement.querySelector('.editInput');
  const updateBtn = todoElement.querySelector('.updateBtn');
  const saveBtn = todoElement.querySelector('.saveBtn');

  paragraph.classList.toggle('hide');
  input.classList.toggle('hide');
  updateBtn.classList.toggle('hide');
  saveBtn.classList.toggle('hide');

  input.focus();
};

const saveUpdatedTodo = (id) => {
  const todoElement = document.getElementById('todo-' + id);
  const input = todoElement.querySelector('.editInput');
  updateTodoInLocalStorage(id, input.value);
  toggleEdit(id);

  const paragraph = todoElement.querySelector('.todoText');
  paragraph.textContent = input.value;
};

// Load Local storage Data
document.addEventListener('DOMContentLoaded', () => {
  const todos = getTodosFromLocalStorage();
  todos.forEach((todo) => displayTodo(todo));
});

// Events
form.addEventListener('submit', createTodo);
