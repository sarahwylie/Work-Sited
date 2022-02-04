const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

router.get('/department', (req, res) => {
    const sql = `ADD TO department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
});

// router.get('department/:id', (req, res) => {
//     const sql = `SELECT * FROM department WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, rows) => {
//         if (err) {
//             res.status(400),json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         })
//     });
// });

// router.delete('/department/:id', (req, res) => {
//     const sql = `DELETE FROM department WHERE id = ?`;
//     const params = [req.params.id];
  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.statusMessage(400).json({ error: res.message });
//       } else if (!result.affectedRows) {
//         res.json({
//           message: 'Department not found'
//         });
//       } else {
//         res.json({
//           message: 'deleted',
//           changes: result.affectedRows,
//           id: req.params.id
//         });
//       }
//     });
//   });

  module.exports = router;