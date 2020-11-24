var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
const authRoute = require('./routes/auth');
app.use('/api',authRoute);
app.listen(3000, function () {
    console.log("Server Started on port 3000");
});



