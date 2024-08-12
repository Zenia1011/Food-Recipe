  console.log('Starting server...');

  const { exec } = require('child_process');
  const express = require('express');
  const bodyParser = require('body-parser');
  const mysql = require('mysql');
  const path = require('path');

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(bodyParser.json()); // Use JSON parser middleware
  app.use(express.static(path.join(__dirname, '../client'))); // Serve static files from the "client" directory

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'zenia_10',
    password: 'Zenia_10',
    database: 'tables'
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

  // Serve the registration page
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'register.html'));
  });

  app.post('/submit', (req, res) => {
    const { name, email, number, city, password } = req.body;

    const sql = 'INSERT INTO users (name, email, number, city, password) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, number, city, password];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user' });
      } else {
        console.log('User saved successfully');
        res.status(200).json({ message: 'Registration successful!' });
      }
    });
  });

  app.post('/login', (req, res) => {
    const { name, password, number } = req.body;

    connection.query('SELECT * FROM users WHERE name=? AND password=? AND number=?', [name, password, number], (err, result) => {
      if(err){
        console.log('There was an error in logging in', err);
        res.status(500).send('There was an error in logging in');
      }
      if (result.length > 0){
        console.log('Login Successful!');
        res.status(200).send('Login Successful!');
      }
      else{
        console.log('Invalid name, password or number');
        res.status(401).send('Invalid name, password or number');
      }
    });
  });

  app.post('/contact', (req, res) => {
    const { question, email } = req.body;

    console.log('Received question:', question);
    console.log('Received email:', email);

    const sql = 'INSERT INTO contactus (question, email) VALUES (?, ?)';
    const values = [question, email];

    connection.query(sql, values, (error, results) => {
      if(error) {
        console.error('Error inserting question into database:',error);
        return res.status(500).json({ message: 'There was an Error in Submitting the Question' });
      } 
      else{
        console.log('Question Submitted Successfully!!!');
        res.status(200).json({ message: 'Question Submitted Successfully!!!' });
      }
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // Open the server URL in Google Chrome
    exec(`start chrome http://localhost:${PORT}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error opening Chrome: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Chrome stderr: ${stderr}`);
        return;
      }
      console.log(`Chrome stdout: ${stdout}`);
    });
  });
