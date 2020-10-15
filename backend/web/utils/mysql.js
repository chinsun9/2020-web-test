const secret = require('./secret');
const mysql = require('sync-mysql');
let client;

if (process.env.NODE_ENV == 'development') {
  console.log('local', process.env.DBHOST);
  client = new mysql({
    host: process.env.DBHOST,
    user: 'root',
    password: '1234',
    database: 'webtest',
  });
} else {
  console.log('ec2');
  client = new mysql(secret);
}

module.exports = client;
