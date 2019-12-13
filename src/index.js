'use strict';

let express = require('express');
let path = require('path');
let router = require ('./router');


let app = express();
let port = 3000;
/* the function removed in order to utilize the static folder functionality
app.get('/', function(request,response){
 // response.send('Test!!');
 response.sendFile(path.join(__dirname,'static','contactform.html'));
});  */

// Static folder, there is another way to do it as
 app.use(express.static(path.join(__dirname, 'static')));
//app.use('/static', express.static('static'));

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
// Just a function to test the body parsing functionality, will be removed after the 2nd project Checkpoint
app.post(
  '/test',
  (req, res) => res.json(req.body)
);
/**
 * Middleware example
 * will be removed after the 2nd project checkpoint
 */
app.use(function (req, res, next) {
  console.log('123');
  next();
});

app.use(router);


function handleServerListen() {
  console.log(`Server is listening on port ${port}`);
}
app.listen(port, handleServerListen);
