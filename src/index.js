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
let router = require ('./router/router');
let session = require ('express-session');
let defaultErrorHandler = require('./middleware/default-error-handler');
let deafaultsessionvalues = require ('./middleware/default-session-values');
let authintication = require ('./middleware/authintication');


let app = express();
let port = 3100;

app.set('view engine', 'ejs');


// Static folder, there is another way to do it as
//app.use(express.static(path.join(__dirname, 'static')));

//app.use(protectPath(/^\/protected\/.*$/));
app.use(express.static(path.join(__dirname, 'static')));
//Body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/************************************************************
********** Starting the Express-Session *********************
************************************************************/
app.use(session({
  secret: 'a@D432!fky', // A strong secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, //the default is false (not set), but when true an https is needed
    httpOnly: true,
    maxAge: 12000000,
  },
}));

/*******************************************
**********************************************app.use(def)
************ to see if needed or can be utilied in a different way **********
*********************************/
app.use(deafaultsessionvalues);
app.use(router);
//app.use(authintication);
app.use(defaultErrorHandler);



function handleServerListen() {
  console.log(`Server is listening on port ${port}`);
}
app.listen(port, handleServerListen);
