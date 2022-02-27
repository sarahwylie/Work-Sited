const inquirer = require('inquirer');
require('console.table');
const connection = require('./db/connection');


function viewAllDept() {
    return new Promise(function (resolve, reject) {
        var deptQuery = `SELECT department.id, department.name FROM department`;
        const department = [];
        connection.query(deptQuery, department, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

function addedDept(department) {
    return new Promise(function (resolve, reject) {
        const addde = `INSERT INTO department SET ?`;
        connection.query(addde, department, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

function viewAllRole() {
    return new Promise(function (resolve, reject) {
        const vwrl = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
        connection.query(vwrl, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

function addedRole(role) {
    // return connection.query(`INSERT INTO role SET ?`, role)
    return new Promise(function (resolve, reject) {
        const adrl = `INSERT INTO role SET ?`;
        connection.query(adrl, role, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

function viewAllEmp() {
    return new Promise(function (resolve, reject) {
        const vwem = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
                        AS department, role.salary, 
                        CONCAT (manager.first_name, " ", manager.last_name) 
                        AS manager 
                        FROM employee 
                        LEFT JOIN role 
                        ON employee.role_id = role.id
                        LEFT JOIN department ON role.department_id = department_id 
                        LEFT JOIN employee manager
                        ON manager.id = employee.manager_id;`;
        connection.query(vwem, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

function addedEmp(employee) {
    // return connection.query(`INSERT INTO employee SET ?`, employee)
    return new Promise(function (resolve, reject) {
        const adem = `INSERT INTO employee SET ?`;
        connection.query(adem, employee, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
};

function updEmp(empId, empRoleId) {
    console.log("TOOTIE", empId)
    return new Promise(function (resolve, reject) {
        // const upem = `UPDATE employee SET role_id = ? WHERE id = ?`;
        // connection.query(upem, empId, empRoleId, (err, rows) => {
        //     if (err) {
        //         return reject(err);
        //     }
        //     console.log("FARTS!");
        //     resolve(rows);
        // });
        connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [empRoleId, empId.name], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                console.log("FARTS!");
                resolve(rows);
    });
});

};

let department;

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
                    addRole()
                    break
                case 'View Employee Table':
                    viewEmp()
                    break
                case 'Add Employee':
                    addEmp()
                    break
                case 'Update Employee':
                    upEmp()
            }
        });
};
function viewDept() {
    console.log(viewAllDept);
    viewAllDept()
        .then((rows) => {
            console.log('\n');
            console.table(rows);
        })
        .then(() => {
            tableOptions();
        })
};
function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
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
            department = res
            addedDept(department)
                .then(() => console.log(`New department name is ${department}`))
                .then(() => tableOptions())
        })
};
function viewRole() {
    viewAllRole()
        .then((rows) => {
            let role = rows;
            console.log('\n');
            console.table(role);
        })
        .then(() => {
            tableOptions();
        })
};
function addRole() {
    viewAllDept().then((rows) => {
        let role = rows;
        const deptChoices = role.map(({ id, name }) => ({
            value: id,
            name: name
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the name of this role? (Required)",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please enter the role name!");
                        return false;
                    }
                },
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
                },
            },
            {
                type: 'list',
                name: 'department_id',
                message: "In which department is this role located?",
                choices: deptChoices
            },
        ])
            .then((res) => {
                let name = res.title;
                let salary = res.salary;
                let department_name = res.department_id;
                let role = {
                    title: name,
                    salary: salary,
                    department_id: department_name
                };
                addedRole(role)
                    .then(console.log(`${name} successfully added to database`))
                    .then(() => { tableOptions(); })
            })
    })
};

function viewEmp() {
    viewAllEmp()
        .then((rows) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => {
            tableOptions();
        })
};
function addEmp() {
    viewAllRole().then((rows) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            value: id,
            name: title
        }))
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
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
                name: 'last_name',
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
                type: 'list',
                name: 'role_id',
                message: "What is the employee's role?",
                choices: roleChoices
            },
        ])
            .then((res) => {
                console.log(viewAllRole);
                let first_name = res.first_name;
                let last_name = res.last_name;
                let roleId = res.role_id;
                viewAllEmp().then((rows) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }))
                    managerChoices.unshift({ name: 'none', value: null })
                    inquirer.prompt(
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: "Who is the employee's manager?",
                            choices: managerChoices
                        }
                    ).then((res) => {
                        console.log(res)
                        let manager_id = res.manager_id
                        let employee = {
                            manager_id: manager_id,
                            role_id: roleId,
                            first_name: first_name,
                            last_name: last_name,
                        }
                        addedEmp(employee)
                            .then(() => { tableOptions(); })
                    })
                })
            })
    })
};

function upEmp() {
    viewAllEmp()
        .then((rows) => {
            let employees = rows;
            const empChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }))
            inquirer.prompt(
                {
                    type: 'list',
                    name: 'name',
                    message: "What is the employee's name?",
                    choices: empChoices
                }
            )

                .then((res) => {
                    let empId = res;
                    viewAllRole()
                        .then((rows) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }))
                            inquirer.prompt(
                                {
                                    type: 'list',
                                    name: 'role_id',
                                    message: "What is the employee's new role?",
                                    choices: roleChoices
                                }
                            )
                                .then((res) => {
                                    let empRoleId = res.role_id;
                                    updEmp(empId, empRoleId)
                                        .then(() => { tableOptions(); })
                                })
                        })
                })
        })
};


tableOptions();