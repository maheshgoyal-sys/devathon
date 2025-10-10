const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const methodOverride = require("method-override");

// Load environment variables
dotenv.config();

const app = express();

// ----------------- Import Routes -----------------
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const apiRoutes = require("./routes/apiRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const aiRoutes = require("./routes/airoute"); // ✅ include AI route properly

// ----------------- Middleware -----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ----------------- Session Setup -----------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
  })
);

// ----------------- View Engine -----------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/gla_exam_system")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------- Use Routes -----------------
app.use("/", aiRoutes); // ✅ must come before others if needed
app.use("/", authRoutes);
app.use("/", dashboardRoutes);
app.use("/", lessonRoutes);
app.use("/api", apiRoutes);

// ----------------- Error Handling -----------------
app.use((req, res, next) => {
  res.status(404).render("error", {
    message: "Page not found",
    error: { status: 404 },
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("error", {
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// ----------------- Dynamic Port Startup -----------------
const basePort = parseInt(process.env.PORT || "3000", 10);
function start(port) {
  const server = app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      const next = port + 1;
      console.warn(`⚠️  Port ${port} in use. Trying ${next}...`);
      start(next);
    } else {
      console.error("❌ Server failed to start:", err);
      process.exit(1);
    }
  });
}
start(basePort);
