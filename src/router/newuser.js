'use strict';

let db = require('../db');

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function phonenumber(phone)
{
  let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  console.log(phoneno.test(String(phone)));
  return phoneno.test(String(phone));

}


//Create new user page
function getnewuserRoute (req, res) {
  res.render('new-user-page', {
    pageId: 'new-use',
    title: 'Create a New User'
  });
};

function postnewuserRoute( req, res, next) { //create/user
  let newuser = {
    type: 'USER',
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    cnfrmpsswrd: req.body.cnfrmpsswrd,
  }
  if (!newuser.name) {
    return res.status(400).send('"name" is a required field');
  } else if ((!newuser.email) || (!validateEmail(req.body.email))){
    return res.status(400).send('"email" is a required field, it is either missing or not in the proper format');
  }
  else if ((!newuser.phone) ||(!phonenumber(req.body.phone))) {
    return res.status(400).send(' "phone" is a required filed, either missing or not in proper format');
  }
  else if ((!newuser.password) || (!newuser.cnfrmpsswrd) || (newuser.password!==newuser.cnfrmpsswrd)){
    return res.status(400).send('password and confirm password shouldnt be empty and should match');
  }
  else {
    db.addentry(newuser);
    res.status(201).send('success');
  }
};


module.exports = {
  get: getnewuserRoute,
  post: postnewuserRoute,
};
