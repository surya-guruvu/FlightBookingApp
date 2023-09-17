const express = require('express');
const bodyParser = require('body-parser');
const Booking = require("../models/Book");
const authenticate = require("../authenticate");
const Flight = require("../models/Flight");
const bookRouter = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth: {
        user: 'suryaguruvu2000@gmail.com',
        pass: 'vppz omns ycvw rtzi' 
    }
});
 
bookRouter.route('/')
.post(authenticate.verifyUser,(req,res,next)=>{
    const {bookings,flightId} = req.body;
    console.log(req.user._id);

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
                { $inc: { seatsAvailable: -savedBookings.length } }, // Decrement available seats by the number of bookings
                { new: true }
            )
            .then(updatedFlight => {
                if (!updatedFlight) {
                    return res.status(404).json({ message: "Flight not found" });
                }

                savedBookings.map(savedBooking=>{
                    const mailOptions = {
                        from: 'suryaguruvu2000@gmail.com',
                        to: savedBooking.email,
                        subject: 'Flight Booking Confirmation',
                        text: `Dear ${savedBooking.name},\n\nYour booking for flight ${updatedFlight.flightNumber} has been confirmed.\n\nThank you for choosing our service!`
                    };

                    transporter.sendMail(mailOptions,(err,info)=>{
                        if (err) {
                            console.log('Error sending email: ', err);
                        } else {
                            console.log('Email sent: ', info.response);
                        }
                    });
                });
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
        const sanitizedBookings = filteredBookings.map((booking)=>{
            if(booking.flight){
                return booking;
            }
            else{
                booking.flight = {"cancelled":"Flight Is Cancelled"};
                return booking;
            }
        });

        // console.log(filteredBookings);
        console.log(sanitizedBookings);
        res.status(200).json({ data: sanitizedBookings});
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    });
});

module.exports = bookRouter;