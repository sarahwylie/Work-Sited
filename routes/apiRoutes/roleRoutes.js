const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/roles', (req, res) => {
    const sql = `SELECT role.*, department.name 
    AS department_name 
    FROM role 
    RIGHT JOIN department 
    ON role.department_id = department.id`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500), json({ error: err.message });
        }
        res.json({
            message: 'success',
            data: rows
        })
    });
});

router.get('/role/:id', (req, res) => {
    const sql = `SELECT role.*, department.name 
    AS department_name 
    FROM role 
    RIGHT JOIN department 
    ON role.department_id = department.id
    WHERE role.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400), json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    });
});

