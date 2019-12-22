'use strict'
let db = require('../db');


/*****************************************************
 ************* Create an entry / submission **********
 ******************************************************/
async function postnewsubmission(request, response, next) {

  db.loginExists(request.body.email)
    .then((logged) => {
      if (!logged) {
        return response.status(400).send(` The username ${request.body.name} doesnt exist, please login first`);
      }
      else {
        let newsubmission = {
          type: 'SUBMISSION',
          name: request.body.name,
          subdate: Date(), //dateandtime().format(),
          comment: request.body.comment,
        }
        db.addentry(newsubmission);
        response.status(201).send('Comment Submitted Successfully');
      }

      next();
    });
}

module.exports = { post: postnewsubmission };
