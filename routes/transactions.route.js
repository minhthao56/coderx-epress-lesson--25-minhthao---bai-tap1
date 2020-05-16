var express = require('express');
var router = express.Router();
var controller = require("../controllers/controller.transaction")
var loginmiddleware = require("../middleware/middleware.login")

//Lish transactions
router.get("/",loginmiddleware.notIntoTrans, controller.trans);

// Detail transactions
router.get('/detail/:id/book/:bookId/user/:userId', controller.detailborrow);
// Add
router.get("/add",controller.getAdd);
router.post('/add', controller.postAdd);
//Borrow
router.get("/borrow", controller.borrow);
/// Change complete
router.get("/:id/complete", controller.changeStatus)

module.exports = router;