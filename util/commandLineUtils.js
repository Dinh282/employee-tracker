import inquirer from 'inquirer';

// Function to display the main menu and prompt for user choice
function displayMainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'What would you like to do?',
          choices: [
            'View All Employess',
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

    const sql = ''
    // TODO: Add logic to retrieve and display all employees from the database
    db.query(sql, (err, results) => {
      if (err) {
        results.status(400).json({ error: "There was an Error"})
        return;
      }
      resizeBy.json({
        message: 'success',
        data: results
      });
    });



    console.log('View all employees');
    displayMainMenu(); // Display the main menu again
  }
  
  // Function to handle the "Add employee" option
  function addEmployee() {
    // TODO: Add logic to prompt for employee detail add an employee to the database
    console.log('View all roles');
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
    console.log('View all roles');
    displayMainMenu(); // Display the main menu again
  }
  
  // Function to handle the "Add a role" option
  function addRole() {
    // TODO: Add logic to prompt for role details and add detail to the database
    console.log('Add a role');
    displayMainMenu(); // Display the main menu again
  }
  
  // Function to handle the "View all departments" option
  function viewAllDepartments() {
    // TODO: Add logic to retrieve and display all departments from the database
    console.log('View all departments');
    displayMainMenu(); // Display the main menu again
  }
  
  // Function to handle the "Add a department" option
  function addDepartment() {
    // TODO: Add logic to prompt for department details and save that detail to the database
    console.log('Add a department');
    displayMainMenu(); // Display the main menu again
  }
  
  // Start the application by displaying the main menu
//   displayMainMenu();

  export default displayMainMenu; 