DROP database IF EXISTS business;
CREATE DATABASE business;

USE business;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE job (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pay DECIMAL NOT NULL,
    job_title VARCHAR(30) NOT NULL UNIQUE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    job_id INT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT,
    FOREIGN KEY (job_id) REFERENCES job(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    ON DELETE CASCADE
);