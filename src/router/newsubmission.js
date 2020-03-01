'use strict'
let db = require('../db');


/*****************************************************
 ************* Create an entry / submission **********
 ******************************************************/
async function postnewsubmission(request, response, next) {
  //
  db.loginExists(request.body.email)
    .then((logged) => {
      if (!logged) {
       console.log(request.body.email)
        return response.status(400).json(` The username ${request.body.email} doesnt exist, please login first`)   //.send(json(request.body.email)) //(` The username ${request.body.name} doesnt exist, please login first`);
      }
      else {

        let newsubmission = {
          type: 'SUBMISSION',
          email: request.body.email,
          phone: request.body.phone,
          subdate: Date(), //dateandtime().format(),
          comment: request.body.comment,
        }

        db.addentry(newsubmission);
       // response.status(201).send(newsubmission);
       //another way of sending back messages, see the message of usernot found above
       response.status(201).send({message: `Succesfuly registered the contact message of username ${request.body.email} having content ${request.body.comment} `});

      }

      next();
    });
}

module.exports = { post: postnewsubmission };

