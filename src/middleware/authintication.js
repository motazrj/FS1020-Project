'use strict';

module.exports = function authenticationMiddleware(req, res, next) {
  if (!req.session.email || !req.session.password) {
  // return res
    //  .status(401).send(`User has to login first `);
  } else {
    next();
  }
};
