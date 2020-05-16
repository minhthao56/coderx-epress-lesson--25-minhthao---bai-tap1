var express = require('express');
var router = express.Router();
var controller = require("../controllers/contronller.user");
var validation = require("../validation/validation.user")
var loginmiddleware = require("../middleware/middleware.login")
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });
var Users = require("../model/model.users")


// List user
router.get("/",loginmiddleware.mustlogin,loginmiddleware.notIntoUsers,controller.user);
//Find
router.get ('/find' ,controller.find);
//Detail
router.get('/detail/:id', controller.detail);
router.get('/profile', controller.profile)
// Add user
router.get('/add', controller.getAdd)
router.post('/add',upload.single('avatarUrl'), validation.postAdd, controller.postAdd);

//Delete user
router.get("/delete", controller.dislaydetele);
router.get('/delete/:id', controller.deteleitem);
//Update
router.get("/update", controller.displayupdate);
router.get('/update/:id', async function (req, res) {
    var id = req.params.id;
    var edituser = await Users.findOne({_id: id});
    res.render("users/edit",{
        user: edituser
    });
    router.post('/update/:id', async function(req, res){
        await Titles.updateOne({_id: id},{
            $set: {name: req.body.name}
        });
        res.redirect('/books/update')
    });
});


module.exports = router;