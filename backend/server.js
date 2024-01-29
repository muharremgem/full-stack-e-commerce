const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const dotenv = require("dotenv");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Nodemon Express.js");
});

app.get("/api", (req, res) => {
  res.send("Bu api");
});

app.listen(3000, () => {
  connect();
  console.log("Server started on port 3000");
});
