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
                    value: 'view_Departments'
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
            case 'update_roll':
                updateRoll();
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
    .then(() => menuPrompts());
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
                                choice: managers
                            })
                                then(res => {
                                    let employee = {
                                        manager_id: res.managersID,
                                        job_id: res.jobId,
                                        first_name: firstName, 
                                        last_name: lastName
                                    }

                                    db.createEmployee(employee);
                                })
                                .then(() => console.log(`${firstName} ${lastName} was added`))
                                .then(() => menuPrompt())

                        })
                })

        })
    })
}

function addDepartment() {
    prompt([
        {
            name:"dpt_name",
            message: "What is the name of the new department?"
        }
    ])
        .then(res => {
            let deptName = res.dpt_name;

            db.createDepartment(dpt_name)
            .then(() => console.log(`Added ${dpt_name.dpt_name} to the database`))
            .then(() => menuPrompt())
        })
}

function addJob() {
    db.ViewAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          name: "title",
          message: "What is the name of the job?"
        },
        {
          name: "salary",
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
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then(() => loadMainPrompts())
        })
    })
}

function quit() {
    console.log("bye");
    process.exit();
}