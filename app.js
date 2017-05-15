if(localStorage.getItem('localTodoList') === null) {
  var todos = [];
} else {
  var todos = JSON.parse(localStorage.getItem('localTodoList'));
}

var toDoList = {

  addItem: function (item) {
    todos.push({
      todoText: item,
      complete: false
    });
    localStorage.setItem('localTodoList', JSON.stringify(todos));
  },

  change: function (position, newValue) {
    todos[position].todoText = newValue;
    localStorage.setItem('localTodoList', JSON.stringify(todos));
  },

  delete: function (position) {
    todos.splice(position, 1);
    localStorage.setItem('localTodoList', JSON.stringify(todos));
  },

  toggleComplete: function (position) {
    todos[position].complete = !todos[position].complete;
    localStorage.setItem('localTodoList', JSON.stringify(todos));
  },

  toggleAll: function () {
    var allTrue = true;

    todos.forEach(function (todo) {
      if (!todo.complete) {
        allTrue = false;
      }
    });

    todos.forEach(function (todo) {
      if (allTrue) {
        todo.complete = false;
      } else {
        todo.complete = true;
      }
    });
    localStorage.setItem('localTodoList', JSON.stringify(todos));
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

    todos.forEach(function(todo, position) {
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
      if(elementClicked.classList.contains('todoItem')) {
        handlers.toggleCompleted(parseInt(elementClicked.id))
      }
    }

    todosUl.addEventListener('click', clickToDelete);
    todosUl.addEventListener('click', clickToggleComplete);
  }
};

view.setUpEventListeners();
view.displayTodos();