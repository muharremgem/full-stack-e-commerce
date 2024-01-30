const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const dotenv = require("dotenv");
const mainRoute = require("./routes/index.js");
const logger = require("morgan");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

// Middlewares
app.use(logger("dev"));


app.use(express.json());

app.use("/api", mainRoute);

app.listen(3000, () => {
  connect();
  console.log("Server started on port 3000");
});
