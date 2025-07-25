const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Below middleware
const authRoutes = require("./routes/AuthRoute");
const projectRoutes = require("./routes/ProjectRoute");
const TopicRoutes = require("./routes/TopicRoute");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/topic", TopicRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("EEE Project API Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
