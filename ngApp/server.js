const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Import body-parser for request body parsing
const path = require('path'); // Import path for file path handling
const cors = require('cors'); // Import CORS for cross-origin requests
const api = require('./server/routes/api'); // Import API routes

const app = express(); // Create Express app
const port = 3000; // Set server port

app.use(cors()); // Enable CORS for all routes

app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files from dist folder
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(bodyParser.json()); // Parse JSON request bodies

app.use('/api', api); // Mount API routes under /api

app.get('*', (req, res) => { // Handle all unmatched GET requests
  res.sendFile(path.join(__dirname, 'dist/index.html')); // Serve Angular's index.html
});

app.listen(port, () => { // Start server
  console.log(`Server running on http://localhost:${port}`); // Log server start
});