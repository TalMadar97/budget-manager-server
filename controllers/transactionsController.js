const Transaction = require("../models/Transaction");

// Get all user transactions
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

// Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;

    if (!type || !amount || !category) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      amount,
      category,
      description,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deleting a transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    let transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
    });

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
};
