var express = require('express');
var router = express.Router();
var controller = require("../controllers/controller.book")
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var Titles = require("../model/model.books")



// List book and find
router.get("/", controller.book);
//Find
router.get ('/find', controller.find);
//Detail
router.get('/detail/:id', controller.detail);
// Add book
router.get('/add', controller.getAdd)
router.post('/add', upload.single('image'), controller.postAdd);
//Delete book
router.get("/delete",controller.dislaydetele);
router.get('/delete/:id', controller.deteleitem);
//Update
router.get("/update", controller.displayupdate);

router.get('/update/:id', async function (req, res) {
    var id = req.params.id;
    var editbook = await Titles.findOne({_id: id});
    res.render("books/edit",{
        title: editbook
    });
    router.post('/update/:id', async function(req, res){
        await Titles.updateOne({_id: id},{
            $set: {tl: req.body.tl, description: req.body.description}
        });
        res.redirect('/books/update')
    });
});

module.exports = router;
