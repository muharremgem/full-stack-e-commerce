const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// Yeni Kategori Ekleme (Create)
router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;
    const newCategory = new Category({
      name,
      img,
    });
    await newCategory.save();
    res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
  }
});

// Tümü Kategoriler (Read)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(201).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Tek Kategori (Single)
router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    try {
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "The category was not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Kategori Güncelleme (update)
router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const updates = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
