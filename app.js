const express = require('express'); //Importing Express
const app = express(); // creating app

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/',(req,res)=>{
	res.status(200);
	res.send("Welcome to root url of server")
});

var flightRouter = require('./routes/flightRouter');

app.use('/flights',flightRouter);

app.listen(PORT, (error)=>{
	if(!error){
		console.log(`Server is successfully running and listening at port ${PORT}`);
	}
	else{
		console.log("Error occured,Error: ",error);
	}
});


