var express = require('express');
const bodyParser=require('body-parser');
var User=require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');


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
router.post('/login',passport.authenticate('local',{session:false}),(req,res)=>{  
  /*f any error at passport.authenticate, then it will tell the user about the error, 
  else moves on to callback function*/
  var token1 = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200; 
  console.log(token1);
  res.setHeader('Content-Type', 'application/json');
  res.json({success:true,tok:token1,status: 'You are Successfully logged in!'}); 
});


router.post("/change-password", authenticate.verifyUser, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use passport-local-mongoose's changePassword method to handle password change
    await user.changePassword(currentPassword, newPassword);

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
