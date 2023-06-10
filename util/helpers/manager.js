import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';
import Queries from './query.js';


class Managers {

  //Function to view all employees managed by selected manager.
static viewEmployeesByManager() {

  Queries.employeeList()
  .then((results) => {
    const managerOptions = results
      .filter((employee) => employee.Manager !== null)  
      .reduce((options, employee) => {
        const managerName = employee.Manager;
        const existingOptionIndex = options.findIndex((option) => option.name === managerName);

          if (existingOptionIndex !== -1) {
              options[existingOptionIndex].value.push(employee.ID);
          } else {
              options.push({
                  name: managerName,
                  value: [employee.ID],
              })
          }
          return options;
      }, []);
          
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'manager',
          message: 'Select a manager to view their employees:',
          choices: managerOptions,
        },
      ])
      .then((answer) => {
        const { manager } = answer;
        const data = [manager];

        Queries.managerData(data)
        .then((results) => {
          const managerName = managerOptions.find((managers) => managers.value === manager).name;
          console.log(`Here are the employees managed by ${managerName}:`);
          console.table(results);
          displayMainMenu();
        });
      });
  })
}

//Function to update the selected employee's manager.
static updateEmployeeManager() {

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
          message: 'Select the employee to update his/her manager:',
          choices: employeeOptions,
        },
      ])
    .then((firstAnswer) => {
      const { employee } = firstAnswer;
      // Filter employeeOptions to exclude the selected employee from the manager choices
      const managerOptions = [
        { value: null, name: 'None' },
        ...employeeOptions.filter((option) => option.value !== employee),
      ];

      inquirer
      .prompt([
        {
          type: 'list',
          name: 'manager',
          message: 'Select the manager of this employee:',
          choices: managerOptions,
        },
      ])
      .then((secondAnswer) => {
        const { manager } = secondAnswer;

        Queries.update('manager', [manager, employee])
        Queries.employeeList()
        .then((employeeList) => {
            const employeeName = employeeOptions.find((employees) => employees.value === employee).name;
          console.log(`Updated ${employeeName}'s manager! Here is the updated employee list:`)
          console.table(employeeList);
          displayMainMenu();
        });
      })
    })
  })
};

};

export default Managers;