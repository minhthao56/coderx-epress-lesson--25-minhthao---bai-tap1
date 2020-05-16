var Sessions = require("../model/model.sesstion")
var db = require('../db');
var shortid = require('shortid');


module.exports = async function(req, res, next){
    if (!req.signedCookies.sessionId){
        var id = shortid.generate();
        res.cookie("sessionId", id,{
            signed:true
        });
        await Sessions.insertMany({sessionId: id});
        res.redirect('/');
    } else {next()}
}