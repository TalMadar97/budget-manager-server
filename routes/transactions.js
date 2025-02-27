const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
  getTransactionStats,
} = require("../controllers/transactionsController");

// 📌 Route to get transactions statistics
router.get("/stats", protect, getTransactionStats);

// 📌 Get all transactions of the user
router.get("/", protect, getTransactions);

// 📌 Get a specific transaction by ID
router.get("/:id", protect, getTransactionById);

// 📌 Add a new transaction
router.post("/", protect, addTransaction);

// 📌 Update a transaction
router.put("/:id", protect, updateTransaction);

// 📌 Delete a transaction
router.delete("/:id", protect, deleteTransaction);

module.exports = router;
