const { Sequelize } = require("sequelize");

// Set up Sequelize with MySQL database credentials
const sequelize = new Sequelize("rfidattendencesystem", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
