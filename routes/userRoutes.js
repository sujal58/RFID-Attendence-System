const express = require("express");
const router = express.Router();

const {
  postRfidData,
  getUserlogs,
  createUser,
} = require("../controllers/userController.js");

router.route("/process_rfid_data").post(postRfidData);
router.route("/").get(getUserlogs);
router.route("/create").post(createUser);

module.exports = router;
