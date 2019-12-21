'use strict';

module.exports = function authenticationMiddleware(req, res, next) {
  if ((!req.session.username) ||(!req.session.email)) {
    res
      .status(401)
     // .render('status/forbidden');
     .send(`User has to login first `);
  } else {
    next();
  }
};
