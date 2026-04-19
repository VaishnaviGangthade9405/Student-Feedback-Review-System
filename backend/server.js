require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/feedbackDB";
mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.log("MongoDB Connection Error:", err.message);
        process.exit(1);
    });

// Routes
app.use("/api/feedback", feedbackRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// 404 Not Found
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});