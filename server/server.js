const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

// Load environment variables FIRST
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);

// ===============================
// Ensure uploads directory exists
// ===============================
const uploadsPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

console.log("Uploads directory ready:", uploadsPath);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
