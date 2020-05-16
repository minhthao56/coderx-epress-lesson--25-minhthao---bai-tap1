var db = require('../db');
var Users = require("../model/model.users")
var Titles = require("../model/model.books")
var Trans = require("../model/model.transaction")
var Sessions = require("../model/model.sesstion")

module.exports.addToCart = async function (req, res, next) {
    var id = req.params.id;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId){
        res.redirect("/books")
    }else{
    var count = await Selection
                    .findOne({"cart":id})
    db.get("sessions")
        .find({sessionId: sessionId})
        .set("cart." + id, count + 1)
        .write();
     var numCart = Object.values(
            db
             .get("sessions")
             .find({ sessionId: sessionId })
             .get("cart")
             .value()
           ).reduce((acc, cur) => acc + cur, 0);
             
    res.cookie("numCart",numCart);
    res.redirect("/books")
    }
};