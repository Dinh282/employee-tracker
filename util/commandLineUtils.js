import inquirer from 'inquirer';
import Employees from './helpers/employees.js';
import Roles from './helpers/roles.js';
import Departments from './helpers/departments.js';
import Managers from './helpers/manager.js';

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
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'Add Department',
            'Remove Department',
            'View Total Utilized Budget By Department',
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
          case 'View All Employees By Department':
            Departments.viewEmployeesByDepartment();
            break; 
          case 'View All Employees By Manager':
            Managers.viewEmployeesByManager();
            break;     
          case 'Add Employee':
            Employees.addEmployee();
            break;
          case 'Remove Employee':
            Employees.removeEmployee();
            break;  
          case 'Update Employee Role':
            Employees.updateEmployeeRole();
            break;
          case 'Update Employee Manager':
            Managers.updateEmployeeManager();
            break;  
          case 'View All Roles':
            Roles.viewAllRoles();
            break;
          case 'Add Role':
            Roles.addRole();
            break;
          case 'Remove Role':
            Roles.removeRole();
            break;  
          case 'View All Departments':
            Departments.viewAllDepartments();
            break;
          case 'Add Department':
            Departments.addDepartment();
            break;
          case 'Remove Department':
            Departments.removeDepartment();
            break;
          case 'View Total Utilized Budget By Department':
            Departments.viewBudget();
            break;    
          case 'Quit':
            console.log('Goodbye!');
            process.exit(0); //process.exit() is a Node.js exit process. It takes in 0 as default value. 
        }
      });
  }
  
  export default displayMainMenu; 