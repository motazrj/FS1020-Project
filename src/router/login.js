'use strict';

let db = require ('../db');

/***********************************************************
****** New login session ***********************************
***********************************************************/

 async function postLoginRoute(request, response, next) {

  let allentries = await db.read();
  let found = allentries.some(entry => (entry.name === (request.body.name) && entry.email === request.body.email));
  if (!found) {
    return response.status(400).send(` The username and email combination either do not match or do not exist, please create a user first`);
  }
  else {
    request.session.username = request.body.username;

    let newlogin = {
      type: 'LOGIN',
      name: request.body.name,
      email: request.body.email,
    }
    db.addentry(newlogin);
    response.status(201).send(`success ${request.session.username}`);

    next();
  }
};

module.exports ={post: postLoginRoute};
