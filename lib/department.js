const cTable = require('console.table');
const inquirer = require("inquirer");

class Department {
    constructor(id) {
        this.id = id;
    }
addRole() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addName',
            message: 'What is the name of this department? (Required)',
            validate: deptNameInput => {
                if (deptNameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of this department!');
                    return false;
                }
            }
        }
    ])
    .then(answers => {
        const department = new Department(answers.addName)

        console.log(`Added ${department} to the database`)
        tableOptions();
    })
};
}

module.exports = Department;