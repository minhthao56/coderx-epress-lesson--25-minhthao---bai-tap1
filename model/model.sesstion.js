var mongoose = require('mongoose')

var sesstionsSchema = new mongoose.Schema({
    sessionId: String,
    cart:Object
});
var Sesstions = mongoose.model("Sesstions", sesstionsSchema, "sessions");

module.exports = Sesstions;