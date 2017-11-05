const express = require('express');
//I required body parser
const bodyParser = require('body-parser');
//then I will require mongoose to connect to db
const mongoose = require('mongoose');

//require those routes I created seperately
const routes = require('./routes/students');

//setting up express app by caling the function express
const app = express();

//connet to mongodb;
//mongoose.connect("mongodb://localhost/studentdb");
mongoose.connect("mongodb://students:08032647672@ds137435.mlab.com:37435/students");

mongoose.Promise = global.Promise;

//to handle ny static files
app.use(express.static('public'));

//time to use bodyParser
app.use(bodyParser.json());

//then I will tell express to use my routes
app.use(routes);

//error handling middleware
app.use(function(err,req,res,next){
res.status(422).send({error:err.message});
});

//listen to this port 
app.listen(process.env.PORT||4000,process.env.HOST || '0.0.0.0',function(){
    console.log('we are listenig for request at port 4000');
    //console.log('listening on', http.address().port);
});

