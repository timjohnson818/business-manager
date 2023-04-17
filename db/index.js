const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, job.job_title, department.name AS department, job.pay"
        );
    }

    viewAllDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name"
        );
    }

    viewAllJobs(){
        return this.connection.promise().query(
            "SELECT job.id, job.job_title, job.pay, job.department_id"
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