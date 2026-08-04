const dotenv = require("dotenv");

// Load environment variables FIRST
dotenv.config();

const app = require("./app");
const connectDB = require("./config/db");

console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
