const error_message = require('./error-message').commonResultMessage;

module.exports = (req, res, next) => {
  const originalUrl = req.originalUrl;
  // console.log(originalUrl);

  return !req.session.uid
    ? res.render('error-page', error_message(originalUrl))
    : next();
};
