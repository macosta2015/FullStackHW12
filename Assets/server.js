const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
      // MySQL username,
    user: 'root',
      // MySQL password
    password: 'ElonMusk2040!*',
    database: 'classlist_db'
    },
    console.log(`Connected to the classlist_db database.`)
);


// Testing if we are reading something or not
db.query('SELECT * FROM classlist_db.students', function (err, results) {
    console.log(results);
});

const PORT = process.env.PORT || 3306;
const app = express();



// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



function myFunction(){
    console.log("Hello World");

    // startApplication()
}




function startApplication (){
    inquirer.prompt([
        {
            name: 'initialInquiry',
            type: 'rawlist',
            message: 'Welcome to the employee management program. What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'View all employees by manager', 'Add a department', 'Add a role', 'Add an employee', 'Update employee\'s role', 'Update employee\'s manager', 'Remove a department', 'Remove a role', 'Remove an employee', 'View total salary of department', 'Exit program']
        }
    ]).then((response) => {
        switch (response.initialInquiry) {
            case 'View all departments':
                viewAllDepartments();    
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all employees by manager':
                viewAllEmployeesByManager();
            break;
            case 'Add a department':
                addADepartment();
            break;
            case 'Add a role':
                addARole();
            break;
            case 'Add an employee':
                addAnEmployee();
            break;
            case 'Update employee\'s role':
                updateEmployeeRole();
            break;
            case 'Update employee\'s manager':
                updateEmployeesManager();
            break;
            case 'Remove a department':
                removeADepartment();
            break;
            case 'Remove a role':
                removeARole();
            break;
            case 'Remove an employee':
                removeAnEmployee();
            break;
            case 'View total salary of department':
                viewDepartmentSalary();
            break;
            case 'Exit program':
                connection.end();
                console.log('\n You have exited the employee management program. Thanks for using! \n');
                return;
            default:
                break;
        }
    })
}





myFunction();
