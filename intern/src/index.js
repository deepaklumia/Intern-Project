const express= require('express');
const app = express();
const env =require('dotenv');
const multer = require('multer');
const bodyParser = require('body-parser');
const router = require('../src/router/router');
const {default:mongoose} = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer().any());
const mongooseUrl = "mongodb+srv://deepak98:deepaklumia@book.4bu11tl.mongodb.net/Intern"

mongoose.connect(mongooseUrl,{useNewUrlParser:true})
.then(() => {console.log("mongodb is  connected");})
.catch((err) => {console.log(err);});

app.use('/', router);
app.listen(process.env.PORT || 3001,() => {
      console.log( "Express server listening on port " + (process.env.PORT || 3001));
});
