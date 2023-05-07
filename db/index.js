const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, job.job_title, department.department_name AS department, job.pay FROM employee INNER JOIN job ON employee.job_id = job.id INNER JOIN department ON department.id = job.department_id"
        );
    }

    viewAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.department_name FROM department"
        );
    }

    viewAllJobs(){
        return this.connection.promise().query(
            "SELECT job.id, job.job_title, job.pay, job.department_id FROM job INNER JOIN department ON job.department_id = department.id"
        );
    }

    createEmployee(employee) {
        return this.connection.promise().query(
            'INSERT INTO employee SET ?', employee
        );
    }

    createDepartment(department){
        return this.connection.promise().query(
            'INSERT INTO department SET ?', department
        );
    }

    createJob(job){
        return this.connection.promise().query(
            'INSERT INTO job SET ?', job
        );
    }

    updateEmployeeJob(employeeId,jobId) {
        return this.connection.promise().query(
            "UPDATE employee SET job_id = ? WHERE id = ?",
            [jobId, employeeId]
        );
    }
}   

module.exports = new DB(connection);