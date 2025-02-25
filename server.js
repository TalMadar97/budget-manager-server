require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const app = express();
connectDB();

// 📌 Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Budget Manager API is running...");
});

const PORT = process.env.PORT || 8181;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
