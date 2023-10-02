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

//todo = {id: number, text: string, checked: boolean}

/*
let numb = 1;
function newTodo() {
 list.insertAdjacentHTML('beforeend', `<li><input type="checkbox"><span>Text ${numb++}</span><button onClick="this.parentElement.remove()">delete</button></li>`)
}
*/

let numb = 1;
function newTodo() {
 let text = window.prompt("enter todo");
 let todo = {id: numb++, text, checked: true };
 todos.push(todo);
 console.log('todos', todos);
 render(); 
}


function render(){
  list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
  itemCountSpan.innerHTML = todos.length
  uncheckedCountSpan.innerHTML = todos.filter(todo => !todo.checked).length
}

function renderTodo(todo) {
  return `<li>
  <input type="checkbox" ${todo.checked ? "checked": ""}><span>${todo.text}</span><button onClick="deleteTodo(${todo.id})">delete</button>
  </li>`
}

function deleteTodo(id){
  console.log('from deleteTodo')
  todos = todos.filter(todo => todo.id !== id);
  render()
}

function toggleTodo(id) {
  for (let i = 0; i < todos.length; i++)  {
    if (todos[i].id === id) {
      todos[i].checked = !todos[i].checked;
    }
  }

  todos = todos.map(todo =>
    todo.id === id ? {... todo, checked: !todo.checked } : todo)

    render()
 }
