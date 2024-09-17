const express = require("express");
const database = require("./config/db");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const multer = require("multer");
const app = express();
const dotenv = require("dotenv");
const userRoutes = require("./routes/user");
const path = require("path");

dotenv.config();

//
const PORT = process.env.PORT || 23000;
database.connect();
//app

app.use(express.json());
app.use(cookiesParser());
// middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/v1/user", userRoutes);
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is up and running",
  });
});

// listener
app.listen(PORT, () => {
  console.log("Sever is started at Port: ", PORT);
});
