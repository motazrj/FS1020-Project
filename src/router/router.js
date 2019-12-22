'use strict';
let express = require('express');
let router = express.Router();

let db = require('../db');
let userRoutes = require('./newuser');
let loginRoutes = require('./login');
let submissionRoutes = require('./newsubmission');


//Home page
router.get('/', (req, res) => {
  res.render('contactform');
});


// create user page
router.get('/newuser', userRoutes.get);
router.post('/newuser', userRoutes.post);


// create a new login
router.post('/login', loginRoutes.post);


// Create a new submission
router.post('/newsubmission', submissionRoutes.post);



/**************************************************
**********  Read submissions **********************
**************************************************/

router.get('/readall', async function (request, response, next) {
  let allentries = await db.read();
  return response.json(allentries);
  return response.status(200);
  next();
});


module.exports = router;
