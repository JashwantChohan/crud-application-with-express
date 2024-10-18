const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config'); 
const mongoose = require('mongoose');
const UserRoute =require('./routes/user')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/user",UserRoute)

mongoose.Promise = global.Promise;

// Connecting to the database

mongoose.connect(dbConfig.url, {
  // useNewUrlParser: true
}).then(() => {
  console.log("Database Connected Successfully!");
}).catch(err => {
  console.log("Could not connect to the database", err);
  process.exit();
});

// Simple route
app.get('/', (req, res) => {
  res.json({ "message": "Hello Crud Node Express" });
});

// Start the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
