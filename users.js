const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Assuming users is an array to store user data
let users = [];

// Function to generate a random alphanumeric string for userId
const generateUserId = () => {
  return Math.random().toString(36).substring(2, 10); // Example: "3f8h9d2c"
};

// Task 6: Register New User
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const userId = generateUserId(); // Generate a userId
  console.log("🚀 ~ app.post ~ userId:", userId)
  users.push({ userId, username, password }); // Add user to users list
  res.status(201).send('User registered successfully');
});


// Task 7: Login as Registered User
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  console.log("🚀 ~ app.post ~ user:", user)
  // console.log(user);
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
