const Transaction = require("../models/Transaction");
const User = require("../models/User"); // Import User model

/**
 * Get all user transactions
 */
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort(
      "-date"
    );
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Add a new transaction with budget check
 */
const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Calculate total expenses
    const totalExpenses = await Transaction.aggregate([
      { $match: { user: user._id, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalSpent = totalExpenses.length > 0 ? totalExpenses[0].total : 0;
    const newTotal = totalSpent + amount;

    // Check if the expense exceeds the user's budget
    if (type === "expense" && user.budget > 0 && newTotal > user.budget) {
      return res.status(400).json({ message: "Budget exceeded!" });
    }

    // Create new transaction
    const transaction = new Transaction({
      user: req.user.id,
      type,
      amount,
      category,
      description,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a transaction
 */
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure the logged-in user is the owner
    if (transaction.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this transaction" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update a transaction
 */
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure the logged-in user is the owner
    if (transaction.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this transaction" });
    }

    // Update the transaction and return the new version
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get a single transaction by ID
 */
const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure the logged-in user is the owner
    if (transaction.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this transaction" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getTransactionById,
};
