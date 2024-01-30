const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const myData = req.body;

    console.log(myData);
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
  }
});

// Tüm kategoriler  getirme (Read- All)
router.get("/", async (req, res) => {
  res.send("Kategoriler getirildi!");
});

module.exports = router;
