const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./db")
var fs = require("fs");

const landmarkRoutes = require('./routes/landmarks');
const visitedRoutes = require('./routes/visited');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/landmarks', landmarkRoutes);

app.use('/api/visited', visitedRoutes);

app.get('/', (req, res) => {
    fs.readFile('index.html', (err, html) => {
        res.write(html);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
