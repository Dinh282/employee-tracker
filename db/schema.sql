DROP DATABASE IF EXISTS company_employees_db;
CREATE DATABASE course_db;

USE company_employees_db;

-- Create department table:
CREATE TABLE department (
  id INT,
  company_name VARCHAR(30),
  PRIMARY KEY (id),
);

-- Create role table:
CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary DECIMAL,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NUll,
  PRIMARY KEY (id),
)

-- Create employee table:
CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee(id),
    
)