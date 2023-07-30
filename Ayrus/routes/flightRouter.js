const express = require('express');

const bodyParser = require('body-parser');

const flightRouter = express.Router();

var authenticate = require("../authenticate");

const Flight = require("../models/Flight");

flightRouter.use(bodyParser.json());

flightRouter.route('/')
.get((req,res,next)=>{
	const { origin, destination, date, passengers } = req.query;
    Flight.find({
        origin: {$regex: origin, $options: 'i'},
        destination: { $regex: destination, $options: 'i' },
        seatsAvailable: { $gte: passengers },
        date: date,
    })
    .then((filteredFlights)=>{
        // console.log(filteredFlights);
        res.status(200).json({ data: filteredFlights });
    })
    .catch((error)=>{
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    });
})
.post((req, res, next) => {
    // res.end('Will add this flight: ' + req.body.name + ' with details: ' + req.body.description);
    const { flightNumber, origin, destination, date, seatsAvailable } = req.body;
    const newFlight = new Flight({
        flightNumber:flightNumber,
        origin:origin,
        destination:destination,
        date:date,
        seatsAvailable:seatsAvailable
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
    res.end('Cancelling all flights');
});


flightRouter.route('/book')
.post((req,res,next)=>{
    const {flightId} = req.body;

    Flight.findById(flightId)
    .then((flight)=>{
        if(!flight){
            return res.status(404).json({error:"Flight Not find"});
        }
        else if(flight.seatsAvailable<=0){
            return res.status(400).json({error:"No seats available in the flight"});
        }
        else{
            const bookedFlight = {
                flightNumber: flight.flightNumber,
                flightId: flight._id,
              };
      
              // Update the seats available and save the updated flight
              flight.seatsAvailable--;
              flight.save().then(() => {
                res.status(200).json(bookedFlight);
              });
        }
    })

});


module.exports = flightRouter;


