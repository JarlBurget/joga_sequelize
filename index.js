const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('joga_sequelize', 'root', 'qwerty', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Example route that returns JSON
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express application!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});