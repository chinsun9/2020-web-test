const express = require('express');
const router = express.Router();
const chk_session = require('../utils/chk-session');

router.use(chk_session);
router.get('/', (req, res) => {
  // 로그아웃

  // 세션정보 초기화
  req.session.uid = '';
  req.session.user_name = '';
  req.session.uidx = '';

  res.redirect('/');
});

module.exports = router;
