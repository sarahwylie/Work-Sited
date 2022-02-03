
class Department {

a
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
        // teamMembers.push(engineer);
        // validation.push(answers.engid)
        tableOptions();
    })
};
};

module.exports = Department;