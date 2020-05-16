var mongoose = require('mongoose')

var usersSchema = new mongoose.Schema({
    isAdmin: String,
    wrongLoginCount: String,
    name: String,
    email: String,
    pass:String,
    avatarUrl:String
});
var Users = mongoose.model("Users", usersSchema, "users");

module.exports = Users;