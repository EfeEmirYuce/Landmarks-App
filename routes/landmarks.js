const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { name, latitude, longitude, description, category } = req.body;

    if (!name || !latitude || !longitude) {
        return res.status(400).json({ error: 'Name, latitude, and longitude are required.' });
    }

    const sql = 'INSERT INTO landmarks (name, latitude, longitude, description, category) VALUES (?, ?, ?, ?, ?)';
    const values = [name, latitude, longitude, description, category];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting landmark:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(201).json({ message: 'Landmark added successfully!', landmarkId: result.insertId });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'SELECT * FROM landmarks WHERE id = ?';
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching landmark:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Landmark not found.' });
        }

        res.status(200).json(results[0]);
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, latitude, longitude, description, category } = req.body;

    const sql = `
        UPDATE landmarks 
        SET name = ?, latitude = ?, longitude = ?, description = ?, category = ?
        WHERE id = ?
    `;

    const values = [name, latitude, longitude, description, category, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating landmark:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Landmark not found.' });
        }

        res.status(200).json({ message: 'Landmark updated successfully!' });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    const sql = 'DELETE FROM landmarks WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting landmark:', err);
            return res.status(500).json({ error: 'Database error.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Landmark not found.' });
        }

        res.status(200).json({ message: 'Landmark deleted successfully!' });
    });
});

module.exports = router;