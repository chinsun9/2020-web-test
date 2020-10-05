const express = require('express');
const router = express.Router();
const myDAO = require('../utils/myDAO');

router.get('/', (req, res) => {
  res.render('register', {});
});

router.get('/chkID', (req, res) => {
  let result = 'no';

  // url에 붙여서 오는건 쿼리 (get)

  // body안에 담아 보내는 것은 post

  const userInfo = myDAO.selectUserWithUID(req.query.uid);
  console.log(userInfo);
  if (!userInfo) {
    result = 'ok';
  }

  res.json(result);
  return;
});

router.post('/', (req, res) => {
  console.log(req.body);
  // 회원가입 프로세스

  const {
    uid,
    pass,
    user_name,
    user_mail,
    company_name,
    company_address1,
    company_address2,
  } = req.body;

  let result;
  let message;
  let nexturl;

  try {
    myDAO.insertUser({
      uid,
      pass,
      user_name,
      user_mail,
      company_name,
      company_address1,
      company_address2,
    });

    result = 'ok';
    message = '가입이 완료되었습니다.';
    nexturl = '/login';
  } catch (error) {
    result = 'err';
    message = '가입 오류 발생. 다시 시도해주세요.';
  } finally {
    res.json({
      result: result,
      message: message,
      nexturl: nexturl,
    });
  }
});

router.get('/juso-api', (req, res) => {
  console.log('get juso-api');
  res.render('juso-api');
});

router.post('/juso-api', (req, res) => {
  console.log('post juso-api');
  res.locals.query = req.body;
  res.render('juso-api');
});

module.exports = router;
