const express = require('express');
const router = express.Router();
// const chk_session = require('../utils/chk-session');
const client = require('../utils/mysql');

router.get('/', (req, res, next) => {
  console.log(`req.query: ${JSON.stringify(req.query)}`);

  let keyword = req.query.keyword;
  let writer = req.query.writer;
  // keyword = decode(keyword);
  // console.log(keyword);
  // const query = 'select * from user';
  // const queryResult = client.query(query);

  // 게시글 미리보기
  query = `SELECT * FROM notice where use_flag='Y' and write_name like ?  and title like ? order by idx desc limit ?,?`;
  const queryArgs = [writer, `%${keyword}%`, 0, 10];
  let articles = client.query(query, queryArgs);

  res.json({ ok: articles });
  return;
});

module.exports = router;
