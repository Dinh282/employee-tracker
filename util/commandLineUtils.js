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
    
    //we query for list of roles for user to select from when addin ne employee
    db.query(`SELECT id, title FROM role`, (err, roles) => {
      if (err) {
        console.error('There was an error retrieving roles:', err);
        displayMainMenu();
        return;
      }

      // we query for list of employee names from database that user can select from to assign manager to the new employee.
      db.query(`SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee`, (err, managers) => {
        if (err) {
          console.error('There was an error retrieving employee names:', err);
          displayMainMenu();
          return;
        }

      // Create an array of options for the available roles from the retrieved roles data.
    const roleOptions = roles.map((role) => ({
      value: role.id,
      name: role.title,
    }));

     // Create an array of manager options choices using the retrieved employees names
     const managerOptions = [
      {value: null, name: 'None'},
      ...managers.map((manager) => ({
      value: manager.id,
      name: manager.name,
    }))
  ];
    
    
    inquirer
      .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Enter the employee's last name:",
      },
      {
        type: 'list',
        name: 'role',
        message: `What is the employee's role?`,
        choices: roleOptions,
      },
      {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: managerOptions,
      },
    ])
    .then ((answers) => {
      //destructuring syntax
      const { first_name, last_name, role, manager } = answers; 

      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?)`;

      const data = [first_name, last_name, role, manager];

      db.query(sql, data, (err, results) => {
        if (err) {
          console.error('There was an error adding employee data:', err);
          displayMainMenu();
          return;
        }
        console.log('Employee data was added successfully!:');
        displayMainMenu(); // Display the main menu again
      });  
      });
    });
  });
}
  
  // Function to handle the "Update an employee role" option
  function updateEmployeeRole() {
    // TODO: Add logic to prompt for employee and role details to update that employee's role in the database
    
    const sqlEmployeesQuery = `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`;
    const sqlRolesQuery = `SELECT id, title FROM role`;

    db.query(sqlEmployeesQuery, (err, employeeList) => {
      if (err) {
        console.err('There was an error retrieving list of employees:', err);
        displayMainMenu();
        return;
      }
    
    db.query(sqlRolesQuery, (err, roleList) => {
      if (err) {
        console.error('There was an error retrieving list of roles:', err);
        displayMainMenu();
        return; 
      }

    const roleOptions = roleList.map((role) => ({
      value: role.id,
      name:role.title,
    }))

    const employeeOptions = employeeList.map((employee) => ({
      value: employee.id,
      name:employee.name,
    }))

    inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: `Which employee's role do you want to update?`,
            choices: employeeOptions,
          },
          {
            type: 'list',
            name: 'role',
            message: `Which role do you want to assign the selected employee?`,
            choices: roleOptions,
          },
        ])
        .then((answers) => {
          const { employee, role } = answers;

          const sqlUpdateQuery = `UPDATE employee SET role_id = ? WHERE id = ?`;
          db.query(sqlUpdateQuery, [role, employee], (err, result) => {
            if(err) {
              console.error(`There was an error updating the employee's role:`, err);
              displayMainMenu();
              return;
            }
            console.log(`Updated ${employee}'s role!`)
            displayMainMenu();
          })


        
        })


    })

    })

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

    db.query(`SELECT id, department_name FROM department`, (err, departments) => {
      if (err) {
        console.error('There was an error retrieving departments:', err);
        displayMainMenu();
        return;
      }

      const departmentOptions = departments.map((department) => ({
        value: department.id,
        name: department.department_name,
      }));

    inquirer
      .prompt([
      {
        type: 'input',
        name: 'role',
        message: "What is the name of the role?",
      },
      {
        type: 'input',
        name: 'salary',
        message: "What is the salary of the role?",
      },
      {
        type: 'list',
        name: 'department',
        message: `Which department does the role belong to?`,
        choices: departmentOptions,
      },
    ])
    .then ((answers) => {
      //destructuring syntax
      const { role, salary, department } = answers; 

      const sql = `INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, ?)`;

      const data = [role, salary, department];

      db.query(sql, data, (err, results) => {
        if (err) {
          console.error('There was an error adding role data:', err);
          displayMainMenu();
          return;
        }
        console.log('Role data was added successfully!:');
        displayMainMenu(); // Display the main menu again
      });  
      });
    });
    
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

    inquirer
      .prompt([
      {
        type: 'input',
        name: 'department',
        message: "What is the name of the department?",
      },

    ])
    .then ((answer) => {
      //destructuring syntax
      const { department } = answer; 

      const sql = `INSERT INTO department (department_name)
      VALUES (?)`;

      const data = [department];

      db.query(sql, data, (err, results) => {
        if (err) {
          console.error(`There was an error adding ${department} to the database:`, err);
          displayMainMenu();
          return;
        }
        console.log(`Added ${department} to the database!`);
        displayMainMenu(); // Display the main menu again
      });  
      });
   
  }
  
  // Start the application by displaying the main menu
//   displayMainMenu();

  export default displayMainMenu; 