
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    flight:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'       // Reference Flight model
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var Booking = mongoose.model('Booking',BookSchema);
module.exports = Booking;