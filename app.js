const app = {
  // "state"
  todos: [],
  // list page elements
  listPage: document.getElementById('todo-list-page'),
  addInput: document.getElementById('new-todo-input'),
  addButton: document.getElementById('add-todo-btn'),
  todoList: document.getElementById('todo-list'),
  // edit page elements
  editPage: document.getElementById('edit-todo-page'),
  editInput: document.getElementById('edit-todo-input'),
  saveButton: document.getElementById('save-todo-btn'),

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
    const todoText = app.addInput.value.trim();

    // validate if text empty
    if (todoText !== '') {
      // Add new todo to the todos array
      app.todos.push({
        id: Date.now(), // Unique identifier for each todo
        text: todoText,
      });

      // Reset input
      app.addInput.value = '';

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
      'gap-2',
      'align-items-center'
    );
    item.innerHTML = `<span class="flex-grow-1">${todo.text}</span>`;
    item.appendChild(app.createEditButton(todo.id));
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

  /**
   * Creates the template for edit-button
   * @param {number} id the todo id
   * @returns {HTMLButtonElement} button.edit-button
   */
  createEditButton: (id) => {
    const button = document.createElement('button');
    button.classList.add('edit-button', 'btn', 'btn-primary', 'btn-sm');
    button.innerHTML = 'Edit';
    // Edit click handler
    button.onclick = () => app.showEditTodoPage(id);
    return button;
  },

  /**
   * Shows edit "page" with todo text that will be edited
   * @param {number} todoId the todo id
   * @returns {void}
   */
  showEditTodoPage: (todoId) => {
    const todo = app.todos.find((todo) => todo.id === todoId);
    if (!todo) return;

    // Swap "page" visibility
    app.listPage.style.display = 'none';
    app.editPage.style.display = 'block';
    // Input value
    app.editInput.value = todo.text;

    // Save button handler
    app.saveButton.onclick = () => app.saveTodoChanges(todoId);
  },

  /**
   * Save changes to the current todo text
   * @param {number} todoId the todo id
   */
  saveTodoChanges: (todoId) => {
    const updatedText = app.editInput.value.trim();
    const todoIndex = app.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      app.todos[todoIndex].text = updatedText;
    }

    app.showTodoListPage();
  },

  /**
   * Shows list "page"
   */
  showTodoListPage: () => {
    // Swap "page" visibility
    app.listPage.style.display = 'block';
    app.editPage.style.display = 'none';
  },
};

(function () {
  app.init();
})();
