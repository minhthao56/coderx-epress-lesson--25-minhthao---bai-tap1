var Users = require("../model/model.users")
var Titles = require("../model/model.books")
var Trans = require("../model/model.transaction")
var Sessions = require("../model/model.sesstion")


//List book
module.exports.trans = async function (req, res) {
    var trans = await Trans.find()
    res.render("transactions/trans", {
        trans: trans
    });
};
// Detail borrow
module.exports.detailborrow = async function (req, res) {
    var bookId = req.params.bookId;
    var userId = req.params.userId;
    var id = req.params.id;
    var detailbook = await Titles.findOne({id: bookId});
    var detailuser = await Users.findOne({id: userId});
    var detailtran = await Trans.find({id: id});
    res.render("transactions/detail", {
        title:detailbook,
        user: detailuser,
        tran:detailtran
    })    
  };
//Add
module.exports.getAdd = async function (req, res) {
    var titles =  await Titles.find()
    var users =  await Users.find()
    res.render("transactions/add", {
        titles:titles,
        users: users
    });
};
module.exports.postAdd = async function(req, res){
    await Trans.push(req.body)
    res.redirect('/trans')
  };
// Borrow
module.exports.borrow = async function(req, res){
    var userId = req.signedCookies.userId;
    var sessionId = req.signedCookies.sessionId;
    var objUser = await Users.findOne({_id:userId});
    var objTrans = await Trans.findOne({userId:userId});
    var arrSessions = await Sessions
                    .findOne({sessionId:sessionId});
    var objCart=arrSessions[0]         
     await Trans.insertMany({
        userId: userId,
        timeb: new Date,
        isComplete:"false",
        cart: objCart
     })
     var keys = Object.keys(objCart)
     var books =[];
     for(var key of keys){
         var book = await Titles.find({_id:key});
         books.push(book) 
     }
     res.render("transactions/detail",{
        objUser:objUser,
        objTrans:objTrans,
        books:books
     })
}


//Complete
module.exports.changeStatus = async function(req, res){
    var id = req.params.id;
    var findtran = await Trans.findOne({id: id});
    if(findtran===undefined){
        res.render("404")
    }else{
        await Trans.updateOne({_id: id},{
            $set: {isComplete:'true'}
        });
    res.redirect('/trans')
    }
};