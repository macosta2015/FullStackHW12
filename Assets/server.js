const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3007;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',// MySQL username,
    password: 'ElonMusk2040!*',// MySQL password
    database: 'classlist_db'
},
    console.log("Connected to the classlist_db database.")
);

// Query database, see the Database!
db.query('SELECT * FROM classlist_db.students', function (err, results) {
    console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});


// db.connect((err) => {
//     if (err) throw err;
//     console.log(`Connected as id ${db.threadId} \n`);
//     startApp();
// });


//code before the pause
setTimeout(function(){

    db.connect((err) => {
        if (err) throw err;
        console.log(`Connected as id ${db.threadId} \n`);
        startApp();
    });
    
}, 2000);

startApp = () => {
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


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
