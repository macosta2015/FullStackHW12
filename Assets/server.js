
//Libraries and packages that we are going to be needing
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3006;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',// MySQL username,
    password: 'ElonMusk2040!*',// MySQL password
    database: 'employeeTrackerDB' //This is the Database we are going to be working on
},
    console.log("Connected to the classlist_db database.")
);

// Query database, see the Database!
// db.query('SELECT * FROM classlist_db.students', function (err, results) {
//     db.query('SELECT * FROM employeeTrackerDB.employee', function (err, results) {

//     console.log(results);
// });

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

//code before the pause
setTimeout(function(){
    db.connect((err) => {
        if (err) throw err;
        startApp();
    });
}, 2000); // Makes it wait for 2 secons

//startApp() is the function that we are going to be used when we want to ask the questions. 
startApp = () => {
    inquirer.prompt([
        {
            name: 'programList',
            type: 'rawlist',
            message: 'Welcome to the employee management program. What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee\'s role', 'Exit program']
        }
    ]).then((response) => {
        switch (response.programList) {
            case 'View all departments':
                viewDepartments();    
                break;
            case 'View all roles':
                viewRolles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDeparment();
            break;
            case 'Add a role':
                addRole();
            break;
            case 'Add an employee':
                addEmployee();
            break;
            case 'Update employee\'s role':
                updateEmployeeRole();
            break;
            case 'Exit program': //We are done running the code
                console.log('DONE VIEWING THE COMPANY\'S TEAM')
                return;
            default:
                break;
        }
    })
}

//Function to view all departments
function viewDepartments(){
    console.log('VIEW ALL DEPARTMENTS')
    db.query('SELECT * FROM employeeTrackerDB.department', function (err, results) {
        console.log('\n', results, '\n');
    // db.query
    startApp();
});
}

//Function to view all the Roles
function viewRolles(){
    console.log('VIEW ALL ROLES')
    db.query('SELECT * FROM employeeTrackerDB.role', function (err, results) {
        console.log('\n', results, '\n');
    // db.query
    startApp();
});
}

//Function to view all the Employees
function viewEmployees(){
    console.log('VIEW ALL EMPLOYEES')
    db.query('SELECT * FROM employeeTrackerDB.employee', function (err, results) {
        console.log('\n', results, '\n');
    // db.query
    startApp();
});
}

//Function to add the a role to the company 
function addRole(){
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        let departments = res.map(department => ({name: department.department_name, value: department.department_id }));
        inquirer.prompt([
            {
            name: 'title',
            type: 'input',
            message: 'What is the name of the role you want to add?'   
            },
            {
            name: 'salary',
            type: 'input',
            message: 'What is the salary of the role you want to add?'   
            },
            {
            name: 'deptName',
            type: 'rawlist',
            message: 'Which department do you want to add the new role to?',
            choices: departments
            },
        ]).then((response) => {
            db.query(`INSERT INTO role SET ?`, 
            {
                title: response.title,
                salary: response.salary,
                department_id: response.deptName,
            },
            (err, res) => {
                if (err) throw err;
                console.log(`\n ${response.title} successfully added to database! \n`);
                startApp();
            })
        })
    })
}

//Function to add a department to the company
function addDeparment(){
    console.log('ADD A DEPARTMENT')
    inquirer.prompt([
        {
        name: 'newDept',
        type: 'input',
        message: 'What is the name of the department you want to add?'   
        }
    ]).then((response) => {
        db.query(`INSERT INTO department SET ?`, 
        {
            department_name: response.newDept,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`\n ${response.newDept} successfully added to database! \n`);
            startApp();
        })
    })
}

//Function to add an employee
function addEmployee(){
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id}));
            inquirer.prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employee\'s first name?'
                },
                {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the employee\'s last name?'
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: 'What is the employee\'s title?',
                    choices: roles
                },
                {
                    name: 'manager',
                    type: 'rawlist',
                    message: 'Who is the employee\'s manager?',
                    choices: employees
                }
            ]).then((response) => {
                db.query(`INSERT INTO employee SET ?`, 
                {
                    first_name: response.firstName,
                    last_name: response.lastName,
                    role_id: response.role,
                    manager_id: response.manager,
                }, 
                (err, res) => {
                    if (err) throw err;
                })
                db.query(`INSERT INTO role SET ?`, 
                {
                    department_id: response.dept,
                }, 
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n ${response.firstName} ${response.lastName} successfully added to database! \n`);
                    startApp();
                })
            })
        })
    })
}

//Function to update an employee
function updateEmployeeRole(){
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        let roles = res.map(role => ({name: role.title, value: role.role_id }));
        db.query(`SELECT * FROM employee;`, (err, res) => {
            if (err) throw err;
            let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.employee_id }));
            inquirer.prompt([
                {
                    name: 'employee',
                    type: 'rawlist',
                    message: 'Which employee would you like to update the role for?',
                    choices: employees
                },
                {
                    name: 'newRole',
                    type: 'rawlist',
                    message: 'What should be the employee\'s new role?',
                    choices: roles
                },
            ]).then((response) => {
                db.query(`UPDATE employee SET ? WHERE ?`, 
                [
                    {
                        role_id: response.newRole,
                    },
                    {
                        employee_id: response.employee,
                    },
                ], 
                (err, res) => {
                    if (err) throw err;
                    console.log(`We updated the employee\'s role in the database! \n`);
                    startApp();
                })
            })
        })
    })
}


//We are listening to the port!
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
