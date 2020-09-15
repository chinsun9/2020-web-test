const express = require('express');
const router = express.Router();
const client = require('../utils/mysql');
const chk_session = require('../utils/chk-session');

router.use(chk_session);

router.get('/', (req, res) => {
  let result = new Object();

  let query = `SELECT idx, title, write_name, count, insert_date,(select user_mail from user u where u.idx=notice.insert_idx) as user_mail FROM notice where use_flag='Y';`;

  let notice = client.query(query);
  // console.log(notice);
  result.notice = notice;
  result.recordCount = notice.length;
  // console.log(result);

  res.json(result);
  return;
});

module.exports = router;
