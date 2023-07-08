const express = require('express'); //Importing Express
const app = express(); // creating app

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/',(req,res)=>{
	res.status(200);
	res.send("Welcome to root url of server")
});

app.post('/',(req,res)=>{
	res.send(`Welcome ${req.body.name}`);
});

app.post("/post", (req, res) => {
  console.log("Connected to React");
  res.redirect("/");
});

app.get('/hello',(req,res)=>{
	res.status(200);
	res.set('Content-Type','text/html');
	res.send('<h1> Hello Surya, Welcome to ur 30 day challenge </h1>');
});

app.listen(PORT, (error)=>{
	if(!error){
		console.log(`Server is successfully running and listening at port ${PORT}`);
	}
	else{
		console.log("Error occured,Error: ",error);
	}
});


