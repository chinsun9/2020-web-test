exports.commonResultMessage = (originalUrl) => {
  let result = {};
  switch (originalUrl) {
    default:
      result.result = 'no session';
      result.message = '세션이 만료되었습니다.';
      result.url = '/';
      break;
  }

  return result;
};
