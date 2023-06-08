import db from './../../server.js';
import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';

class Departments {

 // Function to handle the "View all departments" option
 static viewAllDepartments() {
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
  static addDepartment() {
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
};

export default Departments;