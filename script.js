const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');
const inputTodo = document.getElementById('input-todo');

let todos = [];

function newTodo() {
  const text = inputTodo.value.trim();
  if (text) {
    const todo = { id: generateId(), text, checked: false };
    todos.push(todo);
    inputTodo.value = '';
    render();
  }
}

function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
  itemCountSpan.innerHTML = todos.length;
  uncheckedCountSpan.innerHTML = todos.filter(todo => !todo.checked).length;
}

function renderTodo(todo) {
  return `<li class="${classNames.TODO_ITEM}">
    <input type="checkbox" class="${classNames.TODO_CHECKBOX}" 
      onclick="toggleTodo('${todo.id}')"
      ${todo.checked ? 'checked' : ''}>
    <span class="${classNames.TODO_TEXT}">${todo.text}</span>
    <button class="${classNames.TODO_DELETE}" 
      onclick="deleteTodo('${todo.id}')">Delete</button>
  </li>`;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
}

function toggleTodo(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].checked = !todos[i].checked;
    }
  }

  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  );

  render();

  uncheckedCountSpan.innerHTML = todos.filter((todo) => !todo.checked).length;
}

window.onload = function () {
  inputTodo.focus();
  render();
};
