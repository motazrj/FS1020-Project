'use strict';
let express = require('express');
let router = express.Router();


// Create a new user
router.post('/user',  function (request, response, next) {
// Validation, was copied from the Countries database, otherwise it is straightforward JS codes
  const formErrors = {};
  if (!request.body.name) {
    formErrors.name = 'Required';
  }
  if (!request.body.email) {
    formErrors.email = 'Required';
  }
  if (!request.body.phone) {
    formErrors.phone = 'Required';
  }
  if (formErrors !=={})
  response.status(400);
else
{
  console.log('Created a new user');
  next();
}
});


// Create a new session, from this point forward, output was sent to the console AND to the postman
// also, started to use status code 200 for a succesful operation
router.post('/session',  function (request, response, next) {
response.send('A new session was created');
console.log('A new user session created');
response.status(200);
next();
});

// Create an entry / submission
router.post('/entry',  function (request, response, next) {
response.send('User comment was created');
console.log('comment created');
response.status(200);
next();
});

// Read submissions
router.get('/',  function (request, response, next) {
  response.send('reading all submissions, same comment passed to the console log');
  console.log('reading all submissions');
  response.status(200);
  next();
});

module.exports = router;
