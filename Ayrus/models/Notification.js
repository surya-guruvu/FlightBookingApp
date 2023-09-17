const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    is_read:{
        type: Boolean,
        default: false,
    },
    timeStamp:{
        type: Date,
        default: Date.now,
    }
});

const Notification = mongoose.model("Notification",NotificationSchema);

module.exports = Notification;