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

async function read () {
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


async function addentry(newentry){
  let allcontent = await read();
  allcontent.push(newentry);
  await write(allcontent);
}


module.exports = {
  read: read,
  addentry:addentry,
};
