const readline = require('readline');
const taskManager = require('./taskManager');
const preferenceManager = require('./preferenceManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(" Welcome to Task Manager CLI");
console.log("Type 'help' to see available commands.");

function showHelp() {
  console.log(`
 Commands:
- add         Add a new task
- list       Show all tasks (respects user filter)
- complete    Mark a task as completed
- delete      Delete a task by ID
- update      Update a task's title or due date
- set-filter  Set preference to show: all, completed, pending
- help        Show this help message
- exit        Exit the app
  `);
}

function prompt() {
  rl.question("\n Enter command: ", (cmd) => {
    switch (cmd.trim()) {
      case 'add':
        rl.question("Title: ", (title) => {
          rl.question("Due Date (YYYY-MM-DD): ", (dueDate) => {
            taskManager.addTask(title.trim(), dueDate.trim());
            prompt();
          });
        });
        break;

      case 'list':
        const pref = preferenceManager.loadPreference();
        taskManager.listTasks(pref.filter);
        prompt();
        break;

      case 'complete':
        rl.question("Task ID to mark as completed: ", (id) => {
          taskManager.completeTask(id.trim());
          prompt();
        });
        break;

      case 'delete':
        rl.question("Task ID to delete: ", (id) => {
          taskManager.deleteTask(id.trim());
          prompt();
        });
        break;

      case 'update':
        rl.question("Task ID to update: ", (id) => {
          rl.question("New Title : ", (title) => {
            rl.question("New Due Date : ", (dueDate) => {
              taskManager.updateTask(id.trim(), title.trim() || null, dueDate.trim() || null);
              prompt();
            });
          });
        });
        break;

      case 'set-filter':
        rl.question("Filter (all/completed/pending): ", (filter) => {
          preferenceManager.setFilter(filter.trim());
          prompt();
        });
        break;

      case 'help':
        showHelp();
        prompt();
        break;

      case 'exit':
        console.log("Exiting Task Manager.");
        rl.close();
        break;

      default:
        console.log("Unknown command.");
        prompt();
    }
  });
}

prompt();
