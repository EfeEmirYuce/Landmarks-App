const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       
    password: 'root',   
    database: 'landmarkappdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;