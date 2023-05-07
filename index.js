const db = require('./db');
const {prompt} = require("inquirer");
require("console.table");

init()

function init() {
    menuPrompt();
}

function menuPrompt() {
    prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Choose and operation',
            choices: [
                {
                    name: 'View Employees',
                    value: 'view_employees'
                },
                {
                    name: 'View Departments',
                    value: 'view_departments'
                },
                {
                    name: 'View Jobs',
                    value: 'view_jobs'
                },
                {
                    name: 'Add Department',
                    value: 'add_department'
                },
                {
                    name: 'Add Employee',
                    value: 'add_employee'
                },
                {
                    name: 'Add Job',
                    value: 'add_job'
                },
                {
                    name: 'Remove Department',
                    value: 'remove_department'
                },
                {
                    name: 'Remove Job',
                    value: 'remove_job'
                },
                {
                    name: 'Remove Employee',
                    value: 'remove_employee'
                },
                {
                    name: 'Update Employee',
                    value: 'update_employee'
                },
                {
                    name: 'Quit',
                    value: 'quit'
                }
            ]
        }
    ]).then(res => {
        let option = res.option;

        switch(option){
            case 'view_employees':
                viewEmployees();
                break;
            case 'view_departments':
                viewDepartments();
                break;
            case 'view_jobs':
                viewJobs();
                break;
            case 'add_employee':
                addEmployee();
                break;
            case 'add_department':
                addDepartment();
                break;
            case 'add_job':
                addJob();
                break;
            case 'update_role':
                updateRole();
                break;
            default:
                quit();
        }
    })
}

function viewEmployees(){
    db.viewAllEmployees()
    .then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    })
    .then(() => menuPrompt());
}

function viewDepartments(){
    db.viewAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    })
    .then(() => menuPrompt());
}

function viewJobs(){
    db.viewAllJobs()
    .then(([rows]) => {
        let jobs = rows;
        console.log('\n');
        console.table(jobs);
    })
    .then(() => menuPrompt());
}

function addEmployee(){
    prompt([
        {
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            name: 'last_name',
            message: 'What is their last name?'
        }
    ])
    .then(res => {
        let firstName = res.firstName;
        let lastName = res.lastName;

        db.viewAllJobs()
        .then(([rows]) => {
            let jobs = rows;
            const jobChoices = jobs.map(({id, jobTitle}) => ({
                name: jobTitle,
                value: id
            }));

            prompt({
                type: 'list',
                name: 'jobId',
                message: "What is their job?",
                choices: jobChoices
            })
                .then(res => {
                    let jobId = res.jobId;

                    db.viewAllEmployees()
                        .then(([rows]) => {
                            let employees = rows;
                            const managers = employees.map(({id, first_name, last_name}) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            prompt({
                                type: "list",
                                name: "managersID",
                                message: "Whos is going to be the employee's manager?",
                                choices: managers
                            })
                                .then(res => {
                                    let employeeguy = {
                                        manager_id: res.managersID,
                                        job_id: res.jobId,
                                        first_name: firstName, 
                                        last_name: lastName
                                    }

                                    db.createEmployee(employeeguy)
                                    .then(() => console.log(`${employee.first_name} ${employee.last_name} was added`))
                                    .then(() => menuPrompt())
                                })

                        })
                })

        })
    })
}

function addDepartment() {
    prompt([
        {
            name:'department_name',
            message: "What is the name of the new department?"
        }
    ])
        .then(res => {
            let deptName = res;

            db.createDepartment(deptName)
            .then(() => console.log(`Added ${deptName.department_name} to the database`))
            .then(() => menuPrompt())
        })
}

function addJob() {
    db.viewAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, department_name }) => ({
        name: department_name,
        value: id
      }));

      prompt([
        {
          name: "job_title",
          message: "What is the name of the job?"
        },
        {
          name: "pay",
          message: "What is the job's salary?"
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department is the job in?",
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createJob(role)
            .then(() => console.log(`Added ${role.job_title} to the database`))
            .then(() => menuPrompt())
        })
    })
}

function quit() {
    console.log("bye");
    process.exit();
}