var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var FlightSchema = new Schema({
    flightNumber:{
        type: String,
        required:true
    },
    origin:{
        type:String,
        required:true
    },
    destination: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    seatsAvailable: {
        type: Number,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
      },
    endTime: {
        type: Date,
        required: true,
    },
    cancelled: {
        type: Boolean, 
        default: false
    }
});
FlightSchema.index({ flightNumber: 1, date: 1 }, { unique: true });

var flight = mongoose.model('Flight',FlightSchema);
module.exports = flight;