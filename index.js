const inquirer = require('inquirer');
require('console.table');

const db = require('./db');

function tableOptions() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addFeature',
            message: 'What would you like to do?',
            choices: [
                'View Department Table',
                'Add Department',
                'View Role Table',
                'Add Role',
                'View Employee Table',
                'Add Employee',
                'Update Employee',
            ],
        },
    ])
        .then(answers => {
            switch (answers.addFeature) {
                case 'View Department Table':
                    // `console.table([
                    //     ${Department}
                    //   ]);`;
                    break
                case 'Add Department':
                    // Department(addDept());
                    break
                case 'View Role Table':
                    // `console.table([
                    //     ${Role}
                    //   ]);`;;
                    break
                case 'Add Role':
                    // Role(addRole());
                    break
                case 'View Employee Table':
                    viewEmp();
                    break
                case 'Add Employee':
                    // Employee(addEmp());
                    break
                case 'Update Employee':
                    // Employee(upEmp());
            }
        });
};

function viewEmp() {
    db.viewAllEmp()
    .then(([rows]) => {
        let employees = rows;
        console.log('\n');
        console.table(employees);
    })
    .then(() => {
        tableOptions();
    })
};
function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
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
            type: 'input',
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
    ])
    .then((res) => {
        let first_name = res.firstName;
        let last_name = res.lastName;
        db.viewAllRole().then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({ 
                name: title,
                value: id
            }))
            inquirer.prompt(
                {
                    type: 'list',
                    name: 'roleID',
                    message: "What is the employee's role?",
                    choices: roleChoices
                }
            )
        })
        .then((res) => {
            let roleId = res.roleId;
            db.viewAllEmp()
            .then(([rows]) => {
                let employees = rows;
                const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }))
                managerChoices.unshift({name:'none', value:null})
                inquirer.prompt(
                    {
                        type: 'list',
                        name: 'mgrID',
                        message: "Who is the employee's manager?",
                        choices: managerChoices
                    }
                )
                .then((res) => {
                    let employee = {
                        manager_id: res.mgrID,
                        role_id: roleId,
                        first_name: first_name,
                        first_name: last_name
                    }
                    db.addedEmp(employee)
                })
                .then(() => {tableOptions();})
            })
        })
    })
}

tableOptions();