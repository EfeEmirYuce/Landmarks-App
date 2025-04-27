const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { landmark_id, visited_date, visitor_name } = req.body;

    if (!landmark_id || !visited_date) {
        return res.status(400).json({ error: 'Landmark ID and visited date are required.' });
    }

    const sql = 'INSERT INTO visited_landmarks (landmark_id, visited_date, visitor_name) VALUES (?, ?, ?)';
    const values = [landmark_id, visited_date, visitor_name];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error adding visited landmark:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(201).json({ message: 'Visited landmark recorded successfully!', visitedId: result.insertId });
    });
});

router.get('/', (req, res) => {
    const sql = `
        SELECT visited_landmarks.*, landmarks.name AS landmark_name
        FROM visited_landmarks
        JOIN landmarks ON visited_landmarks.landmark_id = landmarks.id
        ORDER BY visited_date DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching visited landmarks:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(200).json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT visited_landmarks.*, landmarks.name AS landmark_name
        FROM visited_landmarks
        JOIN landmarks ON visited_landmarks.landmark_id = landmarks.id
        WHERE landmarks.id = ?
        ORDER BY visited_date DESC
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching visits for landmark:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No visit history found for this landmark.' });
        }
        res.status(200).json(results);
    });
});

module.exports = router;