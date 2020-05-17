require('dotenv').config()
const express = require('express');
const app = express();

var cookieParser = require('cookie-parser')
var bookRouters = require("./routes/books.route");
var userRouters = require("./routes/users.route");
var transactionsRouters = require("./routes/transactions.route");
var authRouters = require("./routes/login.router");
var cartRouters = require("./routes/cart.route");
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI,
 {useUnifiedTopology: true,useNewUrlParser: true});


var sesstionMiddeware = require("./middleware/middeware.sessionid")

const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json())  
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("12eewfiowejfiowej"))
app.use(sesstionMiddeware);


// Trang chủ
app.get("/",sesstionMiddeware,function (req, res){
    res.render("index")    
});

app.use("/books",bookRouters);
app.use("/users",userRouters);
app.use("/trans",transactionsRouters);
app.use("/auth", authRouters)
app.use("/cart", cartRouters)

//Satic file
app.use(express.static('public'))
// Listening
app.listen(port, function(){
    console.log('Server listen on port' + port);
  });
  