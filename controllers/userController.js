const User = require("../models/User");

// Update user budget
const updateBudget = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (typeof req.body.budget === "number") {
      user.budget = req.body.budget;
    }

    await user.save();

    res.json({ message: "Budget updated successfully", budget: user.budget });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateBudget,
};
