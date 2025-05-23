const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; // קבלת הטוקן

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // פענוח ה-JWT

      req.user = await User.findById(decoded.id).select("-password"); // שמירת המשתמש ב-req.user

      return next(); // ממשיך לפונקציה הבאה רק אם ההכל תקין
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
