const db = require("../config/db");
const { DataTypes } = require("sequelize");

// Define the UserLog model

const UserLogs = db.define(
  "UserLog",
  {
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkin_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkout_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    card_out: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // or true depending on your requirements
      defaultValue: false, // default value if not specified
    },
  },
  {
    tableName: "userlogs",
    timestamps: true,
  }
);

// const db = require("../config/db");

// const { DataTypes } = require("sequelize");

// const UserLog = db.define("UserLog", {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   serialnumber: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   card_uid: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   device_uid: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   device_dep: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   checkindate: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   timein: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   timeout: {
//     type: DataTypes.TIME,
//     allowNull: false,
//   },
//   card_out: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//   },
// });

module.exports = UserLogs;
