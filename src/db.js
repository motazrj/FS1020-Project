'use strict';

let util = require('util');
let fs = require('fs');
let path = require('path');

// Initialize fs method
let readFile = util.promisify(fs.readFile);
let writeFile = util.promisify(fs.writeFile);

// Assign the file path, relative to the location of package.json
let dbPath = path.resolve('src/dbasefile.json');

/****************************************************
 ********* Read the JSON database file entirly ******
 ****************************************************/

async function read() {
  let allcontent = await readFile(dbPath);
  let contentArray = JSON.parse(allcontent);
  return contentArray;
}


/**
 * Copied from Matt's,
 */
async function write(dbItems) {
  // The parameters for `null` and `2` are so it's formatted with 2 spaces of indentation
  let json = JSON.stringify(dbItems, null, 2);
  await writeFile(dbPath, json);
}

/*************************************************************
 ********* Write an entry back to the JSON database file *****
 ********* entry type determines if it is a login, new user or other
 ****************************************************/
async function addentry(newentry) {
  let allcontent = await read();
  allcontent.push(newentry);
  await write(allcontent);
}

/* A function to check if a given email exists in the dbase */
function userExists(email) {
  return read().then((users) => {
    let exists = false;
    users.forEach((user) => {
      if (user.email === email) {
        exists = true;
      }
    });
    return exists;
  });
}

function getUserPasswordHash(email) {
  return read().then((users) => {
    let match;
    users.forEach((user) => {
      if (user.email === email) {
        match = user;
      }
    });

    if (!match) {
      throw new Error('User does not exist.');
    }
    return match.password;
  });
}

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function phonenumber(phone) {
  let phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  console.log(phoneno.test(String(phone)));
  return phoneno.test(String(phone));
}

/* A function to check if a given email exists in the dbase */
function loginExists(email) {
  return read().then((users) => {
    let logged = false;
    users.forEach((user) => {

      if ((user.email === email)) { // && ((Date() - user.logindate) <=process.env.MAXAGE)){
        logged = true;
      }
    });
    return logged;
  });
}

module.exports = {
  read: read,
  addentry: addentry,
  userExists: userExists,
  getUserPasswordHash: getUserPasswordHash,
  phonenumber: phonenumber,
  validateEmail: validateEmail,
  loginExists: loginExists,
};
