const userLog = require("../models/UserLogs");
const user = require("../models/User");

// Define a route to handle user creation (POST method)
const createUser = async (req, res) => {
  console.log(req.body);
  const currentDate = new Date();
  try {
    const { cardId, username, sem } = req.body;

    // Validate input data
    if (!cardId || !username) {
      return res.status(400).send("Card UID and username are required");
    }

    // Check if the user already exists
    const existingUser = await user.findOne({ where: { card_uid: cardId } });
    if (existingUser) {
      return res.status(400).send("User with the same card UID already exists");
    }

    // Create the user in the database
    const newUser = await user.create({
      card_uid: cardId,
      username: username,
      semester: sem,
      Regdate: currentDate,
    });

    if (newUser) {
      return res.status(201).json(`User created successfully!!`);
    } else {
      return res.status(500).json({ message: "Failed to create user!!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Define a route to handle RFID data processing (POST method)
const postRfidData = async (req, res) => {
  console.log(req.body);
  try {
    const dataFromDevice = req.body;

    // Check if dataFromDevice is a valid object
    if (!dataFromDevice || typeof dataFromDevice !== "object") {
      return res.status(400).send("Invalid JSON format");
    }

    // Process each entry in the JSON data
    for (const card_uid in dataFromDevice) {
      if (dataFromDevice.hasOwnProperty(card_uid)) {
        const unixTimestamp = dataFromDevice[card_uid];

        // Convert Unix timestamp to milliseconds
        const milliseconds = unixTimestamp * 1000;

        // Create a new date object using milliseconds
        const gmtDate = new Date(milliseconds);

        // Add 5 hours and 45 minutes to convert to GMT+5:45
        gmtDate.setHours(gmtDate.getHours() + 5);
        gmtDate.setMinutes(gmtDate.getMinutes() + 45);

        //checking if user is registered or not
        const User = await user.findOne({ where: { card_uid: card_uid } });

        if (User) {
          // Find the corresponding user in the database
          const userLogs = await userLog.findOne({
            where: { UserId: card_uid },
            order: [["checkin_time", "DESC"]],
          });

          if (userLogs && !userLogs.checkout_time) {
            // If a check-in record exists without a checkout time, update the checkout time
            userLogs.checkout_time = gmtDate;
            userLogs.card_out = true; // Mark card as checked out
            await userLogs.save();
          } else {
            // Create a new check-in record
            await userLog.create({
              UserId: card_uid,
              username: User.username,
              checkin_time: gmtDate,
              card_out: false, // Set card_out to false (checked in by default)
            });
          }
        } else {
          return res
            .status(500)
            .json({ message: "User hasnot registered Yet!!!!" });
        }
      }
    }
    return res.status(200).send("Data processed successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

// Define a route to handle GET requests for fetching attendance data
const getUserlogs = async (req, res) => {
  try {
    // Fetch all attendance records from the database
    const attendanceRecords = await user.findAll();
    return res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { postRfidData, getUserlogs, createUser };
