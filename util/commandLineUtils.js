import inquirer from 'inquirer';
import db from './../server.js';


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
            viewAllEmployees();
            break;
          case 'Add Employee':
            addEmployee();
            break;
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
          case 'View All Roles':
            viewAllRoles();
            break;
          case 'Add Role':
            addRole();
            break;
          case 'View All Departments':
            viewAllDepartments();
            break;
          case 'Add Department':
            addDepartment();
            break;
          case 'Quit':
            console.log('Goodbye!');
            process.exit(0); //process.exit() is a Node.js exit process. It takes in 0 as default value. 
            
        }
      });
  }
  
  // Function to handle the "View all employees" menu option
  function viewAllEmployees() {
    // TODO: Add logic to retrieve and display all employees from the database
    const sql = `SELECT e.id ID, e.first_name 'First Name', e.last_name 'Last Name', r.title Title,
    d.department_name Department, r.salary Salary, CONCAT(m.first_name, ' ', m.last_name) 
    Manager FROM employee e JOIN role r ON e.role_id = r.id JOIN
    department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;`; 

    db.query(sql, (err, results) => {
      if (err) {
        console.error('There was an error retrieving employeees data:', err);
        displayMainMenu();
        return;
      }
      console.log('Here are all of employees data:');
      console.table(results);
      displayMainMenu(); // Display the main menu again
      });
  }
  
  // Function to handle the "Add employee" option
  function addEmployee() {
    // TODO: Add logic to prompt for employee detail add an employee to the database
    
    
    displayMainMenu(); // Display the main menu again
  }
  
  // Function to handle the "Update an employee role" option
  function updateEmployeeRole() {
    // TODO: Add logic to prompt for employee and role details to update that employee's role in the database
    console.log('Update an employee role');
    displayMainMenu(); // Display the main menu again
  }
  
  // Function to handle the "View all roles" option
  function viewAllRoles() {
    // TODO: Add logic retrieve and display all the roles from the database
    const sql = `SELECT r.id ID, r.title Title, d.department_name Department, r.salary Salary FROM role r JOIN
    department d ON r.department_id = d.id;`; 

    db.query(sql, (err, results) => {
      if (err) {
        console.error('There was an error retrieving roles data:', err);
        displayMainMenu();
        return;
      }
      console.log('Here are all of the roles:');
      console.table(results);
      displayMainMenu(); // Display the main menu again
      });
    };

 

  
  // Function to handle the "Add a role" option
  function addRole() {
    // TODO: Add logic to prompt for role details and add detail to the database
    console.log('Add a role');
    displayMainMenu(); // Display the main menu again
  }
  
  // Function to handle the "View all departments" option
  function viewAllDepartments() {
    // TODO: Add logic to retrieve and display all departments from the database
    const sql = 'SELECT id ID,  department_name Department FROM department'
    db.query(sql, (err, results) => {
      if (err) {
        console.error('There was an error retrieving department data:', err);
        displayMainMenu();
        return;
      }
      console.log('Here are all of the departments:');
      console.table(results);
      displayMainMenu(); // Display the main menu again
      });
    };


   
  
  // Function to handle the "Add a department" option
  function addDepartment() {
    // TODO: Add logic to prompt for department details and save that detail to the database
    console.log('Add a department');
    displayMainMenu(); // Display the main menu again
  }
  
  // Start the application by displaying the main menu
//   displayMainMenu();

  export default displayMainMenu; 