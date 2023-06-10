import db from './../../server.js';
import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';
import Departments from './departments.js';
import Queries from './query.js';

class Roles {

    
    // static queryRoleList() {
    //     const sql = `SELECT r.id ID, r.title Title, d.department_name Department, r.salary Salary FROM role r JOIN
    //     department d ON r.department_id = d.id;`
    
    //     return new Promise((resolve, reject) => {
    //     db.query(sql, (err, results) => {
    //       if (err) {
    //         console.error('There was an error retrieving role data:', err);
    //         reject (err);
    //       } else {
    //         resolve(results);
    //       }
    //     });
    //   });
    // }

 // Function to handle the "View all roles" option
 static viewAllRoles() {

    // Roles.queryRoleList()
    Queries.roleList()
    .then((roleList) => {
        console.log('Here are all of the roles:');
        console.table(roleList);
        displayMainMenu();
        })
    };


  // Function to handle the "Add a role" option
  static addRole() {

    // Departments.queryDepartmentList()
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
      //destructuring syntax
      const { role, salary, department } = answers; 

      // const sql = `INSERT INTO role (title, salary, department_id)
      // VALUES (?, ?, ?)`;

      const data = [role, salary, department];

      Queries.add('role', `(title, salary, department_id)
      VALUES (?, ?, ?)`, data );
      // db.query(sql, data, (err, results) => {
      //   if (err) {
      //     console.error('There was an error adding role data:', err);
      //     displayMainMenu();
      //     return;
      //   }


        console.log('Role data was added successfully!:');
        displayMainMenu(); // Display the main menu again
      // });  //
      });
    });   
  }




static removeRole() {

    // Roles.queryRoleList()
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
      //destructuring syntax
      const { role } = answer; 
      const roleId = role;

      // const sql = `DELETE FROM role WHERE id = ?`;
      // const data = [roleId];
      // db.query(sql, data, (err, results) => {
      //   if (err) {
      //       console.error('There was an error removing the role:', err);
      //       displayMainMenu();
      //       return;
      //   }


      Queries.delete("role", roleId)
        const roleName = roleOptions.find((roles) => roles.value === role).name;
        Roles.queryRoleList()
        .then((roleList) => {
            console.log(`The ${roleName} role has been successfully removed. Here is the updated list of roles:`);
            console.table(roleList);
            displayMainMenu();
            });
      // });//
    });
    });


}



};




export default Roles;