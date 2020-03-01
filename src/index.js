'use strict';
require('dotenv').config();
/**********************************************************************
********* For full documentation of dotenv ref to                 ******
*********  https://github.com/motdotla/dotenv                     ******
********* it creates an .env file to store and set some variables ******
********* variables, to be run as early as possible in the code   ******
************************************************************************/
let express = require('express');
let path = require('path');
let router = require('./router/router');
let session = require('express-session');
let cors = require('cors')
let defaultErrorHandler = require('./middleware/default-error-handler');
let deafaultsessionvalues = require('./middleware/default-session-values');
let authintication = require('./middleware/authintication');


let app = express();
//let port = 3100;

app.set('view engine', 'ejs');


// Static folder, there is another way to do it as

app.use(express.static(path.join(__dirname, 'static')));
//Body parser
app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
//app.get('/products/:id', function (req, res, next) {
//  res.json({msg: 'This is CORS-enabled for all origins!'})
//});
app.use(express.urlencoded({ extended: false }));

/************************************************************
********** Starting the Express-Session *********************
************************************************************/
app.use(session({
  secret: process.env.SESSION_SECRET, //'a@D432!fky', // A strong secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, //the default is false (not set), but when true an https is needed
    httpOnly: true,
    maxAge: process.env.SESSION_MAXAGE,   //12000000,
  },
}));


app.use(deafaultsessionvalues);
app.use(router);
app.use(authintication);

// path `/static/protected` from the folder `static/protected`
app.use('/static/protected', express.static(path.resolve('static/protected')));


app.use(defaultErrorHandler);


function handleServerListen() {
  console.log(`Server is listening on port ${process.env.HTTP_PORT}`);
}
app.listen(process.env.HTTP_PORT, handleServerListen);
