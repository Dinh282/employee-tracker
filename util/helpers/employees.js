import db from './../../server.js';
import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';


class Employees {

// Function to handle the "View all employees" menu option
 static viewAllEmployees(departmentId = null) { //we set the viewAllEmployee() as static so we can call on it without the need to create an instance of Employee class.
   
    let sql = `SELECT e.id ID, e.first_name 'First Name', e.last_name 'Last Name', r.title Title,
    d.department_name Department, r.salary Salary, CONCAT(m.first_name, ' ', m.last_name) 
    Manager FROM employee e JOIN role r ON e.role_id = r.id JOIN
    department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id`; 

    if(departmentId) {
            sql += ` WHERE d.id = ?`
            return sql;
        }else {

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
  }


 // Function to handle the "Add employee" option
 static addEmployee() {
   
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
static updateEmployeeRole() {
    
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

            const employeeName = employeeOptions.find((employees) => employees.value === employee).name;
            console.log(`Updated ${employeeName}'s role!`)
            displayMainMenu();
          })
        })
    })
    })
  }
};

  export default Employees;