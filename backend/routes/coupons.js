const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

// Yeni Coupons Ekleme (Create)
router.post("/", async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body); // Modelimize gelen verileri yolladık ve bu veriler ile yeni bir nesne oluşturduk.
    await newCoupon.save();

    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
  }
});

// Tümü  Coupons Ürünleri getirdme (Read)
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(201).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Tek Kategori (Single)
router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    try {
      const coupons = await Coupon.findById(couponId);
      res.status(200).json(coupons);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "The Coupon was not found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// Coupons Güncelleme (update)
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const existingCoupon = await Coupon.findById(couponId);

    if (!existingCoupon) {
      return res.status(404).json({ error: "The Coupon was not found." });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });

    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//* Coupons Silme İşlemi

router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const deletedCoupon = await Coupon.findOneAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ error: "The product was not found." });
    }

    res.status(200).json("Deletion is successful.");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
