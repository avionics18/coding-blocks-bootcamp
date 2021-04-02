const todos = [
  {
    task: "Goto Gym",
    isDone: false,
  },
  {
    task: "Buy Groceries",
    isDone: true,
  },
  {
    task: "Learn Web Development",
    isDone: false,
  },
];

// ul containing all the tasks
const todosUl = document.querySelector("#todo-body .list-group");

// ------------------ Display Todos -----------------------
function displayTodos() {
  // initially ul should be empty then as per the condition
  // ul should fill up
  todosUl.innerHTML = "";

  if (todos.length === 0) {
    const li = `<li class="list-group-item text-success text-center p-3">No tasks for today <i class="fa fa-thumbs-up"></i></li>`;
    todosUl.innerHTML = li;
  } else {
    todos.forEach((item, index) => {
      let li = document.createElement("li");
      li.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
      );
      li.innerHTML = `<div class="todo-title${
        item.isDone ? " text-secondary text-decoration-linethrough" : ""
      }">${item.task}</div>
											<div class="todo-buttons text-nowrap ml-2">
												<button class="btn btn-outline-secondary btn-sm"><i class="fa fa-pencil-square-o"></i></button>
												<button class="btn btn-outline-danger btn-sm"><i class="fa fa-trash-o"></i></button>
											</div>`;
      todosUl.append(li);

      // Toggle Completed Tasks
      li.querySelector(".todo-title").onclick = function (e) {
        e.target.classList.toggle("text-secondary");
        e.target.classList.toggle("text-decoration-linethrough");
        item.isDone = !item.isDone;
        // console.log(item);
      };

      // Delete Tasks
      li.querySelector(
        ".todo-buttons > .btn-outline-danger"
      ).onclick = function () {
        todos.splice(index, 1);
        // call this again as our main array has changed
        displayTodos();
      };

      // Edit Tasks
      li.querySelector(
        ".todo-buttons > .btn-outline-secondary"
      ).onclick = function () {
        // first change the input text to current element's task
        document.querySelector("#edittask-input").value = item.task;
        // then show the div
        showDiv("edittodo-form-wrapper");
        let form2 = document.querySelector("#edittodo-form");
        form2.onsubmit = function (e) {
          e.preventDefault();
          let input = e.target.querySelector("#edittask-input");
          item.task = input.value;

          // then hide the form
          hideDiv("edittodo-form-wrapper");
          // empty the input
          input.value = "";
          // again call the displayTdos()
          displayTodos();
        };
      };
    });
  }
}

displayTodos();

// ---------- ADD TASK FUNCTION -----------
let form1 = document.querySelector("#addtodo-form");
form1.onsubmit = function (e) {
  e.preventDefault();
  let input = e.target.querySelector("#addtask-input");
  let newTask = input.value;
  todos.push({
    task: newTask,
    isDone: false,
  });

  // then hide the form
  hideDiv("addtodo-form-wrapper");
  // empty the input
  input.value = "";
  // again call the displayTdos()
  displayTodos();
};

// ---------- Helping Functions -----------
function showDiv(div) {
  document.querySelector(`#${div}`).classList.remove("d-none");
}
function hideDiv(div) {
  document.querySelector(`#${div}`).classList.add("d-none");
}

// --------- Other Functions - show date, month, year, day ---------------
let d = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.querySelector("#date").innerText = d.getDate();
document.querySelector("#month").innerText = months[d.getMonth()];
document.querySelector("#year").innerText = d.getFullYear();
document.querySelector("#day").innerText = days[d.getDay()];
