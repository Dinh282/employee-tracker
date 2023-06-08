import inquirer from 'inquirer';
import Employees from './helpers/employees.js';
import Roles from './helpers/roles.js';
import Departments from './helpers/departments.js';

// Function to display the main menu and prompt for user choice
function displayMainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'Quit',
          ],
        },
      ])
      .then((answers) => {
        // We use switch case to call the corresponding function based on the user's choice
        switch (answers.choice) {
          case 'View All Employees':
            Employees.viewAllEmployees();
            break;
          case 'Add Employee':
            Employees.addEmployee();
            break;
          case 'Update Employee Role':
            Employees.updateEmployeeRole();
            break;
          case 'View All Roles':
            Roles.viewAllRoles();
            break;
          case 'Add Role':
            Roles.addRole();
            break;
          case 'View All Departments':
            Departments.viewAllDepartments();
            break;
          case 'Add Department':
            Departments.addDepartment();
            break;
          case 'Quit':
            console.log('Goodbye!');
            process.exit(0); //process.exit() is a Node.js exit process. It takes in 0 as default value. 
        }
      });
  }
  
  export default displayMainMenu; 