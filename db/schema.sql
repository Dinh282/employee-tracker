DROP DATABASE IF EXISTS company_employees_db;
CREATE DATABASE company_employees_db;

USE company_employees_db;

-- Create department table:
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Create role table:
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NUll
);

-- Create employee table:
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY Key,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE SET NULL,
    FOREIGN KEY (manager_id) 
        REFERENCES employee(id) 
        ON DELETE SET NULL
);