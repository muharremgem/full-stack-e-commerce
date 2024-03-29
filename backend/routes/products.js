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


// Tümü Ürünleri getirdme (Read)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});



// Tek Kategori (Single)
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    try {
      const product = await Product.findById(productId);
      res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "The product was not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Kategori Güncelleme (update)
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updates = req.body;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "The Product was not found." });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updates,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//* Kategori Silme İşlemi

router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findOneAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "The product was not found." });
    }

    res.status(200).json("Deletion is successful.");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
