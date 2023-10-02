const classNames = {
            TODO_ITEM: 'todo-container',
            TODO_CHECKBOX: 'todo-checkbox',
            TODO_TEXT: 'todo-text',
            TODO_DELETE: 'todo-delete',
        }

        const list = document.getElementById('todo-list')
        const itemCountSpan = document.getElementById('item-count')
        const uncheckedCountSpan = document.getElementById('unchecked-count')

        let todos = getTodosFromLocalStorage();

        function newTodo() {
            let text = window.prompt("Введіть справу");
            let todo = { id: Date.now(), text, checked: false };
            todos.push(todo);
            updateLocalStorageAndRender();
        }

        function render() {
            list.innerHTML = todos.map(todo => renderTodo(todo)).join('');
            itemCountSpan.innerHTML = todos.length;
            uncheckedCountSpan.innerHTML = todos.filter(todo => !todo.checked).length;
        }

        function renderTodo(todo) {
            return `<div class="${classNames.TODO_ITEM}">
                <input class="${classNames.TODO_CHECKBOX}" type="checkbox" ${todo.checked ? "checked" : ""} onchange="toggleTodo(${todo.id})">
                <span class="${classNames.TODO_TEXT}">${todo.text}</span>
                <button class="${classNames.TODO_DELETE}" onclick="deleteTodo(${todo.id})">Видалити</button>
            </div>`;
        }

        function deleteTodo(id) {
            todos = todos.filter(todo => todo.id !== id);
            updateLocalStorageAndRender();
        }

        function toggleTodo(id) {
            todos = todos.map(todo =>
                todo.id === id ? { ...todo, checked: !todo.checked } : todo
            );
            updateLocalStorageAndRender();
        }

        function getTodosFromLocalStorage() {
            const todosJSON = localStorage.getItem('todos');
            return todosJSON ? JSON.parse(todosJSON) : [];
        }

        function saveTodosToLocalStorage() {
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function updateLocalStorageAndRender() {
            saveTodosToLocalStorage();
            render();
        }

        render();




