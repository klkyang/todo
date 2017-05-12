var toDoList = {
  todos: [],

  addItem: function (item) {
    this.todos.push({
      todoText: item,
      complete: false
    });
  },

  change: function (position, newValue) {
    this.todos[position].todoText = newValue;
  },

  delete: function (position) {
    this.todos.splice(position, 1);
  },

  toggleComplete: function (position) {
    this.todos[position].complete = !this.todos[position].complete;
  },

  toggleAll: function () {
    var allTrue = true;

    this.todos.forEach(function (todo) {
      if (!todo.complete) {
        allTrue = false;
      }
    });

    this.todos.forEach(function (todo) {
      if (allTrue) {
        todo.complete = false;
      } else {
        todo.complete = true;
      }
    });
  }
};


var handlers = {
  addTodo: function () {
    var todoInput = document.getElementById('addTodoTextInput');
    var todoTextWithOutWhiteSpace = todoInput.value.trim();
    if(todoTextWithOutWhiteSpace === '') {
      return;
    }
    toDoList.addItem(todoTextWithOutWhiteSpace);
    todoInput.value = '';
    view.displayTodos();
  },

  changeTodo: function () {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    toDoList.change(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },

  deleteTodo: function (position) {
    toDoList.delete(position);
    view.displayTodos();
  },

  toggleCompleted: function (position) {
    toDoList.toggleComplete(position);
    view.displayTodos();
  },

  toggleAll: function () {
    toDoList.toggleAll();
    view.displayTodos();
  }
};


var view = {
  displayTodos: function () {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    toDoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = todo.todoText;

      if (todo.complete) {
        todoLi.classList.add('complete');
      }

      todoLi.id = position;
      todoLi.classList.add('todoItem');
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },

  createDeleteButton: function () {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "\u00D7";
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },

  setUpEventListeners: function () {
    var todosUl = document.querySelector('ul');
    var addTodoInput = document.getElementById('addTodoTextInput');

    addTodoInput.addEventListener('keydown', addTodoOnEnter);

    function addTodoOnEnter(event) {
      if(event.keyCode !== 13) {
        return;
      }
      handlers.addTodo();
    };

    function clickToDelete(event) {
      var elementClicked = event.target;

      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    }

    function clickToggleComplete(event) {
      var elementClicked = event.target;
      console.log(elementClicked);
      if(elementClicked.classList.contains('todoItem')) {
        handlers.toggleCompleted(parseInt(elementClicked.id))
      }
    }

    todosUl.addEventListener('click', clickToDelete);
    todosUl.addEventListener('click', clickToggleComplete);
  }
};

view.setUpEventListeners();