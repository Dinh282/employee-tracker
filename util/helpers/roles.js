import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';
import Queries from './query.js';

class Roles {

 // Function to handle the "View all roles" option
 static viewAllRoles() {

  Queries.roleList()
  .then((roleList) => {
      console.log('Here are all of the roles:');
      console.table(roleList);
      displayMainMenu();
      })
  };

// Function to handle the "Add a role" option
static addRole() {

  Queries.departmentList()
  .then((departmentList) => {
      const departmentOptions = departmentList.map((department) => ({
          value: department.ID,
          name: department.Department,
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
      const { role, salary, department } = answers; 
      const data = [role, salary, department];

      Queries.add('role', `(title, salary, department_id)
      VALUES (?, ?, ?)`, data );
      
      Queries.roleList()
        .then((roleList) => {
          console.log(`The ${role} role has been successfully removed. Here is the updated list of roles:`);
          console.table(roleList);
          displayMainMenu();
      });
    });
  });   
}


static removeRole() {

    Queries.roleList()
    .then((results) => {   
      const roleOptions = results.map((role) => ({
        value: role.ID,
        name: role.Title,
      }));

    inquirer
      .prompt([
      {
        type: 'list',
        name: 'role',
        message: "Which role do you want to remove?",
        choices: roleOptions,
      },
    ])
    .then ((answer) => {
      const { role } = answer; 
      const roleId = role;

      Queries.delete("role", roleId)
        const roleName = roleOptions.find((roles) => roles.value === role).name;
    
      Queries.roleList()
      .then((roleList) => {
          console.log(`The ${roleName} role has been successfully removed. Here is the updated list of roles:`);
          console.table(roleList);
          displayMainMenu();
      });
    });
  });
}

};

export default Roles;