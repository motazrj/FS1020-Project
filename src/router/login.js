'use strict';
let argon = require('argon2');
let db = require('../db');

/***********************************************************
****** New login session ***********************************
***********************************************************/

async function postLoginRoute(request, response, next) {
  db.userExists(request.body.email).then((userExists) => {
    if (!userExists)
      return false;
    // email exists, now verify the password
    else {
      return db.getUserPasswordHash(request.body.email)
        .then((dbHash) => {
          return argon.verify(dbHash, request.body.password);
        });
    }
  })
    .then((isValid) => {
      // If invalid respond with authentication failure
      if (!isValid) {
        return response.status(400).send(` The email and password combination either do not
     match or do not exist, please create a user first or enter a valid combination`);
      }
      else {
        request.session.email = request.body.email;
        let newlogin = {
          type: 'LOGIN',
          name: request.body.name,
          email: request.body.email,
          logindate: Date(),
        }
        db.addentry(newlogin);
        response.status(201).send(`success ${request.session.email}`);

        next();
      }
    })
};

module.exports = { post: postLoginRoute };
