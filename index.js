const express = require('express');
const app = express();

// Define the port to run the server on
const port = 8080;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/newHome.html');
});
app.get('/teams', (req, res) => {
  res.sendFile(__dirname + '/public/teams.html');
});
app.get('/rovers', (req, res) => {
  res.sendFile(__dirname + '/public/rovers.html');
});
// Middleware to handle any unhandled or wrong routes
app.use((req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
