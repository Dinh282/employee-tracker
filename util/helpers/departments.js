import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';
import Queries from './query.js';

class Departments {

 // Function to handle the "View all departments" option
 static viewAllDepartments() {
      Queries.departmentList()
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
      const { department } = answer; 
      const data = [department];
    
      Queries.add('department', '(department_name) VALUES (?)', data ); //utilizing add method of Queries class to add department
      Queries.departmentList()
      .then((departmentList) => {
        console.log(`The ${department} department has been successfully added. Here is the updated list of departments:`)
        console.table(departmentList);
        displayMainMenu();
        });
      });
  }

  //Function to handle rending of employees by user selected department
  static viewEmployeesByDepartment() {

    Queries.departmentList()
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
      const { department } = answer; 
      const departmentId = department;

      Queries.employeeList(departmentId)
      .then((results) => {
        const departmentName = departmentOptions.find((departments) => departments.value === department).name;
        console.log(`Here are the employees from the ${departmentName} department:`);
        console.table(results);
        displayMainMenu();
      });
    });  
  });
}

//Function to handle the removal of a department.
static removeDepartment() {

  Queries.departmentList()
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
      const { department } = answer; 
      const departmentId = department;

      Queries.delete("department", departmentId);
      const departmentName = departmentOptions.find((departments) => departments.value === department).name;
      
      Queries.departmentList()
      .then((departmentList) => {
          console.log(`The ${departmentName} department has been successfully removed. Here is the updated list of departments:`)
          console.table(departmentList);
          displayMainMenu();
      });
    });
  });
}


static viewBudget() {
  
    Queries.departmentList()
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
        message: "Which department do you want to view the total utilized budget of?",
        choices: departmentOptions,
      },
    ])
    .then ((answer) => {
        //destructuring syntax
        const { department } = answer; 
        const departmentId = department;
        Queries.budgetByDepartment(departmentId, departmentOptions);    
    });
  });
};


};

export default Departments;