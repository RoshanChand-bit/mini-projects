const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load saved tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskList.addEventListener("click", handleTaskClick);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

function handleTaskClick(e) {
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveTasks();
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
    saveTasks();
  }
}

function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.classList.add("delete-btn");
  li.appendChild(delBtn);

  return li;
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}
