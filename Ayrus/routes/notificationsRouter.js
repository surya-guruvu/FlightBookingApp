const express = require('express');
const bodyParser = require('body-parser');
const notificationRouter = express.Router();
var authenticate = require("../authenticate");

const Notifcation = require("../models/Notification");

notificationRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    const userId = req.user._id;

    Notifcation.find({user:userId}).sort({timestamp: -1})
    .then((notifications)=>{
        // console.log(notifications);
        res.status(200).json(notifications);
    })
    .catch((err)=>{
        next(err);
    });
})
.put((req,res,next)=>{
    const notificationId = req.query.notificationId;
    const is_read = req.query.is_read;

    // console.log(notificationId);
    // console.log(is_read);

    Notifcation.findOneAndUpdate({_id:notificationId},{$set : {is_read:is_read}})
    .then((updatedNotification)=>{
        // console.log(updatedNotification);
        res.status(200).json({data:"Success"});
    })
    .catch((err)=>next(err));

});

notificationRouter.route('/unread')
.get(authenticate.verifyUser,(req,res,next)=>{
    const userId = req.user._id;

    Notification.countDocuments({ user: userId, is_read: false })
    .then((count) => {
        res.status(200).json({ count });
    })
    .catch((err) => {
        next(err);
    });
})



module.exports = notificationRouter;