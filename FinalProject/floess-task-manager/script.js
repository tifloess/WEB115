// TaskFlow Interactive Task Manager
// Tabitha Floess
// WEB115 Final Project


// Get references to main form and input elements from HTML
const taskForm = document.getElementById("taskForm");
const taskNameInput = document.getElementById("taskName");
const taskPriorityInput = document.getElementById("taskPriority");
const isImportantInput = document.getElementById("isImportant");
const isCompletedInput = document.getElementById("isCompleted");

// Get references to message, display, count, and button elements
const formMessage = document.getElementById("formMessage");
const taskManager = document.getElementById("taskmanager");
const taskCount = document.getElementById("taskCount");
const clearCompletedButton = document.getElementById("clearCompletedButton");

// Array used to store all task objects, track next available unique task ID
let tasks = [];
let nextTaskId = 1;


// Required: Logs full task array to console as a JSON string
function logTasks() {
  console.log(JSON.stringify(tasks));
}


// Replaces special HTML characters so user input displays correctly
function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// Returns different inline CSS styles depending on task priority
function getPriorityBadgeStyle(priority) {
  
  if (priority === "High") {
    return "background: #ffe6e6; color: #b72525;";
  }

  if (priority === "Medium") {
    return "background: #fff4d6; color: #85620d;";
  }

  return "background: #e7f7ec; color: #24783a;";
}


// Displays all tasks on page
function renderTasks() {
  taskCount.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"} total`;


  // Show an empty state message when there are no tasks
  if (tasks.length === 0) {
    taskManager.innerHTML = `<div class="empty-state">No tasks yet. Add a task to get started.</div>`;
    return;
  }


  // Convert each task object into HTML task card
  taskManager.innerHTML = tasks
    .map((task) => {
      const safeTaskName = escapeHTML(task.name);
      const safePriority = escapeHTML(task.priority);
      const safeDate = escapeHTML(task.date);


      return `
        <article class="task-card" data-id="${task.id}">
          <div class="task-main">
            <div class="task-title-row">
              <h3 class="task-name">${safeTaskName}</h3>

              <!-- Priority badge -->
              <span class="badge" style="${getPriorityBadgeStyle(task.priority)}">${safePriority}</span>
              
              <!-- Only show this label if task is important -->
              ${task.isImportant ? '<span class="badge important-label">Important</span>' : ""}
              
              <!-- Only show this label if task is completed -->
              ${task.isCompleted ? '<span class="badge completed-label">Completed</span>' : ""}
            </div>

            <p class="task-meta">
              <span>Added: ${safeDate}</span>
              <span>ID: ${task.id}</span>
            </p>
          </div>


          <div class="task-actions">

            <!-- Checkbox used to toggle completion after task is created -->
            <label class="complete-toggle">
              <input type="checkbox" class="complete-checkbox" ${task.isCompleted ? "checked" : ""} />
              Done
            </label>

            <!-- Button used to toggle important status -->
            <button type="button" class="action-button important-button">
              ${task.isImportant ? "Unmark Important" : "Mark Important"}
            </button>

            <!-- Button used to edit task name and priority -->
            <button type="button" class="action-button edit-button">Edit</button>

            <!-- Button used to delete the task -->
            <button type="button" class="action-button danger delete-button">Delete</button>
          </div>
        </article>
      `;
    })
    .join("");


  // Required: JavaScript .style property usage for conditional task styling
  tasks.forEach((task) => {
    const card = document.querySelector(`[data-id="${task.id}"]`);
    const title = card.querySelector(".task-name");
    const importantLabel = card.querySelector(".important-label");
    const completedLabel = card.querySelector(".completed-label");


    // Important tasks are highlighted in red
    if (task.isImportant) {
      card.style.borderColor = "#d92f2f";
      card.style.background = "#fff3f3";
      title.style.color = "#c73737";


      if (importantLabel) {
        importantLabel.style.background = "#d92f2f";
        importantLabel.style.color = "#ffffff";
      }
    }


    // Completed tasks are shown with strikethrough
    if (task.isCompleted) {
      title.style.textDecoration = "line-through";
      title.style.opacity = "0.65";
      card.style.opacity = "0.78";


      if (completedLabel) {
        completedLabel.style.background = "#e7edf8";
        completedLabel.style.color = "#4c5b73";
      }
    }
  });
}


// Clears form after a task is added
function resetForm() {
  taskForm.reset();
  taskPriorityInput.value = "Medium";
  taskNameInput.focus();
}


// Handles form submission and creates new task object
function addTask(event) {
  event.preventDefault();

  
  // Remove extra spaces from task name input
  const taskName = taskNameInput.value.trim();


  // Prevent invalid empty task names
  if (taskName === "") {
    formMessage.textContent = "Please enter a task name before submitting.";
    taskNameInput.focus();
    return;
  }


  // Store current date and time for new task
  const today = new Date().toLocaleString();


  // Create new task object
  const newTask = {
    id: nextTaskId,
    name: taskName,
    priority: taskPriorityInput.value,
    isImportant: isImportantInput.checked,
    isCompleted: isCompletedInput.checked,
    date: today
  };


  // Add new task to tasks array
  tasks.push(newTask);


  // Increase ID number for the next task
  nextTaskId += 1;


  // Clear any form message, reset form, update display, log tasks
  formMessage.textContent = "";
  resetForm();
  renderTasks();
  logTasks();
}


// Finds and returns a task object by ID
function findTaskById(taskId) {
  return tasks.find((task) => task.id === taskId);
}


// Allows user to edit task name and priority
function editTask(taskId) {
  const task = findTaskById(taskId);


  // Stop if task cannot be found
  if (!task) {
    return;
  }


  // Ask user for a new task name
  const updatedName = prompt("Edit task name:", task.name);


  // If user cancels the prompt, stop editing
  if (updatedName === null) {
    return;
  }

  
  const trimmedName = updatedName.trim();


  // Prevent empty task names
  if (trimmedName === "") {
    alert("Task name cannot be empty.");
    return;
  }


  // Ask the user for a new priority
  const updatedPriority = prompt("Enter priority: High, Medium, or Low", task.priority);


  // If user cancels prompt, stop editing
  if (updatedPriority === null) {
    return;
  }


  // Normalize priority input so capitalization does not matter
  const formattedPriority = updatedPriority.trim().toLowerCase();

  // Valid priority options mapped to their display versions
  const priorityOptions = {
    high: "High",
    medium: "Medium",
    low: "Low"
  };


  // Reject any priority that is not High, Medium, or Low
  if (!priorityOptions[formattedPriority]) {
    alert("Priority must be High, Medium, or Low.");
    return;
  }


  // Update task object
  task.name = trimmedName;
  task.priority = priorityOptions[formattedPriority];

  // Refresh display and log updated task array
  renderTasks();
  logTasks();
}


// Deletes task from tasks array
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
  logTasks();
}


// Switches task between completed and not completed
function toggleCompleted(taskId) {
  const task = findTaskById(taskId);

  if (task) {
    task.isCompleted = !task.isCompleted;
    renderTasks();
    logTasks();
  }
}


// Switches task between important and not important
function toggleImportant(taskId) {
  const task = findTaskById(taskId);

  if (task) {
    task.isImportant = !task.isImportant;
    renderTasks();
    logTasks();
  }
}


// Handles clicks inside task manager section
// This uses event delegation so buttons still work after tasks are re-rendered
function handleTaskActions(event) {
  // Find task card that was clicked
  const card = event.target.closest(".task-card");

  // Stop if click was not inside task card
  if (!card) {
    return;
  }

  // Get task ID from task card's data-id attribute
  const taskId = Number(card.dataset.id);


  // Toggle task completion when checkbox is clicked
  if (event.target.classList.contains("complete-checkbox")) {
    toggleCompleted(taskId);
  }

  // Toggle important status when important button is clicked
  if (event.target.classList.contains("important-button")) {
    toggleImportant(taskId);
  }

  // Edit task when edit button is clicked
  if (event.target.classList.contains("edit-button")) {
    editTask(taskId);
  }

  // Delete task when delete button is clicked
  if (event.target.classList.contains("delete-button")) {
    deleteTask(taskId);
  }
}


// For Fun: Removes every completed task from task list
function clearCompletedTasks() {
  const originalTaskCount = tasks.length;
  // Keep only tasks not completed
  tasks = tasks.filter((task) => !task.isCompleted);

  // Only refresh and log if at least one task was removed
  if (tasks.length !== originalTaskCount) {
    renderTasks();
    logTasks();
  }
}


// Listen for form submission to add new task
taskForm.addEventListener("submit", addTask);

// Listen for clicks inside task manager to handle edit/delete/toggle actions
taskManager.addEventListener("click", handleTaskActions);

// Listen for clicks on clear completed button
clearCompletedButton.addEventListener("click", clearCompletedTasks);

// Render the initial empty task list when page first loads
renderTasks();