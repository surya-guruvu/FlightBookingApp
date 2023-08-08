const express = require('express');
const bodyParser = require('body-parser');
const Booking = require("../models/Book");
const authenticate = require("../authenticate");
const Flight = require("../models/Flight");
const bookRouter = express.Router();

bookRouter.route('/')
.post(authenticate.verifyUser,(req,res,next)=>{
    const {bookings,flightId} = req.body;
    console.log(req.user._id);
    // console.log(kdk.jje);
    const savePromises = [];

    bookings.forEach(bookingData => {
        const newBooking = new Booking({
            name  : bookingData.pass_name,
            email : bookingData.email,
            phoneNumber : bookingData.phoneNumber,
            flight : flightId,
            user   : req.user._id,

        });
        savePromises.push(newBooking.save());
    });


    Promise.all(savePromises)
        .then((savedBookings)=>{
            Flight.findByIdAndUpdate(
                flightId,
                { $inc: { seatsAvailable: -bookings.length } }, // Decrement available seats by the number of bookings
                { new: true }
            )
            .then(updatedFlight => {
                if (!updatedFlight) {
                    return res.status(404).json({ message: "Flight not found" });
                }

                res.status(201).json({ savedBookings, updatedFlight });
            })
            .catch(error => {
                res.status(500).json({ message: "Error updating flight seats", error });
            });
        })
        .catch((errors)=>{
            res.status(500).json({ message: "Error saving bookings", errors });
        });

    
});

bookRouter.get('/',authenticate.verifyUser,(req,res,next)=>{
    Booking.find({user:req.user._id}).populate('user').populate('flight')
    

    .then((filteredBookings)=>{
        console.log(filteredBookings);
        res.status(200).json({ data: filteredBookings });
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = bookRouter;