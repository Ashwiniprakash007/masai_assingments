const readline = require('readline');
const { addTask, listTasks, completeTask } = require('./taskController');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to CLI Task Manager");
console.log("Commands:\n - add-task\n - list-tasks\n - complete-task\n - exit");

function prompt() {
  rl.question("\n> Enter command: ", (command) => {
    switch (command.trim()) {
      case 'add-task':
        rl.question("Enter task title: ", (title) => {
          rl.question("Enter due date (YYYY-MM-DD): ", (dueDate) => {
            addTask(title.trim(), dueDate.trim());
            prompt();
          });
        });
        break;

      case 'list-tasks':
        listTasks();
        prompt();
        break;

      case 'complete-task':
        rl.question("Enter task ID or title: ", (identifier) => {
          completeTask(identifier.trim());
          prompt();
        });
        break;

      case 'exit':
        console.log("Exiting Task Manager...");
        rl.close();
        break;

      default:
        console.log("Unknown command.");
        prompt();
    }
  });
}

prompt();
