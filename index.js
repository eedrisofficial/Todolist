const pageReload = () => {
  window.location.reload();
};
const addBtn = document.querySelector(".addBtn");
const editBtn = document.querySelector(".editBtn");

//Get toDo from LS
const todoDb = "database";
//Read from local storage
const toDoDbInstance = JSON.parse(localStorage.getItem(todoDb)) || [];
// Create Function
const addToDo = () => {
  const toDoInput = document.getElementById("todo-task");
  const todoTitle = toDoInput.value;

  const newToDo = {
    id: toDoDbInstance.length + 1,
    title: todoTitle,
    isCompleted: false,
  };
  const updateToDoDb = [...toDoDbInstance, newToDo];

  localStorage.setItem(todoDb, JSON.stringify(updateToDoDb));

  pageReload();
};

//Render Function
const renderToDoItem = function () {
  const todoListContainer = document.getElementById("todo-list-container");
  const todoListItem = toDoDbInstance
    .map(function (todo) {
      const { id, title, isCompleted } = todo;
      return `
    <li class = ${isCompleted && "checked"}>
        ${title}
         <span  id = "checked" class = "complete-status-icon" onClick = "toggleComplete(${id})">✔</span>
        <span class = "update" onClick = "updateToDoItem(${id})">✍️</span>
        <span class="close" onClick ="deleteToDo(${id})">🗑</span>
      </li>
    `;
    })
    .join("");

  todoListContainer.innerHTML = todoListItem;
};
renderToDoItem();
//Update Function
const updateToDoItem = (_id) => {
  const updateItems = toDoDbInstance.find((todo) => todo.id == _id);

  const toDoInputUpdate = document.getElementById("todo-task");
  toDoInputUpdate.value = updateItems.title;
  addBtn.style.display = "none";
  editBtn.style.display = "block";
  editBtn.setAttribute("id", _id);
};
function updateToDoTitle() {
  const { id } = this;
  const _id = parseInt(id);

  const todoToUpdate = toDoDbInstance.find((todo) => todo.id === _id);

  todoToUpdate.title = document.getElementById("todo-task").value;
  const updatedToDoDb = toDoDbInstance.map((todo) =>
    todo._id === _id ? todoToUpdate : todo
  );
  localStorage.setItem(todoDb, JSON.stringify(updatedToDoDb));
  pageReload();
}

// Delete Function
const deleteToDo = (toDoId) => {
  const updatedToDoDb = toDoDbInstance.filter(({ id }) => id !== toDoId);

  localStorage.setItem(todoDb, JSON.stringify(updatedToDoDb));
  pageReload();
};

// TOGGLE FUNCTION
const toggleComplete = (todoComplete) => {
  const isCompleteToDo = toDoDbInstance.find(
    (todo) => todo.id === todoComplete
  );
  if (isCompleteToDo.isCompleted === true) {
    isCompleteToDo.isCompleted = false;
  } else {
    isCompleteToDo.isCompleted = true;
  }
  const toggleToDoDb = toDoDbInstance.map((todo) =>
    todo.id === todoComplete ? isCompleteToDo : todo
  );
  localStorage.setItem(todoDb, JSON.stringify(toggleToDoDb));

  pageReload();
};

//ADD EVENT LISTENER
addBtn.addEventListener("click", addToDo);
editBtn.addEventListener("click", updateToDoTitle);
