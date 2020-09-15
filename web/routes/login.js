const express = require('express');
const router = express.Router();
const client = require('../utils/mysql');

router.get('/', (req, res) => {
  // 이미 로그인된 경우 홈페이지로
  if (req.session.uid) {
    res.redirect('/');
    return;
  }

  let message;
  if (req.session.message) {
    message = req.session.message;
    req.session.message = '';
  }

  res.render('login', { message: message });
  return;
});

router.post('/', (req, res) => {
  console.log(req.body);

  const query = 'select * from user where uid=? and pass=?';
  const queryArgs = [req.body.uid, req.body.pass];
  console.log(queryArgs);
  const userInfo = client.query(query, queryArgs)[0];

  let message = '로그인 실패';

  if (!userInfo) {
    req.session.message = message;
    console.log('로그인 실패 로그인 화면');
    res.redirect('/login');
    return;
  }

  switch (userInfo.user_state) {
    case 'Y':
      message = '로그인 성공';
      req.session.uid = userInfo.uid;
      req.session.uidx = userInfo.idx;
      req.session.user_name = userInfo.user_name;
      console.log('로그인 성공');
      res.redirect('/');
      return;
    case 'N':
      message = '미승인 상태입니다. 승인을 기다려주세요.';
      break;
    case 'D':
      message = '탈퇴한 계정';
      break;
    default:
      message = 'bad';
      break;
  }

  req.session.message = message;
  res.redirect('/login');
  return;
});

module.exports = router;
