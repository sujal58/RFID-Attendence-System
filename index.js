// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("./config/db.js");

// Create an Express application
const app = express();
const port = 5000;

// Configure middleware to parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/rfid", require("./routes/userRoutes"));

// Sync Sequelize models with the database &&  Start the Express server
Sequelize.sync();

app.get("/", (req, res) => {
  res.json("Welcome to the Backend of RFID SYStem");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
