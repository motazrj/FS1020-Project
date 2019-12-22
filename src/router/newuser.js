'use strict';
let argon = require('argon2');
let db = require('../db');


//Create new user page
function getnewuserRoute(req, res) {
  res.render('new-user-page', {
    pageId: 'new-use',
    title: 'Create a New User',
    email: req.session.email,
    formValues: { email: null, password: null },
    formErrors: { email: null, password: null },
  });
};

function postnewuserRoute(req, res, next) {
  // First we check if the email provided already exists
  db.userExists(req.body.email).then((userExists) => {
    // Check if form values are valid
    console.log(req.body, userExists);
    let formErrors = {
      email: (!userExists && req.body.email) ? null : 'Invalid email',
      password: (req.body.password && req.body.password.length >= 8) ? null : 'Invalid password',
    };
    // If there are any errors do not register the user
    if (formErrors.email || formErrors.password) {
      res.status(400).render('new-user-page', {
        pageId: 'new-use',
        title: 'Create a New User',
        email: req.session.email,
        formErrors: formErrors,
        formValues: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      });
      // Else if the form values are valid
    } else {
      return argon.hash(req.body.password).then((dbHash) => {
        let newuser = {
          type: 'USER',
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          password: dbHash,
        };
        if (!newuser.name) {
          return res.status(400).send('"name" is a required field');
        } else if ((!newuser.email) || (!db.validateEmail(req.body.email))) {
          return res.status(400).send('"email" is a required field, it is either missing or not in the proper format');
        }
        else if ((!newuser.phone) || (!db.phonenumber(req.body.phone))) {
          return res.status(400).send(' "phone" is a required filed, either missing or not in proper format');
        }
        else if ((!req.body.password) || (!req.body.cnfrmpsswrd) || (req.body.password !== req.body.cnfrmpsswrd)) {
          return res.status(400).send('password and confirm password shouldnt be empty and should match');
        }
        else {
          db.addentry(newuser);
          res.status(201).send('success');
        }
      })
        .then(() => {
          res.redirect('/login');
        });
    }
  })
    .catch(next);
};

module.exports = {
  get: getnewuserRoute,
  post: postnewuserRoute,
};
