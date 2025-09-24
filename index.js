const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT || 4010


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DRIVER
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// using routes and controllers
const articleRouter = require('./routes/article');
const authorRouter = require('./routes/author');
app.use('/', articleRouter);
app.use('/author', authorRouter);
app.use('/admin/article', articleRouter);





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});