// Set classes

const createInput = document.querySelector('.createInput');
const createBtn = document.querySelector('.createBtn');
const todosHolder = document.querySelector('.todosHolder');
const form = document.querySelector('.formInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('add todo');
  if (!createInput) {
    console.log('create todo');
  } else if(createInput.create) {
    console.log('created');
  }
});
