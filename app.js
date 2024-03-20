const app = {
  todos: [],
  input: document.getElementById('new-todo-input'),
  addButton: document.getElementById('add-todo-btn'),
  todoList: document.getElementById('todo-list'),

  /**
   * Init application adding listeners and rendering existing todos
   */
  init: () => {
    // Add click handler
    app.addButton.addEventListener('click', app.addTodo);
    // Render any existing todos on initialization
    app.renderTodos();
  },

  /**
   * addTodo gets input text, creates a todo object, and adds it to the todos array
   */
  addTodo: () => {
    const todoText = app.input.value.trim();

    // validate if text empty
    if (todoText !== '') {
      // Add new todo to the todos array
      app.todos.push({
        id: Date.now(), // Unique identifier for each todo
        text: todoText,
      });

      // Reset input
      app.input.value = '';

      // Re-render todos
      app.renderTodos();
    }
  },

  /**
   * Render todos to the DOM based on the current state of the todos array
   */
  renderTodos: () => {
    // Clear the current list
    app.todoList.innerHTML = '';

    // Re-render all todos
    app.todos.forEach((todo) => {
      const todoItem = app.createTodoItem(todo);
      app.todoList.appendChild(todoItem);
    });
  },

  /**
   * Creates the template for todo-item
   * @param {object} todo the todo object
   * @returns {HTMLLIElement} li.todo-item
   */
  createTodoItem: (todo) => {
    const item = document.createElement('li');
    item.classList.add(
      'todo-item',
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );
    item.innerHTML = `<span>${todo.text}</span>`;
    item.appendChild(app.createDeleteButton(todo.id));
    return item;
  },

  /**
   * Creates the template for delete-button
   * @param {number} id the todo id
   * @returns {HTMLButtonElement} button.delete-button
   */
  createDeleteButton: (id) => {
    const button = document.createElement('button');
    button.classList.add('delete-button', 'btn', 'btn-danger', 'btn-sm');
    button.innerHTML = 'Delete';
    // Delete click handler
    button.onclick = () => app.deleteTodo(id);
    return button;
  },

  /**
   * Delete a todo from the todos array based on its id and re-render the list
   * @param {number} id the todo id to delete
   */
  deleteTodo: (id) => {
    // Remove the todo from the todos array
    app.todos = app.todos.filter((todo) => todo.id !== id);

    // Re-render todos
    app.renderTodos();
  },
};

(function () {
  app.init();
})();
