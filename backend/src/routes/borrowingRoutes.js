const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
borrowItem,
} = require("../controllers/borrowingController");

router.post(
"/",
authMiddleware,
borrowItem
);

module.exports = router;
