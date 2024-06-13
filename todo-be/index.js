const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('./db');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors())

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api', todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
