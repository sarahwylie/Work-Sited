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
                    viewDept()
                    break
                case 'Add Department':
                    addDept()
                    break
                case 'View Role Table':
                    viewRole()
                    break
                case 'Add Role':
                    addRole
                    break
                case 'View Employee Table':
                    viewEmp()
                    break
                case 'Add Employee':
                    console.log(db.viewAllRole());
                    addEmp()
                    break
                case 'Update Employee':
                    upEmp()
            }
        });
};
function viewDept() {
    db.query(`SELECT department.id, department.name`)
        .then(([rows]) => {
            let department = rows;
            console.log('\n');
            console.table(department);
        })
        .then(() => {
            tableOptions();
        })
};
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: "What is the department's name? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter the department name!');
                    return false;
                }
            }
        },
    ])
        .then((res) => {
            let department = { department_name: res.deptName }
            db.addedDept(department)
        })
        .then(() => { tableOptions(); })
};
function viewRole() {
    db.viewAllRole()
        .then(([rows]) => {
            let role = rows;
            console.log('\n');
            console.table(role);
        })
        .then(() => {
            tableOptions();
        })
};
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: "What is the name of this role? (Required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the role name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary for this role? (Required)",
            validate: salaryInput => {
                if (salaryInput) {
                    return true;
                } else {
                    console.log('Please enter the salary!');
                    return false;
                }
            }
        },
    ])
        .then((res) => {
            let name = res.roleName;
            let salary = res.salary;
            db.viewAllRole()
            .then(([rows]) => {
                let role = rows;
                const deptChoices = department.map(({ id, name }) => ({
                    name: name,
                    value: id
                }))
                inquirer.prompt(
                    {
                        type: 'list',
                        name: 'deptID',
                        message: "In which department is this role located?",
                        choices: deptChoices
                    }
                )
            })
                .then((res) => {
                    let role = {
                        department_id: deptID,
                        role_name: name,
                        salary: salary
                    }
                    db.addedRole(role)
                })
                .then(console.log(`${role} successfully added to database`))
                .then(() => { tableOptions(); })
        })
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
            console.log(db.viewAllRole);
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
                            managerChoices.unshift({ name: 'none', value: null })
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
                                .then(() => { tableOptions(); })
                        })
                })
        })
};

function upEmp() {
    db.viewAllEmp().then(([rows]) => {
        let employees = rows;
        const empChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }))
        inquirer.prompt(
            {
                type: 'list',
                name: 'empId',
                message: "What is the employee's name?",
                choices: empChoices
            }
        )
    })
        .then((res) => {
            let empId = res.empId;
            db.viewAllRole()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }))
                    inquirer.prompt(
                        {
                            type: 'list',
                            name: 'roleId',
                            message: "What is the employee's new role?",
                            choices: roleChoices
                        }
                    )
                        .then((res) => {
                            db.updEmp(empId, res.roleId)
                        })
                        .then(() => console.log('Yay!'))
                        .then(() => { tableOptions(); })
                })
        })
};


tableOptions();