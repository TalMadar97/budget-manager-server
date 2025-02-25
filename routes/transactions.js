const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

// 📌 חיבור לנתיב GET (מחזיר את כל העסקאות של המשתמש)
router.get("/", protect, getTransactions);

// 📌 חיבור לנתיב POST (מוסיף עסקה חדשה)
router.post("/", protect, addTransaction);

// 📌 חיבור לנתיב DELETE (מוחק עסקה לפי מזהה)
router.delete("/:id", protect, deleteTransaction);

// 📌 ייצוא הנתיבים
module.exports = router;
