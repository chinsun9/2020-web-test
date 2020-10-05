var client = require('./mysql');

exports.selectAllNoticeList = () => {
  let query = `SELECT idx, title, write_name, count, insert_date,(select user_mail from user u where u.idx=notice.insert_idx) as user_mail FROM notice where use_flag='Y';`;

  return client.query(query);
};

exports.selectUser = (uid, pass) => {
  const query = 'select * from user where uid=? and pass=?';
  const queryArgs = [uid, pass];
  console.log(queryArgs);
  return client.query(query, queryArgs)[0];
};

exports.selectNoticeCount = () => {
  const query = `SELECT count(*) as count FROM notice where use_flag='Y'`;
  return client.query(query)[0];
};

exports.selectSearchedNoticeCount = (writer, keyword) => {
  const query = `SELECT count(*) as count FROM notice where use_flag='Y' and write_name like ?  and title like ?`;
  const queryArgs = [writer, `%${keyword}%`];
  return client.query(query, queryArgs)[0];
};

exports.selectNoticeList = (page) => {
  const query = `SELECT * FROM notice where use_flag='Y' order by idx desc limit ?,?`;
  const queryArgs = [10 * (page - 1), 10];

  return client.query(query, queryArgs);
};

exports.selectSearchedNotice = (writer, keyword, page) => {
  const query = `SELECT * FROM notice where use_flag='Y' and write_name like ? and title like ? order by idx desc limit ?,?`;
  const queryArgs = [writer, `%${keyword}%`, 10 * (page - 1), 10];

  return client.query(query, queryArgs);
};

exports.selectAllUserNames = () => {
  const query = `SELECT user_name FROM user where user_state='Y'`;
  return client.query(query);
};

exports.selectNotice = (idx) => {
  const query = `select * from notice where idx=? and use_flag='Y'`;
  const queryArgs = [idx];

  return client.query(query, queryArgs)[0];
};

exports.increaseViewNumber = (idx) => {
  // on update로 인한 갱신 방지. update_date=update_date
  const query = `UPDATE notice SET count = count+1, update_date=update_date  WHERE idx=?`;
  const queryArgs = [idx];
  return client.query(query, queryArgs);
};

exports.selectNoticeWithUID = (idx, uid) => {
  const query = `SELECT * FROM notice where use_flag='Y' and idx=? and insert_idx=?`;
  const queryArgs = [idx, uid];
  return client.query(query, queryArgs);
};

exports.updateNotice = (notice) => {
  const { title, content, update_idx, idx, insert_idx } = notice;

  const query = `UPDATE notice SET title=?, content=?,update_idx=? WHERE idx=? and insert_idx=? `;
  const queryArgs = [title, content, update_idx, idx, insert_idx];

  return client.query(query, queryArgs);
};

exports.deleteNotice = (idx) => {
  const query = `UPDATE notice SET use_flag = 'N' WHERE idx=?`;
  const queryArgs = [idx];
  return client.query(query, queryArgs);
};

exports.insertNotice = (notice) => {
  const {
    title,
    content,
    write_name,
    use_flag,
    count,
    insert_idx,
    update_idx,
  } = notice;

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

  // 쿼리
  return client.query(query, queryArgs);
};

exports.selectUserWithUID = (uid) => {
  const query = 'select * from user where uid=?';
  const queryArgs = [uid];
  return client.query(query, queryArgs)[0];
};

exports.insertUser = (user) => {
  const {
    uid,
    pass,
    user_name,
    user_mail,
    company_name,
    company_address1,
    company_address2,
  } = user;

  const user_state = 'N';
  const update_uid = null;

  const query =
    'INSERT INTO user(uid,pass,user_name,user_mail,company_name,company_address1,company_address2,user_state,update_uid) VALUES (?,?,?,?,?,?,?,?,?)';
  const queryArgs = [
    uid,
    pass,
    user_name,
    user_mail,
    company_name,
    company_address1,
    company_address2,
    user_state,
    update_uid,
  ];

  client.query(query, queryArgs);
};
