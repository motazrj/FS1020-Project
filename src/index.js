'use strict';

let express = require('express');
let path = require('path');
let router = require ('./router');


let app = express();
let port = 3100;

app.set('view engine', 'ejs');


// Static folder, there is another way to do it as
app.use(express.static(path.join(__dirname, 'static')));

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(router);


function handleServerListen() {
  console.log(`Server is listening on port ${port}`);
}
app.listen(port, handleServerListen);
