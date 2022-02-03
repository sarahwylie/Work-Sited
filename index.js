const inquirer = require('inquirer');

const Department = require('./lib/department');
const Role = require('./lib/role');
const Employee = require('./lib/employee');

function tableOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addFeature',
            message: 'What would you like to do?',
            choices: [
                'Add Department',
                'View Department Table',
                'Add Role',
                'View Role Table',
                'Add Employee',
                'Update Employee',
                'View Employee Table',
            ],
        },
    ])
        .then(answers => {
            switch (answers.addFeature) {
                case 'Add Department':
                    Department(addDept());
                    break
                case 'View Department Table':
                    `SELECT * FROM department;`;
                break
                case 'Add Role':
                    Role(addRole());
                    break
                case 'View Role Table':
                    `SELECT * FROM role;`;
                break
                case 'Add Employee':
                    Employee(addEmp());
                    break
                case 'Update Employee':
                    Employee(upEmp());
                    break
                case 'View Employee Table':
                    `SELECT * FROM employee;`;
                break
                case 'View Worksite Database':
                    `SELECT * FROM worksite;`;
            }
        });
    tableOptions()  
};

tableOptions();