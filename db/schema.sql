DROP DATABASE IF EXISTS company_employees_db;
CREATE DATABASE company_employees_db;

USE company_employees_db;

-- Create department table:
CREATE TABLE department (
  id INT PRIMARY KEY,
  company_name VARCHAR(30)
);

-- Create role table:
CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NUll
);

-- Create employee table:
CREATE TABLE employee (
    id INT PRIMARY Key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE SET NULL,
    FOREIGN KEY (manager_id) 
        REFERENCES employee(id) 
        ON DELETE SET NULL
);