const inquirer = require('inquirer');
``
// const Department = require('./lib/Manager');
// const Intern = require('./lib/Intern');
// const Engineer = require('./lib/Engineer');

function tableOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addFeature',
            message: 'What would you like to do?',
            choices: [
                'Add Department',
                'Update Department',
                'Delete Department',
                // 'View Department Table',
                'Add Role',
                'Update Role',
                'Delete Role',
                // 'View Role Table',
                'Add Employee',
                'Update Employee',
                'Delete Employee',
                // 'View Employee Table',
                // 'View Worksite Database'
            ],
        },
    ])
        .then(answers => {
            switch (answers.addFeature) {
                case 'Add Department':
                    addDept();
                    break
                case 'Update Department':
                    upDept();
                    break
                case 'Delete Department':
                    delDept();
                    break
                // case 'View Department Table':
                //     `SELECT * FROM department;`;
                // break
                case 'Add Role':
                    addRole();
                    break
                case 'Update Role':
                    upRole();
                    break
                case 'Delete Role':
                    delRole();
                    break
                // case 'View Role Table':
                //     `SELECT * FROM role;`;
                // break
                case 'Add Employee':
                    addEmp();
                    break
                case 'Update Employee':
                    upEmp();
                    break
                case 'Delete Employee':
                    delEmp();
                    break
                // case 'View Employee Table':
                //     `SELECT * FROM employee;`;
                // break
                // case 'View Worksite Database':
                //     `SELECT * FROM employee;`;
            }
        })
}
function addDept() {

}