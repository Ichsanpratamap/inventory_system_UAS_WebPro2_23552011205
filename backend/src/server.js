const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const itemRoutes = require("./routes/itemRoutes");
const app = express();
const borrowingRoutes = require("./routes/borrowingRoutes");

// Middleware

app.use(express.json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/borrowings", borrowingRoutes);

// Test database connection
pool.connect((err, client, release) => {
if (err) {
return console.error("Database connection error", err.stack);
}

console.log("Connected to PostgreSQL");
release();
});

// Test route
app.get("/", (req, res) => {
res.send("API Inventory System Running...");
});

app.get("/api/profile", authMiddleware, (req, res) => {
res.json({
message: "Protected profile data",
user: req.user,
});
});


// Port
const PORT = process.env.PORT || 5000;

// Run server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
