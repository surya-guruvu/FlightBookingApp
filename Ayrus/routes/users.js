var express = require('express');
const bodyParser=require('body-parser');
var User=require('../models/user');
var passport = require('passport');


var router = express.Router();
router.use(bodyParser.json());

router.get('/',passport.authenticate('local'), function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signUp', (req, res, next) => {

  User.register(new User({username:req.body.username,email:req.body.email}),
  req.body.password,(err,user)=>{
    if(err){
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err,success:false,status: 'username/email already exists'});
    }
    else{
      //We will authenticate the user,whose registration was done
      passport.authenticate('local')(req,res,()=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success:true,status: 'Registration Successful!'}); 
      })
    }
  }) 
});


//passport.authenticate automatically adds user property to the body. we can use req.user
router.post('/login',passport.authenticate('local'),(req,res)=>{  //If any error at passport.authenticate, then it will tell the user about the error, else moves on to callback function
  res.statusCode = 200; 
  res.setHeader('Content-Type', 'application/json');
  res.json({success:true,status: 'You are Successfully logged in!'}); 
})


module.exports = router;
