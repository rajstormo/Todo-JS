//variables
let tasks;

// load data from local storage
if (localStorage.getItem("tasks") == null)
  tasks = [];
else
  tasks = JSON.parse(localStorage.getItem("tasks"));

//selectors
let task = document.getElementById("task");
let addTaskBtn = document.getElementById("submit-btn");
let showTaskContainer = document.getElementById("showTask-container");
let checkBoxes = document.getElementsByClassName("check");

addTaskBtn.addEventListener("click", addNewTask);
showTaskContainer.addEventListener("click", deleteTask);
showTaskContainer.addEventListener("click", editTask);
showTaskContainer.addEventListener("click", showCompletedTasks);
window.addEventListener("load", loadTasks);

function showCompletedTasks() {
  for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener("change", function () {
      let nextElement = checkBoxes[i].nextElementSibling;
      // if checkbox is checked
      if (checkBoxes[i].checked) {
        //target the next sibling, and add line-through text decoration
        nextElement.style.textDecoration = "line-through";
        tasks[i]["completed"] = true;
        //update local storage
      }
      else {
        nextElement.style.textDecoration = "none";
        tasks[i]["completed"] = false;
      }
      localStorage.setItem("tasks",JSON.stringify(tasks));
    });
  }
}

function loadTasks() {
  let ulElement = document.createElement("ul");
  ulElement.classList.add("show-tasks");

  for (let i = 0; i < tasks.length; i++) {
    let newTask = document.createElement("li");

    let div1 = document.createElement("div");
    div1.classList.add("task-name");
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.classList.add("check");


    let para = document.createElement("p");
    para.appendChild(document.createTextNode(tasks[i]["Item name"]));

    if (tasks[i]["completed"]) {
      checkBox.checked = true;
      para.style.textDecoration = "line-through";
    }

    div1.appendChild(checkBox);
    div1.appendChild(para);


    let div2 = document.createElement("div");
    div2.classList.add("task-icons");
    let icon1 = document.createElement("i");
    icon1.classList.add("fa-regular", "fa-pen-to-square");
    icon1.setAttribute("title", "Edit");

    let icon2 = document.createElement("i");
    icon2.classList.add("fa-regular", "fa-trash-can");
    icon2.setAttribute("title", "Delete");

    div2.appendChild(icon1);
    div2.appendChild(icon2);

    newTask.appendChild(div1);
    newTask.appendChild(div2);
    ulElement.appendChild(newTask);
  }
  showTaskContainer.replaceChild(ulElement, showTaskContainer.children[1]);
}

function addNewTask() {
  if (task.value == "") {
    alert("Input Can't be Empty!!");
    return;
  }

  //add new task to the tasks array
  tasks.push({ "Item name": task.value.trim(), "completed": false });
  loadTasks();

  //convert to string
  let jsonArr = JSON.stringify(tasks);

  //save tasks to local storage
  localStorage.setItem("tasks", jsonArr);

  task.value = "";
}

function deleteAndUpdateLocalStorage(text) {
  //delete from tasks array
  let indexOfText;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i]["Item name"].trim() == text) {
      indexOfText = i;
      break;
    }
  }
  tasks.splice(indexOfText, indexOfText + 1);

  //update local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {
  if (e.target.classList.contains("fa-trash-can")) {
    let val = confirm("Are you sure you want to delete?");
    if (val) {
      let text = e.target.parentElement.parentElement.children[0].children[1].textContent.trim();
      deleteAndUpdateLocalStorage(text);
      e.target.parentElement.parentElement.remove();
    }
  }
}

function editTask(e) {
  if (e.target.classList.contains("fa-pen-to-square")) {
    let val = e.target.parentElement.parentElement.children[0].children[1].textContent.trim();
    task.value = val;
    deleteAndUpdateLocalStorage(val);
    e.target.parentElement.parentElement.remove();
  }
}