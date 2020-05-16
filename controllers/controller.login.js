var bcrypt = require('bcrypt');
var Users = require("../model/model.users")



module.exports.getlogin = function (req, res, next) {
    res.render("auth/login");
};

module.exports.postlogin = async function(req,res, next){
    var email = req.body.email;
    var user = await Users.findOne({email: email});
    if (!user){
        res.render("auth/login",{
           err: "Wrong email",
           values:req.body
        });
    }
    else if (!bcrypt.compareSync(req.body.pass, user.pass)) {
        res.render("auth/login",{
            err: "Wrong Password",
            values:req.body
         });
    }else{
        res.cookie("userId", user.id,{
            signed:true
        });
        res.redirect('/books');
    }
}
