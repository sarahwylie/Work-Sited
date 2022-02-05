const db = require('./connection');
const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    };

    viewAllDept() {
        const sql = `SELECT department.id, department.name`;
        // const params = [req.params.id];

        // return this.connection.query(sql, params, (err, result) => {
        //     if (err) {
        //         res.statusMessage(400).json({ error: res.message });
        //     } else if (!result.affectedRows) {
        //         res.json({
        //             message: 'Table not found'
        //         });
        //     } else {
        //         res.json({
        //             message: 'Success!',
        //             id: req.params.id
        //         });
        //     }
        // })
    };
    addedDept(department) {
        const sql = `INSERT INTO department SET ?`
        const params = department;

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
    addedRole(role) {
        const sql = `INSERT INTO role SET ?`
        const params = role;

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
    addedEmp(employee) {
        const sql = `INSERT INTO employee SET ?`
        // const params = employee;

        // return this.connection.query(sql, params, (err, result) => {
        //     if (err) {
        //         res.statusMessage(400).json({ error: res.message });
        //     } else if (!result.affectedRows) {
        //         res.json({
        //             message: 'Table not found'
        //         });
        //     } else {
        //         res.json({
        //             message: 'Success!',
        //             id: req.params.id
        //         });
        //     }
        // });
    };
    UpdEmp(empId, empRoleId) {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`,
            [empRoleId, empId] 
        )
        // return this.connection.query(sql, params, (err, result) => {
        //     if (err) {
        //         res.statusMessage(400).json({ error: res.message });
        //     } else if (!result.affectedRows) {
        //         res.json({
        //             message: 'Table not found'
        //         });
        //     } else {
        //         res.json({
        //             message: 'Success!',
        //             id: req.params.id
        //         });
        //     }
        // });
    }
    };

module.exports = new DB(connection);