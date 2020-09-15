const querystring = require('querystring');

const escape = (str) => {
  return querystring.escape(str);
};

const decode = (str) => {
  return querystring.decode(str);
};

exports.escape = escape;
exports.decode = decode;
