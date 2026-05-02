let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  let text = document.getElementById("taskInput").value;
  let category = document.getElementById("category").value;
  let priority = document.getElementById("priority").value;
  let dueDate = document.getElementById("dueDate").value;

  if (text === "") return;

  tasks.push({
    text,
    category,
    priority,
    dueDate,
    completed: false
  });

  document.getElementById("taskInput").value = "";
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  updateProgress();
}

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    list.innerHTML += `
      <li class="${task.priority} ${task.completed ? 'completed' : ''}">
        <div class="top-row">
          <span onclick="toggleTask(${i})">
            ${task.completed ? "✅" : "⬜"} ${task.text}
          </span>
          <button onclick="deleteTask(${i})">❌</button>
        </div>
        <div class="meta">
          ${task.category} | ${task.priority} | ${task.dueDate || "No date"}
        </div>
      </li>
    `;
  });
}

function toggleTask(i) {
  tasks[i].completed = !tasks[i].completed;
  saveAndRender();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveAndRender();
}

function updateProgress() {
  let done = tasks.filter(t => t.completed).length;
  let percent = (done / tasks.length) * 100 || 0;
  document.getElementById("progress").style.width = percent + "%";
}

renderTasks();
updateProgress();