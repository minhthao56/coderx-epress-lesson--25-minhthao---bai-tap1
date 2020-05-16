require('dotenv').config()
var bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;
var Users = require("../model/model.users")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})

//List book
module.exports.user = async function (req, res) {
    var users = await Users.find()
    res.render("users/user", {
        users: users
    });
};
// frofile
module.exports.profile = async function(req, res, next){
    var user = await Users.findOne({id: req.signedCookies.userId});
    res.render("users/profile",{
        user:user
    })
}
// Find
module.exports.find = async function(req, res){
    var q = req.query.q;
    var alluser = await Users.find();
    var filterlistuser = alluser.filter(function(user){
      var lowercase = user.tl.toLowerCase();
       return lowercase.indexOf(q) !==-1;
    });
    res.render('users/user',{
        users: filterlistuser
    });
  };
// Detail
module.exports.detail = async function (req, res) {
    var id = req.params.id;
    var detailuser = await Users.findOne({_id: id});
    res.render("users/detail", {
        user: detailuser
    })    
  };
  //Add user
module.exports.getAdd = async function(req, res){
    res.render('users/add')
};
module.exports.postAdd = async function(req, res){
    // var patch = req.file.path
    // return new Promise(function(resolve,reject){
    //     cloudinary.uploader.upload(patch, 
    //         function(error, result) {
    //             if (error){console.log(error)
    //             }else{
    //                 req.body.avatarUrl=result.url
    //                 req.body.pass = bcrypt.hashSync(req.body.pass, 10)
    //                 req.body.id = shortid.generate();
    //                 db.get('users').push(req.body).write()
    //                 res.redirect('/users') 
    //             }
    //         })      
    // })
        var patch = req.file.path;
        var result = await cloudinary.uploader.upload(patch, 
            function(error, result){
                console.log(error)
            });
        req.body.avatarUrl=result.url
        req.body.pass = bcrypt.hashSync(req.body.pass, 10)
        await Users.insertMany(req.body);
        res.redirect('/users')
    
  };
//Detele
module.exports.dislaydetele = async function (req, res) {
    var users = await Users.find()
    res.render("users/delete", {
        users: users
    });
};
module.exports.deteleitem = async function (req, res) {
    var id = req.params.id;
    await Users.deleteOne({_id: id});
    res.redirect('/users/delete');
};
//  Update
module.exports.displayupdate = async function (req, res) {
    var users = await Users.find()
    res.render("users/update", {
        users: users

    });
};