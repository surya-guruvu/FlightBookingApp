const express = require('express');

const bodyParser = require('body-parser');

const flightRouter = express.Router();

flightRouter.use(bodyParser.json());

flightRouter.route('/')
.get((req,res,next)=>{
	res.end("These are all the available flights");
})
.post((req, res, next) => {
    res.end('Will add this flight: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /flights');
})
.delete((req, res, next) => {
    res.end('Cancelling all flights');
});

module.exports = flightRouter;


