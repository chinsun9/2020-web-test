const express = require('express');
const router = express.Router();
const ApiError = require('../utils/error');
const client = require('../utils/mysql');
const chk_session = require('../utils/chk-session');
const moment = require('moment');

function getJsonFromUrl(query) {
  var result = {};
  query.split('&').forEach(function (part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

router.use(chk_session);
const dateFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  // second: 'numeric',
  hour12: false,
  //   timeZone: 'America/Los_Angeles',
};

router.get('/', (req, res) => {
  // 페이지를 확인하고 db 쿼리 날리기
  let page = req.query.page;
  console.log(`page`, page);
  if (typeof page == 'undefined') {
    page = 1;
  }

  // 전체 게시글 개수
  let query = `SELECT count(*) as count FROM notice where use_flag='Y'`;
  const articlesLength = client.query(query)[0];

  // 게시글 미리보기
  query = `SELECT * FROM notice where use_flag='Y' order by idx desc limit ?,?`;
  const queryArgs = [10 * (page - 1), 10];

  let articles = client.query(query, queryArgs);
  // console.log(articles);

  // 공지사항 검색 필드 채우기
  query = `SELECT user_name FROM user where user_state='Y'`;
  let usernames = client.query(query, queryArgs);
  // console.log(usernames);

  usernames = usernames.map((user, index) => {
    return user.user_name;
  });
  // console.log(usernames);

  // 시간 포맷 변경
  if (process.env.NODE_ENV == 'development') {
    articles.forEach((article) => {
      article.insert_date = new Intl.DateTimeFormat(
        'ko-KR',
        dateFormatOptions
      ).format(new Date(article.insert_date));
    });
  } else {
    articles.forEach((article) => {
      let myDate = article.insert_date;
      article.insert_date = moment(myDate)
        .add(9, 'hours')
        .format('MM-DD HH:mm:ss');
    });
  }

  let data = {};

  res.render('notice', {
    islogined: req.session.uid,
    page: page,
    articles: articles,
    articlesLength: articlesLength.count,
    usernames: usernames,
    data: data,
  });
  return;
});

router.get('/search', (req, res) => {
  // 페이지를 확인하고 db 쿼리 날리기
  console.log(req._parsedUrl.query);

  // 직접 쿼리 스트링 추출해서 json으로 반환
  let urlQuery = getJsonFromUrl(req._parsedUrl.query);
  console.log(urlQuery);
  let page = urlQuery.page;
  let keyword = urlQuery.keyword;
  let writer = urlQuery.writer;

  if (!writer) {
    return res.redirect('/notice');
  }

  if (typeof page == 'undefined') {
    page = 1;
  }

  // 전체 게시글 개수
  let query = `SELECT count(*) as count FROM notice where use_flag='Y' and write_name like ?  and title like ?`;
  let queryArgs = [writer, `%${keyword}%`];
  const articlesLength = client.query(query, queryArgs)[0];
  console.log(articlesLength);

  // 게시글 미리보기
  query = `SELECT * FROM notice where use_flag='Y' and write_name like ? and title like ? order by idx desc limit ?,?`;
  queryArgs = [writer, `%${keyword}%`, 10 * (page - 1), 10];

  let articles = client.query(query, queryArgs);
  console.log(articles);

  // 공지사항 검색 필드 채우기
  query = `SELECT user_name FROM user where user_state='Y'`;
  let usernames = client.query(query, queryArgs);
  console.log(usernames);

  usernames = usernames.map((user, index) => {
    return user.user_name;
  });
  console.log(usernames);

  // 시간 포맷 변경
  if (process.env.NODE_ENV == 'development') {
    articles.forEach((article) => {
      article.insert_date = new Intl.DateTimeFormat(
        'ko-KR',
        dateFormatOptions
      ).format(new Date(article.insert_date));
    });
  } else {
    articles.forEach((article) => {
      let myDate = article.insert_date;
      article.insert_date = moment(myDate)
        .add(9, 'hours')
        .format('MM-DD HH:mm:ss');
    });
  }

  const data = {};
  data.keyword = keyword;
  data.writer = writer;

  res.render('notice', {
    islogined: req.session.uid,
    page: page,
    articles: articles,
    articlesLength: articlesLength.count,
    usernames: usernames,
    data: data,
  });
  return;
});

router.get('/notice-detail', (req, res) => {
  let idx = req.query.idx;

  // idx가 없으면 메인으로
  if (typeof idx == 'undefined') {
    return res.redirect('/');
  }

  let query = `select * from notice where idx=? and use_flag='Y'`;
  const queryArgs = [idx];

  // 쿼리
  const queryResult = client.query(query, queryArgs)[0];
  console.log(queryResult);

  // 쿼리 결과가 없으면 튕기기
  if (!queryResult) {
    console.log('잘못된 접근');
    return res.redirect('back');
  }

  // 조회수 증가
  // on update로 인한 갱신 방지. update_date=update_date
  query = `UPDATE notice SET count = count+1, update_date=update_date  WHERE idx=${idx}`;
  client.query(query);

  // 시간 포맷 변경
  if (process.env.NODE_ENV == 'development') {
    queryResult.insert_date = new Intl.DateTimeFormat(
      'ko-KR',
      dateFormatOptions
    ).format(new Date(queryResult.insert_date));

    if (queryResult.update_date == '0000-00-00 00:00:00') {
      console.log('패스');
      queryResult.update_date = '-';
    } else {
      console.log('안패스');
      queryResult.update_date = new Intl.DateTimeFormat(
        'ko-KR',
        dateFormatOptions
      ).format(new Date(queryResult.update_date));
    }
  } else {
    queryResult.insert_date = moment(queryResult.insert_date)
      .add(9, 'hours')
      .format('MM-DD HH:mm:ss');

    if (queryResult.update_date == '0000-00-00 00:00:00') {
      console.log('패스');
      queryResult.update_date = '-';
    } else {
      console.log('안패스');
      queryResult.update_date = moment(queryResult.update_date)
        .add(9, 'hours')
        .format('MM-DD HH:mm:ss');
    }
  }

  res.render('notice-detail', {
    mode: 'read',
    notice: queryResult,
    idx: req.session.uidx,
  });
});

router.get('/edit', (req, res) => {
  let idx = req.query.idx;

  // idx가 없으면 메인으로
  if (typeof idx == 'undefined') {
    res.render('error-page', {
      message: '404 not found',
    });
    return;
  }

  let query = `select * from notice where idx=? and use_flag='Y'`;
  const queryArgs = [idx];

  // 쿼리
  const queryResult = client.query(query, queryArgs)[0];

  // 결과가 없으면
  if (!queryResult) {
    res.render('error-page', {
      message: '요청하신 페이지를 찾을 수 없습니다.',
    });
    return;
  }

  // 세션 user idx와 작성자의 user idx가 다르다면
  if (req.session.uidx != queryResult.insert_idx) {
    res.render('error-page', {
      message: 'permission denied',
    });
    return;
  }

  // 시간 포맷 변경
  if (process.env.NODE_ENV == 'development') {
    queryResult.insert_date = new Intl.DateTimeFormat(
      'ko-KR',
      dateFormatOptions
    ).format(new Date(queryResult.insert_date));

    if (queryResult.update_date == '0000-00-00 00:00:00') {
      console.log('패스');
      queryResult.update_date = '-';
    } else {
      console.log('안패스');
      queryResult.update_date = new Intl.DateTimeFormat(
        'ko-KR',
        dateFormatOptions
      ).format(new Date(queryResult.update_date));
    }
  } else {
    queryResult.insert_date = moment(queryResult.insert_date)
      .add(9, 'hours')
      .format('MM-DD HH:mm:ss');

    if (queryResult.update_date == '0000-00-00 00:00:00') {
      console.log('패스');
      queryResult.update_date = '-';
    } else {
      console.log('안패스');
      queryResult.update_date = moment(queryResult.update_date)
        .add(9, 'hours')
        .format('MM-DD HH:mm:ss');
    }
  }

  res.render('notice-edit', {
    mode: 'edit',
    notice: queryResult,
    write_name: queryResult.write_name,
    idx: req.session.uidx,
  });
});

router.post('/edit', (req, res, next) => {
  const { title, content, idx } = req.body;
  const update_idx = req.session.uidx;
  const insert_idx = req.session.uidx;

  let query;
  let queryArgs;
  let queryResult;

  query = `SELECT * FROM notice where use_flag='Y' and idx=? and insert_idx=?`;
  queryArgs = [idx, insert_idx];
  queryResult = client.query(query, queryArgs);

  console.log(queryResult);

  if (queryResult.length == 0) {
    console.log('튕튕');
    return res.json({
      result: 'fail',
      message: 'are you kidding me?',
      url: '/',
    });
  }

  // 게시글 작성자와 수정자가 동일해야함.
  query = `UPDATE notice SET title=?, content=?,update_idx=? WHERE idx=? and insert_idx=? `;

  queryArgs = [title, content, update_idx, idx, insert_idx];

  // 쿼리
  queryResult = client.query(query, queryArgs);

  // 실패하면 fail 반환
  if (queryResult.affectedRows !== 1) {
    res.json({
      result: 'fail',
      message: queryResult,
    });
    return;
  }
  res.json({
    result: 'ok',
  });
  // res.redirect(`/notice`);
});

router.get('/write', (req, res) => {
  res.render('notice-write', {
    write_name: req.session.user_name,
  });
});

router.post('/delete', (req, res, next) => {
  // 권한 검사
  const idx = JSON.parse(req.body.notice).idx;
  const insert_idx = req.session.uidx;
  console.log(idx);

  let query;
  let queryArgs;
  let queryResult;

  query = `SELECT * FROM notice where use_flag='Y' and idx=? and insert_idx=?`;
  queryArgs = [idx, insert_idx];
  queryResult = client.query(query, queryArgs);

  console.log(queryResult);

  if (queryResult.length == 0) {
    console.log('튕튕');
    return next(new ApiError('444', 'bad-reqeust', 'are you kidding me?'));
  }

  // 게시물 사용여부를 n으로 변경
  query = `UPDATE notice SET use_flag = 'N' WHERE idx=${idx}`;
  queryResult = client.query(query);

  console.log(queryResult);

  res.redirect('/notice');
});

router.post('/write', (req, res) => {
  const { title, content } = req.body;
  const use_flag = 'Y';
  const count = 0;
  const insert_idx = req.session.uidx;
  const update_idx = req.session.uidx;
  const write_name = req.session.user_name;

  const query =
    'INSERT INTO notice(title,content,write_name,use_flag,count,insert_idx,update_idx) VALUES (?,?,?,?,?,?,?)';
  const queryArgs = [
    title,
    content,
    write_name,
    use_flag,
    count,
    insert_idx,
    update_idx,
  ];
  console.log(queryArgs);

  // 쿼리
  const queryResult = client.query(query, queryArgs);
  console.log(queryResult);
  // 게시글 아이디
  // queryResult

  const idx = queryResult.insertId;
  // res.redirect(`/notice`);
  res.redirect(`notice-detail?idx=${idx}`);
});

module.exports = router;
