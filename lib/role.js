const inquirer = require("inquirer");

class Role {

    addRole() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'addName',
                message: 'What is the name of this role? (Required)',
                validate: roleNameInput => {
                    if (roleNameInput) {
                        return true;
                    } else {
                        console.log('Please enter the role name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addSalary',
                message: 'What is the salary for this role? (Required)',
                validate: salaryInput => {
                    if (salaryInput) {
                        return true;
                    } else {
                        console.log('Please enter the salary!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'addDept',
                message: 'What is the salary for this role? (Required)',
                validate: deptInput => {
                    if (deptInput) {
                        return true;
                    } else {
                        console.log('Please enter the salary!');
                        return false;
                    }
                }
            },
        ])
        .then(answers => {
            const role = new Role(answers.addName, answers.addSalary, answers.addDept)
            // teamMembers.push(engineer);
            // validation.push(answers.engid)
            tableOptions();
        })
    };
};

module.exports = Role;