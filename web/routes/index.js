const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return !req.session.uid
    ? res.render('login', {
        message: '',
      })
    : res.redirect('/notice');
});

module.exports = router;
