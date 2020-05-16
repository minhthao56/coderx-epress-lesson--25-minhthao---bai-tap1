var express = require('express');
var router = express.Router();
var controller = require("../controllers/controller.book")
var controller = require("../controllers/controller.cart")


router.get("/add/:id", controller.addToCart);

module.exports = router;
