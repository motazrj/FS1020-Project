'use strict';


module.exports = function deafultErrorHandler(error, request, response, next) {
  console.error(error);
  return response.status(500);

};
