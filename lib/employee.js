const cTable = require('console.table');
const inquirer = require("inquirer");

class Employee {

    addRole() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'firstName',
                message: "What is the employee's first name? (Required)",
                validate: firstNameInput => {
                    if (firstNameInput) {
                        return true;
                    } else {
                        console.log('Please enter the first name!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'lastName',
                message: "What is the employee's last name? (Required)",
                validate: lastNameInput => {
                    if (lastNameInput) {
                        return true;
                    } else {
                        console.log('Please enter the last name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addRole',
                message: "What is this employee's role? (Required)",
                validate: roleInput => {
                    if (roleInput) {
                        return true;
                    } else {
                        console.log('Please enter the role!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addMang',
                message: "Who is this employee's manager? (Required)",
                validate: mangInput => {
                    if (mangInput) {
                        return true;
                    } else {
                        console.log('Please enter the manager!');
                        return false;
                    }
                }
            },
        ])
        .then(answers => {
            const employee = new Employee(answers.addName, answers.addSalary, answers.addDept)
                
            console.log(`Added ${employee.addName} to the database`)
            tableOptions();
        })
    };

     upEmp() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'empUp',
                message: 'Which employee would you like to update?',
                choices: [
                    
                ],
            },
        ])
     }
    };

    module.exports = Employee;