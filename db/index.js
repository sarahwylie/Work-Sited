const db = require('./connection');
const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    };

    // 'View Department Table',
    // 'Add Department',
    // 'View Role Table',
    // 'Add Role',
    // 'View Employee Table',
    // 'Add Employee',
    // 'Update Employee',
    viewAllRole() {
        const sql = `SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`;
        const params = [req.params.id];

        return this.connection.query(sql, params, (err, result) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Table not found'
                });
            } else {
                res.json({
                    message: 'Success!',
                    id: req.params.id
                });
            }
        });
    };
    addedEmp(employee) {
        const sql = `INSERT INTO employee SET ?`
        const params = employee;

        return this.connection.query(sql, params, (err, result) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Table not found'
                });
            } else {
                res.json({
                    message: 'Success!',
                    id: req.params.id
                });
            }
        });
    };
    viewAllEmp() {
        const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department_id LEFT JOIN manager ON manager.id = employee.manager_id;`;
        const params = [req.params.id];

        return this.connection.query(sql, params, (err, result) => {
            if (err) {
                res.statusMessage(400).json({ error: res.message });
            } else if (!result.affectedRows) {
                res.json({
                    message: 'Table not found'
                });
            } else {
                res.json({
                    message: 'Success!',
                    id: req.params.id
                });
            }
        });
    };
};

module.exports = new DB(connection);