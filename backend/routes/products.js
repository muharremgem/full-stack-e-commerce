const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");


// Yeni Kategori Ekleme (Create)
router.post("/", async (req, res) => {
  try {

    const newProduct = new Product(req.body); // Modelimize gelen verileri yolladık ve bu veriler ile yeni bir nesne oluşturduk. 
    await newProduct.save();

    res.status(201).json(newProduct);
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

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ error: "The category was not found." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//* Kategori Silme İşlemi

router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findOneAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "The category was not found." });
    }

    res.status(200).json("Deletion is successful.");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
