'use strict';
let express = require('express');
let router = express.Router();
let db = require('./db');


function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function phonenumber(phone)
{
  let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  console.log(phoneno.test(String(phone)));
  return phoneno.test(String(phone)); //.toLowerCase);

}
//Home page
router.get('/', (req, res) => {
  res.render('contactform');
});


//Create new user page
router.get('/Createuser', function (req, res) {
  res.render('create-user-page', {
    pageId: 'create-use',
    title: 'Create a New User'
  });
});

router.post('/newuser', function (req, res, next) { //create/user
  let newuser = {
    type: 'USER',
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  }
  if (!newuser.name) {
    return res.status(400).send('"name" is a required field');
  } else if ((!newuser.email) || (!validateEmail(req.body.email))){
    return res.status(400).send('"email" is a required field, it is either missing or not in the proper format');
  }
  else if ((!newuser.phone) ||(!phonenumber(req.body.phone))) {
    return res.status(400).send(' "phone" is a required filed, either missing or not in proper format');
  }
  else {
    db.addentry(newuser);
    res.status(201).send('success');
  }
});

/***********************************************************
****** New login session ***********************************
***********************************************************/
router.post('/login', async function (request, response, next) {
  let allentries = await db.read();
  let found = allentries.some(entry => (entry.name === (request.body.name) && entry.email === request.body.email));
  if (!found) {
    return response.status(400).send(` The username and email combination either do not match or do not exist, please create a user first`);
  }
  else {
    let newlogin = {
      type: 'LOGIN',
      name: request.body.name,
      email: request.body.email,
    }
    db.addentry(newlogin);
    response.status(201).send('success');

    next();
  }
});

/*****************************************************
 ************* Create an entry / submission **********
 ******************************************************/
router.post('/newsubmission', async function (request, response, next) { //create/submission
  let allentries = await db.read();
  let found = allentries.some(entry => entry.name == (request.body.name) && entry.type === "LOGIN");
  if (!found) {
    return response.status(400).send(` The username ${request.body.name} doesnt exist, please login first`);
  }
  else {
    let newsubmission = {
      type: 'SUBMISSION',
      name: request.body.name,
      subdate:  Date(), //dateandtime().format(),
      comment: request.body.comment,
    }
    db.addentry(newsubmission);
    response.status(201).send('Comment Submitted Successfully');
  }
  next();
});

/**************************************************
**********  Read submissions **********************
**************************************************/

router.get('/readall', async function (request, response, next) {
  let allentries = await db.read();
  response.json(allentries);
  response.status(200);
  next();
});


module.exports = router;
