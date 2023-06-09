import db from './../../server.js';
import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';
import Employees from './employees.js';

class Departments {

static queryDepartmentList() {
    const sql = 'SELECT id ID,  department_name Department FROM department'

    return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('There was an error retrieving department data:', err);
        reject (err);
      } else {
        resolve(results);
      }
    });
  });
}

 // Function to handle the "View all departments" option
 static viewAllDepartments() {
    Departments.queryDepartmentList()
    .then((departmentList) => {
        console.log('Here are all of the departments:');
        console.table(departmentList);
        displayMainMenu();
        })
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

        Departments.queryDepartmentList()
            .then((departmentList) => {
                console.log(`The ${department} department has been successfully Added. Here is the updated list of departments:`)
                console.table(departmentList);
                displayMainMenu();
                });
      
      });  
      });
  }

  //Function to handle rending of employees by user selected department
  static viewEmployeesByDepartment() {

    Departments.queryDepartmentList()
    .then((results) => {   

        const departmentOptions = results.map((department) => ({
            value: department.ID,
            name: department.Department,
          }));

    inquirer
      .prompt([
      {
        type: 'list',
        name: 'department',
        message: "Which department do you want to look up?",
        choices: departmentOptions,
      },
    ])
    .then ((answer) => {
      //destructuring syntax
      const { department } = answer; 
      const departmentId = department;
     
      let sql = Employees.queryEmployeeList(departmentId);

      db.query(sql, departmentId, (err, results) => {
        if (err) {
          console.error(`There was an error retrieving the data:`, err);
          displayMainMenu();
          return;
        }

        const departmentName = departmentOptions.find((departments) => departments.value === department).name;
        console.log(`Here are the employees from the ${departmentName} department:`);
        console.table(results);
        displayMainMenu(); // Display the main menu again
      });  
      });
    })
  }


  //Function to handle the removal of a department.
static removeDepartment() {

    Departments.queryDepartmentList()
    .then((results) => {   

        const departmentOptions = results.map((department) => ({
            value: department.ID,
            name: department.Department,
          }));

    inquirer
      .prompt([
      {
        type: 'list',
        name: 'department',
        message: "Which department do you want to remove?",
        choices: departmentOptions,
      },
    ])
    .then ((answer) => {
      //destructuring syntax
      const { department } = answer; 
      const departmentId = department;

      const sql = `DELETE FROM department WHERE id = ?`;
      const data = [departmentId];
      
      db.query(sql, data, (err, results) => {
        if (err) {
            console.error('There was an error removing the department:', err);
            displayMainMenu();
            return;
        }
            const departmentName = departmentOptions.find((departments) => departments.value === department).name;
            Departments.queryDepartmentList()
            .then((departmentList) => {
                console.log(`The ${departmentName} department has been successfully removed. Here is the updated list of departments:`)
                console.table(departmentList);
                displayMainMenu();
                });
      });
    });
    });


}







};

export default Departments;