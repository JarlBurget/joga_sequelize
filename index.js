const express = require('express');
const app = express();

const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Example route that returns JSON
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express application!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});