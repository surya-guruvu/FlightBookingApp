const express = require('express');
const bodyParser = require('body-parser');
const flightRouter = express.Router();
var authenticate = require("../authenticate");
const Flight = require("../models/Flight");
const Book = require("../models/Book");
const Notification = require("../models/Notification");

flightRouter.use(bodyParser.json());
 
flightRouter.route('/')
.get((req,res,next)=>{
	const { origin, destination, date, passengers } = req.query;
    Flight.find({
        origin: {$regex: origin, $options: 'i'},
        destination: { $regex: destination, $options: 'i' },
        seatsAvailable: { $gte: passengers },
        date: date,
        cancelled:false,
    })
    .then((filteredFlights)=>{
        res.status(200).json({ data: filteredFlights });
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    });
}) 

//Implement cache invalidate protocols
.post((req, res, next) => {
    // console.log("Yeah");
    const { flightNumber, origin, destination, date, seatsAvailable, startTime, endTime} = req.body;
    const newFlight = new Flight({
        flightNumber:flightNumber,
        origin:origin,
        destination:destination,
        date:date,
        seatsAvailable:seatsAvailable,
        startTime: startTime,
        endTime: endTime,
    });

    newFlight.save()
    .then((savedFlight)=>{
        res.status(201).json(savedFlight);
    })
    .catch((error)=>{
        res.status(500).json({ error: 'Failed to add a new flight' })
    })
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /flights');
})
.delete((req, res, next) => {
    const flightNumber = req.query.flightNumber;
    const date = req.query.date;

    console.log(date);
    console.log(flightNumber);

    Flight.findOneAndUpdate({flightNumber:flightNumber,date:date,}, {$set: {cancelled:true}})
    .then((deletedFlight)=>{
        console.log("Deleted Flight:",deletedFlight);

        Book.updateMany({ flight: deletedFlight._id }, { $set: { cancelled: true } })
        .then((result) => {
          console.log(`Updated ${result} bookings as cancelled.`);
        })
        .catch((error) => {
          console.error('Error updating bookings:', error);
        });

        Book.find({flight:deletedFlight._id}).populate('user')
        .then((bookings)=>{
            bookings.map((booking)=>{
                console.log(booking);
                console.log(booking.user);
                const newNotification = new Notification({
                    user: booking.user._id,
                    message: `Your Booking for Flight ${deletedFlight.flightNumber} on ${deletedFlight.date} under the name of ${booking.name} is cancelled. Sorry for Inconvenience`,
                });
                newNotification.save()
                .then((savedNotification)=>{
                    console.log("Saved Notifcation:",savedNotification);
                })
                .catch((err)=>{console.log(err)});
            });
        })
        .catch((error) => {
            console.error('Error in Notifications:', error);
        });


        res.statusCode = 200;
        res.end(`Cancelled Flight ${deletedFlight.flightNumber}`);
    })
    .catch((err)=>{
        next(err);
    })
});



module.exports = flightRouter;




// const redisClient = require("./redisClient");

// const cacheFlightData = (req,res,next)=>{
//     const cacheKey = JSON.stringify(req.query).toLowerCase();

//     redisClient.get(cacheKey,(err,cachedData)=>{
//         if(err){
//             console.error("Redis Error:",err);
//         }
//         if(cachedData){
//             const flightData = JSON.parse(cachedData);
//             res.status(200).json({ data: filteredFlights });

//         }
//         else{
//             const { origin, destination, date, passengers } = req.query;
//             Flight.find({
//                 origin: {$regex: origin, $options: 'i'},
//                 destination: { $regex: destination, $options: 'i' },
//                 seatsAvailable: { $gte: passengers },
//                 date: date,
//             })
//             .then((filteredFlights)=>{
//                 // console.log(filteredFlights);
//                 redisClient.setEx(cacheKey, 3600, JSON.stringify(filteredFlights)); (can also be used for updation)
//                 res.status(200).json({ data: filteredFlights });

//             })
//             .catch((error)=>{
//                 console.error(error);
//                 res.status(500).json({ error: 'Internal server error' });
//             });
//         }
        
//     });
// };



