const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const PORT = process.env.PORT || 5001;
app.use(cors());

// ✅ Configure CORS properly
app.use(cors({
  origin: "http://localhost:3000", // React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(
  cors({
    origin: 'http://localhost:3000', // Change this if your frontend runs on a different port
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

// ✅ Ensure Express can parse JSON requests
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/alumniTracer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

