import db from './../../server.js';
import inquirer from 'inquirer';
import displayMainMenu from '../commandLineUtils.js';
import Employees from './employees.js';


class Managers {

static viewEmployeesByManager() {

    Employees.queryEmployeeList()
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
  
            const sql = `SELECT e.id, e.first_name, e.last_name, r.title
                         FROM employee e
                         JOIN role r ON e.role_id = r.id
                         WHERE e.id IN (?)`;
            const data = [manager];
  
            db.query(sql, data, (err, results) => {
              if (err) {
                console.error('Error retrieving employees by manager data:', err);
                displayMainMenu();
                return;
              }
              const managerName = managerOptions.find((managers) => managers.value === manager).name;
              console.log(`Here are the employees managed by ${managerName}:`);
              console.table(results);
              displayMainMenu();
            });
          });
      })
      .catch((error) => {
        console.error('Error retrieving employee data:', error);
        displayMainMenu();
      });
  
}


static updateEmployeeManager() {

    Employees.queryEmployeeList()
    .then((results) => {
      console.log(results);
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

              const sql = 'UPDATE employee SET manager_id = ? WHERE id = ?';
              const data = [manager, employee];

              db.query(sql, data, (err, result) => {
                if (err) {
                  console.error(`Error updating the employee's manager:`, err);
                  displayMainMenu();
                  return;
                }
                console.log('Employee manager updated successfully.');
                displayMainMenu();
              });
            })
            .catch((error) => {
              console.error('Error selecting manager:', error);
              displayMainMenu();
            });
        })
        .catch((error) => {
          console.error('Error selecting employee:', error);
          displayMainMenu();
        });
    })
    .catch((error) => {
      console.error('Error retrieving employee data:', error);
      displayMainMenu();
    });
};




};

export default Managers;