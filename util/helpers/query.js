import db from './../../server.js';
import displayMainMenu from '../commandLineUtils.js';


class Queries {

static employeeList(departmentId = null) {
    let sql = `SELECT e.id ID, e.first_name 'First Name', e.last_name 'Last Name', r.title Title,
    d.department_name Department, r.salary Salary, CONCAT(m.first_name, ' ', m.last_name) 
    Manager FROM employee e JOIN role r ON e.role_id = r.id JOIN
    department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id`;

    if(departmentId) {
        sql += ` WHERE d.id = ?`
        return new Promise((resolve, reject) => {
          db.query(sql, departmentId, (err, results) => {
            if (err) {
              console.error('There was an error retrieving employee data:', err);
              reject (err);
            } else {
              resolve(results);
            }
          });
        });
    }else {
    return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) {
        console.error('There was an error retrieving employee data:', err);
        reject (err);
      } else {
        resolve(results);
      }
    });
  });
}
}


static departmentList() {
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


static delete(what, id) {
  db.query(`DELETE FROM ${what} WHERE id = ?`, id, (err, results) => {
    if (err) {
        console.error(`There was an error removing the ${what}:`, err);
        displayMainMenu();
        return;
    }
  })

}


static budgetByDepartment(departmentId, departmentOptions){
  const sql = `SELECT SUM(r.salary) TotalBudget FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id WHERE d.id = ?`;

  db.query(sql, departmentId, (err, results) => {
    if (err) {
        console.error('There was an error retrieving total utilized budget data:', err);
        displayMainMenu();
        return;
    }
        const TotalBudget = results[0].TotalBudget;
        const departmentName = departmentOptions.find((departments) => departments.value === departmentId).name; 
            console.log(`The total utilized budget of the ${departmentName} department is $${TotalBudget}.`);
            displayMainMenu();
            return
            
  });

}

static add(where, sql, data) {
   let sqlQuery = `INSERT INTO ${where} ${sql} `;

  db.query(sqlQuery, data, (err, results) => {
      if (err) {
        console.error(`There was an error adding ${where} to the database:`, err);
        displayMainMenu();
        return;
      }
    })
}

static roleList() {
  const sql = `SELECT r.id ID, r.title Title, d.department_name Department, r.salary Salary FROM role r JOIN
  department d ON r.department_id = d.id;`

  return new Promise((resolve, reject) => {
  db.query(sql, (err, results) => {
    if (err) {
      console.error('There was an error retrieving role data:', err);
      reject (err);
    } else {
      resolve(results);
    }
  });
});
}

static managerData(data) {
  const sql = `SELECT e.id, e.first_name, e.last_name, r.title
  FROM employee e
  JOIN role r ON e.role_id = r.id
  WHERE e.id IN (?)`

  return new Promise((resolve, reject) => {
  db.query(sql, data,  (err, results) => {
    if (err) {
      console.error('There was an error retrieving manager data:', err);
      reject (err);
    } else {
      resolve(results);
    }
  });
});
}


static update(what, data) {

  const sqlUpdateQuery = `UPDATE employee SET ${what}_id = ? WHERE id = ?`;
  db.query(sqlUpdateQuery, data, (err, result) => {
    if(err) {
      console.error(`There was an error updating the employee's ${what}:`, err);
      displayMainMenu();
      return;
    }
  });

}


}



export default Queries;