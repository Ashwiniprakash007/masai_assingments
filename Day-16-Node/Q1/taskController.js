const fs = require('fs');
const path = './tasks.json';

function readTasks() {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
}

function writeTasks(tasks) {
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

function addTask(title, dueDate) {
  if (!title || !dueDate) {
    console.log("Title and Due Date cannot be empty.");
    return;
  }

  const tasks = readTasks();
  const id = tasks.length + 1;
  tasks.push({ id, title, dueDate, status: "pending" });
  writeTasks(tasks);
  console.log(`Task "${title}" added with due date ${dueDate}.`);
}

function listTasks() {
  const tasks = readTasks();
  if (tasks.length === 0) return console.log("No tasks found.");

  console.log("\n All Tasks:");
  tasks.forEach(task => {
    console.log(`- [${task.status === 'completed' ? 'Done' : ' '}] ID: ${task.id} | Title: ${task.title} | Due: ${task.dueDate}`);
  });
}

function completeTask(identifier) {
  const tasks = readTasks();
  const task = tasks.find(t => t.id == identifier || t.title === identifier);

  if (!task) {
    return console.log(`Task not found: ${identifier}`);
  }

  task.status = "completed";
  writeTasks(tasks);
  console.log(`Task "${task.title}" marked as completed.`);
}

module.exports = { addTask, listTasks, completeTask };
