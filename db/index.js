const db = require('./connection');
const connection = require('./connection');

class DB {
    constructor(connection) {
        connection = this.connection;
    }

    viewAllDept() {
        // const sql = `SELECT department.id, department.name`
       return connection.query(`SELECT department.id, department.name`, (err, result) => {
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
        })
    };
    addedDept(department) {
        return connection.query(`INSERT INTO department SET ?`, department, (err, result) => {  
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
    })
};
    viewAllRole() {
        return connection.query(`SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id`, (err, result) => {
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
        })
    };
    addedRole(role) {
        return connection.query(`INSERT INTO role SET ?`, role, (err, result) => {
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
        })
        };
    viewAllEmp() {
        return connection.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
        CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department_id LEFT JOIN manager ON manager.id = employee.manager_id;`, params, (err, result) => {
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
        })
    };
    addedEmp(employee) {
        return connection.query(`INSERT INTO employee SET ?`, employee, (err, result) => {
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
        })
    };
    UpdEmp(empId, empRoleId) {
        return connection.query(
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