const express = require('express');
const router = express.Router();
const myDAO = require('../utils/myDAO');
const chk_session = require('../utils/chk-session');

router.use(chk_session);

router.get('/', (req, res) => {
  let result = new Object();

  let notice = myDAO.selectAllNoticeList();
  // console.log(notice);
  result.notice = notice;
  result.recordCount = notice.length;
  // console.log(result);

  res.json(result);
  return;
});

module.exports = router;
