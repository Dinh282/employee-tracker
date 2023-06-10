import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';
import Queries from './query.js';


class Employees {
// Function to handle the "View all employees" menu option
 static viewAllEmployees() { //we set the viewAllEmployee() as static so we can call on it without the need to create an instance of Employee class.
   
    Queries.employeeList()
    .then((employeeList) => {
        console.log('Here are all of the employees:');
        console.table(employeeList);
        displayMainMenu();
    })
  }

 // Function to handle the "Add employee" option
 static addEmployee() {
   
  Queries.roleList()
  .then((roles) =>{

    Queries.employeeList()
    .then((managers) => {    
     
        // Create an array of options for the available roles from the retrieved roles data.
        const roleOptions = roles.map((role) => ({
          value: role.ID,
          name: role.Title,
        }));

        // Create an array of manager options choices using the retrieved employees names
        const managerOptions = [  
          {value: null, name: 'None'},
          ...managers.map((manager) => ({
            value: manager.ID,
            name: `${manager['First Name']} ${manager['Last Name']}`,
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
        const { first_name, last_name, role, manager } = answers; 
        const data = [first_name, last_name, role, manager];

        Queries.add('employee', `(first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`, data)

        Queries.employeeList()
        .then((employeeList) => {
          console.log(`Employee ${first_name} ${last_name} has been successfully added. Here is the updated list of employees:`);
          console.table(employeeList);
          displayMainMenu();
        });
      });  
    });
  });
}

// Function to handle the "Update an employee role" option
static updateEmployeeRole() {

  Queries.employeeList()
  .then((employeeList) => {

    Queries.roleList()
    .then((roleList) => {
      const roleOptions = roleList.map((role) => ({
        value: role.ID,
        name:role.Title,
      }))

      const employeeOptions = employeeList.map((employee) => ({
        value: employee.ID,
        name:`${employee['First Name']} ${employee['Last Name']}` ,
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

        Queries.update('role', [role, employee])
        Queries.employeeList()
        .then((employeeList) => {
          const employeeName = employeeOptions.find((employees) => employees.value === employee).name;
          console.log(`Updated ${employeeName}'s role! Here is the updated employee list:`)
          console.table(employeeList);
          displayMainMenu();
        });
      })
    })
  })
}


static removeEmployee(){

  Queries.employeeList()
  .then((results) => {   
      const employeeOptions = results.map((employee) => ({
        value: employee.ID,
        name: `${employee['First Name']} ${employee['Last Name']}`,
      }));

    inquirer
      .prompt([
      {
        type: 'list',
        name: 'employee',
        message: "Which employee do you want to remove?",
        choices: employeeOptions,
      },
    ])
    .then ((answer) => {
      //destructuring syntax
      const { employee } = answer; 
      const employeeId = employee;
      const employeeName = employeeOptions.find((employees) => employees.value === employee).name;
      
      Queries.delete('employee', employeeId)
      Queries.employeeList()
      .then((employeeList) => {
        console.log(`Employee ${employeeName} has been successfully removed. Here is the updated list of employees:`);
        console.table(employeeList);
        displayMainMenu();
      });
    });
  });
}

};

  export default Employees;