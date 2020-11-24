const router = require('express').Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bank_application",
    multipleStatements: true
});

con.connect(function (err) {
    if(!err){
        console.log("DB Connected Successfully!!");
    }else{
        console.log("DB Connection failed due to: "+ JSON.stringify(err,undefined,2));
    }
});

router.post('/', function (req,res) {
    res.send("Node Js Server Started!!");
});

router.post('/adminLogin', function (req,res) {
    const username = req.body.username;
    const password = req.body.password;
    var sql = "SELECT * FROM users WHERE Job_role = 'Admin' AND Username ='"+username+"'";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            const hashPassword  = rows[0].Password;
            const validPassword = bcrypt.compareSync(password, hashPassword);
            if(validPassword){
                res.send('done');
            }
            else{
                res.send("error");
            }
        }else{
            console.log(err);
        }
    });
});

router.post('/userLogin', function (req,res) {
    const username = req.body.username;
    const password = req.body.password;
    var sql = "SELECT * FROM users WHERE Job_role = 'User' AND Username ='"+username+"'";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            const hashPassword  = rows[0].Password;
            const validPassword = bcrypt.compareSync(password, hashPassword);
            if(validPassword){
                res.send('done');
            }
            else{
                res.send("error");
            }
        }else{
            console.log(err);
        }
    });
});

router.post('/register', function (req,res) {
    const username = req.body.username;
    const jobRole = req.body.jobRole;
    const name = req.body.name;
    const nic =req.body.nic;
    //Hash the password;
    const hashPassword  = bcrypt.hashSync(req.body.password, 10);
    var sql = "INSERT INTO users VALUES (null, '"+username+"', '"+hashPassword+"', '"+jobRole+"', '"+name+"','"+nic+"')";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send("done");
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

router.get('/allUsers', function (req,res) {
    var sql = "SELECT * FROM users ";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

router.post('/newApplication', function (req,res) {
    const nic = req.body.nic;
    const income = req.body.income;
    const co_income = req.body.co_income;
    const amount =req.body.amount;
    const credit = req.body.credit;
    const gender = req.body.gender;
    const education = req.body.education;
    const prediction = "Pending";
    const status = "Pending";
    var sql = "INSERT INTO application VALUES (null, '"+nic+"', '"+income+"', '"+co_income+"', '"+amount+"','"+credit+"','"+education+"', '"+gender+"', '"+prediction+"', '"+status+"')";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send("done");
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

router.post('/search', function (req,res) {
    const id = req.body.id;
    var sql = "SELECT * FROM application WHERE Id ='"+id+"'";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

router.get('/applications', function (req,res) {
    var sql = "SELECT * FROM application";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

router.post('/approveLoan', function (req,res){
    const id = req.body.id;
    var sql = "UPDATE application SET Status = 'Approved' WHERE Id ='"+id+"'";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send('done');
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

router.post('/rejectLoan', function (req,res){
    const id = req.body.id;
    var sql = "UPDATE application SET Status = 'Rejected' WHERE Id ='"+id+"'";
    con.query(sql,(err, rows, fields)=>{
        if(!err){
            res.send('done');
        }else{
            res.send("error");
            console.log(err);
        }
    });
});

module.exports = router;
