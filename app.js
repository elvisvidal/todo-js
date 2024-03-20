const app = {
  input: document.getElementById('new-todo-input'),
  addButton: document.getElementById('add-todo-btn'),

  /**
   * Init application adding listeners
   */
  init: () => {
    app.addButton.addEventListener('click', app.addTodo);
  },

  /**
   * addTodo gets input text, creates todoItem with deleteButton
   */
  addTodo: () => {
    const todoText = app.input.value.trim();

    // validate if text empty
    if (todoText !== '') {
      const todoList = document.getElementById('todo-list');
      // creates todoItem
      const todoItem = app.createTodoItem(todoText);
      // add delete button listener
      const deleteBtn = todoItem.querySelector('.delete-button');
      deleteBtn.addEventListener('click', function () {
        todoList.removeChild(todoItem);
      });

      // add item to list
      todoList.appendChild(todoItem);
      // reset input
      app.input.value = '';
    }
  },

  /**
   * Creates the template for todo-item
   * @param {string} todoText receives the todo text
   * @returns {HTMLLIElement} li.todo-item
   */
  createTodoItem: (todoText) => {
    const item = document.createElement('li');
    item.classList.add(
      'todo-item',
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );
    item.innerHTML = todoText;
    // append delete-button template
    item.appendChild(app.createDeleteButton());
    return item;
  },

  /**
   * Creates the template for delete-button
   * @returns {HTMLButtonElement} button.dete-button
   */
  createDeleteButton: () => {
    const button = document.createElement('button');
    button.classList.add('delete-button', 'btn', 'btn-danger', 'btn-sm');
    button.innerHTML = 'Delete';
    return button;
  },
};

(function () {
  app.init();
})();
