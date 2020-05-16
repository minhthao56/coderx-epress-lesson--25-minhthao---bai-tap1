var Users = require("../model/model.users")
var Titles = require("../model/model.books")
var Trans = require("../model/model.transaction")



module.exports.mustlogin = async function(req, res, next){
    var user = await Users.findOne({_id: req.signedCookies.userId});
    if (!req.signedCookies.userId){
        res.redirect('/auth/login');
    }
    else if (!user){
        
        res.redirect('/auth/login');
    }else {
        res.locals.user = user;
        next()
    }
}
module.exports.notIntoTrans = async function(req, res, next){
    var idCookie = req.signedCookies.userId;
    if(idCookie===undefined){
        res.redirect("/")
        }
    var user = await Users.findOne({_id: req.signedCookies.userId});
    var allTrans = await Trans.find()

    var Objbook = await Titles.findOne({_id: allTrans.bookId});
    
    // var dbtransOfuser = await allTrans.filter({userId: user.id});
  
    // var bookOfuser=[];
    // for ( tran of dbtransOfuser){
    //     var Objbook = await Titles.findOne({_id: tran.bookId});
    //     bookOfuser.push(Objbook)
    // }
    // console.log("bookOfuser"+bookOfuser)
    if (user.isAdmin==="false"){
        res.render("transactions/transOfuser", {
            dbtransOfuser: allTrans,
            name: user.name,
            // bookOfuser: bookOfuser
        });
    }else {next()}
};

module.exports.notIntoUsers = async function(req, res, next){
    var user = await Users.findOne({_id: req.signedCookies.userId});
    if (user.isAdmin==="false"){
        res.render("users/profile", {
            user: user
        });
    }else {next()}
}