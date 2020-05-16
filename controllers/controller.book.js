var Titles = require("../model/model.books")
require('dotenv').config()
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


//List book
module.exports.book = async function (req, res) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 6;
    var skip = (page - 1)*perPage;
    var limit = page*perPage
    // res.render("books/book", {
    //     titles: db.get("titles").value().slice(start, end),
    //     page:page
    // });
    var titles = await Titles.find().skip(skip).limit(limit);
    res.render("books/book", {
        titles:titles,
        page:page
    });
};
// Find
module.exports.find = async function(req, res){
    var q = req.query.q;
    var allbook = await Titles.find()
    var filterlistbook = allbook.filter(function(book){
      var lowercase = book.tl.toLowerCase();
       return lowercase.indexOf(q) !==-1;
    });
    res.render('books/book',{
        titles: filterlistbook
    });
  };
// Detail
module.exports.detail = async function (req, res) {
    var id = req.params.id;
    var detailbook = await Titles.findOne({_id: id});
    res.render("books/detail", {
        title: detailbook
    })    
  };
  //Add book
module.exports.getAdd = function(req, res){
    res.render('books/add')
};
module.exports.postAdd = async function(req, res){
    // req.body.id=shortid.generate();
    // db.get('titles').push(req.body).write()
    var patch = req.file.path;
    var result = await cloudinary.uploader.upload(patch, 
        function(error, result){
            console.log(error)
        });
    req.body.image=result.url
    await Titles.insertMany(req.body);
    res.redirect('/books')
  };
//Detele
module.exports.dislaydetele = async function (req, res) {
    titles = await Titles.find()
    res.render("books/delete", {
       titles: titles
    });
};
module.exports.deteleitem = async function (req, res) {
    var id = req.params.id;
    await Titles.deleteOne({_id: id});
    res.redirect('/books/delete');
};
//  Update
module.exports.displayupdate = async function (req, res) {
    titles = await Titles.find()
    res.render("books/update", {
        titles: titles
    });
};