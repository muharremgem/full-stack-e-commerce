const express = require("express");
const router = express.Router();

//* Diğer route dosyalarını içe aktarıyoruz

const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");
const productRoute = require("./products.js");
const couponsRoute = require("./coupons.js");

//* Her rotayı ilgili yol altında kullanıyoruz

router.use("/categories", categoryRoute);
router.use("/auth", authRoute);
router.use("/products", productRoute);
router.use("/coupons", couponsRoute);

module.exports = router;
