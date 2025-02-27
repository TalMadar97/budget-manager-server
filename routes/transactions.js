const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
} = require("../controllers/transactionsController");

// 📌 חיבור לנתיב GET (מחזיר את כל העסקאות של המשתמש)
router.get("/", protect, getTransactions);

// 📌 חיבור לנתיב POST (מוסיף עסקה חדשה)
router.post("/", protect, addTransaction);

// 📌 Update a transaction
router.put("/:id", protect, updateTransaction);

// 📌 חיבור לנתיב DELETE (מוחק עסקה לפי מזהה)
router.delete("/:id", protect, deleteTransaction);

// Get transaction by ID
router.get("/:id", protect, getTransactionById);

module.exports = router;
