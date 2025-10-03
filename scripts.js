let tasks = [];
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

// Add task function
function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ id: Date.now(), text, completed: false });
  input.value = "";
  render();
}

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  render();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  render();
}

// Render tasks
function render() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;

  if (total === 0) {
    todoList.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📝</div>
                        <p>No tasks yet! Add one above to get started.</p>
                    </div>`;
    return;
  }

  todoList.innerHTML = tasks
    .map(
      (task) => `
                <li class="task-item ${task.completed ? "completed" : ""}">
                    <div class="task-checkbox ${
                      task.completed ? "checked" : ""
                    }" 
                         onclick="toggleTask(${task.id})"></div>
                    <span class="task-text">${task.text}</span>
                    <button class="delete-btn" onclick="deleteTask(${
                      task.id
                    })">×</button>
                </li>
            `
    )
    .join("");
}

// Event listeners
addBtn.addEventListener("click", addTask);
input.addEventListener("keypress", (e) => e.key === "Enter" && addTask());

// Initial render
render();
