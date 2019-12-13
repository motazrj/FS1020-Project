'use strict';


module.exports = function deafultErrorHandler(error, request, response, next) {
  console.error(error);
  response.sendStatus(500);

};
