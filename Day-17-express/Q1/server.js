const express = require('express');
const app = express();
const PORT = 3000;

// GET /home
app.get('/home', (req, res) => {
  res.send('<h1>Welcome to Home Page</h1>');
});

app.get('/aboutus', (req, res) => {
  res.json({ message: "Welcome to About Us" });
});

//GET /contactus
app.get('/contactus', (req, res) => {
  res.json({
    email: "ashwini23bce@gmail.com",
    phone: "8252672662",
    address: "Road 10E , Block-32, Rajendra Nagar, Patna"
  });
});

app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
