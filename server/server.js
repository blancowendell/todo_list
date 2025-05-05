require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
const sequelize = require('./config/database');
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.use(cors(corsOptions));
app.use(bodyParser.json());

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);



sequelize.sync().then(() => {
    app.listen(3001, () => console.log('Server running on port 3001'));
});