const secret = require('./secret');
const mysql = require('sync-mysql');
let client;

if (process.env.NODE_ENV == 'development') {
  client = new mysql({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'webtest',
  });
} else {
  client = new mysql(secret);
}

module.exports = client;
