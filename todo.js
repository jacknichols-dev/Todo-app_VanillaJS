//selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//functions

/*-------------- ADD THE TODO TO THE UL -------------- */
function addTodo(e) {
  e.preventDefault();

  //TODO DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //li
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo-item');
  //add the value
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  //Add todo to local storage
  saveLocalTodos(todoInput.value);

  //checkmark btn
  const compBtn = document.createElement('button');
  compBtn.innerHTML = '<i class="fas fa-check"></i>';
  compBtn.classList.add('comp-btn');
  todoDiv.appendChild(compBtn);

  //delete btn
  const delBtn = document.createElement('button');
  delBtn.innerHTML = '<i class="fas fa-trash"></i>';
  delBtn.classList.add('del-btn');
  todoDiv.appendChild(delBtn);

  //APPEND TO LIST
  todoList.appendChild(todoDiv);

  //clear input
  todoInput.value = '';
}

/*-------------- ADD THE CHECKMARK & DELETE FUNCTIONS -------------- */

function deleteCheck(e) {
  const item = e.target;

  //delete
  if (item.classList[0] === 'del-btn') {
    const todo = item.parentElement;
    //animation
    todo.classList.add('fall');
    removeLocalTodos(todo);
    //addevent and make the transition then remove the div
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  //check
  if (item.classList[0] === 'comp-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('comp');
  }
}

/*-------------- USE THE SELECT DROPDOWN TO FILTER THE TODO'S -------------- */

function filterTodo(e) {
  let todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('comp')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('comp')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

/*-------------- SAVE THE TODOS TO THE LOCAL STORAGE -------------- */

function saveLocalTodos(todo) {
  //check -- hey do i already have things in there>?
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

/*--------------  -------------- */

function getTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    //TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    //add the value
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    //checkmark btn
    const compBtn = document.createElement('button');
    compBtn.innerHTML = '<i class="fas fa-check"></i>';
    compBtn.classList.add('comp-btn');
    todoDiv.appendChild(compBtn);

    //delete btn
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add('del-btn');
    todoDiv.appendChild(delBtn);

    //APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
