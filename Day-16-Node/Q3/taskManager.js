const fs = require('fs');

const TASKS_FILE = 'tasks.json';

function loadTasks() {
  if (!fs.existsSync(TASKS_FILE)) {
    fs.writeFileSync(TASKS_FILE, '[]');
  }
  const data = fs.readFileSync(TASKS_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

function isValidDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function addTask(title, dueDate) {
  if (!title || !dueDate) {
    console.log("❌ Title and due date are required.");
    return;
  }
  if (!isValidDate(dueDate)) {
    console.log("❌ Due date must be in YYYY-MM-DD format.");
    return;
  }

  const tasks = loadTasks();
  const newTask = {
    id: tasks.length + 1,
    title,
    dueDate,
    status: "pending"
  };

  tasks.push(newTask);
  saveTasks(tasks);
  console.log("✅ Task added successfully.");
}

function listTasks(filter = 'all') {
  const tasks = loadTasks();
  let filteredTasks = tasks;

  if (filter === 'completed') {
    filteredTasks = tasks.filter(t => t.status === 'completed');
  } else if (filter === 'pending') {
    filteredTasks = tasks.filter(t => t.status === 'pending');
  }

  if (filteredTasks.length === 0) {
    console.log("📭 No tasks to show.");
    return;
  }

  console.log("\n📋 Your Tasks:");
  filteredTasks.forEach(task => {
    console.log(`- [${task.status === 'completed' ? '✔' : ' '}] ID: ${task.id} | ${task.title} | Due: ${task.dueDate}`);
  });
}

function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("❌ Task not found.");
    return;
  }

  task.status = "completed";
  saveTasks(tasks);
  console.log(`✅ Task "${task.title}" marked as completed.`);
}

function deleteTask(id) {
  let tasks = loadTasks();
  const index = tasks.findIndex(t => t.id == id);

  if (index === -1) {
    console.log("❌ Task not found.");
    return;
  }

  const removed = tasks.splice(index, 1);
  saveTasks(tasks);
  console.log(`🗑️ Task "${removed[0].title}" deleted.`);
}

function updateTask(id, newTitle, newDueDate) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id == id);

  if (!task) {
    console.log("❌ Task not found.");
    return;
  }

  if (newTitle) task.title = newTitle;
  if (newDueDate) {
    if (!isValidDate(newDueDate)) {
      console.log("❌ Due date must be in YYYY-MM-DD format.");
      return;
    }
    task.dueDate = newDueDate;
  }

  saveTasks(tasks);
  console.log("✏️ Task updated.");
}

module.exports = {
  addTask,
  listTasks,
  completeTask,
  deleteTask,
  updateTask,
  isValidDate,
};
