const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodos() {
  render();
  saveTodos();
}

function newTodo() {
  const text = window.prompt("Введіть нову справу");
  if (text) {
    const todo = { id: numb++, text, checked: false };
    todos.push(todo);
    updateTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  updateTodos();
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  );
  updateTodos();
}

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let todos = [];
let numb = 1;

window.onload = () => {
  todos = loadTodos();
  render();
};

function renderTodo(todo) {
  return `<li>
    <input type="checkbox" ${todo.checked ? "checked" : ""} onchange="toggleTodo(${todo.id})">
    <span>${todo.text}</span>
    <button onclick="deleteTodo(${todo.id})">Видалити</button>
  </li>`;
}

function render() {
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
  itemCountSpan.innerText = todos.length;
  uncheckedCountSpan.innerText = todos.filter(todo => !todo.checked).length;
}





