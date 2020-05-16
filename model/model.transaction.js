var mongoose = require('mongoose')

var transSchema = new mongoose.Schema({
    userId: String,
    timeb: String,
    isComplete: String,
    cart: Object
});
var Trans = mongoose.model("Trans", transSchema, "trans");

module.exports = Trans;