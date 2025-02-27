const express = require("express");
const { updateBudget } = require("../controllers/userController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// 📌 Route for updating user budget
router.patch("/budget", protect, updateBudget);

module.exports = router;
