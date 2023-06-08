import db from './../../server.js';
import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';

class Roles {

 // Function to handle the "View all roles" option
 static viewAllRoles() {
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
  static addRole() {

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
};


export default Roles;